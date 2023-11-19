// ContentSection.js
import React from "react";
import "./ContentSection.css";
const ContentSection = ({ title, content, imageSrc, altText }) => {
  return (
    <div className="content-section">
      <div className="image-container">
        <img src={imageSrc} alt={altText} />
        <div className="text-container">
          {title && <h2>{title}</h2>}
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
