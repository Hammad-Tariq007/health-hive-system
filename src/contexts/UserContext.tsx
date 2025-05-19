
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from '@/api';
import { toast } from '@/hooks/use-toast';

export type UserRole = 'user' | 'admin';
export type SubscriptionPlan = 'free' | 'pro' | 'elite';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subscriptionPlan: SubscriptionPlan;
  profileImage?: string;
  bio?: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  fitnessGoal?: string;
  token?: string;
  createdAt: Date;
  subscriptionDate?: Date;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>; // Alias for register
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  updateSubscription: (plan: SubscriptionPlan) => Promise<void>;
  isAdmin: () => boolean;
  loginWithGoogle: () => void;
  loginWithFacebook: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  signup: async () => {},
  logout: () => {},
  updateUser: async () => {},
  updateSubscription: async () => {},
  isAdmin: () => false,
  loginWithGoogle: () => {},
  loginWithFacebook: () => {}
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for token in URL params (for OAuth callbacks)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      localStorage.setItem('fitnessToken', token);
      // Remove token from URL to prevent issues on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('fitnessToken');
      
      if (token) {
        try {
          // Set auth header for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const response = await axios.get('/auth/me');
          
          if (response.data.success) {
            // Transform the response data to match our User interface
            const userData = response.data.user;
            
            setUser({
              id: userData.id || userData._id,
              name: userData.name,
              email: userData.email,
              role: userData.role as UserRole,
              subscriptionPlan: userData.subscriptionPlan as SubscriptionPlan,
              profileImage: userData.profileImage,
              bio: userData.bio,
              gender: userData.gender,
              age: userData.age,
              height: userData.height,
              weight: userData.weight,
              fitnessGoal: userData.fitnessGoal,
              createdAt: new Date(userData.createdAt),
              subscriptionDate: userData.subscriptionDate ? new Date(userData.subscriptionDate) : undefined
            });
          } else {
            // If the request was successful but user data wasn't returned correctly
            localStorage.removeItem('fitnessToken');
          }
        } catch (error) {
          console.error("Failed to fetch current user:", error);
          localStorage.removeItem('fitnessToken');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      
      setIsLoading(false);
    };
    
    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { token, ...userData } = response.data.user;
        
        localStorage.setItem('fitnessToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser({
          ...userData,
          id: userData.id || userData._id,
          createdAt: new Date(userData.createdAt),
          subscriptionDate: userData.subscriptionDate ? new Date(userData.subscriptionDate) : undefined
        });
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.name}!`,
        });
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/auth/register', { name, email, password });
      
      if (response.data.success) {
        const { token, ...userData } = response.data.user;
        
        localStorage.setItem('fitnessToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setUser({
          ...userData,
          id: userData.id || userData._id,
          createdAt: new Date(userData.createdAt),
          subscriptionDate: userData.subscriptionDate ? new Date(userData.subscriptionDate) : undefined
        });
        
        toast({
          title: "Registration successful",
          description: `Welcome to FitnessFreaks, ${userData.name}!`,
        });
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for register
  const signup = register;

  const logout = () => {
    localStorage.removeItem('fitnessToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    window.location.href = '/';
  };

  const updateUser = async (userData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      // Add text fields to formData
      Object.entries(userData).forEach(([key, value]) => {
        if (key !== 'profileImage' && value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      
      // Add profile image if provided as a File
      if (userData.profileImage && typeof userData.profileImage !== 'string') {
        formData.append('image', userData.profileImage);
      }
      
      const response = await axios.put('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        const updatedUserData = response.data.user;
        
        setUser(prev => prev ? {
          ...prev,
          ...updatedUserData,
          id: updatedUserData.id || updatedUserData._id || prev.id,
          createdAt: prev.createdAt
        } : null);
        
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated."
        });
      } else {
        throw new Error(response.data.message || "Profile update failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Profile update failed. Please try again.";
      setError(errorMessage);
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = async (plan: SubscriptionPlan) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Here you would normally make an API call to update the subscription
      // But for now we'll just update the local state
      if (user) {
        setUser({ 
          ...user, 
          subscriptionPlan: plan,
          subscriptionDate: new Date()
        });
        
        toast({
          title: "Subscription updated",
          description: `Your subscription has been updated to ${plan.toUpperCase()}.`
        });
      }
    } catch (error: any) {
      setError('Subscription update failed');
      toast({
        title: "Subscription update failed",
        description: "There was an error updating your subscription. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Social authentication methods
  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google`;
  };

  const loginWithFacebook = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/facebook`;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        signup,
        logout,
        updateUser,
        updateSubscription,
        isAdmin,
        loginWithGoogle,
        loginWithFacebook
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
