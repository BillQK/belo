import { FiShare } from "react-icons/fi";
import "./Post.css";
import MusicPlayer from "../MusicPlayer/Musicplayer";
import { FaComment, FaHeart } from "react-icons/fa";

const Post = ({ post }) => {
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
        <img src={post.musicUrl} alt="Music" className="music-image" />
        <div className="post-body p-2">
          <h2>{post.songTitle}</h2>
          <h3>{post.artistName}</h3>
          <div className="music-player">
            <MusicPlayer />
          </div>
        </div>
      </div>

      <div className="post-stat p-2">
        <span>
          <FaHeart />
        </span>
        {post.likes}
        <span>
          <FaComment />
        </span>
        {post.comments}
        <span>
          <FiShare />
        </span>
        {post.shares}
      </div>

      {/* <div className="comment-section">
        <CommentSection />
      </div> */}
    </div>
  );
};
export default Post;
