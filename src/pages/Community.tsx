
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { communityAPI } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, MessageSquare, Share2, Send, Image, Loader2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Comment {
  _id: string;
  user: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  text: string;
  createdAt: string;
}

interface CommunityPost {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  text: string;
  mediaType: 'none' | 'image' | 'video' | 'audio';
  media: string[];
  likes: string[];
  comments: Comment[];
  tags: string[];
  createdAt: string;
}

const Community = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPostText, setNewPostText] = useState("");
  const [newPostMedia, setNewPostMedia] = useState<FileList | null>(null);
  const [newPostLoading, setNewPostLoading] = useState(false);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [commentLoading, setCommentLoading] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  
  const { toast } = useToast();
  const { user } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "For the full experience",
        description: "Sign in to interact with the community and post content",
      });
    }
    
    fetchPosts();
  }, [user, toast]);
  
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await communityAPI.getPosts();
      
      if (response.data.success) {
        setPosts(response.data.posts);
      } else {
        toast({
          title: "Error loading community posts",
          description: response.data.message || "Failed to load community posts",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error("Failed to fetch community posts:", error);
      toast({
        title: "Error loading community posts",
        description: "Failed to load community posts. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to create posts",
      });
      navigate('/login');
      return;
    }
    
    if (!newPostText.trim() && (!newPostMedia || newPostMedia.length === 0)) {
      toast({
        title: "Empty post",
        description: "Please add text or media to your post",
        variant: "destructive"
      });
      return;
    }
    
    setNewPostLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('text', newPostText);
      
      if (newPostMedia) {
        for (let i = 0; i < newPostMedia.length; i++) {
          formData.append('media', newPostMedia[i]);
        }
      }
      
      const response = await communityAPI.createPost(formData);
      
      if (response.data.success) {
        toast({
          title: "Post created",
          description: "Your post has been published to the community",
        });
        
        // Add new post to beginning of list
        setPosts([response.data.post, ...posts]);
        
        // Clear form
        setNewPostText("");
        setNewPostMedia(null);
        
        // Reset file input by clearing its value
        const fileInput = document.getElementById('post-media') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        throw new Error(response.data.message || "Failed to create post");
      }
    } catch (error: any) {
      console.error("Failed to create post:", error);
      toast({
        title: "Error creating post",
        description: error.message || "Failed to create your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setNewPostLoading(false);
    }
  };
  
  const handleLikePost = async (postId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like posts",
      });
      navigate('/login');
      return;
    }
    
    try {
      const response = await communityAPI.likePost(postId);
      
      if (response.data.success) {
        // Update post likes
        setPosts(posts.map(post => {
          if (post._id === postId) {
            return { ...post, likes: response.data.likes };
          }
          return post;
        }));
      } else {
        throw new Error(response.data.message || "Failed to like post");
      }
    } catch (error: any) {
      console.error("Failed to like post:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to like post. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleAddComment = async (postId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to comment on posts",
      });
      navigate('/login');
      return;
    }
    
    const text = commentText[postId]?.trim();
    if (!text) {
      toast({
        title: "Empty comment",
        description: "Please add text to your comment",
        variant: "destructive"
      });
      return;
    }
    
    setCommentLoading({ ...commentLoading, [postId]: true });
    
    try {
      const response = await communityAPI.commentPost(postId, text);
      
      if (response.data.success) {
        // Update post comments
        setPosts(posts.map(post => {
          if (post._id === postId) {
            return { ...post, comments: response.data.comments };
          }
          return post;
        }));
        
        // Clear comment text
        setCommentText({ ...commentText, [postId]: '' });
      } else {
        throw new Error(response.data.message || "Failed to add comment");
      }
    } catch (error: any) {
      console.error("Failed to add comment:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setCommentLoading({ ...commentLoading, [postId]: false });
    }
  };
  
  const sharePost = (post: CommunityPost) => {
    if (navigator.share) {
      navigator.share({
        title: `${post.user.name}'s post on FitnessFreaks`,
        text: post.text,
        url: `${window.location.origin}/community/post/${post._id}`
      }).catch(error => {
        console.error('Error sharing post:', error);
        toast({
          title: "Sharing failed",
          description: "Could not share this post. Try again later.",
          variant: "destructive"
        });
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = `${window.location.origin}/community/post/${post._id}`;
      navigator.clipboard.writeText(url).then(() => {
        toast({
          title: "Link copied",
          description: "Post link copied to clipboard!"
        });
      });
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const filteredPosts = activeTab === 'all' 
    ? posts 
    : activeTab === 'media' 
      ? posts.filter(post => post.mediaType !== 'none')
      : posts.filter(post => post.tags.includes(activeTab));
  
  return (
    <div className="container py-12 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">Community</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow fitness enthusiasts, share your journey, and get inspired by others.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="all" className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="media" className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white">
                  Media
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white">
                  Nutrition
                </TabsTrigger>
                <TabsTrigger value="workout" className="data-[state=active]:bg-fitness-primary data-[state=active]:text-white">
                  Workout
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab}>
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="border-0 shadow-lg dark:shadow-none dark:bg-gray-900">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                        <Skeleton className="h-[200px] w-full mt-4" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <Card key={post._id} className="border-0 shadow-lg dark:shadow-none dark:bg-gray-900">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.user.profileImage} />
                              <AvatarFallback className="bg-fitness-primary text-white">
                                {post.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{post.user.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatDate(post.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                          {post.tags.length > 0 && (
                            <div className="flex gap-2">
                              {post.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="px-2 py-1 bg-fitness-primary/10 text-fitness-primary text-xs rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-wrap mb-4">{post.text}</p>
                        
                        {post.mediaType !== 'none' && post.media.length > 0 && (
                          <div className="mt-3 rounded-xl overflow-hidden">
                            {post.mediaType === 'image' ? (
                              <div className={`grid ${post.media.length > 1 ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
                                {post.media.map((mediaUrl, index) => (
                                  <img
                                    key={index}
                                    src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${mediaUrl}`}
                                    alt={`Post media ${index + 1}`}
                                    className="w-full h-auto object-cover rounded-xl"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = "https://placehold.co/600x400/9b87f5/ffffff?text=Image+Not+Available";
                                    }}
                                  />
                                ))}
                              </div>
                            ) : post.mediaType === 'video' ? (
                              <video 
                                controls 
                                className="w-full rounded-xl"
                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${post.media[0]}`}
                              />
                            ) : post.mediaType === 'audio' ? (
                              <audio
                                controls
                                className="w-full mt-2"
                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${post.media[0]}`}
                              />
                            ) : null}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mt-6 pt-4 border-t">
                          <div className="flex gap-4">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center gap-1 px-2"
                              onClick={() => handleLikePost(post._id)}
                            >
                              <Heart 
                                className={`h-5 w-5 ${user && post.likes.includes(user.id) ? 'text-red-500 fill-red-500' : ''}`} 
                              />
                              <span>{post.likes.length}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center gap-1 px-2"
                            >
                              <MessageSquare className="h-5 w-5" />
                              <span>{post.comments.length}</span>
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="flex items-center gap-1 px-2"
                            onClick={() => sharePost(post)}
                          >
                            <Share2 className="h-5 w-5" />
                            <span>Share</span>
                          </Button>
                        </div>
                        
                        {/* Comments */}
                        {post.comments.length > 0 && (
                          <div className="mt-4 pt-2 border-t">
                            <h4 className="font-medium mb-2">Comments</h4>
                            <div className="space-y-3">
                              {post.comments.slice(0, 3).map((comment) => (
                                <div key={comment._id} className="flex gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.user.profileImage} />
                                    <AvatarFallback className="bg-muted text-muted-foreground">
                                      {comment.user.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="bg-muted rounded-xl px-3 py-2 text-sm flex-grow">
                                    <div className="font-medium">{comment.user.name}</div>
                                    <div>{comment.text}</div>
                                  </div>
                                </div>
                              ))}
                              {post.comments.length > 3 && (
                                <Button variant="link" className="text-fitness-primary px-0">
                                  View all {post.comments.length} comments
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Add Comment */}
                        <div className="mt-3 pt-2 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.profileImage} />
                            <AvatarFallback className="bg-fitness-primary text-white">
                              {user ? user.name.charAt(0) : 'G'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-grow flex gap-2">
                            <Input
                              placeholder="Add a comment..."
                              value={commentText[post._id] || ''}
                              onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                              className="rounded-xl h-10"
                              disabled={!user}
                            />
                            <Button 
                              size="sm" 
                              onClick={() => handleAddComment(post._id)}
                              disabled={commentLoading[post._id] || !commentText[post._id]?.trim() || !user}
                              className="bg-fitness-primary hover:bg-fitness-secondary h-10 rounded-xl px-3"
                            >
                              {commentLoading[post._id] ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Send className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-0 shadow-lg dark:shadow-none dark:bg-gray-900">
                  <CardContent className="pt-6 pb-6 text-center">
                    <p className="text-muted-foreground">No posts found in this category.</p>
                    {activeTab !== 'all' && (
                      <Button 
                        variant="link" 
                        onClick={() => setActiveTab('all')}
                        className="text-fitness-primary"
                      >
                        View all posts instead
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="border-0 shadow-lg dark:shadow-none dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-xl">Create Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePost}>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Share your fitness journey, ask questions, or post progress..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="min-h-[120px] rounded-xl"
                    disabled={!user}
                  />
                  
                  <div className="space-y-2">
                    <Label htmlFor="post-media" className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Add Media (Optional)
                    </Label>
                    <Input
                      id="post-media"
                      type="file"
                      accept="image/*,video/*,audio/*"
                      onChange={(e) => setNewPostMedia(e.target.files)}
                      multiple
                      className="rounded-xl"
                      disabled={!user}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-fitness-primary hover:bg-fitness-secondary rounded-xl"
                    disabled={newPostLoading || (!newPostText.trim() && (!newPostMedia || newPostMedia.length === 0)) || !user}
                  >
                    {newPostLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Posting...
                      </span>
                    ) : (
                      "Share Post"
                    )}
                  </Button>
                  
                  {!user && (
                    <p className="text-center text-sm text-muted-foreground">
                      Please <a href="/login" className="text-fitness-primary font-medium">sign in</a> to create posts
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card className="mt-6 border-0 shadow-lg dark:shadow-none dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-xl">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="font-medium">Be Respectful</p>
                <p className="text-sm text-muted-foreground">Treat others with kindness and respect</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Share Knowledge</p>
                <p className="text-sm text-muted-foreground">Contribute helpful fitness and nutrition insights</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Stay Positive</p>
                <p className="text-sm text-muted-foreground">Focus on encouragement and support</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Be Authentic</p>
                <p className="text-sm text-muted-foreground">Share genuine experiences and progress</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
