import { useEffect, useState } from "react";
import EndOfFeed from "./EndOfFeed/EndOfFeed";
import Post from "../Post/Post";
import * as client from "../../Services/client";
import "./Feed.css";

const Feed = ({ onPostClicked }) => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const posts = await client.getAllPosts();
    setPosts(posts);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="feed">
      {posts.map((post, index) => (
        <Post key={index} post={post} onPostClicked={onPostClicked} />
      ))}
      <EndOfFeed />
    </div>
  );
};
export default Feed;
