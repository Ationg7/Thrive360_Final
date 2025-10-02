// Refactored AdminDashboard Component
// Following Clean Code Principles by Robert C. Martin

import React, { memo, useMemo } from 'react';
import '../styles/AdminDashboard.css';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import { STATS_LABELS, NAVIGATION_BUTTONS, MESSAGES } from '../constants/adminConstants';
import ErrorBoundary from '../components/ErrorBoundary';
import StatCard from '../components/StatCard';
import NavigationButton from '../components/NavigationButton';
import MessageDisplay from '../components/MessageDisplay';

const AdminDashboard = memo(() => {
  const {
    stats,
    loading,
    error,
    success,
    handleLogout,
    handleNavigation,
    clearMessages
  } = useAdminDashboard();

  // Memoized stats data for performance
  const statsData = useMemo(() => [
    { value: stats.total_users, label: STATS_LABELS.TOTAL_USERS, type: 'users' },
    { value: stats.active_users, label: STATS_LABELS.ACTIVE_USERS, type: 'active-users' },
    { value: stats.total_posts, label: STATS_LABELS.TOTAL_POSTS, type: 'posts' },
    { value: stats.total_challenges, label: STATS_LABELS.TOTAL_CHALLENGES, type: 'challenges' },
  ], [stats]);

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h3 className="loading-text">{MESSAGES.LOADING}</h3>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="admin-dashboard">
        {/* Message Display */}
        <MessageDisplay 
          error={error} 
          success={success} 
          onDismiss={clearMessages} 
        />

      {/* Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <h1 className="admin-title">Dashboard Overview</h1>
            <p className="admin-subtitle">Welcome to your admin control panel</p>
          </div>
      </div>
      </div>
    </ErrorBoundary>
  );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard;
