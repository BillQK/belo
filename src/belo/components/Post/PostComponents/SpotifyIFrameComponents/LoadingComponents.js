import React from "react";
import { pulsar } from "ldrs";

pulsar.register();

function LoadingComponent() {
  return (
    <div className="mt-5 d-flex justify-content-center ">
      <l-pulsar size="150" speed="3.5" color="#6476dc"></l-pulsar>
    </div>
  );
}

export default LoadingComponent;

// Default values shown
