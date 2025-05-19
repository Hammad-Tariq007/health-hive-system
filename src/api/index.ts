
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

// Get API URL from environment variable, with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
    if (error.response?.status === 401) {
      // Unauthorized - token expired or invalid
      localStorage.removeItem('fitnessToken');
      localStorage.removeItem('fitnessUser');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
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
  subscribe: (email: string) => api.post('/newsletter/subscribe', { email }),
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

// Chat API
export const chatAPI = {
  getMessages: () => api.get('/chat/messages'),
  
  sendMessage: (content: string) => api.post('/chat/message', { content }),
  
  getChatRooms: () => api.get('/chat/rooms'),
};

export default api;
