// src/Components/BlurredContent.jsx
import React from "react";



export default function BlurredContent({ children, overlayText, onInteract }) {
  return (
    <div className="blurred-content" onClick={onInteract}>
      <div className="blurred-main">{children}</div>
      <div className="blurred-overlay">{overlayText}</div>
    </div>
  );
}