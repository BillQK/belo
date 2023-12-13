import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as userClient from "../Services/userClient";

const Callback = () => {
  const navigate = useNavigate();
  const updateToken = async () => {
    try {
      console.log("Updating token...");
      const user = await userClient.account();
      console.log("User:", user);
      const hash = window.location.hash;
      window.location.hash = "";
      if (hash && user && user._id) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        user.accesstoken = accessToken;
        try {
          const response = userClient.updateUser(user._id, user);

          if (response === 200) {
            navigate("/Dashboard/feed");
          }
        } catch (error) {
          alert("Error Occur Saving User Profile, Please try to login again");
          navigate("/Register/Login");
        }
      }
    } catch (error) {
      console.error("Error updating token:", error);
      // Handle error appropriately
    }
  };
  useEffect(() => {
    updateToken();
  }, []);
};

export default Callback;
