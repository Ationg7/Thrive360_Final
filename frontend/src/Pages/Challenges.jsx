import React, { createContext, useState, useContext, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { challengesAPI } from "../services/api";
import FloatingPopup from "../Components/FloatingPopup";
import { Link } from "react-router-dom";
import "../App.css";

// -------------------- Context --------------------
const ChallengesContext = createContext();

export const ChallengesProvider = ({ children }) => {
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await challengesAPI.getChallenges();
        setJoinedChallenges(
          data.map((c) => ({
            ...c,
            progress: c.progress_percentage ?? 0,
            status: c.status ?? "Not Started",
            theme: c.theme ?? "blue",
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

  // ✅ Updated: 1-click completion
  const markDone = (title) => {
    setJoinedChallenges((prev) =>
      prev.map((c) =>
        c.title === title
          ? {
              ...c,
              progress: 100,       // instantly complete
              status: "Completed", // mark as completed
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

  const handleCardClick = () => {
    if (!isLoggedIn) setShowPopup(true);
  };

  const challengeTypes = ["Daily", "Weekly", "Monthly"];

  const completedCount = joinedChallenges.filter((c) => c.status === "Completed").length;
  const totalChallenges = joinedChallenges.length;
  const completedPercent = totalChallenges
    ? Math.round((completedCount / totalChallenges) * 100)
    : 0;

  const getTheme = (type) => {
    if (type === "Daily") return "blue";
    if (type === "Weekly") return "purple";
    return "lightblue"; // Monthly
  };

  return (
    <Container className="challenges-container">
      {/* Top Progress Bar */}
      <div className="progress-container mb-3" style={{ marginTop: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>Your Progress</span>
          <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>{completedPercent}%</span>
        </div>

        <div
          style={{
            position: "relative",
            height: "16px",
            backgroundColor: "#f1f3f5",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${completedPercent}%`,
              backgroundColor: "#28a745",
              height: "100%",
              borderRadius: "8px",
              transition: "width 0.4s ease",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: 500,
              fontSize: "0.8rem",
              color: "black",
              pointerEvents: "none",
            }}
          >
            {completedCount} / {totalChallenges}
          </span>
        </div>
      </div>

      {/* Sections for Daily / Weekly / Monthly */}
      {challengeTypes.map((type) => {
        const filteredChallenges = joinedChallenges.filter((c) => c.type === type);
        if (!filteredChallenges.length) return null;

        return (
          <div
            key={type}
            className="challenge-section mb-5"
            style={{
              width: "100%",
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              padding: "16px 12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h4 style={{ textAlign: "left", margin: 0 }}>{type} Challenges</h4>

              {type === "Daily" && (
                <Link to="/challenges/categories">
                  <Button variant="success" size="sm">
                    + Join More Challenges
                  </Button>
                </Link>
              )}
            </div>

            <div
              className="challenges-grid"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "flex-start",
              }}
            >
              {filteredChallenges.map((challenge, index) => (
                <div key={index} style={{ flex: "0 0 32%", minWidth: "280px", maxWidth: "32%" }}>
                  <Card
                    className={`challenge ${getTheme(type)}`}
                    onClick={handleCardClick}
                    style={{ minHeight: "350px" }}
                  >
                    <div className="card-header d-flex justify-content-between">
                      <span className="type-tag">{challenge.type}</span>
                      <span
                        className={`status-tag ${
                          challenge.status.toLowerCase().replace(/\s/g, "") || "notstarted"
                        }`}
                      >
                        {challenge.status === "In Progress"
                          ? "In Progress "
                          : challenge.status === "Completed"
                          ? "Completed "
                          : "Not Started "}
                      </span>
                    </div>

                    <Card.Body className="d-flex flex-column gap-2">
                      <Card.Title>{challenge.title}</Card.Title>
                      <Card.Text>{challenge.description}</Card.Text>

                      <div className="details d-flex justify-content-between">
                        <span>📅 {challenge.days_left ?? challenge.daysLeft ?? 34} days left</span>
                        <span>👥 {challenge.participants ?? 140} participants</span>
                      </div>

                      <Button
                        className="challenge-button mt-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isLoggedIn) setShowPopup(true);
                          else markDone(challenge.title);
                        }}
                        disabled={challenge.status === "Completed"}
                      >
                        {challenge.status === "Completed" ? "Completed " : "Mark as Done "}
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <FloatingPopup
        show={showPopup}
        onHide={() => setShowPopup(false)}
        message="Take your time. When you’re ready, log in to explore this feature."
      />
    </Container>
  );
};

export default function Challenges() {
  return (
    <ChallengesProvider>
      <ChallengesOverview />
    </ChallengesProvider>
  );
}
