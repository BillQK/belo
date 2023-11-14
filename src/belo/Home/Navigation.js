// Navigation.js
import React from "react";
import Button from "../components/Button/Button";
import "./Navigation.css";
const Navigation = () => (
  <nav className="d-flex main-navigation">
    <div className="flex-grow-1 main-navigation ">
      <a href="/" className="logo ">
        Belo.
      </a>
    </div>
    <div className="main-navigation">
      <Button text="Login" />
    </div>
    <div className="main-navigation">
      <Button text="Create Account" />
    </div>
  </nav>
);

export default Navigation;
