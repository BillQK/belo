import React from "react";
import { grid } from "ldrs";
import "./LoadingScreen.css";
grid.register();

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <l-grid
        className="d-flex justify-content-center"
        size="800"
        speed="1.5"
        color="#6476dc"
      ></l-grid>
    </div>
  );
}

export default LoadingScreen;
