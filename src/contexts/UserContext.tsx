
import { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'admin';
export type SubscriptionPlan = 'free' | 'pro' | 'elite';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  createdAt: Date;
  subscriptionPlan?: SubscriptionPlan;
  subscriptionDate?: Date;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  isAdmin: () => boolean;
  updateSubscription: (plan: SubscriptionPlan) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    gender: 'female',
    age: 28,
    height: 165,
    weight: 58,
    createdAt: new Date('2023-05-01'),
    subscriptionPlan: 'pro' as SubscriptionPlan
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'user@example.com',
    password: 'user123',
    role: 'user' as UserRole,
    gender: 'male',
    age: 32,
    height: 180,
    weight: 75,
    createdAt: new Date('2023-06-15'),
    subscriptionPlan: 'free' as SubscriptionPlan
  },
  // Add the special admin@gmail.com account as requested
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'admin@123',
    role: 'admin' as UserRole,
    gender: 'other',
    age: 35,
    height: 175,
    weight: 70,
    createdAt: new Date('2023-01-01'),
    subscriptionPlan: 'elite' as SubscriptionPlan
  }
];

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<typeof MOCK_USERS[0]>>(
    // Load users from localStorage if available, otherwise use the mock data
    JSON.parse(localStorage.getItem('fitnessUsers') || JSON.stringify(MOCK_USERS))
  );

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fitnessUsers', JSON.stringify(users));
  }, [users]);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('fitnessUser');
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt),
          subscriptionDate: parsedUser.subscriptionDate ? new Date(parsedUser.subscriptionDate) : undefined
        });
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('fitnessUser');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching credentials
      const foundUser = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Remove password before storing user data
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('fitnessUser', JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user with this email already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser = {
        id: `${users.length + 1}`,
        name,
        email,
        password,
        role: 'user' as UserRole,
        gender: '',
        age: 0,
        height: 0,
        weight: 0,
        createdAt: new Date(),
        subscriptionPlan: 'free' as SubscriptionPlan
      };
      
      // Update users array and localStorage
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('fitnessUsers', JSON.stringify(updatedUsers));
      
      // Note: We don't automatically log in the user here
      
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitnessUser');
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the user data
      const updatedUser = { ...user, ...userData };
      
      // Update in state and localStorage
      setUser(updatedUser);
      localStorage.setItem('fitnessUser', JSON.stringify(updatedUser));
      
      // Also update in the users array
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, ...userData, password: u.password } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem('fitnessUsers', JSON.stringify(updatedUsers));
      
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = async (plan: SubscriptionPlan): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const subscriptionData = {
        subscriptionPlan: plan,
        subscriptionDate: new Date()
      };
      
      // Update the user data
      const updatedUser = { ...user, ...subscriptionData };
      
      // Update in state and localStorage
      setUser(updatedUser);
      localStorage.setItem('fitnessUser', JSON.stringify(updatedUser));
      
      // Also update in the users array
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, ...subscriptionData, password: u.password } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem('fitnessUsers', JSON.stringify(updatedUsers));
      
    } catch (error) {
      console.error('Subscription update failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
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
        updateSubscription
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};
