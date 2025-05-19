
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '@/api';

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
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
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
  loginWithGoogle: async () => {},
  loginWithFacebook: async () => {}
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('fitnessToken');
      
      if (token) {
        try {
          const response = await api.get('/auth/me');
          
          // Transform the response data to match our User interface
          const userData = response.data.user;
          
          setUser({
            id: userData._id || userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            subscriptionPlan: userData.subscriptionPlan,
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
        } catch (error) {
          localStorage.removeItem('fitnessToken');
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
      const response = await api.post('/auth/login', { email, password });
      
      const { token, ...userData } = response.data.user;
      
      localStorage.setItem('fitnessToken', token);
      
      setUser({
        ...userData,
        id: userData._id || userData.id,
        createdAt: new Date(userData.createdAt),
        subscriptionDate: userData.subscriptionDate ? new Date(userData.subscriptionDate) : undefined
      });
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/register', { name, email, password });
      
      const { token, ...userData } = response.data.user;
      
      localStorage.setItem('fitnessToken', token);
      
      setUser({
        ...userData,
        id: userData._id || userData.id,
        createdAt: new Date(userData.createdAt),
        subscriptionDate: userData.subscriptionDate ? new Date(userData.subscriptionDate) : undefined
      });
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for register
  const signup = register;

  const logout = () => {
    localStorage.removeItem('fitnessToken');
    setUser(null);
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
      
      // Add profile image if provided
      if (userData.profileImage && typeof userData.profileImage !== 'string') {
        formData.append('image', userData.profileImage);
      }
      
      const response = await api.put('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const updatedUserData = response.data.user;
      
      setUser(prev => prev ? {
        ...prev,
        ...updatedUserData,
        id: updatedUserData._id || updatedUserData.id || prev.id,
        createdAt: prev.createdAt
      } : null);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = async (plan: SubscriptionPlan) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call a backend API
      // to update the user's subscription plan
      if (user) {
        // For now, we'll just update the user state locally
        setUser({ 
          ...user, 
          subscriptionPlan: plan,
          subscriptionDate: new Date()
        });
      }
    } catch (error: any) {
      setError('Subscription update failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Social authentication methods
  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/auth/google');
      // This would typically redirect to Google OAuth
      
      // For now, we'll mock the response
      console.log('Google login attempted - implement OAuth flow');
      
      // In actual implementation, this would handle the OAuth redirect
      window.location.href = response.data.redirectUrl;
    } catch (error: any) {
      setError('Google login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithFacebook = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/auth/facebook');
      // This would typically redirect to Facebook OAuth
      
      // For now, we'll mock the response
      console.log('Facebook login attempted - implement OAuth flow');
      
      // In actual implementation, this would handle the OAuth redirect
      window.location.href = response.data.redirectUrl;
    } catch (error: any) {
      setError('Facebook login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
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
