import { FiHeart, FiMessageCircle, FiShare } from "react-icons/fi";
import "./Post.css";
import MusicPlayer from "../MusicPlayer/Musicplayer";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">
          <img src={post.imageUrl} alt="Post" className="post-image" />
          <h3>{post.username}</h3>
        </div>
        <div className="post-stat p-2">
          <span>
            <FiHeart />
          </span>
          {post.likes}
          <span>
            <FiMessageCircle />
          </span>
          {post.comments}
          <span>
            <FiShare />
          </span>
          {post.shares}
        </div>
      </div>
      <hr />
      <div className="music-body d-flex">
        <img src={post.musicUrl} alt="Music" className="music-image" />
        <div className="post-body p-2">
          <h2>{post.songTitle}</h2>
          <h3>{post.artistName}</h3>
          <p>{post.description}</p>
        </div>
      </div>
      <div className="music-player">
        <MusicPlayer />
      </div>
    </div>
  );
};
export default Post;
