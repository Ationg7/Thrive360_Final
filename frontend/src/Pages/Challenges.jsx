import React, { useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Button, Modal, Form } from "react-bootstrap";

const Challenges = () => {
  const [challenges, setChallenges] = useState([
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    type: "",
    status: "Not Started",
    daysLeft: "",
    participants: 0,
    buttonText: "Join Challenge",
    progress: null,
    theme: "lightblue",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewChallenge((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChallenge = () => {
    setChallenges((prev) => [...prev, newChallenge]);
    setShowModal(false);
    setNewChallenge({
      title: "",
      description: "",
      type: "",
      status: "Not Started",
      daysLeft: "",
      participants: 0,
      buttonText: "Join Challenge",
      progress: null,
      theme: "lightblue",
    });
  };

  return (
    <Container className="challenges-container">
      <div className="header text-center mb-4">
        <h2>Self-Care Challenges</h2>
        <p className="description">
          Improve your wellbeing through simple daily and weekly challenges designed to build healthy habits.
        </p>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Add Challenge
        </Button>
      </div>

      <div className="progress-container mb-4">
        <h5>Your Progress</h5>
        <ProgressBar now={0} label="0%" className="main-progress" />
        <p>You’ve completed 0 of 5 active challenges. Keep going!</p>
      </div>

      <Row className="challenges-grid">
        {challenges.map((challenge, index) => (
          <Col lg={4} md={6} sm={12} key={index} className="challenge-card mb-4">
            <Card className={`challenge ${challenge.theme}`}>
              <div className="card-header d-flex justify-content-between">
                <span className="type-tag">{challenge.type}</span>
                <span className="status-tag">{challenge.status}</span>
              </div>
              <Card.Body>
                <Card.Title>{challenge.title}</Card.Title>
                <Card.Text>{challenge.description}</Card.Text>

                <div className="details mb-2">
                  <span className="days-left">📅 {challenge.daysLeft}</span>{" "}
                  <span className="participants">👥 {challenge.participants} participants</span>
                </div>

                {challenge.progress !== null && (
                  <div className="progress-section mb-2">
                    <span className="progress-label">Progress</span>
                    <ProgressBar now={challenge.progress} className="progress-bar" />
                    <small className="progress-text">Day {challenge.progress / 10} of 7</small>
                  </div>
                )}

                <Button className="challenge-button">{challenge.buttonText}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Adding Challenge */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#e6f4ea" }} // header background
        >
          <Modal.Title>Add New Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newChallenge.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description" // ✅ fixed
                value={newChallenge.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={newChallenge.type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Days Left</Form.Label>
              <Form.Control
                type="text"
                name="daysLeft"
                value={newChallenge.daysLeft}
                onChange={handleChange}
              />
            </Form.Group>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddChallenge}>
            Add Challenge
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Challenges;
