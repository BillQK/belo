import Button from "../components/Button/Button";
import "./Header.css";
import React from "react";

const Header = () => (
  <header className="d-flex justify-content-center text-center main-header">
    <div>
      <h1>Belo.</h1>
      <p>A beautiful place to share your music.</p>
      <div className="d-flex justify-content-center header-container">
        <Button text="LOGIN" type="primary" />
        <Button text="CREATE ACCOUNT" type="secondary" />
      </div>
      <a href="#learn-more">Or Learn More</a>
    </div>
  </header>
);

export default Header;
