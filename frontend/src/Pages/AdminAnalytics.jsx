// AdminAnalytics Page - Analytics Dashboard
// Following Clean Code Principles

import React, { memo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, STORAGE_KEYS, ROUTES, MESSAGES } from '../constants/adminConstants';
import ErrorBoundary from '../components/ErrorBoundary';
import MessageDisplay from '../components/MessageDisplay';
import './AdminAnalytics.css';

const AdminAnalytics = memo(() => {
  const [analytics, setAnalytics] = useState({
    posts_per_day: [],
    challenges_per_day: [],
    user_registrations: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [timeRange, setTimeRange] = useState('7');
  const navigate = useNavigate();

  // Clear messages after timeout
  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 5000);
  }, []);

  // Fetch analytics data
  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      
      if (!adminToken) {
        navigate(ROUTES.ADMIN_LOGIN);
        return;
      }

      const response = await fetch(API_ENDPOINTS.ANALYTICS, {
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
          navigate(ROUTES.ADMIN_LOGIN);
          return;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setAnalytics(data);
      setSuccess('Analytics data loaded successfully');
      
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError(error.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Calculate totals
  const calculateTotals = (data) => {
    return data.reduce((sum, item) => sum + item.count, 0);
  };

  // Get max value for scaling
  const getMaxValue = (data) => {
    return Math.max(...data.map(item => item.count), 1);
  };

  // Initialize data
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-content">
          <div className="admin-loading-spinner"></div>
          <h3 className="admin-loading-text">Loading Analytics...</h3>
        </div>
      </div>
    );
  }

  const postsTotal = calculateTotals(analytics.posts_per_day);
  const challengesTotal = calculateTotals(analytics.challenges_per_day);
  const usersTotal = calculateTotals(analytics.user_registrations);

  return (
    <ErrorBoundary>
      <div className="admin-analytics-page">
        <MessageDisplay 
          error={error} 
          success={success} 
          onDismiss={clearMessages} 
        />

        {/* Header */}
        <div className="admin-page-header">
          <div className="admin-page-header-content">
            <h1 className="admin-page-title">Analytics Dashboard</h1>
            <p className="admin-page-subtitle">Insights and trends for the last 7 days</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="analytics-summary">
          <div className="summary-card">
            <div className="summary-icon">📊</div>
            <div className="summary-content">
              <h3>{postsTotal}</h3>
              <p>Total Posts</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">🎯</div>
            <div className="summary-content">
              <h3>{challengesTotal}</h3>
              <p>Total Challenges</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">👥</div>
            <div className="summary-content">
              <h3>{usersTotal}</h3>
              <p>New Users</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="analytics-charts">
          {/* Posts Chart */}
          <div className="chart-container">
            <div className="chart-header">
              <h3>Posts Activity</h3>
              <p>Posts created per day</p>
            </div>
            <div className="chart-content">
              {analytics.posts_per_day.length > 0 ? (
                <div className="bar-chart">
                  {analytics.posts_per_day.map((item, index) => {
                    const maxValue = getMaxValue(analytics.posts_per_day);
                    const height = (item.count / maxValue) * 100;
                    return (
                      <div key={index} className="bar-item">
                        <div 
                          className="bar" 
                          style={{ height: `${height}%` }}
                          title={`${item.date}: ${item.count} posts`}
                        ></div>
                        <div className="bar-label">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        <div className="bar-value">{item.count}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-data">No posts data available</div>
              )}
            </div>
          </div>

          {/* Challenges Chart */}
          <div className="chart-container">
            <div className="chart-header">
              <h3>Challenges Activity</h3>
              <p>Challenges created per day</p>
            </div>
            <div className="chart-content">
              {analytics.challenges_per_day.length > 0 ? (
                <div className="bar-chart">
                  {analytics.challenges_per_day.map((item, index) => {
                    const maxValue = getMaxValue(analytics.challenges_per_day);
                    const height = (item.count / maxValue) * 100;
                    return (
                      <div key={index} className="bar-item">
                        <div 
                          className="bar" 
                          style={{ height: `${height}%` }}
                          title={`${item.date}: ${item.count} challenges`}
                        ></div>
                        <div className="bar-label">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        <div className="bar-value">{item.count}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-data">No challenges data available</div>
              )}
            </div>
          </div>

          {/* User Registrations Chart */}
          <div className="chart-container">
            <div className="chart-header">
              <h3>User Registrations</h3>
              <p>New users registered per day</p>
            </div>
            <div className="chart-content">
              {analytics.user_registrations.length > 0 ? (
                <div className="bar-chart">
                  {analytics.user_registrations.map((item, index) => {
                    const maxValue = getMaxValue(analytics.user_registrations);
                    const height = (item.count / maxValue) * 100;
                    return (
                      <div key={index} className="bar-item">
                        <div 
                          className="bar" 
                          style={{ height: `${height}%` }}
                          title={`${item.date}: ${item.count} users`}
                        ></div>
                        <div className="bar-label">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        <div className="bar-value">{item.count}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-data">No user registration data available</div>
              )}
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="analytics-actions">
          <button 
            onClick={fetchAnalytics}
            className="admin-refresh-btn"
          >
            🔄 Refresh Analytics
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
});

AdminAnalytics.displayName = 'AdminAnalytics';

export default AdminAnalytics;
