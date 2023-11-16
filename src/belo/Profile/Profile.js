import React from "react";
import Button from "../components/Button/Button";
import { FaHamburger } from "react-icons/fa";
import Post from "../components/Post/Post";

const userProfile = {
  name: "John Doe",
  username: "@johndoe",
  coverImage: "/img/crowd.png",
  avatar: "/img/music.png",
  description: "Sharing music with the whole wide world",
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
      username: "@janedoe",
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
        <Button text="Edit Profile" type="primary" />
        <FaHamburger />
      </div>
      <div className="user-info">
        <h1> {userProfile.name}</h1>
        <h2> {userProfile.username}</h2>
      </div>
      <div className="user-stat">
        <h3>{userProfile.followers} </h3>
        <h3>{userProfile.following} </h3>
        <h3>{userProfile.numberOfPosts} </h3>
      </div>
      <div className="user-description">
        <p> {userProfile.description}</p>
      </div>
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
