import "./User.css";
import { useEffect, useState } from "react";
import * as followsClient from "../../../Services/followerClient";

const User = ({ user, currentUser }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    checkFollowStatus();
  }, []);

  return (
    <div className="user-card">
      <div
        className=" d-flex 
justify-content-between"
      >
        <div className="card-img">
          <img src={user.avatar} alt="avatar" className="avatar-image" />
        </div>
        <div className="card-body">
          <h1>{user.displayName}</h1>
          <h3>{user.userName}</h3>
        </div>
        <div className="card-button">
          {/* Toggle button text based on follow status and apply styles conditionally */}
          <button
            onClick={toggleFollow}
            className={isFollowed ? "followed" : ""}
          >
            {isFollowed ? "Followed" : "Follow"}
          </button>
        </div>
      </div>
      <div className="card-description">
        <p>{user.description}</p>
      </div>
    </div>
  );
};

export default User;
