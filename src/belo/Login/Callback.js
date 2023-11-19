import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      window.localStorage.setItem("token", accessToken);
      setToken(accessToken);
    } else {
      setToken(token);
    }
  }, []);

  token ? navigate("/Dashboard/feed") : navigate("/Home");

  return <></>;
};

export default Callback;
