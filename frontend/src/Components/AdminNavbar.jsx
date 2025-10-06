// AdminNavbar Component
// Following Clean Code Principle: Single Responsibility

import React, { memo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, MESSAGES, NAVIGATION_BUTTONS } from '../constants/adminConstants';
import { useNotificationBadges } from '../hooks/useNotificationBadges';
import './AdminNavbar.css';

const AdminNavbar = memo(() => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { badges, loading } = useNotificationBadges();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    if (window.confirm(MESSAGES.LOGOUT_CONFIRM)) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate(ROUTES.ADMIN_LOGIN);
    }
  };

  const handleSettings = () => {
    navigate(ROUTES.SETTINGS);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getAdminName = () => {
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      try {
        return JSON.parse(adminUser).name || 'Admin';
      } catch {
        return 'Admin';
      }
    }
    return 'Admin';
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        {/* Logo/Brand */}
        <div className="admin-navbar-brand">
          <h2>Thrive360 Admin</h2>
        </div>

        {/* Navigation Links */}
        <div className="admin-navbar-links">
          {NAVIGATION_BUTTONS.map(({ id, label, route }) => {
            const badgeCount = badges[id] || 0;
            return (
              <button 
                key={id}
                className="admin-nav-link"
                onClick={() => handleNavigation(route)}
              >
                {label}
                {badgeCount > 0 && (
                  <span className="nav-badge">{badgeCount}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Profile Section */}
        <div className="admin-navbar-profile" ref={dropdownRef}>
          <button 
            className="admin-profile-btn"
            onClick={toggleDropdown}
            aria-label="Admin profile menu"
          >
            <div className="admin-profile-avatar">
              {getAdminName().charAt(0).toUpperCase()}
            </div>
            <span className="admin-profile-name">{getAdminName()}</span>
            <div className="admin-profile-dots">
              <span>⋮</span>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="admin-profile-dropdown">
              <div className="admin-profile-info">
                <div className="admin-profile-avatar-large">
                  {getAdminName().charAt(0).toUpperCase()}
                </div>
                <div className="admin-profile-details">
                  <div className="admin-profile-name-large">{getAdminName()}</div>
                  <div className="admin-profile-role">Administrator</div>
                </div>
              </div>
              <div className="admin-profile-divider"></div>
              <button 
                className="admin-dropdown-item"
                onClick={handleSettings}
              >
                <span>⚙️</span>
                Settings
              </button>
              <button 
                className="admin-dropdown-item admin-dropdown-logout"
                onClick={handleLogout}
              >
                <span>🚪</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
});

AdminNavbar.displayName = 'AdminNavbar';

export default AdminNavbar;
