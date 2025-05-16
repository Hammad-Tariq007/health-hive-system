
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Sun, Moon } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/lib/utils';

interface HeaderProps {
  scrolled?: boolean;
}

const Header = ({ scrolled = false }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // This is just a placeholder for theme toggle functionality
    // In a real app, we would update the DOM class and store preference
    document.documentElement.classList.toggle('dark');
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-200",
        scrolled && "shadow-md"
      )}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-fitness-primary">
              <span className="absolute inset-0 flex items-center justify-center font-heading font-bold text-white">FF</span>
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              FitnessFreaks
            </span>
          </Link>
        </div>

        {!isMobile ? (
          <nav className="flex items-center gap-6">
            <NavLink to="/workouts">Workouts</NavLink>
            <NavLink to="/nutrition">Nutrition</NavLink>
            <NavLink to="/progress">Progress</NavLink>
            <NavLink to="/community">Community</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          
          <Link to="/login">
            <Button 
              variant="default" 
              size="sm" 
              className="hidden bg-fitness-primary hover:bg-fitness-secondary sm:flex"
            >
              Sign In
            </Button>
          </Link>

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-50 overflow-hidden bg-background/95 backdrop-blur-md border-b shadow-lg md:hidden"
          >
            <motion.nav 
              className="container py-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              <div className="grid grid-flow-row auto-rows-max gap-6 text-lg">
                <MobileNavLink to="/workouts">Workouts</MobileNavLink>
                <MobileNavLink to="/nutrition">Nutrition</MobileNavLink>
                <MobileNavLink to="/progress">Progress</MobileNavLink>
                <MobileNavLink to="/community">Community</MobileNavLink>
                <MobileNavLink to="/blog">Blog</MobileNavLink>
                <MobileNavLink to="/login">Sign In</MobileNavLink>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "relative text-sm font-medium transition-colors hover:text-fitness-primary",
        isActive ? "text-fitness-primary" : "text-foreground"
      )}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 w-full bg-fitness-primary"
          layoutId="underline"
        />
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <motion.div
      variants={{
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -10 }
      }}
    >
      <Link 
        to={to} 
        className={cn(
          "flex items-center px-2 py-1 font-medium transition-colors hover:text-fitness-primary",
          isActive ? "text-fitness-primary" : "text-foreground"
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default Header;
