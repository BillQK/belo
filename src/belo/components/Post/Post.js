import "./Post.css";
import MusicPlayer from "../MusicPlayer/Musicplayer";
import {
  FaHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";
import { useState } from "react";
import { FiShare } from "react-icons/fi";
const Post = ({ post, onPostClicked }) => {
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(+post.likes);
  const [bookMarked, setBookMarked] = useState(false);
  const handleClick = () => {
    console.log("Clicked");
    // onPostClicked(post.song);
  };
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
      <div className="music-body d-flex">
        <img
          src={post.musicUrl}
          alt="Music"
          className="music-image"
          onClick={handleClick}
        />
        <div className="post-body p-2">
          <h2>{post.songTitle}</h2>
          <h3>{post.artistName}</h3>
          <div className="music-player">
            <MusicPlayer />
          </div>
        </div>
      </div>

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
