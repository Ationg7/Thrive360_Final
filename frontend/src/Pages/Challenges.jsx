import React from "react";
import { Container, Row, Col, Card, ProgressBar, Button } from "react-bootstrap";


const Challenges = () => {
  const challenges = [
    {
      title: "Morning Mindfulness",
      description: "Start your daily with 5 minutes of mindful breathing to center yourself before classes begin.",
      type: "Daily",
      status: "Progress",
      daysLeft: "2 Days left",
      participants: 120,
      buttonText: "Mark Complete",
      progress: null,
      theme: "blue",
    },
    {
      title: "Digital Detox",
      description: "Spend 2 hours each day without digital devices. Use the time for reading, walking, or in-person corrections.",
      type: "Weekly",
      status: "Progress",
      daysLeft: "5 Days left",
      participants: 156,
      buttonText: "Completed",
      progress: 30,
      theme: "purple",
    },
    {
      title: "Gratitude Journal",
      description: "Write down three things you’re grateful for each day this month. Watch how it transforms your outlook.",
      type: "Monthly",
      status: "Not Started",
      daysLeft: "Starts Oct 1",
      participants: 83,
      buttonText: "Join Challenge",
      progress: null,
      theme: "lightblue",
    },
  ];

  return (
    <Container className="challenges-container">
            <div className="header">
      <h2 className="text-center">Self-Care Challenges</h2>
      <p className="text-center description">
        Improve your wellbeing through simple daily and weekly challenges designed to build healthy habits.
      </p>
      </div>
      {/* Progress Section */}
      <div className="progress-container">
        <h5>Your Progress</h5>
        <ProgressBar now={0} label="0%" className="main-progress" />
        <p>You’ve completed 0 of 5 active challenges. Keep going!</p>
      </div>

      {/* Challenges Section */}
      <Row className="challenges-grid">
        {challenges.map((challenge, index) => (
          <Col lg={4} md={6} sm={12} key={index} className="challenge-card">
            <Card className={`challenge ${challenge.theme}`}>
              <div className="card-header">
                <span className="type-tag">{challenge.type}</span>
                <span className={`status-tag ${challenge.status.toLowerCase()}`}>{challenge.status}</span>
              </div>
              <Card.Body>
                <Card.Title>{challenge.title}</Card.Title>
                <Card.Text>{challenge.description}</Card.Text>
                <div className="details">
                  <span className="days-left">📅 {challenge.daysLeft}</span>
                  <span className="participants">👥 {challenge.participants} participants</span>
                </div>
                {challenge.progress !== null && (
                  <div className="progress-section">
                    <span className="progress-label">Progress</span>
                  <ProgressBar now={challenge.progress} className="progress-bar" style={{ backgroundColor: "darkgreen" }} />

                    <small className="progress-text">Day {challenge.progress / 10} of 7</small>
                  </div>
                )}
                <Button className="challenge-button">{challenge.buttonText}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Challenges;