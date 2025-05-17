import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { workoutPlans } from "@/data/workouts";
import { blogPosts } from "@/data/blog";
const Index = () => {
  // Take only the first 3 workout plans and blog posts for the homepage
  const featuredWorkouts = workoutPlans.slice(0, 3);
  const featuredPosts = blogPosts.slice(0, 3);
  return <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-fitness-dark py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop" alt="Hero Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark via-fitness-dark/90 to-fitness-dark/70"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none animate-fade-in">
                  Transform Your Body, <span className="text-fitness-primary">Transform Your Life</span>
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Personalized workout plans, nutrition guides, and community support to help you reach your fitness goals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/signup">
                  <Button size="lg" className="bg-fitness-primary hover:bg-fitness-secondary">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/workouts">
                  <Button size="lg" variant="outline" className="border-fitness-primary text-fitness-primary hover:bg-fitness-primary/10">
                    Explore Workouts
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4 text-fitness-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Free 7-day trial</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4 text-fitness-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="glass p-4 rounded-xl w-full max-w-md">
                <div className="grid gap-4 text-center">
                  <div className="space-y-2">
                    <h2 className="font-bold text-[v] text-violet-500">Join 10,000+ fitness enthusiasts</h2>
                    <p className="text-gray-300">Sign up today and get access to all our features</p>
                  </div>
                  <form className="space-y-3">
                    <div className="grid gap-2">
                      <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter your email" type="email" />
                    </div>
                    <Button type="submit" className="w-full bg-fitness-primary hover:bg-fitness-secondary">
                      Get Started
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800">Everything You Need For Your Fitness Journey</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-800">
                FitnessFreaks provides all the tools and resources you need to transform your body and mind
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-accent">
              <div className="p-3 rounded-full bg-fitness-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-fitness-primary">
                  <path d="m18 20 4-4-4-4"></path>
                  <path d="m6 4-4 4 4 4"></path>
                  <path d="m14 4 4 4-4 4"></path>
                  <path d="m10 20-4-4 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Workout Plans</h3>
              <p className="text-gray-500 text-center">
                Access hundreds of professionally designed workout plans for every level and goal
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-accent">
              <div className="p-3 rounded-full bg-fitness-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-fitness-primary">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Nutrition Plans</h3>
              <p className="text-gray-500 text-center">
                Custom meal plans designed to support your fitness goals and dietary preferences
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-accent">
              <div className="p-3 rounded-full bg-fitness-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-fitness-primary">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M9 9h6v6H9z"></path>
                  <path d="M6 9h.01"></path>
                  <path d="M6 12h.01"></path>
                  <path d="M6 15h.01"></path>
                  <path d="M12 6h.01"></path>
                  <path d="M15 6h.01"></path>
                  <path d="M18 6h.01"></path>
                  <path d="M18 9h.01"></path>
                  <path d="M18 12h.01"></path>
                  <path d="M18 15h.01"></path>
                  <path d="M12 18h.01"></path>
                  <path d="M15 18h.01"></path>
                  <path d="M18 18h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="text-gray-500 text-center">
                Visual dashboards to track your progress and stay motivated on your fitness journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workouts */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Popular Workout Plans</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our most popular workout plans designed by fitness experts
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorkouts.map(workout => <Card key={workout.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-48">
                  <img src={workout.image} alt={workout.title} className="object-cover w-full h-full" />
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-fitness-primary text-white rounded">
                    {workout.level}
                  </div>
                </div>
                <CardHeader>
                  <h3 className="text-xl font-bold">{workout.title}</h3>
                  <p className="text-sm text-gray-500">{workout.duration} min • {workout.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2">{workout.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-500 fill-yellow-500">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>{workout.rating.toFixed(1)}</span>
                    <span className="text-gray-500">({workout.reviews})</span>
                  </div>
                  <Link to={`/workouts/${workout.id}`}>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>)}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/workouts">
              <Button variant="outline">View All Workouts</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our community about their transformation stories and experiences
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col p-6 space-y-4 bg-accent rounded-lg">
              <div className="flex items-center space-x-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop" alt="User" className="rounded-full h-12 w-12 object-cover" />
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Lost 25 lbs in 6 months</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "FitnessFreaks changed my life completely. The workout plans were challenging but doable, and the community kept me motivated when I wanted to give up."
              </p>
            </div>
            <div className="flex flex-col p-6 space-y-4 bg-accent rounded-lg">
              <div className="flex items-center space-x-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop" alt="User" className="rounded-full h-12 w-12 object-cover" />
                <div>
                  <h4 className="font-medium">Michael Thomas</h4>
                  <p className="text-sm text-gray-500">Gained 15 lbs of muscle</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "As someone who was always skinny, the muscle building programs and nutrition advice helped me gain the muscle I've always wanted. The results speak for themselves!"
              </p>
            </div>
            <div className="flex flex-col p-6 space-y-4 bg-accent rounded-lg">
              <div className="flex items-center space-x-4">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop" alt="User" className="rounded-full h-12 w-12 object-cover" />
                <div>
                  <h4 className="font-medium">Jennifer Lee</h4>
                  <p className="text-sm text-gray-500">Training for her first marathon</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "The progression tracking features keep me accountable and motivated. I've gone from barely running a mile to training for my first marathon. It's been incredible!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Latest From Our Blog</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Expert advice, tips, and success stories to inspire your fitness journey
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map(post => <Card key={post.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video relative">
                  <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-fitness-primary text-white rounded">
                    {post.category}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</time>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center space-x-4">
                    <img src={post.author.image} alt={post.author.name} className="rounded-full h-8 w-8 object-cover" />
                    <div className="text-sm">
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-gray-500">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm">Read More</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>)}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/blog">
              <Button variant="outline">View All Articles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-fitness-dark py-16">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" alt="CTA Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark via-fitness-dark/90 to-fitness-dark/70"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">Ready to Transform Your Body?</h2>
              <p className="text-xl text-gray-300">
                Join thousands of members who have already changed their lives with FitnessFreaks
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-fitness-primary hover:bg-fitness-secondary">
                  Start Your Free Trial
                </Button>
              </Link>
              <Link to="/workouts">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Workout Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;