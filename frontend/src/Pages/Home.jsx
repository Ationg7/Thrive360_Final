import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";

const WellnessFeatures = () => {
  const features = [
    {
      title: "Freedom Wall",
      description:
        "Share your thoughts anonymously and connect with others who understand what you're going through.",
      link: "#",
      linkText: "Explore Wall",
    },
    {
      title: "Health & Wellness Blogs",
      description:
        "Access expert tips on exercise, nutrition, meditation, and self-care techniques.",
      link: "#",
      linkText: "Read Articles",
    },
    {
      title: "Guided Meditation & Exercise",
      description:
        "Follow step-by-step guides to practice mindfulness, reduce stress, and stay active.",
      link: "#",
      linkText: "Start Now",
    },
    {
      title: "Self-Care Challenges",
      description:
        "Engage in daily and weekly challenges designed to promote better mental and physical health.",
      link: "#",
      linkText: "Take a Challenge",
    },
    {
      title: "Fitness & Wellness",
      description:
        "Stay fit with workout routines, diet plans, and expert wellness guidance.",
      link: "#",
      linkText: "Get Fit",
    },
  ];

  return (
    <Container fluid className="wellness-section d-flex flex-column">
      {/* HEADER AT THE TOP */}
    <div className="header-container">
  <h2 className="header-title">Our Wellness Features</h2>
  <p className="header-text">
    Explore the tools we offer to help you maintain balance, find community support, and grow stronger every day.
  </p>
</div>
      {/* CARDS ALIGNED AT THE BOTTOM */}
      <div className="features-container mt-auto">
        <Row className="justify-content-center">
          {features.map((feature, index) => (
            <Col key={index} md={2} sm={6} className="d-flex">
              <Card className="feature-card p-3 shadow-sm w-200">
                <Card.Body className="d-flex flex-column">
                  <div className="feature-icon">
                    <FaCircle color="white" size={15} />
                  </div>
                  <Card.Title className="fw-bold mt-4">{feature.title}</Card.Title>
                  <Card.Text className="flex-grow-1">{feature.description}</Card.Text>
                  <a href={feature.link} className="text-primary mt-auto">
                    {feature.linkText}
                  </a>
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
