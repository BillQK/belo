import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router";
import * as profileClient from "../Services/profilesClient";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateUserProfile } from "../Profile/ProfileReducer";
import { useDispatch } from "react-redux";
const SetUpProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
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
      dispatch(updateUserProfile(profileDetails));
      navigate("/Register/Login");
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    // navigate home
  }
  return (
    <div className="login">
      <h2>Creating Profile</h2>
      <h3>Let's create a profile for you!</h3>
      <div className="input-box">
        <label for="username">USERNAME *</label>
        <input
          id="username"
          type="text"
          value={profile.userName}
          onChange={(e) => setProfile({ ...profile, userName: e.target.value })}
        />
        <label for="displayname">DISPLAY NAME *</label>
        <input
          id="displayname"
          type="text"
          value={profile.displayName}
          onChange={(e) =>
            setProfile({ ...profile, displayName: e.target.value })
          }
        />
        <label for="description">PROFILE'S DESCRIPTION *</label>
        <input
          id="description"
          type="text"
          value={profile.description}
          onChange={(e) =>
            setProfile({ ...profile, description: e.target.value })
          }
        />
      </div>
      <button onClick={createProfile}> Create Profile </button>

      <Link to="/Register/Login">Already have an account?</Link>
    </div>
  );
};

export default SetUpProfile;
