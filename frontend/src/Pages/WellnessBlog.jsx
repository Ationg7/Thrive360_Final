import React, { useState, useEffect } from "react";
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

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/admin/blogs');
        if (!res.ok) throw new Error('Failed to load blogs');
        const data = await res.json();
        const normalized = (Array.isArray(data) ? data : []).map(b => ({
          id: b.id,
          title: b.title,
          category: b.category || 'General',
          image: b.image_url || 'https://via.placeholder.com/600x400?text=Blog',
          fullText: b.content,
          author: b.author_name || 'Admin'
        }));
        setBlogs(normalized);
      } catch (e) {
        console.error('Error fetching blogs:', e);
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, []);

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
