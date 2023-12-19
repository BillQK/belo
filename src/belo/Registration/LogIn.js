import React from "react";

import * as spotifyClient from "../Services/spotifyClient";
import * as client from "../Services/userClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "../User/userReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  console.log(user);
  const signIn = async () => {
    const loggedInUser = await client.signIn(user);
    if (loggedInUser && loggedInUser.restricted) {
      try {
        const response = await client.signOut();
        if (response === 200) {
          alert("You're Banned. GTFO");
          navigate("/");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(setCurrentUser(loggedInUser));
    await spotifyClient.redirectToSpotifyLogin();
  };

  return (
    <div className="login">
      <h2>Welcome back!</h2>
      <h3>We're so excited to see you again!</h3>
      <div className="input-box">
        <label htmlFor="username">USERNAME *</label>
        <input
          id="username"
          type="text"
          value={user.userName}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="password">PASSWORD *</label>
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
      <h4>
        Just visting? <Link to="/Dashboard/feed">Click Here!</Link>
      </h4>
      {/* <button onClick={() => handleButtonClick("/Signup")}>Register</button> */}
      {/* <a href={loginEndpoint}>
        <Button text="Login" />
      </a> */}
    </div>
  );
};

export default Login;
