import "./Post.css";

import {
  FaHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";
import { useState } from "react";
import { FiShare } from "react-icons/fi";
const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(+post.likes);
  const [bookMarked, setBookMarked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    liked
      ? setNumberOfLikes(numberOfLikes - 1)
      : setNumberOfLikes(numberOfLikes + 1);
  };
  const toggleBookMark = () => {
    setBookMarked(!bookMarked);
  };
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">
          <img src={post.imageUrl} alt="Post" className="post-image" />
          <p>{post.username}</p>
        </div>
      </div>
      <p>{post.description}</p>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/track/4bmuGIHRJYMjL02yXZeoCd?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>

      <div className="post-stat p-2">
        <span onClick={toggleLike}>
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span className="stat"> {numberOfLikes}</span>
        </span>
        <span>
          <FaRegComment />
          <span className="stat"> {post.comments}</span>
        </span>
        <span>
          <FiShare />
          <span className="stat"> {post.shares}</span>
        </span>
        <span onClick={toggleBookMark}>
          {bookMarked ? <FaBookmark /> : <FaRegBookmark />}
        </span>
      </div>

      {/* <div className="comment-section">
        <CommentSection />
      </div> */}
    </div>
  );
};
export default Post;
