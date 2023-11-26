import "./User.css";
import { useState } from "react";
const User = ({ user }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  // Function to toggle follow status
  const toggleFollow = () => {
    setIsFollowed(!isFollowed);
  };
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
          <h1>{user.name}</h1>
          <h3>{user.username}</h3>
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
