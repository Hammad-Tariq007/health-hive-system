
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Send, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState("");

  // Show back to top button when scrolled down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-2xl bg-gradient-to-r from-fitness-primary/10 to-fitness-secondary/10 p-8 md:p-10"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="max-w-lg">
              <h3 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">Join our newsletter</h3>
              <p className="text-muted-foreground dark:text-gray-300">Get the latest fitness tips, workout plans, and promotions delivered to your inbox.</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex w-full gap-2" onSubmit={handleSubscribe}>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full md:w-auto" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="default" className="bg-fitness-primary hover:bg-fitness-secondary flex-shrink-0">
                  <Send className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2"
          >
            <Link to="/" className="mb-6 flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-fitness-primary to-fitness-secondary">
                <span className="absolute inset-0 flex items-center justify-center font-heading font-bold text-white">FF</span>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                FitnessFreaks
              </span>
            </Link>
            <p className="mb-6 max-w-xs text-sm text-muted-foreground dark:text-gray-300">
              Your ultimate destination for personalized fitness, expert guidance, and a supportive community to help you achieve your health and fitness goals.
            </p>
            <div className="flex gap-4">
              <motion.a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-fitness-primary/20 hover:text-fitness-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-fitness-primary/20 hover:text-fitness-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-fitness-primary/20 hover:text-fitness-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://youtube.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-fitness-primary/20 hover:text-fitness-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">YouTube</span>
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-base font-bold dark:text-white">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/workouts" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Workout Library
                </Link>
              </li>
              <li>
                <Link to="/nutrition" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Nutrition Guides
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Fitness Blog
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Progress Tracking
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-base font-bold dark:text-white">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Partners
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-base font-bold dark:text-white">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="text-muted-foreground transition-colors hover:text-fitness-primary">
                  GDPR
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="mb-4 text-center text-xs text-muted-foreground dark:text-gray-400 md:mb-0">
            © {currentYear} FitnessFreaks. All rights reserved. Crafted with ♥ for fitness enthusiasts.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground dark:text-gray-400">
            <Link to="/privacy" className="hover:text-fitness-primary">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-fitness-primary">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-fitness-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button 
              onClick={scrollToTop}
              size="icon" 
              className="rounded-full shadow-lg bg-fitness-primary hover:bg-fitness-secondary h-12 w-12"
            >
              <ArrowUp className="h-6 w-6" />
              <span className="sr-only">Back to top</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
