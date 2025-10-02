import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blog } = location.state || {};

  if (!blog) {
    navigate("/wellnessblog");
    return null;
  }

  return (
    <div className="guide-wrapper ">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="blog-container">
        {/* Left Side: Main Blog */}
        <div className="blog-left">
          <div className="card blog-main-card">
            <h1 className="blog-title">{blog.title}</h1>
            <p className="blog-date">{blog.date}</p>

            {/* Category */}
            <div className="card category-card">
              <p>{blog.category}</p>
            </div>

            {/* Image */}
            <div className="blog-image">
              <img src={blog.image} alt={blog.title} />
            </div>

            {/* Full Blog Text */}
            <div className="blog-content">
              {blog.fullText.split("\n\n").map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar */}
        <div className="blog-sidebar">
                    {/* Author Info */}
          <div className="sidebar-section card author-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt={blog.author}
              className="author-img"
            />
            <h4>HEY, I’M {blog.author}</h4>
            <p>
              I’m a Master Self-Care Coach. Since self-care looks different for
              everyone, my mission is to help as many families create a
              personalized self-care routine.
            </p>
            <button className="learn-more">LEARN MORE</button>
          </div>
          {/* Top 10 Foods Card */}
          {blog.topFoods && blog.topFoods.length > 0 && (
            <div className="card top-foods-card">
              <h3 className="top-foods-title">Top 10 Foods</h3>
              <div className="top-foods-list">
                {blog.topFoods.map((food, index) => (
                  <div key={index} className="top-food-item">
                    <span>{index + 1}. {food}</span>
                    {index !== blog.topFoods.length - 1 && <hr />}
                  </div>
                ))}
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
