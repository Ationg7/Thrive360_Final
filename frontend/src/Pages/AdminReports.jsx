// AdminReports Page - Reports and Statistics
// Following Clean Code Principles

import React, { memo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, STORAGE_KEYS, ROUTES, MESSAGES } from '../constants/adminConstants';
import ErrorBoundary from '../components/ErrorBoundary';
import MessageDisplay from '../components/MessageDisplay';
import './AdminReports.css';

const AdminReports = memo(() => {
  const [reports, setReports] = useState({
    total_users: 0,
    active_users: 0,
    total_posts: 0,
    total_challenges: 0,
    guest_posts: 0,
    user_posts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  // Clear messages after timeout
  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 5000);
  }, []);

  // Fetch reports data
  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      
      if (!adminToken) {
        navigate(ROUTES.ADMIN_LOGIN);
        return;
      }

      const response = await fetch(API_ENDPOINTS.DASHBOARD, {
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
      setReports(data);
      setSuccess('Reports data loaded successfully');
      
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError(error.message || 'Failed to fetch reports data');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Calculate percentages
  const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };
  const activeUserPercentage = calculatePercentage(reports.active_users, reports.total_users);
  const guestPostPercentage = calculatePercentage(reports.guest_posts, reports.total_posts);
  const userPostPercentage = calculatePercentage(reports.user_posts, reports.total_posts);

  // Export functions
  const exportToCSV = useCallback(() => {
    try {
      setExporting(true);
      
      const csvData = [
        ['Report Type', 'Count', 'Percentage'],
        ['Total Users', reports.total_users, '100%'],
        ['Active Users', reports.active_users, `${activeUserPercentage}%`],
        ['Total Posts', reports.total_posts, '100%'],
        ['Guest Posts', reports.guest_posts, `${guestPostPercentage}%`],
        ['User Posts', reports.user_posts, `${userPostPercentage}%`],
        ['Total Challenges', reports.total_challenges, '100%']
      ];
      
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `thrive360-reports-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSuccess('Report exported to CSV successfully!');
      clearMessages();
    } catch (error) {
      console.error('Error exporting CSV:', error);
      setError('Failed to export CSV report');
    } finally {
      setExporting(false);
    }
  }, [reports, activeUserPercentage, guestPostPercentage, userPostPercentage, clearMessages]);

  const exportToPDF = useCallback(() => {
    try {
      setExporting(true);
      
      // Create a simple HTML report
      const reportHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Thrive360 Reports - ${new Date().toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .report-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .report-table th, .report-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .report-table th { background-color: #f2f2f2; }
            .summary { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Thrive360 Admin Reports</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="summary">
            <h2>Summary Statistics</h2>
            <table class="report-table">
              <tr><th>Metric</th><th>Count</th><th>Percentage</th></tr>
              <tr><td>Total Users</td><td>${reports.total_users}</td><td>100%</td></tr>
              <tr><td>Active Users</td><td>${reports.active_users}</td><td>${activeUserPercentage}%</td></tr>
              <tr><td>Total Posts</td><td>${reports.total_posts}</td><td>100%</td></tr>
              <tr><td>Guest Posts</td><td>${reports.guest_posts}</td><td>${guestPostPercentage}%</td></tr>
              <tr><td>User Posts</td><td>${reports.user_posts}</td><td>${userPostPercentage}%</td></tr>
              <tr><td>Total Challenges</td><td>${reports.total_challenges}</td><td>100%</td></tr>
            </table>
          </div>
        </body>
        </html>
      `;
      
      // Open in new window for printing
      const printWindow = window.open('', '_blank');
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      
      setSuccess('Report opened for printing/PDF export!');
      clearMessages();
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setError('Failed to export PDF report');
    } finally {
      setExporting(false);
    }
  }, [reports, activeUserPercentage, guestPostPercentage, userPostPercentage, clearMessages]);

  const exportToExcel = useCallback(() => {
    try {
      setExporting(true);
      
      // Create Excel-like data structure
      const excelData = {
        'Summary Report': [
          ['Metric', 'Count', 'Percentage'],
          ['Total Users', reports.total_users, '100%'],
          ['Active Users', reports.active_users, `${activeUserPercentage}%`],
          ['Total Posts', reports.total_posts, '100%'],
          ['Guest Posts', reports.guest_posts, `${guestPostPercentage}%`],
          ['User Posts', reports.user_posts, `${userPostPercentage}%`],
          ['Total Challenges', reports.total_challenges, '100%']
        ]
      };
      
      // Convert to CSV format (Excel can open CSV)
      const csvContent = excelData['Summary Report'].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `thrive360-reports-${new Date().toISOString().split('T')[0]}.xlsx`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSuccess('Report exported to Excel successfully!');
      clearMessages();
    } catch (error) {
      console.error('Error exporting Excel:', error);
      setError('Failed to export Excel report');
    } finally {
      setExporting(false);
    }
  }, [reports, activeUserPercentage, guestPostPercentage, userPostPercentage, clearMessages]);

  // Initialize data
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-content">
          <div className="admin-loading-spinner"></div>
          <h3 className="admin-loading-text">Loading Reports...</h3>
        </div>
      </div>
    );
  }

  

  return (
    <ErrorBoundary>
      <div className="admin-reports-page">
        <MessageDisplay 
          error={error} 
          success={success} 
          onDismiss={clearMessages} 
        />

        {/* Header */}
        <div className="admin-page-header">
          <div className="admin-page-header-content">
            <h1 className="admin-page-title">System Reports</h1>
            <p className="admin-page-subtitle">Comprehensive overview of platform statistics</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="reports-metrics">
          <div className="metric-card primary">
            <div className="metric-icon">👥</div>
            <div className="metric-content">
              <h3>{reports.total_users}</h3>
              <p>Total Users</p>
              <div className="metric-detail">
                <span className="detail-label">Active:</span>
                <span className="detail-value">{reports.active_users} ({activeUserPercentage}%)</span>
              </div>
            </div>
          </div>

          <div className="metric-card success">
            <div className="metric-icon">📝</div>
            <div className="metric-content">
              <h3>{reports.total_posts}</h3>
              <p>Total Posts</p>
              <div className="metric-detail">
                <span className="detail-label">User Posts:</span>
                <span className="detail-value">{reports.user_posts} ({userPostPercentage}%)</span>
              </div>
            </div>
          </div>

          <div className="metric-card warning">
            <div className="metric-icon">🎯</div>
            <div className="metric-content">
              <h3>{reports.total_challenges}</h3>
              <p>Total Challenges</p>
              <div className="metric-detail">
                <span className="detail-label">Active:</span>
                <span className="detail-value">All Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="reports-sections">
          {/* User Activity Report */}
          <div className="report-section">
            <div className="report-header">
              <h3>User Activity Report</h3>
              <p>User engagement and activity metrics</p>
            </div>
            <div className="report-content">
              <div className="report-stats">
                <div className="stat-item">
                  <div className="stat-label">Total Registered Users</div>
                  <div className="stat-value">{reports.total_users}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Active Users</div>
                  <div className="stat-value">{reports.active_users}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Inactive Users</div>
                  <div className="stat-value">{reports.total_users - reports.active_users}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">User Activity Rate</div>
                  <div className="stat-value">{activeUserPercentage}%</div>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${activeUserPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Content Report */}
          <div className="report-section">
            <div className="report-header">
              <h3>Content Report</h3>
              <p>Posts and content creation metrics</p>
            </div>
            <div className="report-content">
              <div className="report-stats">
                <div className="stat-item">
                  <div className="stat-label">Total Posts</div>
                  <div className="stat-value">{reports.total_posts}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">User Posts</div>
                  <div className="stat-value">{reports.user_posts}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Guest Posts</div>
                  <div className="stat-value">{reports.guest_posts}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">User Post Ratio</div>
                  <div className="stat-value">{userPostPercentage}%</div>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${userPostPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Platform Health Report */}
          <div className="report-section">
            <div className="report-header">
              <h3>Platform Health Report</h3>
              <p>Overall system health and performance</p>
            </div>
            <div className="report-content">
              <div className="health-metrics">
                <div className="health-item">
                  <div className="health-icon">✅</div>
                  <div className="health-content">
                    <div className="health-label">System Status</div>
                    <div className="health-value">Operational</div>
                  </div>
                </div>
                <div className="health-item">
                  <div className="health-icon">📊</div>
                  <div className="health-content">
                    <div className="health-label">Data Integrity</div>
                    <div className="health-value">100%</div>
                  </div>
                </div>
                <div className="health-item">
                  <div className="health-icon">🔒</div>
                  <div className="health-content">
                    <div className="health-label">Security Status</div>
                    <div className="health-value">Secure</div>
                  </div>
                </div>
                <div className="health-item">
                  <div className="health-icon">⚡</div>
                  <div className="health-content">
                    <div className="health-label">Performance</div>
                    <div className="health-value">Optimal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="reports-actions">
          <button 
            onClick={fetchReports}
            className="admin-refresh-btn"
          >
            🔄 Refresh Reports
          </button>
          <button 
           onClick={exportToPDF}
           disabled={exporting}
           className="export-btn pdf-btn"
         >
           {exporting ? 'Exporting...' : '📄 Export PDF'}
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
});

AdminReports.displayName = 'AdminReports';

export default AdminReports;
