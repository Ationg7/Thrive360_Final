// AdminMeditation Page - Meditation Content Management
// Following Clean Code Principles

import React, { memo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, STORAGE_KEYS, ROUTES, MESSAGES } from '../constants/adminConstants';
import ErrorBoundary from '../components/ErrorBoundary';
import MessageDisplay from '../components/MessageDisplay';
import './AdminMeditation.css';

const AdminMeditation = memo(() => {
  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    duration: '',
    category: 'guided',
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

  // Fetch meditations data
  const fetchMeditations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);

      if (!adminToken) {
        navigate(ROUTES.ADMIN_LOGIN);
        return;
      }

      const response = await fetch(API_ENDPOINTS.MEDITATION, {
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
      setMeditations(data);
      setSuccess('Meditation content loaded successfully');

    } catch (error) {
      console.error('Error fetching meditations:', error);
      setError(error.message || 'Failed to fetch meditation content');
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

  // Upload new meditation
  const handleUpload = useCallback(async () => {
    try {
      const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);

      const formData = new FormData();
      formData.append('title', uploadData.title);
      formData.append('description', uploadData.description);
      formData.append('duration', uploadData.duration);
      formData.append('category', uploadData.category);
      if (uploadData.imageFile) {
        formData.append('image_file', uploadData.imageFile);
      }

      const response = await fetch(API_ENDPOINTS.UPLOAD_MEDITATION, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${adminToken}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      setSuccess('Meditation content uploaded successfully');
      setShowUploadModal(false);
      setUploadData({
        title: '',
        description: '',
        duration: '',
        category: 'guided',
        imageFile: null
      });
      fetchMeditations();
      clearMessages();

    } catch (error) {
      console.error('Error uploading meditation:', error);
      setError(error.message || 'Failed to upload meditation content');
    }
  }, [uploadData, fetchMeditations, clearMessages]);

  // Delete meditation
  const handleDeleteMeditation = useCallback(async (meditationId, meditationTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${meditationTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);

      const response = await fetch(`${API_ENDPOINTS.MEDITATION}/${meditationId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      setMeditations(prevMeditations => prevMeditations.filter(meditation => meditation.id !== meditationId));
      setSuccess(`Meditation "${meditationTitle}" deleted successfully`);
      clearMessages();

    } catch (error) {
      console.error('Error deleting meditation:', error);
      setError(error.message || 'Failed to delete meditation');
    }
  }, [clearMessages]);

  // Filter meditations based on search and filters
  const filteredMeditations = meditations.filter(meditation => {
    const matchesSearch = meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meditation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || meditation.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Initialize data
  useEffect(() => {
    fetchMeditations();
  }, [fetchMeditations]);

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-content">
          <div className="admin-loading-spinner"></div>
          <h3 className="admin-loading-text">Loading Meditation Content...</h3>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="admin-meditation-page">
        <MessageDisplay 
          error={error} 
          success={success} 
          onDismiss={clearMessages} 
        />

        {/* Header */}
        <div className="admin-page-header">
          <div className="admin-page-header-content">
            <h1 className="admin-page-title">Meditation Management</h1>
            <p className="admin-page-subtitle">Manage guided meditation content</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-header">
            <h3>Upload New Meditation</h3>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="upload-btn"
            >
              ➕ Upload Meditation
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="admin-filters">
          <div className="admin-search-box">
            <input
              type="text"
              placeholder="Search meditations by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
          
          <div className="admin-filter-group">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="admin-filter-select"
            >
              <option value="all">All Categories</option>
              <option value="guided">Guided</option>
              <option value="breathing">Breathing</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="sleep">Sleep</option>
            </select>
          </div>
        </div>

        {/* Meditations Grid */}
        <div className="meditations-container">
          <div className="meditations-header">
            <h3>Meditation Content ({filteredMeditations.length})</h3>
            <button 
              onClick={fetchMeditations}
              className="admin-refresh-btn"
            >
              Refresh
            </button>
          </div>
          
          <div className="meditations-grid">
            {filteredMeditations.map((meditation) => (
              <div key={meditation.id} className="meditation-card">
                <div className="meditation-image">
                  {meditation.image_url ? (
                    <img src={meditation.image_url} alt={meditation.title} />
                  ) : (
                    <div className="meditation-placeholder">🧘‍♀️</div>
                  )}
                  <div className="meditation-category">
                    {meditation.category}
                  </div>
                </div>
                
                <div className="meditation-content">
                  <h4 className="meditation-title">{meditation.title}</h4>
                  <p className="meditation-description">{meditation.description}</p>
                  
                  <div className="meditation-meta">
                    <div className="meditation-duration">
                      <span className="meta-icon">⏱️</span>
                      <span>{meditation.duration || 'N/A'}</span>
                    </div>
                    <div className="meditation-created">
                      <span className="meta-icon">📅</span>
                      <span>{new Date(meditation.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="meditation-actions">
                  <button
                    onClick={() => handleDeleteMeditation(meditation.id, meditation.title)}
                    className="action-btn delete"
                    title="Delete Meditation"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
            
            {filteredMeditations.length === 0 && (
              <div className="admin-empty-state">
                <p>No meditation content found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Upload New Meditation</h3>
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
                    placeholder="Enter meditation title"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter meditation description"
                    className="form-textarea"
                    rows="3"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      value={uploadData.duration}
                      onChange={(e) => setUploadData(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 10"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={uploadData.category}
                      onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                      className="form-select"
                    >
                      <option value="guided">Guided</option>
                      <option value="breathing">Breathing</option>
                      <option value="mindfulness">Mindfulness</option>
                      <option value="sleep">Sleep</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Image File (Optional)</label>
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
                  disabled={!uploadData.title || !uploadData.description}
                >
                  Upload Meditation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
});

AdminMeditation.displayName = 'AdminMeditation';

export default AdminMeditation;
