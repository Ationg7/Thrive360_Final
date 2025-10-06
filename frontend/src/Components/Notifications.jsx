import React, { useState, useEffect } from 'react';
import { ListGroup, Card, Badge, Button, Dropdown } from 'react-bootstrap';
import { Bell, CheckCircle, Heart, Bookmark, Calendar } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load notifications
  const loadNotifications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://127.0.0.1:8000/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data || data);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load unread count
  const loadUnreadCount = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://127.0.0.1:8000/api/notifications/unread-count', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count);
      }
    } catch (error) {
      console.error('Error loading unread count:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://127.0.0.1:8000/api/notifications/${id}/read`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await loadNotifications();
        await loadUnreadCount();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://127.0.0.1:8000/api/notifications/mark-all-read', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await loadNotifications();
        await loadUnreadCount();
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  // Get notification icon
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
      default:
        return <Bell size={16} className="text-muted" />;
    }
  };

  // Format notification time
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
          <Button
            variant="link"
            size="sm"
            onClick={markAllAsRead}
            className="p-0"
          >
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
                onClick={() => !notification.is_read && markAsRead(notification.id)}
                style={{ cursor: !notification.is_read ? 'pointer' : 'default' }}
              >
                <div className="d-flex align-items-start">
                  <div className="me-2">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong className="small">{notification.title}</strong>
                        <div className="small text-muted">{notification.message}</div>
                      </div>
                      {!notification.is_read && (
                        <div className="bg-primary rounded-circle" style={{ width: '8px', height: '8px' }} />
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
