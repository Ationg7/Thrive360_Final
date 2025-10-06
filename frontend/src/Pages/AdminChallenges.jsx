// AdminChallenges Page - Challenges Management
// Following Clean Code Principles

import React, { memo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, STORAGE_KEYS, ROUTES, MESSAGES } from '../constants/adminConstants';
import ErrorBoundary from '../components/ErrorBoundary';
import MessageDisplay from '../components/MessageDisplay';
import './AdminChallenges.css';
import { Table } from 'react-bootstrap';


const AdminChallenges = memo(() => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    duration_days: '',
    difficulty_level: 'medium',
    category: 'general',
    imageFile: null
  });
  const navigate = useNavigate();

  // Clear messages after timeout
  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 5000);
  }, []);

  // Fetch challenges data
  const fetchChallenges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      
      if (!adminToken) {
        navigate(ROUTES.ADMIN_LOGIN);
        return;
      }

      const response = await fetch(API_ENDPOINTS.CHALLENGES, {
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
      setChallenges(data);
      setSuccess('Challenges loaded successfully');
      
    } catch (error) {
      console.error('Error fetching challenges:', error);
      setError(error.message || 'Failed to fetch challenges');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Handle file upload
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setUploadData(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };

  // Upload new challenge
  const handleUpload = useCallback(async () => {
    try {
      const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      
      const formData = new FormData();
      formData.append('title', uploadData.title);
      formData.append('description', uploadData.description);
      formData.append('duration_days', uploadData.duration_days);
      formData.append('difficulty_level', uploadData.difficulty_level);
      formData.append('category', uploadData.category);
      if (uploadData.imageFile) {
        formData.append('image_file', uploadData.imageFile);
      }

      const response = await fetch(API_ENDPOINTS.UPLOAD_CHALLENGE, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${adminToken}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const newChallenge = await response.json();
      setChallenges(prev => [newChallenge, ...prev]);
      setSuccess('Challenge created successfully');
      setShowUploadModal(false);
      setUploadData({
        title: '',
        description: '',
        duration_days: '',
        difficulty_level: 'medium',
        category: 'general',
        imageFile: null
      });
      fetchChallenges();
      clearMessages();
      
    } catch (error) {
      console.error('Error uploading challenge:', error);
      setError(error.message || 'Failed to create challenge');
    }
  }, [uploadData, fetchChallenges, clearMessages]);

  // Delete challenge
  const handleDeleteChallenge = useCallback(async (challengeId, challengeTitle) => {
    if (!window.confirm(`Are you sure you want to delete challenge "${challengeTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      
      const response = await fetch(`${API_ENDPOINTS.CHALLENGES}/${challengeId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      setChallenges(prevChallenges => prevChallenges.filter(challenge => challenge.id !== challengeId));
      setSuccess(`Challenge "${challengeTitle}" deleted successfully`);
      clearMessages();
      
    } catch (error) {
      console.error('Error deleting challenge:', error);
      setError(error.message || 'Failed to delete challenge');
    }
  }, [clearMessages]);

  // Filter challenges based on search and filters
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (challenge.user && challenge.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && challenge.is_active) ||
                         (filterStatus === 'inactive' && !challenge.is_active);
    
    return matchesSearch && matchesStatus;
  });

  // Initialize data
  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-content">
          <div className="admin-loading-spinner"></div>
          <h3 className="admin-loading-text">Loading Challenges...</h3>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="admin-challenges-page">
        <MessageDisplay 
          error={error} 
          success={success} 
          onDismiss={clearMessages} 
        />

        {/* Header */}
        <div className="admin-page-header">
          <div className="admin-page-header-content">
            <h1 className="admin-page-title">Challenges Management</h1>
            <p className="admin-page-subtitle">Manage all challenges in the system</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="admin-filters">
          <div className="admin-search-box">
            <input
              type="text"
              placeholder="Search challenges by title, description, or creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
          
          <div className="admin-filter-group">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-header">
            <h3>Create New Challenge</h3>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="upload-btn"
            >
              ➕ Create Challenge
            </button>
          </div>
        </div>

        <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Description</th>
      <th>Participants</th>
      <th>Duration</th>
      <th>Difficulty</th>
      <th>Category</th>
      <th>Created At</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredChallenges.map((challenge, index) => (
      <tr key={challenge.id}>
        <td>{index + 1}</td>
        <td>{challenge.title}</td>
        <td>{challenge.description}</td>
        <td>{challenge.user_progress_count || 0}</td>
        <td>{challenge.duration_days || 'N/A'} days</td>
        <td>{challenge.difficulty_level || 'Medium'}</td>
        <td>{challenge.category || 'General'}</td>
        <td>{new Date(challenge.created_at).toLocaleDateString()}</td>
        <td>{challenge.is_active ? 'Active' : 'Inactive'}</td>
        <td>
          <button
            onClick={() => handleDeleteChallenge(challenge.id, challenge.title)}
            className="action-btn delete"
          >
            🗑️ Delete
          </button>
        </td>
      </tr>
    ))}
    
    {filteredChallenges.length === 0 && (
      <tr>
        <td colSpan="10" style={{ textAlign: 'center' }}>
          No challenges found matching your criteria.
        </td>
      </tr>
    )}
  </tbody>
</Table>


        {/* Upload Modal */}
        {showUploadModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Create New Challenge</h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter challenge title"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter challenge description"
                    className="form-textarea"
                    rows="4"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (days) *</label>
                    <input
                      type="number"
                      value={uploadData.duration_days}
                      onChange={(e) => setUploadData(prev => ({ ...prev, duration_days: e.target.value }))}
                      placeholder="e.g., 7"
                      className="form-input"
                      min="1"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Difficulty Level</label>
                    <select
                      value={uploadData.difficulty_level}
                      onChange={(e) => setUploadData(prev => ({ ...prev, difficulty_level: e.target.value }))}
                      className="form-select"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={uploadData.category}
                    onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                    className="form-select"
                  >
                    <option value="general">General</option>
                    <option value="fitness">Fitness</option>
                    <option value="wellness">Wellness</option>
                    <option value="mindfulness">Mindfulness</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Challenge Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'imageFile')}
                    className="form-file"
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpload}
                  className="btn-upload"
                  disabled={!uploadData.title || !uploadData.description || !uploadData.duration_days}
                >
                  Create Challenge
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
});

AdminChallenges.displayName = 'AdminChallenges';

export default AdminChallenges;
