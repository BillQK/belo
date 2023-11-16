import React, { useState } from "react";
import "./CommentSection.css"; // Make sure the path to the CSS file is correct
import { FaCheckCircle } from "react-icons/fa";

const CommentSection = () => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the comment submission here
    console.log(comment); // For now, we'll just log it to the console
    setComment(""); // Reset comment input after submission
  };

  return (
    <div className="comment-section">
      <img src="/img/music.png" alt="User Logo" className="user-logo" />
      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className="comment-input"
        />
        <button type="submit" className="submit-button">
          <FaCheckCircle size={25} />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
