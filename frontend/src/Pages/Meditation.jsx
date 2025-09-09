// Meditation.js
import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Meditation = () => {
  const [activeTab, setActiveTab] = useState("Meditation");
  const navigate = useNavigate();

  const guides = {
    Meditation: [
      {
        title: "Beginner’s Breath Awareness",
        category: "Mental Health",
        description:
          "A simple guide to start your meditation journey with breath awareness. This exercise helps you cultivate mindfulness by focusing on the natural rhythm of your breath, promoting relaxation, reducing mental clutter, and improving concentration. Perfect for beginners, it sets the foundation for deeper meditation practices.",
        image:
          "https://i.pinimg.com/736x/28/90/4e/28904e0443cc6749d2e004c2bbac7639.jpg",
        steps: [
          { step: 1, title: "Find a quiet and comfortable space to sit upright.", img: "https://i.pinimg.com/736x/74/02/c1/7402c10582bacde817fc759b5620d1da.jpg" },
          { step: 2, title: "Close your eyes gently and take a few deep breaths.", img: "https://i.pinimg.com/736x/0f/55/da/0f55da3a4a770eaf02c3d34a1b80f89d.jpg" },
          { step: 3, title: "Focus your attention on the sensation of your breath.", img: "https://i.pinimg.com/736x/1e/43/6e/1e436e5ee96a6ddc9d01b9b6ed048d64.jpg" },
          { step: 4, title: "If your mind wanders, gently bring it back to your breath.", img: "https://i.pinimg.com/736x/19/03/1c/19031cf6d8d451da5cdd3ec20f55e18c.jpg" },
        ],
      },
      {
        title: "Managing Anxiety and Stress",
        category: "Mental Health",
        description:
          "Techniques to manage stress and calm your mind during anxious moments. These practices teach you how to regulate your breathing, release tension, and regain focus. Regular practice can lower anxiety levels, improve sleep quality, and enhance your ability to handle everyday stressors.",
        image: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
        steps: [
          { step: 1, title: "Sit in a comfortable position and take a deep breath.", img: "https://i.pinimg.com/736x/bc/8d/d2/bc8dd2cb83b36bfb68f3443761f4c890.jpg" },
          { step: 2, title: "Breathe in for 4 seconds, hold for 4 seconds, exhale for 6 seconds.", img: "https://i.pinimg.com/736x/02/52/92/0252927e43e7e889ca88a4c3f49b6aa2.jpg" },
          { step: 3, title: "Repeat this cycle for 5 minutes while focusing on your breath.", img: "https://i.pinimg.com/736x/ae/b7/f9/aeb7f918d4701d05f3fb4d6f249fc6c2.jpg" },
        ],
      },
      {
        title: "Mindful Walking",
        category: "Mental Health",
        description:
          "A practice of walking slowly and being aware of each step you take. Mindful walking integrates gentle movement with mindfulness, helping you connect with your surroundings, release tension, and improve mental clarity. This technique is excellent for those who find sitting meditation challenging.",
        image: "https://i.pinimg.com/736x/f3/7e/7c/f37e7cda62ec4d1679c5112ffb63a89c.jpg",
        steps: [
          { step: 1, title: "Find a safe place to walk slowly.", img: "https://i.pinimg.com/736x/14/89/7e/14897ee84d60c34d94049b2f38c1c118.jpg" },
          { step: 2, title: "Pay attention to the sensation of your feet touching the ground.", img: "https://i.pinimg.com/736x/3c/08/bb/3c08bb16ef0d9e4126ec996ebda6f421.jpg" },
          { step: 3, title: "Breathe naturally as you walk mindfully.", img: "https://i.pinimg.com/736x/88/92/2a/88922aa8e36a907e424b09fa5d6c1db6.jpg" },
        ],
      },
      {
        title: "Body Scan Meditation",
        category: "Mental Health",
        description:
          "A guided relaxation practice to connect with your body. Body scanning helps you notice areas of tension, improve body awareness, and promote deep relaxation. Practicing this regularly can reduce stress, ease muscle tightness, and enhance your overall sense of well-being.",
        image: "https://i.pinimg.com/736x/6a/62/54/6a6254f0a5f0c4c8b6b55e2f5a7edb25.jpg",
        steps: [
          { step: 1, title: "Lie down in a comfortable position.", img: "https://i.pinimg.com/736x/59/ed/fc/59edfce8c387f4f07cf9d68c6c3120e5.jpg" },
          { step: 2, title: "Bring awareness to your feet and slowly move up to your head.", img: "https://i.pinimg.com/736x/86/13/47/861347a29dc45c505c7937c3e88e5a4d.jpg" },
          { step: 3, title: "Notice any tension and gently relax those areas.", img: "https://i.pinimg.com/736x/64/7e/0d/647e0d986e7740a0b8e2f024671e75f0.jpg" },
        ],
      },
    ],
    Stretching: [
      {
        title: "Morning Stretch Routine",
        category: "Physical Health",
        description:
          "Wake up your body with a refreshing stretch routine. This series of stretches helps increase circulation, improve flexibility, reduce morning stiffness, and prepare you mentally and physically for the day ahead.",
        image: "https://i.pinimg.com/736x/d7/6d/cd/d76dcddcfaadf653d5ab7a83e91f31d8.jpg",
        steps: [
          { step: 1, title: "Stand up straight and roll your shoulders backward.", img: "https://i.pinimg.com/736x/b6/6b/f2/b66bf2aa5d6a53f73c18b6b79b62b724.jpg" },
          { step: 2, title: "Reach your arms overhead and stretch tall.", img: "https://i.pinimg.com/736x/9a/93/83/9a9383d899c268cb87c0a8cc71f90bfb.jpg" },
        ],
      },
      {
        title: "Desk Stretching",
        category: "Physical Health",
        description:
          "Quick stretches to relax your muscles while working at a desk. These stretches help counteract the effects of prolonged sitting, release tension in your neck, shoulders, and back, and keep your body energized throughout the workday.",
        image: "https://i.pinimg.com/736x/b1/ab/14/b1ab1491a6a3ec8cfcd509a5891a45c4.jpg",
        steps: [
          { step: 1, title: "Stretch your arms above your head.", img: "https://i.pinimg.com/736x/5d/7a/f5/5d7af5f662f9ad4e7db2559c0c49a528.jpg" },
          { step: 2, title: "Gently twist your torso left and right.", img: "https://i.pinimg.com/736x/f5/53/7c/f5537ceee57c02d885be9d08b24c9a16.jpg" },
        ],
      },
    ],
    Workouts: [
      {
        title: "Full Body Beginner Workout",
        category: "Fitness",
        description:
          "A basic workout for beginners to improve strength and flexibility. This routine targets major muscle groups, enhances core stability, and builds stamina gradually. Ideal for those starting their fitness journey, it sets a solid foundation for more advanced workouts.",
        image: "https://i.pinimg.com/736x/45/aa/fd/45aafdd5b6bb21f77a50a89d33fcb1b5.jpg",
        steps: [
          { step: 1, title: "Start with 10 squats.", img: "https://i.pinimg.com/736x/18/15/7a/18157a6c691b7dff5d8ee0b1f29a9b12.jpg" },
          { step: 2, title: "Do 10 pushups on your knees or full pushups.", img: "https://i.pinimg.com/736x/55/82/46/558246e7d9f83fdc56a0a2ea8e3b97a6.jpg" },
          { step: 3, title: "Hold a plank for 20 seconds.", img: "https://i.pinimg.com/736x/3a/ef/66/3aef66543e0b1bc40745dc10547d96e1.jpg" },
        ],
      },
      {
        title: "Quick Cardio Blast",
        category: "Fitness",
        description:
          "Get your heart pumping with a short cardio session. This high-energy routine boosts cardiovascular fitness, increases endurance, and elevates your mood. Perfect for a quick workout when time is limited but results are needed.",
        image: "https://i.pinimg.com/736x/23/13/15/2313158c573589efc21f845d28e91ae5.jpg",
        steps: [
          { step: 1, title: "Do 20 jumping jacks.", img: "https://i.pinimg.com/736x/1f/83/c3/1f83c3b4acfa68d5a4a8c2c303d0e4ef.jpg" },
          { step: 2, title: "Run in place for 1 minute.", img: "https://i.pinimg.com/736x/42/eb/f3/42ebf325f69e0b9a97e45757c53f44d8.jpg" },
          { step: 3, title: "Finish with 15 burpees.", img: "https://i.pinimg.com/736x/da/26/b0/da26b063abf79b726dd6caa9f702c2bc.jpg" },
        ],
      },
    ],
  };

  const handleCardClick = (guide) => {
    navigate("/guide-detail", { state: { guide } });
  };

  return (
    <div className="meditation-page">
      <Container className="meditation-container">
        <div className="header">
          <h2 className="text-center">Guided Meditation & Exercise</h2>
          <p className="text-center descriptiion">
            Follow step-by-step guides designed to help you practice mindfulness,
            reduce stress, enhance mental clarity, and stay physically active. Each guide
            provides clear instructions, images, and structured steps to make your journey
            easier and more effective.
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          {Object.keys(guides).map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Guide Grid */}
        <Row className="guide-grid">
          {guides[activeTab].map((guide, index) => (
            <Col
              md={3}
              sm={6}
              xs={12}
              key={index}
              className="guide-card"
              onClick={() => handleCardClick(guide)}
            >
              <Card className="equal-height-card clickable-card">
                <div className="image-placeholder">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="card-image"
                  />
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
