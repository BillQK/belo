import React, { useEffect, useState } from "react";
import Button from "../Home/Button/Button";
import { FaCog } from "react-icons/fa";
import Post from "../components/Post/Post";
import Modal from "../components/Modal/Modal";
import "./Profile.css";
import * as userClient from "../Services/userClient";
import * as profileClient from "../Services/profilesClient";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "./ProfileReducer";
import EndOfFeed from "../Dashboard/Feed/EndOfFeed/EndOfFeed";

const Profile = ({ onPostClicked }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userProfile);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const profileData = {
      displayName: formData.get("displayName"),
      description: formData.get("description"),
    };
    try {
      const status = await profileClient.updateProfileByUserId(
        user._id,
        profileData
      );
      if (status === 200) {
        dispatch(updateUserProfile(profileData));
        setProfile({ ...profile, ...profileData }); // Update local state
      } else {
        // Handle non-successful status here
      }
    } catch (error) {
      // Handle any errors that occur during the update
      setError(error);
    }
    setIsEditing(false);
  };

  // Function to open the modal
  const openEditModal = () => setIsEditing(true);

  // Function to close the modal
  const closeEditModal = () => setIsEditing(false);

  const fetchProfile = async (userId) => {
    const profile = await profileClient.getProfileByUserID(userId);
    setProfile(profile);
  };
  const fetchUser = async () => {
    try {
      const user = await userClient.account();
      setUser(user);
      fetchProfile(user._id);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile">
      <div className="cover-Image">
        <img src={profile.coverImage} alt="Post" className="cover-image" />
      </div>
      <div className="user-header">
        <img src={profile.avatar} alt="Avatar" className="avatar" />
        <Button text="Edit Profile" type="edit" onClick={openEditModal} />
        <Button text={<FaCog />} type="setting" />
      </div>
      <div className="user-info">
        <h1> {profile.displayName}</h1>
        <h2> {profile.userName}</h2>
      </div>
      <div className="user-stat">
        <h3 className="user-stat-item">
          <span className="user-stat-number"> {profile.followerCount} </span>
          <span className="user-stat-category">followers</span>
        </h3>

        <h3 className="user-stat-item">
          <span className="user-stat-number"> {profile.followingCount} </span>
          <span className="user-stat-category">following</span>
        </h3>
        <h3 className="user-stat-item">
          <span className="user-stat-number"> {profile.numberOfPosts} </span>
          <span className="user-stat-category">posts</span>
        </h3>
      </div>
      <div className="user-description">
        <p> {profile.description}</p>
      </div>
      <hr />
      <div className="user-posts">
        {profile.posts &&
          profile.posts.map((post, index) => {
            return (
              <Post key={index} post={post} onPostClicked={onPostClicked} />
            );
          })}
      </div>
      <EndOfFeed />
      <Modal show={isEditing} onClose={closeEditModal}>
        <form onSubmit={handleSave}>
          <label className="cover-image-preview">
            <img
              src={profile.coverImage || "/img/default-cover.png"}
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
              src={profile.avatar || "/img/default-avatar.png"}
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
            <label for="displayName">Display Name </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="Name"
              defaultValue={profile.displayName}
            />
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              defaultValue={profile.description}
              rows="4"
              cols="50"
            ></textarea>

            <button className="my-3 save-button" type="submit">
              Save Changes
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => closeEditModal()}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
