// Meditation.js
import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import FloatingPopup from "../Components/FloatingPopup";
import "../App.css";

const Meditation = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All Topics");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [guides, setGuides] = useState({
    "All Topics": [],
    Meditation: [],
    Stretching: [],
    Workouts: [],
  });

  // 🔹 Backend base URL
  const BASE_URL = "http://127.0.0.1:8000";

  // 🔹 Hardcoded guides (same as before)
  const hardcodedGuides = {
    Meditation: [
      {
        title: "Beginner’s Breath Awareness",
        category: "Mental Health",
        description:
          "A simple guide to start your meditation journey with breath awareness...",
        image:
          "https://i.pinimg.com/736x/28/90/4e/28904e0443cc6749d2e004c2bbac7639.jpg",
        steps: [
          {
            step: 1,
            title: "Find a quiet and comfortable space to sit upright.",
            img: "https://i.pinimg.com/736x/74/02/c1/7402c10582bacde817fc759b5620d1da.jpg",
          },
          {
            step: 2,
            title: "Close your eyes gently and take a few deep breaths.",
            img: "https://i.pinimg.com/736x/0f/55/da/0f55da3a4a770eaf02c3d34a1b80f89d.jpg",
          },
          {
            step: 3,
            title: "Focus on the sensation of your breath.",
            img: "https://i.pinimg.com/736x/1e/43/6e/1e436e5ee96a6ddc9d01b9b6ed048d64.jpg",
          },
          {
            step: 4,
            title: "If your mind wanders, gently bring it back.",
            img: "https://i.pinimg.com/736x/19/03/1c/19031cf6d8d451da5cdd3ec20f55e18c.jpg",
          },
        ],
      },
      {
        title: "Managing Anxiety and Stress",
        category: "Mental Health",
        description:
          "Techniques to manage stress and calm your mind during anxious moments...",
        image:
          "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
        steps: [
          {
            step: 1,
            title: "Sit comfortably and take a deep breath.",
            img: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
          },
          {
            step: 2,
            title: "Breathe in 4s, hold 4s, exhale 6s.",
            img: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
          },
          {
            step: 3,
            title: "Repeat this cycle for 5 minutes.",
            img: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg",
          },
        ],
      },
    ],
    Stretching: [
      {
        title: "Morning Stretch Routine",
        category: "Physical Health",
        description: "Wake up your body with a refreshing stretch routine...",
        image:
          "https://i.pinimg.com/736x/d7/6d/cd/d76dcddcfaadf653d5ab7a83e91f31d8.jpg",
        steps: [
          {
            step: 1,
            title: "Stand tall and roll your shoulders backward.",
            img: "https://i.pinimg.com/736x/b6/6b/f2/b66bf2aa5d6a53f73c18b6b79b62b724.jpg",
          },
          {
            step: 2,
            title: "Reach your arms overhead and stretch tall.",
            img: "https://i.pinimg.com/736x/9a/93/83/9a9383d899c268cb87c0a8cc71f90bfb.jpg",
          },
        ],
      },
    ],
    Workouts: [
      {
        title: "Full Body Beginner Workout",
        category: "Fitness",
        description:
          "A basic workout for beginners to improve strength and flexibility...",
        image:
          "https://i.pinimg.com/736x/45/aa/fd/45aafdd5b6bb21f77a50a89d33fcb1b5.jpg",
        steps: [
          {
            step: 1,
            title: "Start with 10 squats.",
            img: "https://i.pinimg.com/736x/18/15/7a/18157a6c691b7dff5d8ee0b1f29a9b12.jpg",
          },
          {
            step: 2,
            title: "Do 10 pushups (knees or full).",
            img: "https://i.pinimg.com/736x/55/82/46/558246e7d9f83fdc56a0a2ea8e3b97a6.jpg",
          },
          {
            step: 3,
            title: "Hold a plank for 20s.",
            img: "https://i.pinimg.com/736x/3a/ef/66/3aef66543e0b1bc40745dc10547d96e1.jpg",
          },
        ],
      },
    ],
  };

  // ✅ Normalize backend image URL
  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/600x400?text=Meditation";
    if (image.startsWith("http")) return image;
    return `${BASE_URL}${image}`;
  };

  // ✅ Fetch backend and merge with hardcoded
  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/meditation`);
        if (!res.ok) throw new Error("Failed to load meditations");
        const data = await res.json();

        const mapped = (Array.isArray(data) ? data : []).map((m) => ({
          title: m.title,
          category: m.category || "Meditation",
          description: m.description,
          image: getImageUrl(m.image_url || m.image),
          steps: [],
        }));

        const meditationData = [...hardcodedGuides.Meditation, ...mapped];
        const stretchingData = [...hardcodedGuides.Stretching];
        const workoutData = [...hardcodedGuides.Workouts];

        setGuides({
          "All Topics": [...meditationData, ...stretchingData, ...workoutData],
          Meditation: meditationData,
          Stretching: stretchingData,
          Workouts: workoutData,
        });
      } catch (e) {
        console.error("Error fetching meditations:", e);
        const all = [
          ...hardcodedGuides.Meditation,
          ...hardcodedGuides.Stretching,
          ...hardcodedGuides.Workouts,
        ];
        setGuides({ "All Topics": all, ...hardcodedGuides });
      }
    };
    fetchMeditations();
  }, []);

  // ✅ Card click → detail
  const handleCardClick = (guide) => {
    if (isLoggedIn) {
      navigate("/guide-detail", { state: { guide } });
    } else {
      setShowPopup(true);
    }
  };

  // ✅ Search filter
  const filteredGuides = guides[activeTab].filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="meditation-page">
      <Container className="meditation-container">
        {/* 🔹 Category Tabs + Search */}
        <div className="category-search-container">
          <div className="categories">
            {Object.keys(guides).map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search guides..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 🔹 Guides Grid */}
        <div className="guide-grid">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide, index) => (
              <Card
                key={index}
                className="meditation-card guide-card"
                onClick={() => handleCardClick(guide)}
              >
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="card-image"
                />
                <Card.Body>
                  <span className="guide-categories">{guide.category}</span>
                  <Card.Title className="card-title">{guide.title}</Card.Title>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">No guides found.</p>
          )}
        </div>
      </Container>

      <FloatingPopup show={showPopup} onHide={() => setShowPopup(false)} />
    </div>
  );
};

export default Meditation;
