import React, { useState, useEffect } from 'react';
import { ListGroup, Card, Badge, Button } from 'react-bootstrap';
import { Bell, CheckCircle, Heart, Bookmark, Calendar } from 'lucide-react';
import '../App.css'; // 👈 We'll add the modern scrollbar here

const Notifications = ({ onUnreadUpdate }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://127.0.0.1:8000/api/notifications';
  const token = localStorage.getItem('authToken');

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.data || data);
      }
    } catch (err) {
      console.error('Error loading notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const res = await fetch(`${API_BASE}/unread-count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.count);
      }
    } catch (err) {
      console.error('Error loading unread count:', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}/read`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await loadNotifications();
        await loadUnreadCount();
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch(`${API_BASE}/mark-all-read`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await loadNotifications();
        await loadUnreadCount();
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reaction':
        return <Heart size={16} className="text-danger" />;
      case 'save':
        return <Bookmark size={16} className="text-success" />;
      case 'challenge_joined':
        return <CheckCircle size={16} className="text-primary" />;
      case 'event':
        return <Calendar size={16} className="text-info" />;
      case 'blog':
        return <Bell size={16} className="text-warning" />;
      default:
        return <Bell size={16} className="text-muted" />;
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    loadNotifications();
    loadUnreadCount();
    const interval = setInterval(() => {
      loadNotifications();
      loadUnreadCount();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mb-3 right-sidebar-card shadow-sm border-0">
      <Card.Header className="d-flex justify-content-between align-items-center bg-white">
        <div className="d-flex align-items-center">
          <Bell className="me-2 text-primary" />
          <strong>Notifications</strong>
          {unreadCount > 0 && (
            <Badge bg="danger" className="ms-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="link"
            size="sm"
            className="p-0 text-decoration-none text-primary "
            onClick={markAllAsRead}
          >
            Mark all read
          </Button>
        )}
      </Card.Header>

      <hr className="my-0" />

      {/* Notifications List */}
      {loading ? (
        <div className="text-center py-2">Loading...</div>
      ) : (
        <div className="notification-scroll-area">
          <ListGroup variant="flush">
            {notifications.length === 0 ? (
              <ListGroup.Item className="text-center text-muted py-3">
                No notifications yet
              </ListGroup.Item>
            ) : (
              notifications.map((notification) => (
                <ListGroup.Item
                  key={notification.id}
                  className={`notification-item ${
                    !notification.is_read ? 'bg-light' : ''
                  }`}
                  onClick={() => {
                    if (!notification.is_read) markAsRead(notification.id);
                    if (notification.data?.redirect_url) {
                      window.location.href = notification.data.redirect_url;
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-start justify-content-between w-100">
                    {/* Left side */}
                    <div className="d-flex align-items-start me-2 flex-grow-1">
                      <div className="me-2">{getNotificationIcon(notification.type)}</div>
                      <div>
                        <strong className="small">{notification.title}</strong>
                        <div className="small text-muted">{notification.message}</div>
                        <div className="small text-muted mt-1">
                          {formatTime(notification.created_at)}
                        </div>
                      </div>
                    </div>

                    {/* Blue dot flush right */}
                    {!notification.is_read && (
                      <div
                        className="bg-primary rounded-circle"
                        style={{
                          width: '10px',
                          height: '10px',
                          marginTop: '5px',
                          marginLeft: 'auto',
                          alignSelf: 'center',
                        }}
                      />
                    )}
                  </div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default Notifications;
