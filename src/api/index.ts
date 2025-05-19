
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with baseURL
const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Add a request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fitnessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // If the error is a timeout or network issue
    if (error.code === 'ECONNABORTED' || !error.response) {
      return Promise.reject({
        response: {
          data: {
            success: false,
            message: 'Network error. Please check your internet connection.'
          }
        }
      });
    }
    
    // If the server returns no data or malformed data
    if (!error.response.data) {
      return Promise.reject({
        response: {
          data: {
            success: false,
            message: 'Server error. Please try again later.'
          }
        }
      });
    }
    
    // If token is expired or invalid (401 Unauthorized)
    if (error.response.status === 401) {
      localStorage.removeItem('fitnessToken');
    }
    
    return Promise.reject(error);
  }
);

// User API
export const userAPI = {
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData: FormData) => api.put('/auth/profile', userData),
  deleteAccount: () => api.delete('/auth/delete'),
};

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) => api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string }) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('fitnessToken');
    return Promise.resolve();
  },
};

// Workout API
export const workoutAPI = {
  getAllWorkouts: () => api.get('/workouts'),
  getWorkout: (id: string) => api.get(`/workouts/${id}`),
  createWorkout: (workoutData: FormData) => api.post('/workouts', workoutData),
  updateWorkout: (id: string, workoutData: FormData) => api.put(`/workouts/${id}`, workoutData),
  deleteWorkout: (id: string) => api.delete(`/workouts/${id}`),
};

// Nutrition API
export const nutritionAPI = {
  getAllNutritionPlans: () => api.get('/nutrition'),
  getNutritionPlan: (id: string) => api.get(`/nutrition/${id}`),
  createNutritionPlan: (nutritionData: FormData) => api.post('/nutrition', nutritionData),
  updateNutritionPlan: (id: string, nutritionData: FormData) => api.put(`/nutrition/${id}`, nutritionData),
  deleteNutritionPlan: (id: string) => api.delete(`/nutrition/${id}`),
};

// Progress API
export const progressAPI = {
  getUserProgress: () => api.get('/progress'),
  createProgress: (progressData: FormData) => api.post('/progress', progressData),
  updateProgress: (id: string, progressData: FormData) => api.put(`/progress/${id}`, progressData),
};

// Blog API
export const blogAPI = {
  getAllPosts: () => api.get('/blogs'),
  getPost: (id: string) => api.get(`/blogs/${id}`),
  createPost: (postData: FormData) => api.post('/blogs', postData),
  updatePost: (id: string, postData: FormData) => api.put(`/blogs/${id}`, postData),
  deletePost: (id: string) => api.delete(`/blogs/${id}`),
};

// Community API
export const communityAPI = {
  getPosts: () => api.get('/community'),
  getPost: (id: string) => api.get(`/community/${id}`),
  createPost: (postData: FormData) => api.post('/community', postData),
  updatePost: (id: string, postData: FormData) => api.put(`/community/${id}`, postData),
  deletePost: (id: string) => api.delete(`/community/${id}`),
  likePost: (id: string) => api.post(`/community/${id}/like`),
  commentPost: (id: string, comment: string) => api.post(`/community/${id}/comments`, { text: comment }),
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (email: string) => api.post('/newsletter/subscribe', { email }),
};

// Subscription API
export const subscriptionAPI = {
  getPlans: () => api.get('/subscribe/plans'),
  subscribe: (planId: string) => api.post(`/subscribe/${planId}`),
  getCurrentPlan: () => api.get('/subscribe/current'),
};

// Admin API
export const adminAPI = {
  getUsers: () => api.get('/users'),
  updateUserRole: (id: string, role: string) => api.put(`/users/${id}/role`, { role }),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
};

export default api;
