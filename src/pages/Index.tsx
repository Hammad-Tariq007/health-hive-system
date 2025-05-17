
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { workoutPlans } from "@/data/workouts";
import { blogPosts } from "@/data/blog";
import { motion, useScroll, useTransform, useInView, stagger, useAnimate } from "framer-motion";
import { ChevronRight, Check, ArrowRight } from "lucide-react";

const Index = () => {
  const featuredWorkouts = workoutPlans.slice(0, 3);
  const featuredPosts = blogPosts.slice(0, 3);
  
  // References for scroll animations
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Animation hooks
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });
  const heroInView = useInView(heroRef, { once: true });
  
  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, -50]);
  
  // Stats counter animation
  const [statsScope, animate] = useAnimate();
  
  useEffect(() => {
    if (statsInView) {
      const animateValue = (element: HTMLElement, start: number, end: number, duration: number) => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentValue = Math.floor(progress * (end - start) + start);
          element.textContent = currentValue.toLocaleString();
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      };
      
      document.querySelectorAll('[data-counter]').forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-counter') || "0", 10);
        animateValue(counter as HTMLElement, 0, target, 2000);
      });
      
      animate(
        ".stat-item",
        { opacity: 1, y: 0 },
        { duration: 0.4, delay: stagger(0.1) }
      );
    }
  }, [statsInView, animate]);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section - Full viewport */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-fitness-dark">
        {/* Parallax background */}
        <motion.div 
          style={{ y: heroImageY }} 
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark via-fitness-dark/90 to-fitness-dark/70 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30 scale-110" 
          />
        </motion.div>
        
        <div className="container relative z-10 px-4 md:px-6 mt-[-50px]">
          <motion.div 
            style={{ y: heroContentY }}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-white sm:text-5xl xl:text-8xl/none mb-6"
            >
              Transform Your <span className="text-gradient bg-gradient-to-r from-fitness-primary via-purple-400 to-fitness-secondary">Body</span> <br />
              Transform Your <span className="text-gradient bg-gradient-to-r from-fitness-secondary via-purple-400 to-fitness-primary">Life</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-[800px] mx-auto text-gray-300 md:text-xl mb-8"
            >
              Personalized workout plans, nutrition guides, and community support to help you reach your fitness goals—all on one powerful platform.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-fitness-primary to-fitness-secondary hover:from-fitness-primary/90 hover:to-fitness-secondary/90 text-white px-8 py-6">
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/workouts">
                <Button size="lg" variant="outline" className="border-2 border-fitness-primary text-fitness-primary hover:bg-fitness-primary/10 px-8 py-6">
                  Explore Workouts
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center space-x-6 mt-10 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-fitness-primary" />
                <span>Free 7-day trial</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-fitness-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-fitness-primary" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-gradient-to-b from-fitness-dark to-background py-20">
        <div className="container px-4 md:px-6">
          <motion.div 
            ref={statsScope}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            <motion.div className="stat-item flex flex-col items-center text-center opacity-0 translate-y-10">
              <span className="text-4xl md:text-5xl font-bold text-fitness-primary mb-2" data-counter="10000">0</span>
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">Active Members</span>
            </motion.div>
            <motion.div className="stat-item flex flex-col items-center text-center opacity-0 translate-y-10">
              <span className="text-4xl md:text-5xl font-bold text-fitness-primary mb-2" data-counter="500">0</span>
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">Workout Plans</span>
            </motion.div>
            <motion.div className="stat-item flex flex-col items-center text-center opacity-0 translate-y-10">
              <span className="text-4xl md:text-5xl font-bold text-fitness-primary mb-2" data-counter="300">0</span>
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">Nutrition Plans</span>
            </motion.div>
            <motion.div className="stat-item flex flex-col items-center text-center opacity-0 translate-y-10">
              <span className="text-4xl md:text-5xl font-bold text-fitness-primary mb-2" data-counter="25000">0</span>
              <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">Transformations</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why FitnessFreaks - 3-column value prop */}
      <section ref={featuresRef} className="bg-white dark:bg-black py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-2">
              Why FitnessFreaks
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-800 dark:text-white">
              The Science of Transformation
            </h2>
            <p className="max-w-[800px] md:text-xl/relaxed lg:text-xl/relaxed dark:text-gray-300">
              We combine expert coaching, personalized plans, and community support to help you achieve lasting results
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl hover:shadow-xl transition-all dark:hover:bg-gray-900/50"
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-fitness-primary/20 to-fitness-secondary/20 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-fitness-primary">
                  <path d="m18 20 4-4-4-4"></path>
                  <path d="m6 4-4 4 4 4"></path>
                  <path d="m14 4 4 4-4 4"></path>
                  <path d="m10 20-4-4 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold dark:text-white">Personalized Approach</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every plan is tailored to your specific goals, fitness level, and lifestyle preferences.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl hover:shadow-xl transition-all dark:hover:bg-gray-900/50"
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-fitness-primary/20 to-fitness-secondary/20 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-fitness-primary">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold dark:text-white">Scientific Methods</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our programs are designed by expert trainers and nutritionists based on proven research.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl hover:shadow-xl transition-all dark:hover:bg-gray-900/50"
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-fitness-primary/20 to-fitness-secondary/20 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-fitness-primary">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold dark:text-white">Supportive Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with like-minded individuals who will motivate and inspire your fitness journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials with avatars and star ratings */}
      <section ref={testimonialsRef} className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-2">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-800 dark:text-white">
              Transformations That Inspire
            </h2>
            <p className="max-w-[800px] md:text-xl/relaxed lg:text-xl/relaxed dark:text-gray-300">
              Real stories from our members who have achieved remarkable results
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
                achievement: "Lost 25 lbs in 6 months",
                testimonial: "FitnessFreaks changed my life completely. The workout plans were challenging but doable, and the community kept me motivated when I wanted to give up.",
                rating: 5
              },
              {
                name: "Michael Thomas",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
                achievement: "Gained 15 lbs of muscle",
                testimonial: "As someone who was always skinny, the muscle building programs and nutrition advice helped me gain the muscle I've always wanted. The results speak for themselves!",
                rating: 5
              },
              {
                name: "Jennifer Lee",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop",
                achievement: "Training for her first marathon",
                testimonial: "The progression tracking features keep me accountable and motivated. I've gone from barely running a mile to training for my first marathon. It's been incredible!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="glass dark:bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm"
              >
                <div className="flex flex-col h-full">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="flex-1 mb-6">
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "{testimonial.testimonial}"
                    </p>
                  </blockquote>
                  
                  <div className="flex items-center mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="rounded-full h-12 w-12 object-cover border-2 border-fitness-primary mr-4" 
                    />
                    <div>
                      <h4 className="font-semibold dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.achievement}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workouts - Scrollable Cards */}
      <section className="bg-white dark:bg-black py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-2">
                Featured Programs
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800 dark:text-white">
                Popular Workout Plans
              </h2>
              <p className="max-w-[600px] md:text-lg dark:text-gray-300">
                Discover our most popular workout plans designed by fitness experts
              </p>
            </div>
            <Link to="/workouts" className="mt-4 md:mt-0">
              <Button variant="outline" className="group">
                View All Programs
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-none">
            {workoutPlans.slice(0, 6).map((workout) => (
              <Card key={workout.id} className="min-w-[300px] md:min-w-[350px] overflow-hidden transition-all hover:shadow-lg snap-center">
                <div className="relative h-48">
                  <img src={workout.image} alt={workout.title} className="object-cover w-full h-full" />
                  <div className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-fitness-primary text-white rounded">
                    {workout.level}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1 dark:text-white">{workout.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{workout.duration} min • {workout.category}</p>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{workout.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <span>{workout.rating.toFixed(1)}</span>
                      <span className="text-gray-500 dark:text-gray-400">({workout.reviews})</span>
                    </div>
                    <Link to={`/workouts/${workout.id}`}>
                      <Button variant="ghost" size="sm" className="hover:text-fitness-primary transition-colors">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Preview Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-fitness-primary/10 text-fitness-primary text-sm font-medium mb-2">
                Latest Articles
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-800 dark:text-white">
                Fitness Knowledge & Insights
              </h2>
              <p className="max-w-[600px] md:text-lg dark:text-gray-300">
                Expert advice, tips, and success stories to inspire your fitness journey
              </p>
            </div>
            <Link to="/blog" className="mt-4 md:mt-0">
              <Button variant="outline" className="group">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video relative overflow-hidden group">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-2 right-2 px-3 py-1 text-xs font-medium bg-fitness-primary text-white rounded-full">
                    {post.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2 mb-3 dark:text-white">
                    <Link to={`/blog/${post.id}`} className="hover:text-fitness-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={post.author.image} alt={post.author.name} className="rounded-full h-9 w-9 object-cover" />
                      <div className="text-sm">
                        <p className="font-medium dark:text-white">{post.author.name}</p>
                        <p className="text-gray-500 dark:text-gray-400">{post.author.role}</p>
                      </div>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm" className="hover:text-fitness-primary transition-colors">Read More</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative overflow-hidden bg-fitness-dark py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
            alt="CTA Background" 
            className="w-full h-full object-cover opacity-20" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark via-fitness-dark/90 to-fitness-dark/70"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-8 text-center max-w-3xl mx-auto"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                Ready to Transform Your Body?
              </h2>
              <p className="text-xl text-gray-300">
                Join thousands of members who have already changed their lives with FitnessFreaks
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-fitness-primary to-fitness-secondary hover:from-fitness-primary/90 hover:to-fitness-secondary/90 text-white px-8 py-6">
                  Start Your Free Trial
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/workouts">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6">
                  Browse Workout Plans
                </Button>
              </Link>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-gray-400"
            >
              No credit card required. 7-day free trial. Cancel anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Partners/Brands Section */}
      <section className="bg-white dark:bg-black py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Trusted by</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-70">
            {["Nike", "Adidas", "Under Armour", "Asics", "Puma", "Reebok"].map((brand) => (
              <div key={brand} className="flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold dark:text-white">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

