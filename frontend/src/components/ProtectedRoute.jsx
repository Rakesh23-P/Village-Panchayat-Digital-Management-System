import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Portal Authentication...</span>
        </div>
        <p className="text-muted mt-2">Verifying user permissions...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to public Admin Login page (/)
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Role not authorized, redirect to appropriate role dashboard or home
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'staff') return <Navigate to="/staff/dashboard" replace />;
    return <Navigate to="/citizen/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
