import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('panchayat_token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios defaults
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  // Load user profile on initial render if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get('/api/auth/me');
          if (res.data && res.data.success) {
            setUser(res.data.data);
          } else {
            logout();
          }
        } catch (err) {
          console.error('[Auth Error] Failed to load user:', err);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register function
  const register = async (formData) => {
    setError(null);
    try {
      const res = await axios.post('/api/auth/register', formData);
      if (res.data && res.data.success) {
        const { token: userToken, ...userData } = res.data.data;
        localStorage.setItem('panchayat_token', userToken);
        setToken(userToken);
        setUser(userData);
        return { success: true, user: userData };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  // Login function
  const login = async (email, password, role) => {
    setError(null);
    try {
      const res = await axios.post('/api/auth/login', { email, password, role });
      if (res.data && res.data.success) {
        const { token: userToken, ...userData } = res.data.data;
        localStorage.setItem('panchayat_token', userToken);
        setToken(userToken);
        setUser(userData);
        return { success: true, user: userData };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('panchayat_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to process forgot password request'
      };
    }
  };

  // Reset password
  const resetPassword = async (resetToken, newPassword) => {
    try {
      const res = await axios.post('/api/auth/reset-password', { resetToken, newPassword });
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Password reset failed'
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
