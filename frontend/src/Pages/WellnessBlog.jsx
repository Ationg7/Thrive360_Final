import React, { useState, useEffect, useRef } from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import FloatingPopup from "../Components/FloatingPopup";
import "../App.css";

const WellnessBlog = () => {
  const { isLoggedIn } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const blogCardsRef = useRef([]);

  // --------- Hardcoded fallback blogs ---------
  const fallbackBlogs = [
    {
      id: 1,
      title: "Finding Balance: How to Manage Academic Stress",
      category: "Mental Health",
      image:
        "https://i.pinimg.com/474x/1e/e6/6a/1ee66a4517d068f5db3b0443684b748b.jpg",
      fullText: "Academic stress is something that almost every student faces...",
      author: "Dr. Channy San",
    },
    {
      id: 2,
      title: "Brain Foods: Eating for Academic Success",
      category: "Nutrition",
      image:
        "https://i.pinimg.com/474x/86/6a/d0/866ad0b1e99a5a6a7809ebe4801b2147.jpg",
      fullText: "The food you eat has a direct impact on how your brain functions...",
      author: "Dr. Channy San",
    },
    {
      id: 3,
      title: "The Student’s Guide to Quality Sleep",
      category: "Physical Wellness",
      image:
        "https://i.pinimg.com/474x/0b/70/38/0b70385eece9929f2460e7e18f8a15e5.jpg",
      fullText: "Quality sleep is often overlooked by students...",
      author: "Dr. Channy San",
    },
    {
      id: 4,
      title: "Stress-Free Studying: Mind Hacks for Exams",
      category: "Stress Management",
      image:
        "https://i.pinimg.com/474x/1e/3e/88/1e3e8884e34fa76dfcfe969d1ec0bb88.jpg",
      fullText: "Exams don’t have to be overwhelming if you approach studying...",
      author: "Dr. Channy San",
    },
  ];

  // --------- Fetch blogs from backend ---------
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/admin/blogs");
        if (!res.ok) throw new Error("Failed to load blogs");

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          setBlogs(fallbackBlogs);
        } else {
          const normalized = data.map((b) => ({
            id: b.id,
            title: b.title,
            category: b.category || "General",
            image:
              b.image_url ||
              "https://via.placeholder.com/600x400?text=Health+%26+Wellness",
            fullText: b.content,
            author: b.author_name || "Admin",
          }));

          setBlogs([...fallbackBlogs, ...normalized]);
        }
      } catch (e) {
        console.error("Error fetching blogs:", e);
        setBlogs(fallbackBlogs);
      }
    };

    fetchBlogs();
  }, []);

  // --------- Filtering blogs ---------
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

  // --------- Handle blog click ---------
  const handleCardClick = (blog) => {
    if (isLoggedIn) {
      navigate("/blogdetail", { state: { blog } });
    } else {
      setShowPopup(true);
    }
  };

  // --------- Equal height cards ---------
  useEffect(() => {
    if (blogCardsRef.current.length === 0) return;
    let maxHeight = 0;
    blogCardsRef.current.forEach((card) => {
      if (card) maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
    blogCardsRef.current.forEach((card) => {
      if (card) card.style.height = maxHeight + "px";
    });
  }, [filteredBlogs]);

  return (
    <Container className="wellness-container">
      {/* Categories + Search */}
      <div className="category-search-container">

    
        <div className="categories">
          {[
            "All Topics",
            "Mental Health",
            "Physical Wellness",
            "Nutrition",
            "Stress Management",
          ].map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
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
        {filteredBlogs.map((blog, index) => (
          <Card
            key={blog.id}
            ref={(el) => (blogCardsRef.current[index] = el)}
            className={`blog-card${!isLoggedIn ? " blog-card-guest" : ""}`}
            onClick={() => handleCardClick(blog)}
          >
            <Card.Img variant="top" src={blog.image} />
            <div className="blog-card-body">
              <span className="blog-card-category">{blog.category}</span>
              <h5 className="blog-card-title">{blog.title}</h5>
            </div>
            {!isLoggedIn && (
              <div className="blog-card-overlay">Login to read more</div>
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
