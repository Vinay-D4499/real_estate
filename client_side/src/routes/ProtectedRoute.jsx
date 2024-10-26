import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to sign-in page if not authenticated
    return <Navigate to="/" replace />;
  }

  // You can add additional role checks here if required
  return children;
};

export default ProtectedRoute;
