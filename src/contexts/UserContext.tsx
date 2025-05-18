
import { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'admin';

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
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  isAdmin: () => boolean;
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
    createdAt: new Date('2023-05-01')
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
    createdAt: new Date('2023-06-15')
  }
];

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('fitnessUser');
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt)
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
      const foundUser = MOCK_USERS.find(u => 
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
      const existingUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      // In a real app, we would save this user to a database
      // Here we're just simulating successful registration
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        name,
        email,
        password,
        role: 'user' as UserRole,
        // Add default values for the required properties
        gender: '',
        age: 0,
        height: 0,
        weight: 0,
        createdAt: new Date()
      };
      
      MOCK_USERS.push(newUser);
      
      // Note: We don't automatically log in the user here
      // They will be redirected to login page
      
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
      
    } catch (error) {
      console.error('Update failed:', error);
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
        isAdmin 
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
