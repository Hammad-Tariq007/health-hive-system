
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading, isAdmin } = useUser();

  // If still checking the auth status, show loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-fitness-primary border-t-transparent"></div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin, redirect to home
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // If logged in and is admin, render children
  return <>{children}</>;
};

export default AdminRoute;
