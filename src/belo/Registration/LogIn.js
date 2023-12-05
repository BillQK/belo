import React from "react";
import Button from "../Home/Button/Button";

import { loginEndpoint } from "../../spotify";
import * as client from "../Services/userClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../User/userReducer";

const Login = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signIn = async () => {
    await client.signIn(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Dashboard/feed");
  };
  const handleButtonClick = (path) => {
    navigate(`/Register${path}`); // Adjusted path for parameterized routing
  };
  return (
    <div className="login">
      <h2>Welcome back!</h2>
      <h3>We're so excited to see you again!</h3>
      <div className="input-box">
        <label for="username">USERNAME *</label>
        <input
          id="username"
          type="text"
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
        />
        <label for="password">PASSWORD *</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Link>Forgot your password?</Link>
      </div>
      <button onClick={signIn}> Log In </button>
      <h4>
        Need an account? <Link to="/Register/Signup">Register</Link>
      </h4>
      {/* <button onClick={() => handleButtonClick("/Signup")}>Register</button> */}
      {/* <a href={loginEndpoint}>
        <Button text="Login" />
      </a> */}
    </div>
  );
};

export default Login;
