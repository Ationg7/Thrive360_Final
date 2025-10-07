import React, { useState, useEffect } from 'react';
import { ListGroup, Card, Badge, Button } from 'react-bootstrap';
import { Bell, CheckCircle, Heart, Bookmark, Calendar } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://127.0.0.1:8000/api/notifications';
  const token = localStorage.getItem('authToken');

  // Fetch all notifications
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

  // Fetch unread count
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

  // Mark a single notification as read
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

  // Mark all notifications as read
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

  // Choose icon by type
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

  // Format time
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
    }, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mb-3 right-sidebar-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Bell className="me-2" />
          Notifications
          {unreadCount > 0 && (
            <Badge bg="danger" className="ms-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="link" size="sm" className="p-0" onClick={markAllAsRead}>
            Mark all read
          </Button>
        )}
      </Card.Header>
      <hr className="my-0" />
      {loading ? (
        <div className="p-3 text-center">Loading...</div>
      ) : (
        <ListGroup variant="flush">
          {notifications.length === 0 ? (
            <ListGroup.Item className="text-center text-muted">
              No notifications yet
            </ListGroup.Item>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <ListGroup.Item
  key={notification.id}
  className={`notification-item ${!notification.is_read ? 'bg-light' : ''}`}
  onClick={() => {
    // Mark as read if not read
    if (!notification.is_read) markAsRead(notification.id);

    // Redirect if URL exists
    if (notification.data?.redirect_url) {
      window.location.href = notification.data.redirect_url;
    }
  }}
  style={{ cursor: !notification.is_read ? 'pointer' : 'pointer' }}
>

                <div className="d-flex align-items-start">
                  <div className="me-2">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong className="small">{notification.title}</strong>
                        <div className="small text-muted">{notification.message}</div>
                      </div>
                      {!notification.is_read && (
                        <div
                          className="bg-primary rounded-circle"
                          style={{ width: '8px', height: '8px' }}
                        />
                      )}
                    </div>
                    <div className="small text-muted mt-1">
                      {formatTime(notification.created_at)}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      )}
    </Card>
  );
};

export default Notifications;
