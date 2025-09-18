// components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
