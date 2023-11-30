import React from "react";
import Button from "../Home/Button/Button";

import { loginEndpoint } from "../../spotify";
import * as client from "../Services/userClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../User/userReducer";
const Login = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    username: "",
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
      <h1>Signin</h1>
      <input
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={signIn}> Signin </button>
      <button onClick={() => handleButtonClick("/Signup")}>Register</button>
      <a href={loginEndpoint}>
        <Button text="Login" />
      </a>
    </div>
  );
};

export default Login;
