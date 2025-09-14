import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Using react-router for navigation

const WellnessFeatures = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Freedom Wall",
      description:
        "Share your thoughts anonymously and connect with others who understand what you're going through.",
      link: "/freedomwall",
      linkText: "Explore Wall",
    },
    {
      title: "Health & Wellness Blogs",
      description:
        "Access expert tips on exercise, nutrition, meditation, and self-care techniques.",
      link: "/wellnessblog",
      linkText: "Read Articles",
    },
    {
      title: "Guided Meditation & Exercise",
      description:
        "Follow step-by-step guides to practice mindfulness, reduce stress, and stay active.",
      link: "/meditation",
      linkText: "Start Now",
    },
    {
      title: "Self-Care Challenges",
      description:
        "Engage in daily and weekly challenges designed to promote better mental and physical health.",
      link: "/challenges",
      linkText: "Take a Challenge",
    },
  ];

  return (
    <Container fluid className="wellness-section d-flex flex-column">
      <div className="header-container">
        <h2 className="header-title">Our Wellness Features</h2>
        <p className="header-text">
          Explore the tools we offer to help you maintain balance, find community support, and grow stronger every day.
        </p>
      </div>

      <div className="features-container mt-auto">
        <Row className="justify-content-center">
          {features.map((feature, index) => (
            <Col key={index} md={3} sm={6} className="d-flex mb-4">
              <Card
                className="feature-card p-3 shadow-sm w-100"
                style={{ cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
                onClick={() => navigate(feature.link)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
              >
                <Card.Body className="d-flex flex-column">
                  <div className="feature-icon mb-3">
                    <FaCircle color="white" size={15} />
                  </div>
                  {/* Updated card title size */}
                  <Card.Title className="fw-bold" style={{ fontSize: "1.05rem" }}>
                    {feature.title}
                  </Card.Title>
                  <Card.Text className="flex-grow-1">{feature.description}</Card.Text>
                  <span className="text-primary mt-auto">{feature.linkText}</span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default WellnessFeatures;
