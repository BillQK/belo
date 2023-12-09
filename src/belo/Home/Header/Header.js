import React from "react";
import "./Header.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleButtonClick = (path) => {
    // console.log("here");
    navigate(path);
  };
  return (
    <header className="d-flex justify-content-center text-center main-header">
      <div>
        <h1>Belo.</h1>
        <p>A Social Media to share your music.</p>
        <div className="d-flex justify-content-center header-container">
          <Button
            text="LOGIN"
            type="primary"
            onClick={() => handleButtonClick("/Register/Login")}
          />

          <Button
            text="CREATE ACCOUNT"
            type="secondary"
            onClick={() => handleButtonClick("/Register/Signup")}
          />
        </div>
        <Link to="/Dashboard/feed">Or Learn More</Link>
      </div>
    </header>
  );
};
export default Header;
