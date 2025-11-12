// client/testing/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check for a token in local storage
  const token = localStorage.getItem('token'); 

  if (!token) {
    // No token? Redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, so show the page they asked for
  return <Outlet />;
};

export default ProtectedRoute;