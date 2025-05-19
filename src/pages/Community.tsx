
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import { communityAPI } from '@/api';
import { Label } from '@/components/ui/label';
import { Facebook, Twitter, MessageCircle, Share2, Heart, Image, Video, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommunityPost {
  _id: string;
  user: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  content: string;
  mediaType: 'text' | 'image' | 'audio' | 'video' | 'none';
  mediaUrl?: string;
  likes: string[];
  comments: {
    _id: string;
    user: {
      _id: string;
      name: string;
      profileImage?: string;
    };
    content: string;
    createdAt: string;
  }[];
  tags: string[];
  createdAt: string;
}

const Community = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'text' | 'image' | 'audio' | 'video'>('text');
  const [commentContent, setCommentContent] = useState<{[key: string]: string}>({});
  const [activeTab, setActiveTab] = useState('all');
  const [newComment, setNewComment] = useState<{[key: string]: string}>({});
  const [showComments, setShowComments] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (activeTab !== 'all') {
        params.mediaType = activeTab;
      }
      
      const response = await communityAPI.getAllPosts(params);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load community posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.split('/')[0];
    let type: 'image' | 'audio' | 'video' = 'image';
    
    if (fileType === 'audio') {
      type = 'audio';
    } else if (fileType === 'video') {
      type = 'video';
    }
    
    setMediaType(type);
    setMediaFile(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setMediaPreview(previewUrl);
  };

  const handlePost = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post in the community",
        variant: "destructive"
      });
      return;
    }
    
    if (!postContent.trim() && !mediaFile) {
      toast({
        title: "Empty Post",
        description: "Please add content or media to your post",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('content', postContent);
      
      if (mediaFile) {
        formData.append('media', mediaFile);
      }
      
      const response = await communityAPI.createPost(formData);
      
      toast({
        title: "Post Created",
        description: "Your post has been shared with the community",
        variant: "default"
      });
      
      // Reset form
      setPostContent('');
      setMediaFile(null);
      setMediaPreview(null);
      setMediaType('text');
      
      // Refresh posts
      fetchPosts();
      
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Post Failed",
        description: "There was an error creating your post",
        variant: "destructive"
      });
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like posts",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const response = await communityAPI.likePost(postId);
      
      // Update posts state to reflect like
      setPosts(prev => prev.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            likes: response.data.liked 
              ? [...post.likes, user.id]
              : post.likes.filter(id => id !== user.id)
          };
        }
        return post;
      }));
      
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to comment",
        variant: "destructive"
      });
      return;
    }
    
    const content = newComment[postId];
    
    if (!content?.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please add content to your comment",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const response = await communityAPI.commentOnPost(postId, content);
      
      // Update posts state to include new comment
      setPosts(prev => prev.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            comments: [...post.comments, response.data.comment]
          };
        }
        return post;
      }));
      
      // Reset comment input for this post
      setNewComment(prev => ({
        ...prev,
        [postId]: ''
      }));
      
    } catch (error) {
      console.error('Error commenting on post:', error);
      toast({
        title: "Comment Failed",
        description: "There was an error posting your comment",
        variant: "destructive"
      });
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleShare = (post: CommunityPost, platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const baseUrl = window.location.origin;
    const postUrl = `${baseUrl}/community/post/${post._id}`;
    const text = post.content || 'Check out this post on FitnessFreaks';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${postUrl}`)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community</h1>
        <p className="text-muted-foreground">
          Connect with other fitness enthusiasts, share your progress, and get inspired
        </p>
      </div>
      
      {user && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share something with the community..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="mb-4 min-h-[100px]"
                />
                
                {mediaPreview && (
                  <div className="mb-4">
                    {mediaType === 'image' && (
                      <img src={mediaPreview} alt="Preview" className="max-h-[300px] rounded-lg" />
                    )}
                    {mediaType === 'video' && (
                      <video src={mediaPreview} controls className="max-h-[300px] rounded-lg" />
                    )}
                    {mediaType === 'audio' && (
                      <audio src={mediaPreview} controls className="w-full" />
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        setMediaFile(null);
                        setMediaPreview(null);
                      }}
                    >
                      Remove Media
                    </Button>
                  </div>
                )}
                
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="flex gap-2">
                    <Label htmlFor="media-upload" className="cursor-pointer">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-muted transition-colors">
                        <Image className="h-4 w-4" />
                        <span>Image</span>
                      </div>
                    </Label>
                    <Label htmlFor="media-upload" className="cursor-pointer">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-muted transition-colors">
                        <Video className="h-4 w-4" />
                        <span>Video</span>
                      </div>
                    </Label>
                    <Label htmlFor="media-upload" className="cursor-pointer">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-muted transition-colors">
                        <Mic className="h-4 w-4" />
                        <span>Audio</span>
                      </div>
                    </Label>
                    <input
                      type="file"
                      id="media-upload"
                      className="hidden"
                      accept="image/*,video/*,audio/*"
                      onChange={handleMediaChange}
                    />
                  </div>
                  
                  <Button onClick={handlePost} className="bg-fitness-primary hover:bg-fitness-secondary">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="image">Photos</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground mb-4">No posts found in this category</p>
                {user ? (
                  <Button onClick={() => setActiveTab('all')}>View All Posts</Button>
                ) : (
                  <Button onClick={() => window.location.href = '/login'}>Sign In to Post</Button>
                )}
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.user.profileImage} alt={post.user.name} />
                          <AvatarFallback>{getInitials(post.user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base font-medium">{post.user.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {post.content && (
                      <p className="mb-4 whitespace-pre-line">{post.content}</p>
                    )}
                    
                    {post.mediaType !== 'text' && post.mediaUrl && (
                      <div className="mb-4">
                        {post.mediaType === 'image' && (
                          <img 
                            src={`${post.mediaUrl.startsWith('http') ? '' : '/uploads/'}${post.mediaUrl}`} 
                            alt="Post media" 
                            className="rounded-lg max-h-[400px] object-contain" 
                          />
                        )}
                        {post.mediaType === 'video' && (
                          <video 
                            src={`${post.mediaUrl.startsWith('http') ? '' : '/uploads/'}${post.mediaUrl}`}
                            controls
                            className="w-full rounded-lg max-h-[400px]"
                          />
                        )}
                        {post.mediaType === 'audio' && (
                          <audio 
                            src={`${post.mediaUrl.startsWith('http') ? '' : '/uploads/'}${post.mediaUrl}`}
                            controls 
                            className="w-full"
                          />
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mt-2 mb-2">
                      {post.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="bg-muted text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post._id)}
                          className={user && post.likes.includes(user.id) ? "text-red-500" : ""}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes.length}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleComments(post._id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments.length}
                        </Button>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(post, 'facebook')}
                        >
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(post, 'twitter')}
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const text = post.content || 'Check out this FitnessFreaks post!';
                            navigator.clipboard.writeText(`${text} - ${window.location.origin}/community/post/${post._id}`);
                            toast({
                              title: "Link Copied",
                              description: "Post link copied to clipboard",
                              variant: "default"
                            });
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {showComments[post._id] && (
                      <div className="mt-4 space-y-4">
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-2">Comments</h4>
                          
                          {post.comments.length > 0 ? (
                            <div className="space-y-3">
                              {post.comments.map((comment) => (
                                <div key={comment._id} className="flex gap-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={comment.user.profileImage} alt={comment.user.name} />
                                    <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 bg-muted rounded-lg p-2">
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm font-medium">{comment.user.name}</p>
                                      <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
                                    </div>
                                    <p className="text-sm mt-1">{comment.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No comments yet</p>
                          )}
                          
                          {user && (
                            <div className="mt-4 flex gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={user.profileImage} alt={user.name} />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <Input
                                  placeholder="Add a comment..."
                                  value={newComment[post._id] || ''}
                                  onChange={(e) => setNewComment({...newComment, [post._id]: e.target.value})}
                                  className="mb-2"
                                />
                                <Button 
                                  size="sm"
                                  onClick={() => handleComment(post._id)}
                                  className="bg-fitness-primary hover:bg-fitness-secondary"
                                >
                                  Post Comment
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
