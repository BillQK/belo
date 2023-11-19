import React from "react";
import Button from "../components/Button/Button";

import { loginEndpoint } from "../../spotify";

const Login = () => {
  return (
    <div className="Login-page">
      <a href={loginEndpoint}>
        <Button text="Login" />
      </a>
    </div>
  );
};

export default Login;
