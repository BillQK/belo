// Navigation.js
import React from "react";
import Button from "../components/Button/Button";
import "./Navigation.css";
import { Link } from "react-router-dom";
const Navigation = () => (
  <nav className="d-flex main-navigation">
    <div className="flex-grow-1 main-navigation ">
      <Link to="/" className="logo ">
        Belo.
      </Link>
    </div>
    <div className="main-navigation">
      <Link to="/Login">
        <Button text="Login" />
      </Link>
    </div>
    <div className="main-navigation">
      <Link to="/SignUp">
        <Button text="Create Account" />
      </Link>
    </div>
  </nav>
);
export default Navigation;
