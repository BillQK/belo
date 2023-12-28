import {
  FaHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";
import { FiShare } from "react-icons/fi";

const PostStats = ({
  liked,
  numberOfLikes,
  onLike,
  comments,
  onComment,
  shares,
  bookMarked,
  onBookmark,
}) => {
  return (
    <div className="post-stat">
      <span onClick={onLike}>
        {liked ? <FaHeart color="red" /> : <FaRegHeart />}
        <span className="stat"> {numberOfLikes}</span>
      </span>
      <span onClick={onComment}>
        <FaRegComment />
        <span className="stat"> {comments}</span>
      </span>
      <span>
        <FiShare />
        <span className="stat"> {shares}</span>
      </span>
      <span onClick={onBookmark}>
        {bookMarked ? <FaBookmark color="red" /> : <FaRegBookmark />}
      </span>
    </div>
  );
};
export default PostStats;
