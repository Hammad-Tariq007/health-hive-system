
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import AdminLayout from "./AdminLayout";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Eye, FileText, MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock blog posts data
const mockBlogPosts = [
  {
    id: '1',
    title: 'The Benefits of High-Intensity Interval Training',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Learn how HIIT can transform your fitness routine and maximize results in minimal time.',
    content: `High-Intensity Interval Training (HIIT) has become increasingly popular in recent years due to its effectiveness and efficiency. HIIT involves short bursts of intense exercise followed by brief recovery periods. This article explores the numerous benefits of incorporating HIIT into your fitness routine.

### What is HIIT?

HIIT stands for High-Intensity Interval Training. It involves alternating between high-intensity exercise bursts (typically 20-90 seconds) and short recovery periods. This pattern is repeated for a total workout usually lasting between 10-30 minutes.

### Benefits of HIIT

1. **Time Efficiency**: One of the biggest advantages of HIIT is that it delivers significant health benefits in much less time than traditional workouts.

2. **Increased Metabolism**: HIIT can boost your metabolism for hours after exercise, a phenomenon known as the "afterburn effect" or excess post-exercise oxygen consumption (EPOC).

3. **Fat Loss**: Studies show that HIIT is particularly effective at reducing abdominal fat, which is associated with many chronic diseases.

4. **Muscle Retention**: Unlike steady-state cardio, HIIT helps preserve muscle mass while promoting fat loss.

5. **Improved Cardiovascular Health**: Regular HIIT can improve heart health by reducing blood pressure and heart rate.

### Sample HIIT Workout

Try this simple HIIT workout:
- 30 seconds of burpees
- 30 seconds of rest
- 30 seconds of mountain climbers
- 30 seconds of rest
- 30 seconds of jumping jacks
- 30 seconds of rest
- 30 seconds of high knees
- 30 seconds of rest

Repeat this circuit 3-4 times for a quick but effective workout!

### Conclusion

HIIT offers numerous benefits for people of all fitness levels and can be adapted to suit various preferences and capabilities. However, due to its intensity, it's recommended to start slowly and gradually increase the difficulty as your fitness improves.`,
    author: 'Jane Doe',
    category: 'Training',
    tags: ['HIIT', 'Cardio', 'Fat Loss'],
    published: true,
    publishedAt: new Date('2023-10-15')
  },
  {
    id: '2',
    title: 'Nutrition Myths Debunked',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    excerpt: 'We separate fact from fiction when it comes to common nutrition beliefs and dietary advice.',
    content: `In today's information-rich world, nutrition advice is everywhere. Unfortunately, not all of it is accurate. This article aims to debunk some of the most common nutrition myths that may be impacting your health goals.

### Myth 1: Carbs Are Bad for You

**The Truth**: Carbohydrates are a crucial macronutrient and the body's preferred energy source. The key is choosing the right types of carbs—complex carbohydrates from whole grains, fruits, and vegetables provide essential nutrients and fiber.

### Myth 2: Fat Makes You Fat

**The Truth**: Dietary fat is essential for hormone production, nutrient absorption, and cell health. Healthy fats from sources like avocados, nuts, and olive oil can actually support weight management by promoting satiety.

### Myth 3: You Need to Eat Every 2-3 Hours to "Stoke" Your Metabolism

**The Truth**: Meal timing and frequency have minimal impact on metabolic rate. What matters most is your total daily caloric intake and the quality of foods you consume.

### Myth 4: Detox Diets Cleanse Your Body

**The Truth**: Your body has built-in detoxification systems—primarily your liver and kidneys—that work continuously. Most "detox" programs lack scientific evidence and can sometimes be harmful.

### Myth 5: Supplements Are Necessary for Everyone

**The Truth**: While some people may benefit from specific supplements due to dietary restrictions or medical conditions, most nutrients can and should be obtained from a well-balanced diet.

### Conclusion

When it comes to nutrition, it's essential to rely on evidence-based information rather than fads or marketing claims. A balanced approach focused on whole foods, proper hydration, and moderation is still the most reliable path to long-term health.`,
    author: 'John Smith',
    category: 'Nutrition',
    tags: ['Diet', 'Health', 'Food'],
    published: true,
    publishedAt: new Date('2023-11-02')
  },
  {
    id: '3',
    title: 'Effective Recovery Techniques for Athletes',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Optimize your recovery to improve performance and prevent injury with these proven methods.',
    content: 'Full content about recovery techniques...',
    author: 'Alex Johnson',
    category: 'Recovery',
    tags: ['Rest', 'Massage', 'Sleep'],
    published: false,
    publishedAt: null
  }
];

interface BlogPostData {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt: Date | null;
}

