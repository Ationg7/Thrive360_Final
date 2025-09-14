import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Button, ListGroup } from "react-bootstrap";
import { Line } from "react-chartjs-2";
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
  const [activeTab, setActiveTab] = useState("Dashboard");

  const sidebarItems = [
    "Dashboard",
    "Content Management",
    "User Management",
    "Reports & Feedback",
    "Notifications",
    "Settings",
  ];

  // Chart Data for Dashboard
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Users",
        data: [200, 400, 300, 500, 450, 600, 550],
        borderColor: "#2e7d32",
        backgroundColor: "rgba(46,125,50,0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "User Activity Over the Week" },
    },
  };

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
                {[
                  { label: "Total Users", value: "1,250" },
                  { label: "Active Users", value: "942" },
                  { label: "Blogs", value: "35" },
                  { label: "Meditations", value: "20" },
                ].map((item, idx) => (
                  <Col key={idx}>
                    <Card className="p-3 text-center" style={{ border: "2px solid #2e7d32" }}>
                      <h4>{item.value}</h4>
                      <p className="mb-0">{item.label}</p>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row className="mb-4">
                <Col md={8}>
                  <Card className="p-3 mb-3">
                    <h5>User Activity</h5>
                    <Line data={chartData} options={chartOptions} />
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
                    <th>Last Seen</th>
                    <th>Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>1 day ago</td>
                    <td>High</td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>3 days ago</td>
                    <td>Medium</td>
                  </tr>
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
