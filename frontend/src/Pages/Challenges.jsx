import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Modal, Form, ProgressBar, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { challengesAPI } from "../services/api";
import FloatingPopup from "../Components/FloatingPopup";

const Challenges = () => {
  const { isLoggedIn } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    type: "",
    daysLeft: "",
    theme: "blue",
  });

  // Load challenges on component mount
  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      const challengesData = await challengesAPI.getChallenges();
      setChallenges(challengesData);
    } catch (err) {
      setError('Failed to load challenges');
      console.error('Error loading challenges:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
      return;
    }
    // else: navigate to challenge detail if you have it
  };

  const handleAddChallenge = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
      return;
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewChallenge((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitChallenge = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowPopup(true);
      return;
    }

    try {
      const challengeData = {
        title: newChallenge.title,
        description: newChallenge.description,
        type: newChallenge.type,
        days_left: newChallenge.daysLeft ? parseInt(newChallenge.daysLeft) : null,
        theme: newChallenge.theme,
      };

      console.log('Creating challenge with data:', challengeData);
      console.log('User logged in:', isLoggedIn);
      console.log('Auth token:', localStorage.getItem('authToken'));

      const createdChallenge = await challengesAPI.createChallenge(challengeData);
      console.log('Challenge created successfully:', createdChallenge);
      
      setChallenges([createdChallenge, ...challenges]);
      setNewChallenge({
        title: "",
        description: "",
        type: "",
        daysLeft: "",
        theme: "blue",
      });
      setShowModal(false);
    } catch (err) {
      console.error('Full error details:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      setError(`Failed to create challenge: ${err.message}`);
    }
  };

  return (
    <Container className="challenges-container">
      <div className="header text-center mb-4">
        <h2>Self-Care Challenges</h2>
        <p className="description">
          Improve your wellbeing through simple daily and weekly challenges designed to build healthy habits.
        </p>
      
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="progress-container mb-4">
        <h5>Your Progress</h5>
        <ProgressBar now={0} label="0%" className="main-progress" />
        <p>You’ve completed 0 of 5 active challenges. Keep going!</p>
      </div>

      <Row className="challenges-grid">
        {challenges.map((challenge, index) => (
          <Col lg={4} md={6} sm={12} key={challenge.id} className="challenge-card mb-4">
            <Card className={`challenge ${challenge.theme}`} onClick={handleCardClick}>
              <div className="card-header d-flex justify-content-between">
                <span className="type-tag">{challenge.type}</span>
                <span className="status-tag">{challenge.status}</span>
              </div>
              <Card.Body>
                <Card.Title>{challenge.title}</Card.Title>
                <Card.Text>{challenge.description}</Card.Text>

                <div className="details mb-2">
                  <span className="days-left">📅 {challenge.days_left ? `${challenge.days_left} Days left` : 'Ongoing'}</span>{" "}
                  <span className="participants">👥 {challenge.participants} participants</span>
                </div>

                {challenge.progress_percentage !== null && (
                  <div className="progress-section mb-2">
                    <span className="progress-label">Progress</span>
                    <ProgressBar now={challenge.progress_percentage} className="progress-bar" />
                    <small className="progress-text">{challenge.progress_percentage}% complete</small>
                  </div>
                )}

                <Button className="challenge-button">
                  {challenge.status === 'Not Started' ? 'Join Challenge' : 
                   challenge.status === 'Progress' ? 'Continue' : 'Completed'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="challenge-list">
        {challenges.map(chal => (
          <Card key={chal.id} className="mb-3 challenge-card" style={{ cursor: "pointer", position: "relative" }} onClick={handleCardClick}>
            <Card.Body>
              <Card.Title>{chal.title}</Card.Title>
              <Card.Text>{chal.preview}</Card.Text>
            </Card.Body>
            {!isLoggedIn && (
              <div className="challenge-card-overlay" style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(255,255,255,0.7)", display: "flex",
                alignItems: "center", justifyContent: "center", color: "#333",
                fontSize: "1em", borderRadius: "8px", pointerEvents: "auto", zIndex: 2
              }}>
                <span>Take your time. When you’re ready, log in to explore this feature.</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      <FloatingPopup show={showPopup} onHide={() => setShowPopup(false)} message="Take your time. When you’re ready, log in to explore this feature." />
    </Container>
  );
};

export default Challenges;
