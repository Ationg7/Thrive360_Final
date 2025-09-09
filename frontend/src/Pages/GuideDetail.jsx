// GuideDetails.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

const GuideDetails = () => {
  const location = useLocation();
  const { guide } = location.state || {};

  if (!guide) {
    return <p>No guide details available.</p>;
  }

  return (
    <div className="guide-wrapper">
      {/* Top card */}
      <div className="top-card">
        <div className="top-text">
          <p className="category">{guide.category}</p>
          <h2>{guide.title}</h2>
          <p>{guide.description}</p>
        </div>
        <div className="top-image">
          <img src={guide.image} alt={guide.title} />
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h3 className="steps-title">Step-by-Step Instructions</h3>
        <div className="steps-grid">
          {guide.steps && guide.steps.length > 0 ? (
            guide.steps.map((item) => (
              <div className="step-card" key={item.step}>
                <img src={item.img} alt={`Step ${item.step}`} />
                <div className="step-text">
                  <h4>Step {item.step}</h4>
                  <p>{item.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No steps available for this guide.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
