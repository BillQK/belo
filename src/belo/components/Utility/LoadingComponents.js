import React from "react";
import { trefoil } from "ldrs";

trefoil.register(); // Default values shown

function LoadingComponent() {
  return (
    <div className="loading-components d-flex justify-content-center ">
      <l-trefoil
        size="100"
        stroke="6"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="1.4"
        color="#6476dc"
      ></l-trefoil>
    </div>
  );
}

export default LoadingComponent;
