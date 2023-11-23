import React from "react";
import Button from "../components/Button/Button";

import { loginEndpoint } from "../../spotify";
import * as client from "../Services/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/project/account");
  };
  return (
    <div className="Login-page">
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
      <a href={loginEndpoint}>
        <Button text="Login" />
      </a>
    </div>
  );
};

export default Login;
