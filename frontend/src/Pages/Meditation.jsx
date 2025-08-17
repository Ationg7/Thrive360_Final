import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Meditation = () => {
 const guides = [
  {
    title: "Beginner’s Breath Awareness",
    category: "Mental Health",
    image: "https://i.pinimg.com/736x/28/90/4e/28904e0443cc6749d2e004c2bbac7639.jpg",
  },
  {
    title: "Practical Strategies for Managing Anxiety and Stress",
    category: "Mental Health",
    image: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
  },
  {
    title: "Practical Strategies for Managing Anxiety and Stress",
    category: "Mental Health",
    image: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
  },
  {
    title: "Practical Strategies for Managing Anxiety and Stress",
    category: "Mental Health",
    image: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
  },
  {
    title: "Practical Strategies for Managing Anxiety and Stress",
    category: "Mental Health",
    image: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
  },
  {
    title: "Practical Strategies for Managing Anxiety and Stress",
    category: "Mental Health",
    image: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
  },
  {
    title: "Practical Strategies for Managing Anxiety and Stress",
    category: "Mental Health",
    image: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
  },
  {
    title: "Practical Strategies for Managing Anxiety and Stress",
    category: "Mental Health",
    image: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
  },
  {
    title: "Practical Strategies for Managing Anxiety and Stress",
    category: "Mental Health",
    image: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
  },
  // Add more items if needed
];

  return (
    <div className="meditation-page">
      <Container className="meditation-container">
      <div className="header">
        <h2 className="text-center">Guided Meditation & Exercise</h2>
        <p className="text-center subtitle">
          Follow step-by-step guides designed to help you practice mindfulness, reduce stress, and stay physically active.
        </p>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button className="tab active">Meditation</button>
          <button className="tab">Stretching</button>
          <button className="tab">Workouts</button>
        </div>

        {/* Guide Grid */}
        <Row className="guide-grid">
          {guides.map((guide, index) => (
            <Col md={3} sm={6} xs={12} key={index} className="guide-card">
              <Card className="equal-height-card">
                <div className="image-placeholder">
                  <img src={guide.image} alt="Guide" className="card-image" />
                </div>
                <Card.Body className="card-body">
                  <span className="guide-category">{guide.category}</span>
                  <Card.Title>{guide.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Meditation;