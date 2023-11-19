// Banner.js
import React from "react";
import "./Banner.css";
const Banner = ({ imagePath, altText }) => (
  <section className="main-banner">
    <img src={imagePath} alt={altText} />
  </section>
);

export default Banner;
