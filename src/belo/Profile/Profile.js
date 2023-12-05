import React, { useEffect, useState } from "react";
import Button from "../Home/Button/Button";
import Post from "../components/Post/Post";
import Modal from "../components/Modal/Modal";
import "./Profile.css";
import * as userClient from "../Services/userClient";
import * as profileClient from "../Services/profilesClient";
import * as storageClient from "../Services/storageClient";
import * as followsClient from "../Services/followerClient";
import * as postsClient from "../Services/postsClient";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "./ProfileReducer";
import EndOfFeed from "../Dashboard/Feed/EndOfFeed/EndOfFeed";
import { FiEdit, FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router";
import axios from "axios";

const Profile = ({ otherUserID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state.userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userProfile);
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);
  const [coverImage, setcoverImage] = useState(null);
  const [avatarImage, setavatarImage] = useState(null);
  const [coverImageUUID, setCoverImageUUID] = useState(null);
  const [avatarImageUUID, setAvatarImageUUID] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setisUploading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleImageChange = async (
    e,
    setImageFunction,
    setImageUUIDFunction
  ) => {
    setisUploading(true);
    try {
      setImageFunction(URL.createObjectURL(e.target.files[0]));
      const UUID = await storageClient.uploadImage(e.target.files[0]);
      setImageUUIDFunction(UUID.public_id);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setisUploading(false);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const profileData = {
      displayName: formData.get("displayName"),
      description: formData.get("description"),
    };

    if (avatarImageUUID) {
      profileData.avatar = avatarImageUUID;
    }
    if (coverImageUUID) {
      profileData.coverImage = coverImageUUID;
    }
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
  const closeEditModal = () => {
    setavatarImage(profile.avatar);
    setcoverImage(profile.coverImage);
    setIsEditing(false);
  };

  const toggleFollow = async () => {
    if (user) {
      let status;
      if (isFollowed) {
        status = await followsClient.deleteUserFollowsUser(
          user._id,
          otherUserID
        );
      } else {
        status = await followsClient.createUserFollowsUser(
          user._id,
          otherUserID
        );
      }

      if (status === 200) {
        setIsFollowed(!isFollowed);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userClient.account();
        if (Object.keys(user).length === 0) {
          navigate("/Register/Login");
          return;
        }
        setUser(user);
        if (otherUserID) {
          // Fetch and set the profile based on otherUserID when available
          const otherUser = await profileClient.getProfileByUserID(otherUserID);
          const posts = await postsClient.getPostsbyUserId(otherUserID);
          setProfile(otherUser);
          setPosts(posts);

          // Call checkIfUserFollows here
          const isFollowed = await followsClient.checkIfUserFollows(
            user._id,
            otherUserID
          );
          setIsFollowed(isFollowed);
        } else {
          // Fetch and set the profile based on the user's own ID
          const userProfile = await profileClient.getProfileByUserID(user._id);
          const posts = await postsClient.getPostsbyUserId(user._id);
          setProfile(userProfile);
          setAvatarImageUUID(userProfile.avatar);
          setCoverImageUUID(userProfile.coverImage);
          setPosts(posts);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData(); // Call fetchData when the component initially mounts

    // Now, whenever otherUserID changes, fetchData will be called again
  }, [otherUserID]);
  return (
    <div className="profile">
      <div className="cover-Image">
        <img src={profile.coverImage} alt="Post" className="cover-image" />
      </div>
      <div className="user-header">
        <img src={profile.avatar} alt="Avatar" className="avatar" />
        {otherUserID ? (
          // Render a different component or message for other user's profiles
          <>
            <button
              onClick={toggleFollow}
              className={`profile-button ${isFollowed ? "followed" : ""}`}
            >
              {isFollowed ? "Followed" : "Follow"}
            </button>
            <Button text={<FiHeart />} type="setting" />
          </>
        ) : (
          // Render the "Edit Profile" button and "Cog" button for the current user's profile
          <>
            <button onClick={openEditModal} className="profile-button follow">
              Edit Profile
            </button>
            <Button text={<FiEdit />} type="setting" onClick={openEditModal} />
          </>
        )}
      </div>
      <div className="user-profile-body">
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
      </div>
      <hr />
      <div className="user-posts">
        {posts &&
          posts.map((post, index) => {
            return <Post key={index} post={post} />;
          })}
      </div>
      <EndOfFeed />
      <Modal show={isEditing} onClose={closeEditModal}>
        <form onSubmit={handleSave}>
          <label className="cover-image-preview">
            <img
              src={coverImage || coverImageUUID}
              alt="Cover"
              className="cover-image-preview"
            />

            <input
              name="cover"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) =>
                handleImageChange(e, setcoverImage, setCoverImageUUID)
              }
              style={{ display: "none" }}
            />
          </label>

          <label>
            <img
              src={avatarImage || avatarImageUUID}
              alt="Avatar"
              className="avatar-image-preview"
            />

            <input
              name="avatar"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) =>
                handleImageChange(e, setavatarImage, setAvatarImageUUID)
              }
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

            <button
              className={`my-3 ${
                isUploading ? "save-button-disabled" : "save-button"
              }`}
              type="submit"
              disabled={isUploading}
            >
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
