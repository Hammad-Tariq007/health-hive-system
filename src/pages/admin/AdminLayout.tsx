
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Users, Dumbbell, FileText, Apple, Settings, ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="flex min-h-screen bg-muted/30 dark:bg-muted/10">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-background p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-full bg-fitness-primary flex items-center justify-center">
            <span className="font-bold text-white">FF</span>
          </div>
          <span className="font-bold text-xl">Admin Panel</span>
        </div>
        
        <nav className="space-y-1">
          <NavLink to="/admin" icon={<Home className="h-4 w-4" />} currentPath={location.pathname}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" icon={<Users className="h-4 w-4" />} currentPath={location.pathname}>
            Users
          </NavLink>
          <NavLink to="/admin/workouts" icon={<Dumbbell className="h-4 w-4" />} currentPath={location.pathname}>
            Workouts
          </NavLink>
          <NavLink to="/admin/nutrition" icon={<Apple className="h-4 w-4" />} currentPath={location.pathname}>
            Nutrition
          </NavLink>
          <NavLink to="/admin/blog" icon={<FileText className="h-4 w-4" />} currentPath={location.pathname}>
            Blog
          </NavLink>
        </nav>
        
        <div className="mt-auto">
          <Separator className="my-4" />
          <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1634&auto=format&fit=crop" />
              <AvatarFallback>{user?.name?.substring(0, 2) || 'AD'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link to="/" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                Exit
              </Button>
            </Link>
            <Link to="/edit-profile" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="h-3.5 w-3.5 mr-1" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden flex flex-col w-full">
        <header className="flex items-center justify-between border-b p-4 bg-background">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button size="icon" variant="ghost">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1634&auto=format&fit=crop" />
              <AvatarFallback>{user?.name?.substring(0, 2) || 'AD'}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        {/* Mobile navigation */}
        <div className="p-4 flex gap-2 overflow-auto border-b scrollbar-none">
          <MobileNavLink to="/admin" currentPath={location.pathname}>
            Dashboard
          </MobileNavLink>
          <MobileNavLink to="/admin/users" currentPath={location.pathname}>
            Users
          </MobileNavLink>
          <MobileNavLink to="/admin/workouts" currentPath={location.pathname}>
            Workouts
          </MobileNavLink>
          <MobileNavLink to="/admin/nutrition" currentPath={location.pathname}>
            Nutrition
          </MobileNavLink>
          <MobileNavLink to="/admin/blog" currentPath={location.pathname}>
            Blog
          </MobileNavLink>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon?: React.ReactNode;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink = ({ to, icon, currentPath, children }: NavLinkProps) => {
  const isActive = currentPath === to || (to !== "/admin" && currentPath.startsWith(to));
  
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start",
          isActive && "bg-accent"
        )}
      >
        {icon}
        <span className="ml-2">{children}</span>
        {isActive && (
          <ChevronRight className="ml-auto h-4 w-4" />
        )}
      </Button>
    </Link>
  );
};

const MobileNavLink = ({ to, currentPath, children }: NavLinkProps) => {
  const isActive = currentPath === to || (to !== "/admin" && currentPath.startsWith(to));
  
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "whitespace-nowrap",
          isActive && "bg-accent"
        )}
      >
        {children}
      </Button>
    </Link>
  );
};

export default AdminLayout;
