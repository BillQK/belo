import React, { useState } from "react";
import Button from "../components/Button/Button";
import { FaCog } from "react-icons/fa";
import Post from "../components/Post/Post";
import Modal from "../components/Modal/Modal";
import "./Profile.css";

import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "./ProfileReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const profileData = {
      name: formData.get("name"),
      description: formData.get("description"),
      // include other fields as necessary
    };
    dispatch(updateUserProfile(profileData));
    setIsEditing(false);
  };

  // Function to open the modal
  const openEditModal = () => setIsEditing(true);

  // Function to close the modal
  const closeEditModal = () => setIsEditing(false);
  return (
    <div className="profile">
      <div className="cover-Image">
        <img src={userProfile.coverImage} alt="Post" className="cover-image" />
      </div>
      <div className="user-header">
        <img src={userProfile.avatar} alt="Avatar" className="avatar" />
        <Button text="Edit Profile" type="edit" onClick={openEditModal} />
        <Button text={<FaCog />} type="setting" />
      </div>
      <div className="user-info">
        <h1> {userProfile.name}</h1>
        <h2> {userProfile.username}</h2>
      </div>
      <div className="user-stat">
        <h3 className="user-stat-item">
          <span className="user-stat-number"> {userProfile.followers} </span>
          <span className="user-stat-category">followers</span>
        </h3>

        <h3 className="user-stat-item">
          <span className="user-stat-number"> {userProfile.following} </span>
          <span className="user-stat-category">following</span>
        </h3>
        <h3 className="user-stat-item">
          <span className="user-stat-number">
            {" "}
            {userProfile.numberOfPosts}{" "}
          </span>
          <span className="user-stat-category">posts</span>
        </h3>
      </div>
      <div className="user-description">
        <p> {userProfile.description}</p>
      </div>
      <hr />
      <div className="user-posts">
        {userProfile.posts &&
          userProfile.posts.map((post, index) => {
            return <Post key={index} post={post} />;
          })}
      </div>
      <Modal show={isEditing} onClose={closeEditModal}>
        <form onSubmit={handleSave}>
          <label>
            <img
              src={userProfile.coverImage || "/img/default-cover.png"}
              alt="Cover"
              className="cover-image-preview"
            />

            <input
              name="cover"
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
            />
          </label>
          <label>
            <img
              src={userProfile.avatar || "/img/default-avatar.png"}
              alt="Avatar"
              className="avatar-image-preview"
            />

            <input
              name="avatar"
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
            />
          </label>
          <div className="edit-body">
            <label for="name">Display Name </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              defaultValue={userProfile.name}
            />
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              defaultValue={userProfile.description}
            ></textarea>

            <button className="my-3" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
