import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";

const WellnessBlog = () => {
  const [activeCategory, setActiveCategory] = useState("All Topics");

  const blogs = [
    {
      title: "Finding Balance: How to Manage Academic Stress",
      category: "Mental Health",
      image: "https://i.pinimg.com/474x/1e/e6/6a/1ee66a4517d068f5db3b0443684b748b.jpg",
      link: "#",
    },
    {
      title: "Brain Foods: Eating for Academic Success",
      category: "Nutrition",
      image: "https://i.pinimg.com/474x/86/6a/d0/866ad0b1e99a5a6a7809ebe4801b2147.jpg",
      link: "#",
    },
    {
      title: "The Student’s Guide to Quality Sleep",
      category: "Physical Wellness",
      image: "https://i.pinimg.com/474x/0b/70/38/0b70385eece9929f2460e7e18f8a15e5.jpg",
      link: "#",
    },
    {
      title: "Stress-Free Studying: Mind Hacks for Exams",
      category: "Stress Management",
      image: "https://i.pinimg.com/474x/1e/3e/88/1e3e8884e34fa76dfcfe969d1ec0bb88.jpg",
      link: "#",
    },
  ];

  const filteredBlogs =
    activeCategory === "All Topics"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

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

      {/* Category Navigation */}
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

      {/* Blog Grid */}
      <div className="blog-grid">
        {filteredBlogs.map((blog, index) => (
          <Card key={index} className="blog-card">
            <Card.Img variant="top" src={blog.image} />
            <Card.Body>
              <span className="blog-category">{blog.category}</span>
              <Card.Title className="blog-title">{blog.title}</Card.Title>
              <a href={blog.link} className="blog-link">
                Continue reading
              </a>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default WellnessBlog;
