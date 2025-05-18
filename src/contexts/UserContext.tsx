
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authAPI, subscriptionAPI } from "../api";
import { useToast } from "@/hooks/use-toast";

export type UserRole = "user" | "admin";
export type SubscriptionPlan = "free" | "pro" | "elite";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscriptionPlan: SubscriptionPlan;
  profileImage?: string;
  token?: string;
  createdAt: Date;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  isAdmin: () => boolean;
  checkSubscription: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem("fitnessUser");
    const storedToken = localStorage.getItem("fitnessToken");
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Convert string date to Date object
        if (parsedUser.createdAt) {
          parsedUser.createdAt = new Date(parsedUser.createdAt);
        } else {
          parsedUser.createdAt = new Date();
        }
        
        setUser({
          ...parsedUser,
          token: storedToken
        });
        
        // Verify the token with the backend
        authAPI.getCurrentUser()
          .then(() => {
            // Token is valid, check subscription status
            checkSubscription();
          })
          .catch((error) => {
            console.error("Token validation failed:", error);
            // If token is invalid, log the user out
            logout();
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("fitnessUser");
        localStorage.removeItem("fitnessToken");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authAPI.login({ email, password });
      const { user, token } = response.data.user;
      
      // Format the user object
      const formattedUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        profileImage: user.profileImage,
        token: token,
        createdAt: new Date(user.createdAt)
      };
      
      // Store user data
      localStorage.setItem("fitnessUser", JSON.stringify(formattedUser));
      localStorage.setItem("fitnessToken", token);
      
      setUser(formattedUser);
      
      // Check subscription status
      await checkSubscription();
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${formattedUser.name}!`,
      });
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authAPI.register({ name, email, password });
      const { user, token } = response.data.user;
      
      // Format the user object
      const formattedUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscriptionPlan: user.subscriptionPlan,
        profileImage: user.profileImage,
        token: token,
        createdAt: new Date(user.createdAt)
      };
      
      // Store user data
      localStorage.setItem("fitnessUser", JSON.stringify(formattedUser));
      localStorage.setItem("fitnessToken", token);
      
      setUser(formattedUser);
      
      toast({
        title: "Registration Successful",
        description: `Welcome to Fitness Platform, ${formattedUser.name}!`,
      });
      
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast({
        title: "Registration Failed",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem("fitnessUser");
    localStorage.removeItem("fitnessToken");
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };
  
  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem("fitnessUser", JSON.stringify(newUser));
      
      // If token is updated, store it separately
      if (updatedUser.token) {
        localStorage.setItem("fitnessToken", updatedUser.token);
      }
    }
  };
  
  const isAdmin = () => {
    return user?.role === "admin";
  };
  
  const checkSubscription = async (): Promise<void> => {
    if (!user) return;
    
    try {
      const response = await subscriptionAPI.getSubscriptionStatus();
      const { subscribed, plan } = response.data;
      
      // Update user's subscription plan if it changed
      if (user.subscriptionPlan !== plan) {
        updateUser({ subscriptionPlan: plan as SubscriptionPlan });
        
        // Show toast if subscription was upgraded
        if (plan !== 'free' && user.subscriptionPlan === 'free') {
          toast({
            title: "Subscription Activated",
            description: `You are now on the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`,
          });
        } 
        // Show toast if subscription was downgraded
        else if (plan === 'free' && user.subscriptionPlan !== 'free') {
          toast({
            title: "Subscription Ended",
            description: "Your subscription has expired or been cancelled.",
          });
        }
      }
    } catch (error) {
      console.error("Failed to check subscription status:", error);
    }
  };
  
  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
        isAdmin,
        checkSubscription
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
