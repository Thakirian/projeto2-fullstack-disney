import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const ProtectedRoute = ({ element: Element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return Element;
  } 

  return <Navigate to="/login" />;
};

export default ProtectedRoute;