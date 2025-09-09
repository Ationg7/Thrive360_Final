import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
} from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  PeopleFill,
  ClockFill,
  GraphUpArrow,
  List,
  BoxArrowRight,
  GearFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const usageData = [
    { name: "Freedom Wall", prev: 100, curr: 340 },
    { name: "Wellness Blog", prev: 50, curr: 323 },
    { name: "Meditation", prev: 55, curr: 400 },
    { name: "Challenges", prev: 50, curr: 250 },
  ];

  const featureData = [
    { name: "Active Users", value: 312, icon: <PeopleFill /> },
    { name: "Time Spent", value: "748 hrs", icon: <ClockFill /> },
    { name: "Top Streak", value: "12 days", icon: <GraphUpArrow /> },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Sidebar */}
      <div
        style={{
          
          width: sidebarOpen ? "220px" : "70px",
          backgroundColor: "#2e7d32",
          transition: "width 0.3s",
          display: "flex",
          flexDirection: "column",
          alignItems: sidebarOpen ? "flex-start" : "center",
          padding: "1rem",
          color: "white",
        }}
      >
        <div className="mb-4 d-flex align-items-center w-100">
          <List
            size={24}
            className="me-2 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        {sidebarOpen && <h5 className="mb-0 ms-2">Thrive360</h5>}
        </div>
        <Link to="/FreedomWall" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div className="mb-3">{sidebarOpen ? "📝 Freedom Wall" : "📝"}</div>
</Link>

<Link to="/Meditation" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div className="mb-3">{sidebarOpen ? "🧘 Meditation" : "🧘"}</div>
</Link>

<Link to="/Challenges" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div className="mb-3">{sidebarOpen ? "🎯 Challenges" : "🎯"}</div>
</Link>

<Link to="/WellnessBlog" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div className="mb-3">{sidebarOpen ? "📖 Wellness Blog" : "📖"}</div>
</Link>

<div className="mt-auto mb-3">{sidebarOpen ? "👤 Profile" : "👤"}</div>

<Link to="/SignIn" style={{ textDecoration: 'none', color: 'inherit' }}>
  <div className="mb-3">{sidebarOpen ? "🚪 Log Out" : "🚪"}</div>
</Link>

      </div>

      {/* Main Content */}
      <Container fluid className="p-4">
        <Row>
          <Col>
            <h4 className="fw-bold text-success">Thrive360</h4>
            <h1 className="text-muted">Dashboard</h1>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3">
              <h6>Users Engagement</h6>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={usageData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="prev" fill="#A5D6A7" name="Previous" barSize={50} />
                  <Bar dataKey="curr" fill="#388E3C" name="Current" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 text-center">
              <h6>Most Engaged Feature</h6>
              <div className="d-flex justify-content-center align-items-center" style={{ height: 50 }}>
                <h1 className="text-success fw-bold">66%</h1>
              </div>
              <p className="text-muted small">Freedom Wall</p>
            </Card>
            <Card className="p-3 mt-3 text-center">
              <h6>Least Engagement</h6>
              <div className="d-flex justify-content-center align-items-center" style={{ height: 50 }}>
                <h1 className="text-success fw-bold">10%</h1>
              </div>
              <p className="text-muted small">Wellness Blog</p>
            </Card>
          </Col>
        </Row>

        <Row>
          {featureData.map((item, index) => (
            <Col md={4} key={index}>
              <Card className="p-3 mb-4">
                <div className="d-flex align-items-center">
                  <div className="me-3 fs-4 text-success">{item.icon}</div>
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-muted">{item.value}</small>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <h5 className="mb-3 text-muted">Statistics</h5>
        <Row>
          <Col md={4}>
             <Card style={{ width: "450px", padding: "1rem" }}>
              <Card.Body>
     <Card.Title>To Do List</Card.Title>  
             <ProgressBar
              now={55}
              label="55%"
              variant="success"
              className="thick-progress"
              />
              <div className="d-flex justify-content-between mt-2 " >
              <span className="text-danger small ">302 participants</span>
              </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={{ width: "450px", padding: "1rem" }}>
              <Card.Body>
     <Card.Title>Events</Card.Title>  
             <ProgressBar
              now={60}
              label="60%"
              variant="success"
              className="thick-progress"
              />
              <div className="d-flex justify-content-between mt-2 " >
              <span className="text-danger small ">302 participants</span>
              </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={{ width: "450px", padding: "1rem" }}>
              <Card.Body>
                <Card.Title>User Engagement</Card.Title>  
             <ProgressBar
              now={75}
              label="75%"
              variant="success"
              className="thick-progress"
              />
              <div className="d-flex justify-content-between mt-2 " >
              <span className="text-danger small ">302 participants</span>
              </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card className="p-3 mt-4">
              <h6>Bounce Rate</h6>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-danger fw-bold">10.3%</h3>
                <small className="text-danger">+1.04%</small>
              </div>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={usageData}>
                  <Line type="monotone" dataKey="curr" stroke="#e53935" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-3 mt-4">
              <h6>Session Duration</h6>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="fw-bold text-success">5:31</h3>
                <small className="text-success">+1:29</small>
              </div>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={usageData}>
                  <Line type="monotone" dataKey="prev" stroke="#43A047" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
