import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";


const WellnessBlog = () => {
  return (
    <Container className="wellness-container">
      {/* Header */}
      <div className="header">
        <h2>Health & Wellness Blogs</h2>
        <p>Expert guidance on how to maintain physical and mental well-being during your academic journey.</p>
      </div>

      {/* Category Navigation */}
      <div className="categories">
        <button className="active">All Topics</button>
        <button>Mental Health</button>
        <button>Physical Wellness</button>
        <button>Nutrition</button>
        <button>Stress Management</button>
      </div>

      {/* Featured Blog */}
      <div className="featured-blog">
        <img src="https://i.pinimg.com/474x/1e/e6/6a/1ee66a4517d068f5db3b0443684b748b.jpg" alt="Featured Blog" />
        <div className="featured-blog-content">
          <div className="featured-category">
            <span>Mental Health</span>
          </div>
          <h3 className="featured-title">Finding Balance: How to Manage Academic Stress</h3>
          <p>Learn effective techniques to balance your academic responsibilities with self-care practices that keep you mentally and physically healthy.</p>
          <div className="author">
            <span className="author-icon">C</span> <span>Dr. Channy San</span>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-grid">
        {[
          {
            title: "Finding Balance: How to Manage Academic Stress",
            category: "Mental Health",
            image: "https://i.pinimg.com/474x/1e/e6/6a/1ee66a4517d068f5db3b0443684b748b.jpg",
            link: "#",
          },
          {
            title: "Brain Foods: Eating for Academic Success",
            category: "Mental Health",
            image: "https://i.pinimg.com/474x/86/6a/d0/866ad0b1e99a5a6a7809ebe4801b2147.jpg",
            link: "#",
          },
          {
            title: "The Student’s Guide to Quality Sleep",
            category: "Mental Health",
            image: "https://i.pinimg.com/474x/0b/70/38/0b70385eece9929f2460e7e18f8a15e5.jpg",
            link: "#",
          },
          {
            title: "The Student’s Guide to Quality Sleep",
            category: "Mental Health",
            image: "https://i.pinimg.com/474x/1e/3e/88/1e3e8884e34fa76dfcfe969d1ec0bb88.jpg",
            link: "#",
          },
         
        ].map((blog, index) => (
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