import React from "react";
import {
  FaEnvelope,
  FaFolder,
  FaKey,
  FaLocationArrow,
  FaLock,
  FaPassport,
  FaUser,
} from "react-icons/fa";
import "./index.css";
const SignUp = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underLine"></div>
      </div>
      <div className="inputs">
        <div className="inputs">
          <FaUser />
          <input type="text" />
        </div>
        <div className="inputs">
          <FaEnvelope />
          <input type="email" />
        </div>
        <div className="inputs">
          <FaLock />
          <input type="password" />
        </div>
      </div>
      <div className="forgot-password">
        Lost Password?<span>Click Here!</span>
      </div>
      <div className="submit-container">
        <div className="submit">Sign Up</div>
        <div className="submit">Login</div>
      </div>
    </div>
  );
};

export default SignUp;
