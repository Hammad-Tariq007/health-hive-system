
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { toast } from '@/hooks/use-toast';

// Get API URL from environment variable, with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fitnessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      // Unauthorized - token expired or invalid
      localStorage.removeItem('fitnessToken');
      
      // Only redirect to login if not already there and not a social auth callback
      const currentPath = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const hasAuthToken = searchParams.has('token');
      
      if (currentPath !== '/login' && currentPath !== '/signup' && !hasAuthToken) {
        toast({
          title: "Session expired",
          description: "Please login again to continue.",
          variant: "destructive",
        });
        
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      // Forbidden - not authorized
      toast({
        title: "Access denied",
        description: "You don't have permission to access this resource.",
        variant: "destructive",
      });
    } else if (error.response?.status === 500) {
      // Server error
      toast({
        title: "Server error",
        description: "Something went wrong on the server. Please try again later.",
        variant: "destructive",
      });
    } else if (!error.response && error.code === 'ERR_NETWORK') {
      // Network error
      toast({
        title: "Network error",
        description: "Could not connect to the server. Please check your internet connection.",
        variant: "destructive",
      });
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  register: (userData: { name: string; email: string; password: string }) => 
    api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  
  getCurrentUser: () => api.get('/auth/me'),
  
  updateProfile: (profileData: FormData) => 
    api.put('/auth/profile', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  deleteAccount: () => api.delete('/auth/delete'),
  
  googleAuth: () => api.get('/auth/google'),
  
  facebookAuth: () => api.get('/auth/facebook'),

  // Handler for social auth callback
  handleSocialAuth: (token: string) => {
    localStorage.setItem('fitnessToken', token);
    return api.get('/auth/me');
  }
};

// User Management API (Admin)
export const userAPI = {
  getAllUsers: () => api.get('/users'),
  
  updateUserRole: (userId: string, role: 'user' | 'admin') => 
    api.put(`/users/${userId}/role`, { role }),
  
  deleteUser: (userId: string) => api.delete(`/users/${userId}`),
};

// Workout API
export const workoutAPI = {
  getAllWorkouts: (params?: { 
    category?: string; 
    difficulty?: string; 
    muscleGroup?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => api.get('/workouts', { params }),
  
  getWorkout: (id: string) => api.get(`/workouts/${id}`),
  
  createWorkout: (workoutData: FormData) => 
    api.post('/workouts', workoutData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  updateWorkout: (id: string, workoutData: FormData) => 
    api.put(`/workouts/${id}`, workoutData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  deleteWorkout: (id: string) => api.delete(`/workouts/${id}`),
};

// Nutrition API
export const nutritionAPI = {
  getAllNutritionPlans: (params?: { 
    dietType?: string; 
    goal?: string; 
    search?: string;
    page?: number;
    limit?: number;
  }) => api.get('/nutrition', { params }),
  
  getNutritionPlan: (id: string) => api.get(`/nutrition/${id}`),
  
  createNutritionPlan: (nutritionData: FormData) => 
    api.post('/nutrition', nutritionData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  updateNutritionPlan: (id: string, nutritionData: FormData) => 
    api.put(`/nutrition/${id}`, nutritionData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  deleteNutritionPlan: (id: string) => api.delete(`/nutrition/${id}`),
};

// Blog API
export const blogAPI = {
  getAllBlogs: (params?: { 
    category?: string; 
    tag?: string; 
    search?: string;
    published?: boolean;
    page?: number;
    limit?: number;
  }) => api.get('/blogs', { params }),
  
  getBlog: (id: string) => api.get(`/blogs/${id}`),
  
  createBlog: (blogData: FormData) => 
    api.post('/blogs', blogData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  updateBlog: (id: string, blogData: FormData) => 
    api.put(`/blogs/${id}`, blogData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  deleteBlog: (id: string) => api.delete(`/blogs/${id}`),
};

// Progress API
export const progressAPI = {
  getProgress: (params?: { startDate?: string; endDate?: string }) => 
    api.get('/progress', { params }),
  
  createProgress: (progressData: FormData) => 
    api.post('/progress', progressData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  updateProgress: (id: string, progressData: FormData) => 
    api.put(`/progress/${id}`, progressData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

// Community API
export const communityAPI = {
  getAllPosts: (params?: { 
    mediaType?: string; 
    tag?: string; 
    search?: string;
    page?: number;
    limit?: number;
  }) => api.get('/community', { params }),
  
  createPost: (postData: FormData) => 
    api.post('/community', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  likePost: (id: string) => api.post(`/community/${id}/like`),
  
  commentOnPost: (id: string, content: string) => 
    api.post(`/community/${id}/comment`, { content }),
  
  deletePost: (id: string) => api.delete(`/community/${id}`),
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (email: string, name?: string) => 
    api.post('/newsletter/subscribe', { email, name }),
  
  unsubscribe: (email: string) => 
    api.post('/newsletter/unsubscribe', { email }),
};

// Subscription API
export const subscriptionAPI = {
  createCheckoutSession: (checkoutData: { 
    plan: 'pro' | 'elite'; 
    paymentMethod: 'stripe' | 'paypal' | 'jazzcash' | 'easypaisa';
  }) => api.post('/subscribe', checkoutData),
  
  getSubscriptionStatus: () => api.get('/subscribe/status'),
  
  completePayment: (paymentData: { 
    paymentId: string; 
    transactionId: string;
  }) => api.post('/subscribe/complete', paymentData),
  
  cancelSubscription: () => api.post('/subscribe/cancel'),
};

export default api;