const ManageBlog = () => {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editPost, setEditPost] = useState<BlogPostData | null>(null);
  const [newPost, setNewPost] = useState<Partial<BlogPostData>>({
    title: '',
    image: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Training',
    tags: [],
    published: false
  });
  const [tagInput, setTagInput] = useState('');
  
  // Check if user is admin, if not redirect
  useEffect(() => {
    if (!user) {
      toast({
        title: "Access Denied",
        description: "Please log in to access this page",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (!isAdmin()) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, isAdmin, navigate, toast]);

  // Filter blog posts based on search term
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeletePost = (id: string) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
    
    toast({
      title: "Post Deleted",
      description: "The blog post has been successfully removed.",
      variant: "default"
    });
  };

  const handleEditPost = (post: BlogPostData) => {
    setEditPost(post);
    setNewPost(post);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleTogglePublished = (value: boolean) => {
    setNewPost(prev => ({ ...prev, published: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newPost.tags?.includes(tagInput.trim())) {
      setNewPost(prev => ({ 
        ...prev, 
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  const handleSavePost = () => {
    if (!newPost.title || !newPost.excerpt || !newPost.content) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (editPost) {
      // Update existing post
      setBlogPosts(blogPosts.map(post => 
        post.id === editPost.id ? { 
          ...post, 
          ...newPost as BlogPostData,
          publishedAt: newPost.published ? (post.publishedAt || new Date()) : null
        } : post
      ));
      
      toast({
        title: "Post Updated",
        description: "The blog post has been successfully updated.",
        variant: "default"
      });
    } else {
      // Add new post
      const post: BlogPostData = {
        id: `${Date.now()}`,
        title: newPost.title!,
        image: newPost.image || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
        excerpt: newPost.excerpt!,
        content: newPost.content!,
        author: newPost.author || user?.name || 'Anonymous',
        category: newPost.category || 'Uncategorized',
        tags: newPost.tags || [],
        published: newPost.published || false,
        publishedAt: newPost.published ? new Date() : null
      };
      
      setBlogPosts([...blogPosts, post]);
      
      toast({
        title: "Post Added",
        description: "The new blog post has been successfully added.",
        variant: "default"
      });
    }
    
    // Reset form and close dialog
    setNewPost({
      title: '',
      image: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Training',
      tags: [],
      published: false
    });
    setEditPost(null);
    setIsDialogOpen(false);
  };

  const handleTogglePostStatus = (id: string) => {
    setBlogPosts(blogPosts.map(post => {
      if (post.id === id) {
        const newStatus = !post.published;
        return {
          ...post,
          published: newStatus,
          publishedAt: newStatus ? (post.publishedAt || new Date()) : null
        };
      }
      return post;
    }));
    
    const post = blogPosts.find(p => p.id === id);
    
    toast({
      title: post?.published ? "Post Unpublished" : "Post Published",
      description: post?.published 
        ? "The blog post is now hidden from the public." 
        : "The blog post is now visible to the public.",
      variant: "default"
    });
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Blog</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage blog content on the platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search blog posts..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            
            <Button 
              className="bg-fitness-primary hover:bg-fitness-secondary sm:w-auto w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </div>
          
          <Card>
            <CardHeader className="p-4">
              <CardTitle>All Blog Posts</CardTitle>
              <CardDescription>
                {filteredPosts.length} posts total, {filteredPosts.filter(p => p.published).length} published
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Title</th>
                    <th className="text-left p-4 font-medium">Author</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <tr key={post.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop";
                                }}
                              />
                            </div>
                            <div>
                              <p className="font-medium truncate max-w-[200px]">{post.title}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">{post.excerpt}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{post.author}</td>
                        <td className="p-4">
                          <Badge variant="outline">{post.category}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant={post.published ? "default" : "outline"}
                            className={post.published ? 'bg-green-500 hover:bg-green-600' : ''}
                          >
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">
                          {post.publishedAt 
                            ? post.publishedAt.toLocaleDateString() 
                            : 'Not published'}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleTogglePostStatus(post.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleEditPost(post)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        No blog posts found. Try a different search term or create a new post.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
            <DialogDescription>
              {editPost 
                ? 'Update the details for this blog post.' 
                : 'Fill in the details to create a new blog post.'}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  placeholder="Enter post title" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Featured Image URL</Label>
                <Input 
                  id="image" 
                  name="image"
                  value={newPost.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg" 
                />
                <p className="text-xs text-muted-foreground">
                  Enter a URL or leave blank for a default image
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea 
                  id="excerpt" 
                  name="excerpt"
                  value={newPost.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief summary of the post" 
                  className="min-h-[60px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea 
                  id="content" 
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  placeholder="Write your post content here (supports markdown)" 
                  className="min-h-[200px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input 
                    id="author" 
                    name="author"
                    value={newPost.author}
                    onChange={handleInputChange}
                    placeholder="Author name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    name="category"
                    value={newPost.category}
                    onChange={handleInputChange}
                    placeholder="Post category" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleAddTag}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newPost.tags?.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button 
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full hover:bg-accent p-0.5"
                      >
                        ✕
                      </button>
                    </Badge>
                  ))}
                  {newPost.tags?.length === 0 && (
                    <p className="text-xs text-muted-foreground">No tags added yet</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="published">Published</Label>
                <Switch
                  id="published"
                  checked={newPost.published}
                  onCheckedChange={handleTogglePublished}
                />
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-fitness-primary hover:bg-fitness-secondary"
              onClick={handleSavePost}
            >
              {editPost ? 'Update Post' : 'Publish Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageBlog;
