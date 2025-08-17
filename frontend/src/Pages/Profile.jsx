import { useState } from "react";
import { Button, Card, Container, Row, Col, ListGroup } from "react-bootstrap";
import { Heart, Send, Bell, CheckCircle, ChevronRight } from "lucide-react"; // Changed Share2 to Send
import { BsFilter, BsGear } from "react-icons/bs";


// Post Component
const Post = ({ author, date, comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [shares, setShares] = useState(7);

  const handleHeartClick = () => {
    setHearts(isLiked ? hearts - 1 : hearts + 1);
    setIsLiked(!isLiked);
  };

  const handleShareClick = () => {
    setShares(isShared ? shares - 1 : shares + 1);
    setIsShared(!isShared);
  };

  return (
    <Card className="my-3 p-3 profile-post">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="profile">F</div>
          <div className="ms-2">
            <h6 className="post-author">{author || "Anonymous"}</h6>
            <p className="post-date">{date || "Unknown Date"}</p>
          </div>
        </div>
        <div className="comment">
          <p>{comment}</p>
        </div>
        <Button variant="light" onClick={handleHeartClick} className="interaction-btn">
          <Heart color={isLiked ? "red" : "black"} fill={isLiked ? "red" : "none"} /> {hearts}
        </Button>
        <Button variant="light" className="ms-2 interaction-btn" onClick={handleShareClick}>
          <Send color={isShared ? "blue" : "black"} fill={isShared ? "blue" : "none"} /> {shares}
        </Button>
      </Card.Body>
    </Card>
  );
};

// Profile Component
const Profile = () => {
  // Sample posts data
  const posts = [
    { author: "Anonymous", date: "March 3, 2025", comment: "Been tired and drained lately." },
    { author: "Anonymous", date: "March 23, 2025", comment: "Feeling unwanted." },
  ];

  return (
    <Container fluid className="profile-container">
      <Row className="gx-3">
        <Col xs={12}>
          <Card className="profile-header">
            <Card.Img variant="top" src="https://i.pinimg.com/474x/2f/9d/a0/2f9da0bb1416cd6f672690fdadd02949.jpg" className="profile-cover" />
            <Card.Body>
              <div className="profile-info">
                <div className="profile-picture">F <span className="profile-add">+</span></div>
                <div className="follow-info">
                  <h4>20 Followers • 10 Following</h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Left Side */}
        <Col md={3} className="events-container">
          <Card className="mb-3 events-card">
            <Card.Header>Events</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="event-item">
                <img src="https://i.pinimg.com/474x/28/48/90/284890478ce284e141c993bbd0339e8c.jpg" alt="Yoga Session" />
                <h6>Join Yoga Session</h6>
                <p>Overcome stress and communicate with people.</p>
              </ListGroup.Item>
              <ListGroup.Item className="event-item">
                <img src="https://i.pinimg.com/736x/d7/ea/93/d7ea9311f847f6d3014b0f8431fce2e2.jpg" alt="Self-Care" />
                <h6>Build a Self-Care Routine</h6>
                <p>A self-care guide for everyone.</p>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* What's on your mind? */}
        <Col md={6} className="what-form">
          <Card className="my-3 p-3 post-card">
            <Card.Body className="d-flex align-items-center">
              <div className="profile">F</div>
              <input type="text" className="form-control post-input" placeholder="What's on your mind?" />
            </Card.Body>
          </Card>

          <Card className="my-3 p-3 post-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6>Posts</h6>
              <div>
                <Button variant="light" className="filter-btn">
                  <BsFilter /> Filters
                </Button>
                <Button variant="light" className="ms-2 manage-posts-btn">
                  <BsGear /> Manage posts
                </Button>
              </div>
            </Card.Header>
          </Card>
          

          {/* Render posts dynamically */}
          {posts.map((post, index) => (
            <Post key={index} author={post.author} date={post.date} comment={post.comment} />
          ))}
        </Col>

        
        <Col md={3} className="right-sidebar">
          <Card className="mb-3 right-sidebar-card">
            <Card.Header>Notifications</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="notification-item">
                <Bell className="me-2" /> Welcome to Thrive360!
              </ListGroup.Item>
              <ListGroup.Item className="notification-item">
                <CheckCircle className="me-2 text-success" />
                <strong>Yoga session</strong> request accepted.
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className="right-sidebar-card">
            <Card.Header>Recent Activity</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="recent-activity-item">Recent posts <ChevronRight /></ListGroup.Item>
              <ListGroup.Item className="recent-activity-item">Recent followers <ChevronRight /></ListGroup.Item>
              <ListGroup.Item className="recent-activity-item">Recent followings <ChevronRight /></ListGroup.Item>
              <ListGroup.Item className="recent-activity-item">Recent likes <ChevronRight /></ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>

    
  );
};

export default Profile;