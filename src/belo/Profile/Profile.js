import React from "react";
import Button from "../components/Button/Button";
import { FaCog } from "react-icons/fa";
import Post from "../components/Post/Post";
import "./Profile.css";
const userProfile = {
  name: "John Doe",
  username: "@johndoe.the.great",
  coverImage: "/img/crowd.png",
  avatar: "/img/music.png",
  description:
    "Sharing the joy of music with the whole wide world. It's a beautiful and fulfilling experience that allows us to connect, inspire, and uplift others through the power of sound.",
  followers: 54,
  following: 23,
  numberOfPosts: 2,
  posts: [
    {
      username: "@johndoe",
      imageUrl: "/img/music.png",
      musicUrl: "/img/music.png",
      songTitle: "Song Title",
      artistName: "Artist Name",
      description: "Walking and listening to this",
      likes: 123,
      comments: 4,
      shares: 2,
    },
    {
      username: "@janedoe.the.great",
      imageUrl: "/img/crowd.png",
      musicUrl: "/img/crowd.png",
      songTitle: "Song Title",
      artistName: "Artist Name",
      description:
        "Walking and listening to this Nothing beats a sunset hike in the mountains.Nothing beats a sunset hike in the mountains.Nothing beats a sunset hike in the mountains.",
      likes: 98,
      comments: 7,
      shares: 3,
    },
  ],
};

const Profile = () => {
  return (
    <div className="profile">
      <div className="cover-Image">
        <img src={userProfile.coverImage} alt="Post" className="cover-image" />
      </div>
      <div className="user-header">
        <img src={userProfile.avatar} alt="Avatar" className="avatar" />
        <Button text="Edit Profile" type="edit" />
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
    </div>
  );
};

export default Profile;
