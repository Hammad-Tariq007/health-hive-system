import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Sun, Moon } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  scrolled?: boolean;
}

const Header = ({ scrolled = false }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has dark mode preference stored
    const storedPreference = localStorage.getItem('darkMode');
    if (storedPreference !== null) {
      return storedPreference === 'true';
    }
    // Otherwise check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();

  // Apply dark mode on initial load and when toggled
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.header 
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md transition-all duration-200",
        scrolled && "shadow-md"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-fitness-primary to-fitness-secondary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="absolute inset-0 flex items-center justify-center font-heading font-bold text-white">FF</span>
            </motion.div>
            <span className="font-heading text-xl font-bold tracking-tight group-hover:text-fitness-primary transition-colors duration-200">
              FitnessFreaks
            </span>
          </Link>
        </div>

        {!isMobile ? (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/workouts">
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative">
                    Workouts
                    {location.pathname === '/workouts' && (
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-fitness-primary"
                        layoutId="navunderline"
                      />
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/nutrition">
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative">
                    Nutrition
                    {location.pathname === '/nutrition' && (
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-fitness-primary"
                        layoutId="navunderline"
                      />
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/progress">
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative">
                    Progress
                    {location.pathname === '/progress' && (
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-fitness-primary"
                        layoutId="navunderline"
                      />
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/community">
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative">
                    Community
                    {location.pathname === '/community' && (
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-fitness-primary"
                        layoutId="navunderline"
                      />
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/blog">
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 relative">
                    Blog
                    {location.pathname === '/blog' && (
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-fitness-primary"
                        layoutId="navunderline"
                      />
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : null}

        <div className="flex items-center gap-2">
          <motion.div 
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-full"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDarkMode ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
          
          <motion.div 
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-full"
          >
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/login">
              <Button 
                variant="default" 
                size="sm" 
                className="hidden bg-fitness-primary hover:bg-fitness-secondary sm:flex"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-16 z-50 overflow-hidden glass border-b border-border shadow-lg dark:border-white/10 md:hidden"
          >
            <motion.nav 
              className="container py-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07 } },
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
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

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
          "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
          isActive ? "bg-accent text-fitness-primary" : "text-foreground"
        )}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="mobilemenuunderline"
            className="ml-auto h-1 w-1 rounded-full bg-fitness-primary"
          />
        )}
      </Link>
    </motion.div>
  );
};

export default Header;
