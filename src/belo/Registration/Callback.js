import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as userClient from "../Services/userClient";

const Callback = () => {
  const navigate = useNavigate();
  const updateToken = async () => {
    const user = await userClient.account();
    const hash = window.location.hash;
    window.location.hash = "";
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      user.accesstoken = accessToken;
      await userClient.updateUser(user._id, user); //TODO: handle error
    }

    navigate("/Dashboard/feed");
  };
  useEffect(() => {
    updateToken();
  }, []);
};

export default Callback;
