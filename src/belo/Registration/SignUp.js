import React, { useState } from "react";

import "./index.css";
import { useNavigate } from "react-router";
import * as userClient from "../Services/userClient";
import { Link } from "react-router-dom";

import { setCurrentUser } from "../User/userReducer";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUp = async () => {
    try {
      const currentUser = await userClient.signUp(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Register/Setup");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="login">
      <h2>Creating Account</h2>
      <h3>Let's create an account for you!</h3>
      <div className="input-box">
        <label htmlFor="username">USERNAME *</label>
        <input
          id="username"
          type="text"
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
        />
        <label htmlFor="email">EMAIL *</label>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">PASSWORD *</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button onClick={signUp}> Create Account </button>

      <Link to="/Register/Login">Already have an account?</Link>
    </div>
  );
};

export default SignUp;
