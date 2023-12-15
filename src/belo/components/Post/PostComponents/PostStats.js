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
  shares,
  bookMarked,
  onBookmark,
}) => {
  return (
    <div className="post-stat p-2">
      <span onClick={onLike}>
        {liked ? <FaHeart /> : <FaRegHeart />}
        <span className="stat"> {numberOfLikes}</span>
      </span>
      <span>
        <FaRegComment />
        <span className="stat"> {comments}</span>
      </span>
      <span>
        <FiShare />
        <span className="stat"> {shares}</span>
      </span>
      <span onClick={onBookmark}>
        {bookMarked ? <FaBookmark /> : <FaRegBookmark />}
      </span>
    </div>
  );
};
export default PostStats;
