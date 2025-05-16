
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Share, ThumbsUp, Bookmark, Send, MessageCircle } from "lucide-react";

// Mock community data
const communityPosts = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      badge: "Elite"
    },
    content: "Just completed my first marathon! The training plan from FitnessFreaks was incredible. Any tips for recovery?",
    timestamp: "2 hours ago",
    likes: 42,
    comments: 12,
    tags: ["Running", "Achievement", "Training"],
    images: ["https://images.unsplash.com/photo-1594882645126-14020914d58d"]
  },
  {
    id: 2,
    user: {
      name: "Samantha Lee",
      avatar: "https://i.pravatar.cc/150?img=5",
      badge: "Coach"
    },
    content: "Here's the protein-packed meal prep I promised! Great for post-workout recovery and building lean muscle. Each container has about 30g of protein and is under 500 calories. Let me know if you want the recipe!",
    timestamp: "5 hours ago",
    likes: 89,
    comments: 24,
    tags: ["Nutrition", "MealPrep", "HealthyEating"],
    images: ["https://images.unsplash.com/photo-1547496502-affa22d38842"]
  },
  {
    id: 3,
    user: {
      name: "Marcus Wright",
      avatar: "https://i.pravatar.cc/150?img=3",
      badge: "Newbie"
    },
    content: "I'm starting my fitness journey today! Any advice for a complete beginner looking to build some muscle and lose 20 pounds?",
    timestamp: "Yesterday",
    likes: 124,
    comments: 56,
    tags: ["Beginner", "WeightLoss", "Motivation"],
    images: []
  },
  {
    id: 4,
    user: {
      name: "Jessica Chen",
      avatar: "https://i.pravatar.cc/150?img=9",
      badge: "Premium"
    },
    content: "Just hit my one-year milestone with FitnessFreaks! Here's my transformation. Down 40lbs and feeling stronger than ever. The community support here has been everything!",
    timestamp: "2 days ago",
    likes: 215,
    comments: 43,
    tags: ["Transformation", "Progress", "BeforeAndAfter"],
    images: [
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c",
      "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0"
    ]
  },
  {
    id: 5,
    user: {
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=12",
      badge: "Expert"
    },
    content: "Quick form check on my deadlift. Getting some lower back pain - am I setting up correctly? Any tips appreciated!",
    timestamp: "3 days ago",
    likes: 56,
    comments: 31,
    tags: ["FormCheck", "Deadlift", "Technique"],
    images: ["https://images.unsplash.com/photo-1599058917212-d750089bc07e"]
  }
];

const CommunityPage = () => {
  const [newPost, setNewPost] = useState("");
  const [activeFilter, setActiveFilter] = useState("trending");
  
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">Connect, share, and learn with fellow fitness enthusiasts</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Feed */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Create Post */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=7" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Dialog>
                  <DialogTrigger asChild>
                    <Input 
                      className="bg-muted cursor-pointer"
                      placeholder="Share your fitness journey or ask a question..."
                      readOnly
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Create a Post</DialogTitle>
                      <DialogDescription>
                        Share your fitness journey, achievements, or questions with the community.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://i.pravatar.cc/150?img=7" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-xs text-muted-foreground">Posting publicly</p>
                        </div>
                      </div>
                      <Textarea 
                        placeholder="What's on your fitness mind?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[120px]"
                      />
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                          Add Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          Add Video
                        </Button>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          Add Link
                        </Button>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={!newPost.trim()}>Post</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardFooter className="pt-0 border-t flex justify-between">
              <Button variant="ghost" size="sm" className="gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V15"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Video
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Link
              </Button>
            </CardFooter>
          </Card>
          
          {/* Feed Filters */}
          <div className="flex items-center justify-between">
            <Tabs defaultValue={activeFilter} onValueChange={setActiveFilter} className="w-[400px]">
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button variant="outline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filter
            </Button>
          </div>
          
          {/* Posts */}
          {communityPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{post.user.name}</p>
                        {post.user.badge && (
                          <Badge variant="outline" className="text-xs py-0 h-5">
                            {post.user.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1"/>
                      <circle cx="19" cy="12" r="1"/>
                      <circle cx="5" cy="12" r="1"/>
                    </svg>
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3 space-y-3">
                <p>{post.content}</p>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs py-0 h-5">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {post.images.length > 0 && (
                  <div className={`grid gap-2 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {post.images.map((img, index) => (
                      <div key={index} className="overflow-hidden rounded-md aspect-video">
                        <img 
                          src={img} 
                          alt={`Post by ${post.user.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-0 border-t">
                <div className="flex justify-between w-full">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          
          <div className="flex justify-center mt-6">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Community Stats */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold">Community Stats</h3>
            </CardHeader>
            <CardContent className="space-y-4 pb-3">
              <div className="flex items-center justify-between">
                <p className="text-sm">Active Members</p>
                <Badge variant="secondary">12.4K</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Posts Today</p>
                <Badge variant="secondary">482</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Your Posts</p>
                <Badge variant="secondary">3</Badge>
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t">
              <Button variant="ghost" size="sm" className="w-full">
                View Full Stats
              </Button>
            </CardFooter>
          </Card>
          
          {/* Popular Topics */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold">Popular Topics</h3>
            </CardHeader>
            <CardContent className="space-y-2 pb-3">
              <Button variant="outline" className="w-full justify-start">
                #WeightLoss
              </Button>
              <Button variant="outline" className="w-full justify-start">
                #StrengthTraining
              </Button>
              <Button variant="outline" className="w-full justify-start">
                #Nutrition
              </Button>
              <Button variant="outline" className="w-full justify-start">
                #Transformation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                #FormCheck
              </Button>
            </CardContent>
            <CardFooter className="pt-0 border-t">
              <Button variant="ghost" size="sm" className="w-full">
                View All Topics
              </Button>
            </CardFooter>
          </Card>
          
          {/* Community Chat */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold">Live Chat</h3>
            </CardHeader>
            <CardContent className="h-[300px] flex flex-col justify-between pb-0">
              <div className="space-y-4 overflow-auto h-[240px] pr-2">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                    <AvatarFallback>TJ</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-xs font-medium mb-1">Tom Johnson</p>
                    <p className="text-sm">Has anyone tried the new HIIT program?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=9" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-xs font-medium mb-1">Jessica Lee</p>
                    <p className="text-sm">Yes! It's intense but really effective. I'm on week 2 and already seeing results.</p>
                  </div>
                </div>
                <div className="flex items-start justify-end gap-3">
                  <div className="bg-primary/20 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                    <p className="text-sm">I'm interested too. How much time does it take per day?</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=7" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=9" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p className="text-xs font-medium mb-1">Jessica Lee</p>
                    <p className="text-sm">About 30-45 mins, depending on your fitness level. They have beginner modifications too!</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 py-3 border-t">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-10 right-10 z-10">
        <Button size="lg" className="h-14 w-14 rounded-full shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default CommunityPage;
