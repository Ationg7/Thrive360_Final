// Meditation.js
import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import FloatingPopup from "../Components/FloatingPopup";
import { useNavigate } from "react-router-dom"; // ✅ Added this
import "./Meditation.css"; // Make sure this CSS exists

const Meditation = () => {
  const { isLoggedIn } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("Meditation");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [guides, setGuides] = useState({ Meditation: [], Stretching: [], Workouts: [] });

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/admin/meditation');
        if (!res.ok) throw new Error('Failed to load meditations');
        const data = await res.json();
        const mapped = (Array.isArray(data) ? data : []).map(m => ({
          title: m.title,
          category: m.category || 'Meditation',
          description: m.description,
          image: m.image_url || 'https://via.placeholder.com/600x400?text=Meditation',
          steps: []
        }));
        setGuides({ Meditation: mapped, Stretching: [], Workouts: [] });
      } catch (e) {
        console.error('Error fetching meditations:', e);
        setGuides({ Meditation: [], Stretching: [], Workouts: [] });
      }
    };
    fetchMeditations();
  }, []);

  const guidesStatic = {
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
          { step: 1, title: "Sit in a comfortable position and take a deep breath.", img: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg" },
          { step: 2, title: "Breathe in for 4 seconds, hold for 4 seconds, exhale for 6 seconds.", img: ":/https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg" },
          { step: 3, title: "Repeat this cycle for 5 minutes while focusing on your breath.", img: "https://i.pinimg.com/474x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg" },
        ],
      },
      {
        title: "Mindful Walking",
        category: "Mental Health",
        description:
          "A practice of walking slowly and being aware of each step you take. Mindful walking integrates gentle movement with mindfulness, helping you connect with your surroundings, release tension, and improve mental clarity. This technique is excellent for those who find sitting meditation challenging.",
        image: "https://i.pinimg.com/736x/28/90/4e/28904e0443cc6749d2e004c2bbac7639.jpg",
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
        title: "Evening Stretch Routine",
        category: "Physical Health",
        description:
          "Relax your muscles and improve flexibility before bed. These stretches help release tension accumulated throughout the day, promoting better sleep and reducing stiffness.",
        image: "https://i.pinimg.com/736x/12/34/56/123456abcdef.jpg",
        steps: [
          { step: 1, title: "Sit on the floor and stretch your legs forward.", img: "https://i.pinimg.com/736x/ab/cd/ef/abcdef123456.jpg" },
          { step: 2, title: "Reach for your toes and hold for 20 seconds.", img: "https://i.pinimg.com/736x/98/76/54/9876543210.jpg" },
        ],
      },
            {
        title: "Evening Stretch Routine",
        category: "Physical Health",
        description:
          "Relax your muscles and improve flexibility before bed. These stretches help release tension accumulated throughout the day, promoting better sleep and reducing stiffness.",
        image: "https://i.pinimg.com/736x/12/34/56/123456abcdef.jpg",
        steps: [
          { step: 1, title: "Sit on the floor and stretch your legs forward.", img: "https://i.pinimg.com/736x/ab/cd/ef/abcdef123456.jpg" },
          { step: 2, title: "Reach for your toes and hold for 20 seconds.", img: "https://i.pinimg.com/736x/98/76/54/9876543210.jpg" },
        ],
      },
            {
        title: "Evening Stretch Routine",
        category: "Physical Health",
        description:
          "Relax your muscles and improve flexibility before bed. These stretches help release tension accumulated throughout the day, promoting better sleep and reducing stiffness.",
        image: "https://i.pinimg.com/736x/12/34/56/123456abcdef.jpg",
        steps: [
          { step: 1, title: "Sit on the floor and stretch your legs forward.", img: "https://i.pinimg.com/736x/ab/cd/ef/abcdef123456.jpg" },
          { step: 2, title: "Reach for your toes and hold for 20 seconds.", img: "https://i.pinimg.com/736x/98/76/54/9876543210.jpg" },
        ],
      },
            {
        title: "Evening Stretch Routine",
        category: "Physical Health",
        description:
          "Relax your muscles and improve flexibility before bed. These stretches help release tension accumulated throughout the day, promoting better sleep and reducing stiffness.",
        image: "https://i.pinimg.com/736x/12/34/56/123456abcdef.jpg",
        steps: [
          { step: 1, title: "Sit on the floor and stretch your legs forward.", img: "https://i.pinimg.com/736x/ab/cd/ef/abcdef123456.jpg" },
          { step: 2, title: "Reach for your toes and hold for 20 seconds.", img: "https://i.pinimg.com/736x/98/76/54/9876543210.jpg" },
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
    ],
  };


  const handleCardClick = (guide) => {
    if (isLoggedIn) {
      navigate("/guide-detail", { state: { guide } }); // ✅ Navigate if logged in
    } else {
      setShowPopup(true); // ✅ Show popup if guest
    }
  };

  const filteredGuides = guides[activeTab].filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="meditation-page">
      <Container className="wellness-container">
        {/* Header */}
        <div className="header">
          <h2 className="text-center">Guided Meditation & Exercise</h2>
          <p className="text-center description">
            Follow step-by-step guides designed to help you practice
            mindfulness, reduce stress, enhance mental clarity, and stay
            physically active.
          </p>
        </div>

        {/* Categories + Search */}
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

        {/* Guides Grid */}
        <div className="guide-grid">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide, index) => (
              <Card
                key={index}
                className="blog-card clickable-card"
                onClick={() => handleCardClick(guide)}
              >
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="card-image"
                />
                <Card.Body>
                  <span className="blog-category">{guide.category}</span>
                  <Card.Title className="blog-title">{guide.title}</Card.Title>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">No guides found.</p>
          )}
        </div>
      </Container>

      {/* ✅ Popup fixed to close correctly */}
      <FloatingPopup show={showPopup} onHide={() => setShowPopup(false)} />
    </div>
  );
};

export default Meditation;
