import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, ListGroup, Alert, Modal, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useAuth } from "../AuthContext";
import { adminAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const { isLoggedIn, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const sidebarItems = [
    "Dashboard",
    "Content Management",
    "User Management",
    "Reports & Feedback",
    "Notifications",
    "Settings",
  ];

  // Check admin access
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }
    if (!isAdmin) {
      navigate('/home');
      return;
    }
    loadDashboardData();
  }, [isLoggedIn, isAdmin, navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboard, usersData, postsData, challengesData, analyticsData] = await Promise.all([
        adminAPI.getDashboard(),
        adminAPI.getUsers(),
        adminAPI.getPosts(),
        adminAPI.getChallenges(),
        adminAPI.getAnalytics()
      ]);
      
      setDashboardData(dashboard);
      setUsers(usersData);
      setPosts(postsData);
      setChallenges(challengesData);
      setAnalytics(analyticsData);
    } catch (err) {
      setError('Failed to load admin data');
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Chart Data for Dashboard
  const chartData = analytics ? {
    labels: analytics.user_registrations.map(item => item.date),
    datasets: [
      {
        label: "User Registrations",
        data: analytics.user_registrations.map(item => item.count),
        borderColor: "#2e7d32",
        backgroundColor: "rgba(46,125,50,0.2)",
        tension: 0.4,
      },
      {
        label: "Posts Created",
        data: analytics.posts_per_day.map(item => item.count),
        borderColor: "#1976d2",
        backgroundColor: "rgba(25,118,210,0.2)",
        tension: 0.4,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "User Activity Over the Week" },
    },
  };

  if (loading) {
    return (
      <Container fluid className="admin-dashboard p-0" style={{ minHeight: "100vh", background: "#f7fff9" }}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading admin dashboard...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="admin-dashboard p-0" style={{ minHeight: "100vh", background: "#f7fff9" }}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <Alert variant="danger" className="text-center">
            <h4>Error Loading Admin Dashboard</h4>
            <p>{error}</p>
            <Button variant="outline-danger" onClick={loadDashboardData}>
              Retry
            </Button>
          </Alert>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="admin-dashboard p-0" style={{ minHeight: "100vh", background: "#f7fff9" }}>
      <Row className="m-0">
        {/* Sidebar */}
        <Col xs={2} className="p-3" style={{ background: "#2e7d32", minHeight: "100vh", color: "#fff" }}>
          <h4 className="mb-4">THRIVE360</h4>
          <ListGroup variant="flush">
            {sidebarItems.map((item) => (
              <ListGroup.Item
                key={item}
                onClick={() => setActiveTab(item)}
                style={{
                  background: item === activeTab ? "#1b5e20" : "#2e7d32",
                  color: "#fff",
                  cursor: "pointer",
                  border: "none",
                  marginBottom: "8px",
                }}
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Main Content */}
        <Col xs={10} className="p-4">
          <h2 className="mb-3" style={{ color: "#2e7d32" }}>{activeTab}</h2>
          <p className="mb-4">Student health, well-being, and engagement</p>

          {/* Dashboard Tab */}
          {activeTab === "Dashboard" && (
            <>
              <Row className="mb-4">
                {dashboardData ? [
                  { label: "Total Users", value: dashboardData.total_users },
                  { label: "Active Users", value: dashboardData.active_users },
                  { label: "Total Posts", value: dashboardData.total_posts },
                  { label: "Total Challenges", value: dashboardData.total_challenges },
                ].map((item, idx) => (
                  <Col key={idx}>
                    <Card className="p-3 text-center" style={{ border: "2px solid #2e7d32" }}>
                      <h4>{item.value}</h4>
                      <p className="mb-0">{item.label}</p>
                    </Card>
                  </Col>
                )) : (
                  <Col>
                    <Card className="p-3 text-center">
                      <p>Loading...</p>
                    </Card>
                  </Col>
                )}
              </Row>

              <Row className="mb-4">
                <Col md={8}>
                  <Card className="p-3 mb-3">
                    <h5>User Activity</h5>
                    {chartData ? (
                      <Line data={chartData} options={chartOptions} />
                    ) : (
                      <p>Loading chart data...</p>
                    )}
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="p-3 mb-3">
                    <h5>Top Trends</h5>
                    <p><strong>Top Meditation</strong><br />Mindfulness Meditation 78</p>
                    <p><strong>Top Blog</strong><br />Managing Stress: Tips and Techniques 65</p>
                    <p><strong>Top Challenge</strong><br />30 Day Self-Care Challenge 50</p>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {/* Content Management Tab */}
          {activeTab === "Content Management" && (
            <Card className="p-3 mb-3">
              <h5>Content Management</h5>
              <Button style={{ background: "#2e7d32", border: "none", marginBottom: "10px" }}>Add New Blog</Button>
              <Button style={{ background: "#2e7d32", border: "none", marginLeft: "5px", marginBottom: "10px" }}>Add New Meditation</Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>5 Tips for Better</td>
                    <td>Published</td>
                    <td>Blog</td>
                  </tr>
                  <tr>
                    <td>Morning Meditation</td>
                    <td>Draft</td>
                    <td>Meditation</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          )}

          {/* User Management Tab */}
          {activeTab === "User Management" && (
            <Card className="p-3 mb-3">
              <h5>User Management</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${user.is_active ? 'bg-success' : 'bg-secondary'}`}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <Button size="sm" variant="outline-primary" className="me-2">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline-danger">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}

          {/* Reports & Feedback Tab */}
          {activeTab === "Reports & Feedback" && (
            <Card className="p-3 mb-3">
              <h5>Reports & Feedback</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Report</th>
                    <th>User</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Inappropriate Content</td>
                    <td>John Doe</td>
                    <td>Reviewed</td>
                  </tr>
                  <tr>
                    <td>Feature Request</td>
                    <td>Jane Smith</td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === "Notifications" && (
            <Card className="p-3 mb-3">
              <h5>Notifications</h5>
              <Button style={{ background: "#2e7d32", border: "none", marginBottom: "10px" }}>Send New Notification</Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>New Blog Published</td>
                    <td>2025-09-14</td>
                    <td>Sent</td>
                  </tr>
                  <tr>
                    <td>System Maintenance</td>
                    <td>2025-09-15</td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "Settings" && (
            <Card className="p-3 mb-3">
              <h5>Settings</h5>
              <p>Settings page placeholder – configure system settings here.</p>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
