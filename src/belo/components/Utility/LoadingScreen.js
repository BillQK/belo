import React from "react";
import "./LoadingScreen.css"; // Import your CSS file for styling

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default LoadingScreen;
