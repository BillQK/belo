import "./User.css";
import { useEffect, useState } from "react";
import * as followsClient from "../../../Services/followerClient";
import { useNavigate } from "react-router";

const User = ({ user, currentUser }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleFollow = async () => {
    if (currentUser) {
      let status;
      if (isFollowed) {
        status = await followsClient.deleteUserFollowsUser(
          currentUser._id,
          user.userId
        );
      } else {
        status = await followsClient.createUserFollowsUser(
          currentUser._id,
          user.userId
        );
      }

      if (status === 200) {
        setIsFollowed(!isFollowed);
      }
    }
  };

  const checkFollowStatus = async () => {
    try {
      const followed = await followsClient.checkIfUserFollows(
        currentUser._id,
        user.userId
      );
      setIsFollowed(followed);
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  const handleProfileClick = () => {
    navigate(`/Dashboard/profile/${user.userId}`);
  };

  useEffect(() => {
    checkFollowStatus();
  }, []);

  return (
    <div className="user-card">
      <div className="d-flex justify-content-between">
        <div className="card-img" onClick={handleProfileClick}>
          <img src={user.avatar} alt="" className="avatar-image" />
        </div>

        <div className="card-body" onClick={handleProfileClick}>
          <h1>{user.displayName}</h1>
          <h3>{user.userName}</h3>

          <p className="card-description">{user.description}</p>
        </div>
        <div className="card-button">
          <button
            onClick={toggleFollow}
            className={isFollowed ? "followed" : ""}
          >
            {isFollowed ? "Followed" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
