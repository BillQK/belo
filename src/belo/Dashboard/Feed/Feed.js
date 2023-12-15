import { useEffect, useState } from "react";
import EndOfFeed from "./EndOfFeed/EndOfFeed";
import Post from "../../components/Post/Post";
import * as client from "../../Services/postsClient";
import * as profileClient from "../../Services/profilesClient"; // Import the profile client
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [userProfiles, setUserProfiles] = useState({}); // State to store user profiles

  const fetchPosts = async () => {
    const posts = await client.getAllPosts();

    if (posts) {
      setPosts(posts.reverse());

      // Fetch user profiles based on post userIds
      const userIds = posts.map((post) => post.userId);
      // console.log("User IDs:", userIds); // Check if userIds are correctly extracted
      const profiles = await Promise.all(
        userIds.map((userId) => profileClient.getProfileByUserID(userId))
      );
      // console.log("Profiles:", profiles); // Check if profiles are correctly fetched

      // Create an object to map userIds to profiles
      const profilesMap = {};
      userIds.forEach((userId, index) => {
        profilesMap[userId] = profiles[index];
      });
      setUserProfiles(profilesMap);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      {posts.map((post, index) => (
        <Post
          key={index}
          post={post}
          userProfile={userProfiles[post.userId]}
          type="feed"
        />
      ))}

      <EndOfFeed />
    </div>
  );
};

export default Feed;
