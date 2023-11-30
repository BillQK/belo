import React from "react";
import Button from "../Home/Button/Button";

import { loginEndpoint } from "../../spotify";
import * as client from "../Services/postClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/");
  };
  const handleButtonClick = (path) => {
    navigate(`/Register${path}`); // Adjusted path for parameterized routing
  };
  return (
    <div className="login">
      <h1>Signin</h1>
      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={signin}> Signin </button>
      <button onClick={() => handleButtonClick("/Signup")}>Register</button>
      <a href={loginEndpoint}>
        <Button text="Login" />
      </a>
    </div>
  );
};

export default Login;
