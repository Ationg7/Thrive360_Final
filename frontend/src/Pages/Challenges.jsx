import React, { createContext, useState, useContext, useEffect } from "react";
import { Container, Card, ProgressBar, Button, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { challengesAPI } from "../services/api";
import FloatingPopup from "../Components/FloatingPopup";

// -------------------- Context --------------------
const ChallengesContext = createContext();

export const ChallengesProvider = ({ children }) => {
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const { isLoggedIn } = useAuth();

  // Load challenges from API
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await challengesAPI.getChallenges();
        setJoinedChallenges(
          data.map((c) => ({
            ...c,
            progress: c.progress_percentage ?? 0,
            status: c.status ?? "Not Started",
          }))
        );
      } catch (err) {
        console.error("Error loading challenges:", err);
      }
    };
    loadChallenges();
  }, []);

  const joinChallenge = (challenge) => {
    setJoinedChallenges((prev) => {
      if (prev.some((c) => c.title === challenge.title)) return prev;
      return [...prev, { ...challenge, status: "In Progress", progress: 0 }];
    });
  };

  const markDone = (title) => {
    setJoinedChallenges((prev) =>
      prev.map((c) =>
        c.title === title
          ? {
              ...c,
              progress: Math.min(c.progress + 20, 100),
              status: c.progress + 20 >= 100 ? "Completed" : "In Progress",
            }
          : c
      )
    );
  };

  return (
    <ChallengesContext.Provider value={{ joinedChallenges, joinChallenge, markDone }}>
      {children}
    </ChallengesContext.Provider>
  );
};

export const useChallenges = () => useContext(ChallengesContext);

// -------------------- Overview Page --------------------
const ChallengesOverview = () => {
  const { isLoggedIn } = useAuth();
  const { joinedChallenges, markDone } = useChallenges();
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

  const handleCardClick = () => {
    if (!isLoggedIn) setShowPopup(true);
  };

  return (
    <Container className="challenges-container">
      <div className="header text-center mb-4">
        <h2>Self-Care Challenges</h2>
        <p className="description">
          Track your progress and build healthy habits over time.
        </p>
        <Link to="/challenges/categories">
          <Button variant="success">+ Join More Challenges</Button>
        </Link>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div className="progress-container mb-4">
        <h5>Your Progress</h5>
        <ProgressBar
          now={
            joinedChallenges.length > 0
              ? (joinedChallenges.filter((c) => c.status === "Completed").length /
                  joinedChallenges.length) *
                100
              : 0
          }
          label={`${joinedChallenges.filter((c) => c.status === "Completed").length} / ${
            joinedChallenges.length
          } Completed`}
          className="main-progress"
        />
      </div>

      <Row className="challenges-grid">
        {joinedChallenges.map((challenge, index) => (
          <Col lg={4} md={6} sm={12} key={index} className="challenge-card mb-4">
            <Card
              className={`challenge ${challenge.theme}`}
              onClick={handleCardClick}
              style={{ minHeight: "300px" }}
            >
              <div className="card-header d-flex justify-content-between">
                <span className="type-tag">{challenge.type}</span>
                <span className="status-tag">{challenge.status}</span>
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{challenge.title}</Card.Title>
                <Card.Text>{challenge.description}</Card.Text>

                <div className="details mb-2 d-flex justify-content-between">
                  <span>📅 {challenge.days_left ?? challenge.daysLeft}</span>
                  <span>👥 {challenge.participants}</span>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <ProgressBar now={challenge.progress} animated striped />

                <Button
                  className="challenge-button mt-2"
                  onClick={() => {
                    if (!isLoggedIn) {
                      setShowPopup(true);
                    } else {
                      markDone(challenge.title);
                    }
                  }}
                  disabled={challenge.status === "Completed"}
                >
                  {challenge.status === "Completed" ? "Completed 🎉" : "Mark as Done ✅"}
                </Button>
              </Card.Body>

              {!isLoggedIn && (
                <div
                  className="challenge-card-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#333",
                    fontSize: "1em",
                    borderRadius: "8px",
                    pointerEvents: "auto",
                    zIndex: 2,
                  }}
                >
                  <span>
                    Take your time. When you’re ready, log in to explore this feature.
                  </span>
                </div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <FloatingPopup
        show={showPopup}
        onHide={() => setShowPopup(false)}
        message="Take your time. When you’re ready, log in to explore this feature."
      />
    </Container>
  );
};

// -------------------- Export --------------------
export default function Challenges() {
  return (
    <ChallengesProvider>
      <ChallengesOverview />
    </ChallengesProvider>
  );
}
