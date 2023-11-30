import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router";
import * as profileClient from "../Services/profilesClient";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const SetUpProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  console.log(currentUser);
  const [profile, setProfile] = useState({
    userId: currentUser._id,
    userName: "",
    displayName: "",
    description: "",
  });
  const navigate = useNavigate();
  const createProfile = async () => {
    try {
      const profileDetails = await profileClient.createProfile(profile);
      navigate("/Dashboard/feed");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underLine"></div>
      </div>
      <div className="inputs">
        <div className="inputs">
          Display Name
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) =>
              setProfile({ ...profile, displayName: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          Username:
          <input
            type="text"
            value={profile.userName}
            onChange={(e) =>
              setProfile({ ...profile, userName: e.target.value })
            }
          />
        </div>
        <div className="inputs">
          Profile's Description
          <input
            type="password"
            value={profile.description}
            onChange={(e) =>
              setProfile({ ...profile, description: e.target.value })
            }
          />
        </div>
      </div>
      <div className="submit-container">
        <button onClick={createProfile}>Create Profile</button>
        <Link to="/Register/Login" className="btn ">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SetUpProfile;
