// Custom Hook for Admin Dashboard Logic
// Following Clean Code Principle: Single Responsibility and Separation of Concerns

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, STORAGE_KEYS, ROUTES, MESSAGES } from '../constants/adminConstants';

export const useAdminDashboard = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    total_posts: 0,
    total_challenges: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Clear messages after timeout
  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 5000);
  }, []);

  // Authentication check
  const checkAuth = useCallback(() => {
    const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
    const adminUser = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    
    if (!adminToken || !adminUser) {
      navigate(ROUTES.ADMIN_LOGIN);
      return false;
    }
    return true;
  }, [navigate]);

  // Fetch dashboard data with proper error handling
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      
      if (!adminToken) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(API_ENDPOINTS.DASHBOARD, {
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
          navigate(ROUTES.ADMIN_LOGIN);
          return;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setStats(data);
      setSuccess('Dashboard data loaded successfully');
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message || MESSAGES.ERROR_FETCHING_DATA);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Logout handler with confirmation
  const handleLogout = useCallback(() => {
    if (window.confirm(MESSAGES.LOGOUT_CONFIRM)) {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
      setSuccess('Logged out successfully');
      setTimeout(() => {
        navigate(ROUTES.ADMIN_LOGIN);
      }, 1000);
    }
  }, [navigate]);

  // Navigation handler for admin features
  const handleNavigation = useCallback((route) => {
    if (route === ROUTES.USERS_MANAGEMENT || 
        route === ROUTES.POSTS_MANAGEMENT || 
        route === ROUTES.CHALLENGES_MANAGEMENT ||
        route === ROUTES.ANALYTICS ||
        route === ROUTES.SETTINGS ||
        route === ROUTES.REPORTS) {
      // For now, show coming soon message
      setSuccess(`${route.split('/').pop().replace('-', ' ').toUpperCase()} - ${MESSAGES.FEATURE_COMING_SOON}`);
      clearMessages();
    } else {
      navigate(route);
    }
  }, [navigate, clearMessages]);

  // Initialize dashboard
  useEffect(() => {
    if (checkAuth()) {
      fetchDashboardData();
    }
  }, [checkAuth, fetchDashboardData]);

  // Clear messages when component unmounts
  useEffect(() => {
    return () => {
      setError(null);
      setSuccess(null);
    };
  }, []);

  return {
    stats,
    loading,
    error,
    success,
    handleLogout,
    handleNavigation,
    fetchDashboardData,
    clearMessages
  };
};
