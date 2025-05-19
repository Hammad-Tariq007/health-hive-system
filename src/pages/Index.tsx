
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import Newsletter from "@/components/ui/custom/Newsletter";

// Import logos for brands
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const FeaturedWorkout = ({ title, image, category, duration }: { title: string; image: string; category: string; duration: string }) => (
  <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
    <Link to="/workouts">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-fitness-primary/80 px-2 py-1">{category}</span>
          <span className="rounded-full bg-gray-800/80 px-2 py-1">{duration}</span>
        </div>
        <h3 className="mt-2 text-lg font-bold">{title}</h3>
      </div>
    </Link>
  </div>
);

const TestimonialCard = ({ name, role, testimonial, image }: { name: string; role: string; testimonial: string; image: string }) => (
  <motion.div
    className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 overflow-hidden rounded-full">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div>
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
    <div className="mt-4">
      <p className="italic text-gray-600 dark:text-gray-300">{testimonial}</p>
    </div>
  </motion.div>
);

const Index = () => {
  const { user } = useUser();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 py-16 md:py-32">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-fitness-primary/10 px-3 py-1 text-sm font-medium text-fitness-primary">
                Welcome to FitnessFreaks
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Transform Your Body, <br />
                <span className="text-fitness-primary">Transform Your Life</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-lg">
                Join our community of fitness enthusiasts and begin your journey
                to a healthier, stronger you. Access personalized workouts and
                nutrition plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {user ? (
                  <>
                    <Link to="/workouts">
                      <Button
                        className="text-md px-8 py-2 h-12 bg-fitness-primary hover:bg-fitness-secondary"
                        size="lg"
                      >
                        Start Training
                      </Button>
                    </Link>
                    <Link to="/profile">
                      <Button variant="outline" className="text-md px-8 py-2 h-12" size="lg">
                        View Profile
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button
                        className="text-md px-8 py-2 h-12 bg-fitness-primary hover:bg-fitness-secondary"
                        size="lg"
                      >
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="text-md px-8 py-2 h-12" size="lg">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-0.5">
                  <span className="text-yellow-500">★★★★★</span>
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  Trusted by over 10,000 fitness enthusiasts
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Hero"
                className="rounded-xl shadow-xl transform translate-y-4 hover:translate-y-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workouts */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              Featured Workouts
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Discover popular workout routines designed by professional fitness
              trainers to help you achieve your goals.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeaturedWorkout
              title="Full Body HIIT"
              image="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
              category="HIIT"
              duration="30 min"
            />
            <FeaturedWorkout
              title="Core Strength"
              image="https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80"
              category="Strength"
              duration="45 min"
            />
            <FeaturedWorkout
              title="Yoga Flow"
              image="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              category="Yoga"
              duration="60 min"
            />
          </div>
          <div className="mt-10 text-center">
            <Link to="/workouts">
              <Button className="bg-fitness-primary hover:bg-fitness-secondary">
                View All Workouts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              Why Choose FitnessFreaks
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              We offer features designed to enhance your fitness journey and
              help you achieve your goals.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <motion.div
              className="flex flex-col items-center text-center space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fitness-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-fitness-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Personalized Workouts</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Access workout plans tailored to your fitness level, goals, and
                available equipment.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fitness-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-fitness-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Nutrition Guidance</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get meal plans and nutritional advice to complement your
                workouts and maximize results.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center text-center space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fitness-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-fitness-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Community Support</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Connect with like-minded individuals, share your journey, and
                stay motivated together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              What Our Community Says
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Read testimonials from members who have achieved their fitness
              goals with FitnessFreaks.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Sarah Johnson"
              role="Premium Member"
              testimonial="FitnessFreaks helped me lose 20 pounds in 3 months with their personalized workout plans. The community support kept me motivated throughout my journey."
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            />
            <TestimonialCard
              name="Michael Chen"
              role="Elite Member"
              testimonial="As a busy professional, I never had time for the gym. FitnessFreaks home workouts are efficient and effective. I've gained muscle and improved my overall health."
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            />
            <TestimonialCard
              name="Priya Patel"
              role="Pro Member"
              testimonial="The nutrition plans are game-changing! I've learned how to eat better while still enjoying my favorite foods. My energy levels have never been higher."
              image="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80"
            />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-10">
        <div className="container px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-700 dark:text-gray-300">
            Trusted by Fitness Enthusiasts Worldwide
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <a href="https://www.nike.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" className="h-8" />
              </div>
            </a>
            <a href="https://www.adidas.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" alt="Adidas" className="h-8" />
              </div>
            </a>
            <a href="https://www.underarmour.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg" alt="Under Armour" className="h-8" />
              </div>
            </a>
            <a href="https://www.puma.com" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_logo.svg" alt="Puma" className="h-8" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container px-4">
          <Newsletter />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-fitness-primary">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="mb-8 max-w-2xl text-lg text-white/90">
              Join FitnessFreaks today and get access to personalized workout
              plans, nutrition guidance, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="bg-white text-fitness-primary hover:bg-gray-100 min-w-[150px]">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/workouts">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 min-w-[150px]">
                  Browse Workouts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">FitnessFreaks</h3>
              <p className="text-gray-400">
                Your personal fitness companion on the journey to a healthier life.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin />
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/workouts" className="text-gray-400 hover:text-white transition-colors">Workouts</Link></li>
                <li><Link to="/nutrition" className="text-gray-400 hover:text-white transition-colors">Nutrition</Link></li>
                <li><Link to="/community" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-4 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FitnessFreaks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
