
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Header = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
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
            <Link to="/workouts" className="text-sm font-medium transition-colors hover:text-fitness-primary">
              Workouts
            </Link>
            <Link to="/nutrition" className="text-sm font-medium transition-colors hover:text-fitness-primary">
              Nutrition
            </Link>
            <Link to="/progress" className="text-sm font-medium transition-colors hover:text-fitness-primary">
              Progress
            </Link>
            <Link to="/community" className="text-sm font-medium transition-colors hover:text-fitness-primary">
              Community
            </Link>
            <Link to="/blog" className="text-sm font-medium transition-colors hover:text-fitness-primary">
              Blog
            </Link>
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="default" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
          </Link>

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-background p-6 pb-32 animate-in slide-in-from-top-4 md:hidden",
          isOpen ? "block" : "hidden"
        )}
      >
        <nav className="grid grid-flow-row auto-rows-max gap-6 text-lg">
          <Link 
            to="/workouts" 
            className="flex items-center px-2 py-1 font-medium transition-colors hover:text-fitness-primary"
            onClick={toggleMenu}
          >
            Workouts
          </Link>
          <Link 
            to="/nutrition" 
            className="flex items-center px-2 py-1 font-medium transition-colors hover:text-fitness-primary"
            onClick={toggleMenu}
          >
            Nutrition
          </Link>
          <Link 
            to="/progress" 
            className="flex items-center px-2 py-1 font-medium transition-colors hover:text-fitness-primary"
            onClick={toggleMenu}
          >
            Progress
          </Link>
          <Link 
            to="/community" 
            className="flex items-center px-2 py-1 font-medium transition-colors hover:text-fitness-primary"
            onClick={toggleMenu}
          >
            Community
          </Link>
          <Link 
            to="/blog" 
            className="flex items-center px-2 py-1 font-medium transition-colors hover:text-fitness-primary"
            onClick={toggleMenu}
          >
            Blog
          </Link>
          <Link 
            to="/login" 
            className="flex items-center px-2 py-1 font-medium transition-colors hover:text-fitness-primary"
            onClick={toggleMenu}
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
