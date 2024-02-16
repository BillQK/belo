import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

const PostHeader = ({
  userId,
  avatar,
  userName,
  isEditable,
  onEdit,
  createdAt,
}) => {
  return (
    <div className="post-header">
      <div className="post-user">
        <Link to={`/Dashboard/profile/${userId}`}>
          <img src={avatar} loading="lazy" alt="" className="post-image" />
        </Link>
        <Link to={`/Dashboard/profile/${userId}`}>
          {userName && <p>{"@" + userName}</p>}
        </Link>
        {createdAt && <p className="post-date">{createdAt}</p>}
        {isEditable && (
          <FaEllipsisV className="ms-auto" onClick={onEdit} color="#6476dc" />
        )}
      </div>
    </div>
  );
};
export default PostHeader;
