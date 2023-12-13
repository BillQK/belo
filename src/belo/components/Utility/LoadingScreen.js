import React from "react";
import { grid } from "ldrs";
import { trefoil } from "ldrs";
import "./LoadingScreen.css";
trefoil.register(); // Default values shown

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <l-trefoil
        size="500"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.4"
        color="#6476dc"
      ></l-trefoil>
    </div>
  );
}

export default LoadingScreen;
