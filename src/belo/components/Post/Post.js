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

const Post = ({ post, userProfile }) => {
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(+post.likesCount);
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

  // Optional chaining to safely access userProfile properties
  const avatar = userProfile?.avatar;
  const userName = userProfile?.userName;

  // console.log(avatar);
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">
          {/* Use the avatar and userName variables with optional chaining */}
          <img src={avatar} alt="Post" className="post-image" />
          <p>{"@" + userName}</p>
        </div>
      </div>
      <div className="post-content">
        <p>{post.description}</p>
        <iframe
          title="Spotify Embed: Recommendation Playlist "
          src={`https://open.spotify.com/embed/${post.spotifyContent.contentType}/${post.spotifyContent.contentID}?utm_source=generator&theme=1`}
          width="100%"
          height="100%"
          style={{ minHeight: "360px" }}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
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
    </div>
  );
};

export default Post;
