import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import FloatingPopup from "../Components/FloatingPopup";
import "./WellnessBlog.css"; // Create this CSS file

const WellnessBlog = () => {
  const { isLoggedIn } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "Finding Balance: How to Manage Academic Stress",
      category: "Mental Health",
      image:
        "https://i.pinimg.com/474x/1e/e6/6a/1ee66a4517d068f5db3b0443684b748b.jpg",
      fullText: `Academic stress is something that almost every student faces...`,
      author: "Dr. Channy San",
      topFoods: ["Dark Chocolate", "Green Tea", "Blueberries", "Salmon", "Walnuts"],
    },
    {
      id: 2,
      title: "Brain Foods: Eating for Academic Success",
      category: "Nutrition",
      image:
        "https://i.pinimg.com/474x/86/6a/d0/866ad0b1e99a5a6a7809ebe4801b2147.jpg",
      fullText: `The food you eat has a direct impact on how your brain functions...`,
      author: "Dr. Channy San",
      topFoods: ["Salmon", "Walnuts", "Flaxseeds", "Blueberries", "Dark Chocolate"],
    },
    {
      id: 3,
      title: "The Student’s Guide to Quality Sleep",
      category: "Physical Wellness",
      image:
        "https://i.pinimg.com/474x/0b/70/38/0b70385eece9929f2460e7e18f8a15e5.jpg",
      fullText: `Quality sleep is often overlooked by students...`,
      author: "Dr. Channy San",
      topFoods: ["Almonds", "Kiwi", "Chamomile Tea", "Turkey", "Bananas"],
    },
    {
      id: 4,
      title: "Stress-Free Studying: Mind Hacks for Exams",
      category: "Stress Management",
      image:
        "https://i.pinimg.com/474x/1e/3e/88/1e3e8884e34fa76dfcfe969d1ec0bb88.jpg",
      fullText: `Exams don’t have to be overwhelming if you approach studying...`,
      author: "Dr. Channy San",
      topFoods: ["Dark Chocolate", "Green Tea", "Blueberries", "Salmon", "Nuts"],
    },
  ];

  const filteredBlogs =
    activeCategory === "All Topics"
      ? blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : blogs.filter(
          (blog) =>
            blog.category === activeCategory &&
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleCardClick = (blog) => {
    if (isLoggedIn) {
      navigate("/blogdetail", { state: { blog } });
    } else {
      setShowPopup(true);
    }
  };

  return (
    <Container className="wellness-container">
      {/* Header */}
      <div className="header">
        <h2>Health & Wellness Blogs</h2>
        <p>
          Expert guidance on how to maintain physical and mental well-being
          during your academic journey.
        </p>
      </div>

      {/* Category + Search */}
      <div className="category-search-container">
        <div className="categories">
          {["All Topics", "Mental Health", "Physical Wellness", "Nutrition", "Stress Management"].map(
            (category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-grid mt-4">
        {filteredBlogs.map((blog) => (
          <Card
            key={blog.id}
            className={`blog-card${!isLoggedIn ? " blog-card-guest" : ""}`}
            style={{
              cursor: isLoggedIn ? "pointer" : "default",
              position: "relative",
              pointerEvents: "auto" // Always allow clicks
            }}
            onClick={() => handleCardClick(blog)}
          >
            <Card.Img variant="top" src={blog.image} />
            <Card.Body>
              <span className="blog-category">{blog.category}</span>
              <Card.Title className="blog-title">{blog.title}</Card.Title>
            </Card.Body>
            {!isLoggedIn && (
              <div
                className="blog-card-overlay"
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: "rgba(255,255,255,0.7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#333", fontSize: "1em", borderRadius: "8px",
                  pointerEvents: "none", zIndex: 2, cursor: "not-allowed"
                }}
              >
            
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Floating Popup */}
      <FloatingPopup
        show={showPopup}
        onHide={() => setShowPopup(false)}
        message="Take your time. When you're ready, log in to explore this feature."
      />
    </Container>
  );
};

export default WellnessBlog;
