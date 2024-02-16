import { useState, useEffect, useRef } from "react";
import * as userClient from "../../../Services/userClient";
import * as profileClient from "../../../Services/profilesClient";
import * as commentClient from "../../../Services/commentsClient";
import "./PostCommentSection.css";
import { FiCornerRightUp, FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { updatePostComments } from "./CommentsReducer";
import { formatDate } from "../../Utility/FormatDate";
import { Link } from "react-router-dom";

const PostCommentSection = ({ postId, setNumberOfComments }) => {
  const postComments = useSelector((state) => state.postComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(
    useSelector((state) => state.userProfile) || null
  );
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(postComments.postComments || []);
  // Use an object for user profiles, keyed by user ID
  const [usersProfiles, setUsersProfiles] = useState({});
  const isSubmittingRef = useRef(false);
  const commentListRef = useRef(null);
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    try {
      event.preventDefault();
      if (isSubmittingRef.current || !comment.trim()) {
        return; // Immediate check to prevent double submissions
      }
      isSubmittingRef.current = true; // Immediately set the ref to true
      setIsSubmitting(true); // Update state for UI indication
      const commentCpy = comment;
      setComment(""); // Reset comment box
      const commentResponse = await commentClient.createComment({
        userId: user._id,
        text: commentCpy,
        postParentId: postId,
      });

      if (commentResponse) {
        updatePostComments(commentResponse);

        // Fetch the user profile for the new comment
        const newUserProfile = await profileClient.getProfileByUserID(user._id);
        setUsersProfiles((prevProfiles) => ({
          ...prevProfiles,
          [user._id]: newUserProfile,
        }));

        setComments((prevComments) => {
          const updatedComments = [...prevComments, commentResponse];
          setNumberOfComments(updatedComments.length);
          return updatedComments;
        });
      }
    } catch (error) {
      console.error("Error creating comment", error);
    } finally {
      isSubmittingRef.current = false; // Reset the ref
      setIsSubmitting(false); // Reset the state for UI
    }
  };
useEffect(() => {
  let isDragging = false;
  let startPos = 0;
  let scrollLeft = 0;

  const startDrag = (e) => {
    isDragging = true;
    startPos = e.pageX - commentListRef.current.offsetLeft;
    scrollLeft = commentListRef.current.scrollLeft;
    commentListRef.current.style.cursor = "grabbing";
    commentListRef.current.style.userSelect = "none"; // Prevent text selection during drag
  };

  const stopDrag = () => {
    isDragging = false;
    commentListRef.current.style.cursor = "grab";
    commentListRef.current.style.removeProperty("user-select");
  };

  const doDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - commentListRef.current.offsetLeft;
    const walk = (x - startPos) * 2; // The * 2 factor increases the scroll speed
    commentListRef.current.scrollLeft = scrollLeft - walk;
  };

  // Add event listeners for mouse down, move, and up
  const commentListElement = commentListRef.current;
  if (commentListElement) {
    commentListElement.addEventListener("mousedown", startDrag);
    commentListElement.addEventListener("mouseleave", stopDrag);
    commentListElement.addEventListener("mouseup", stopDrag);
    commentListElement.addEventListener("mousemove", doDrag);
  }

  // Clean up the event listeners
  return () => {
    if (commentListElement) {
      commentListElement.removeEventListener("mousedown", startDrag);
      commentListElement.removeEventListener("mouseleave", stopDrag);
      commentListElement.removeEventListener("mouseup", stopDrag);
      commentListElement.removeEventListener("mousemove", doDrag);
    }
  };
}, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await userClient.account();
        setUser(userDetails);

        const userProfile = await profileClient.getProfileByUserID(
          userDetails._id
        );
        if (userProfile) {
          setUserProfile(userProfile);
        }

        const commentsResponse = await commentClient.getCommentsByPostId(
          postId
        );

        // Instead of forEach, use a more efficient method to update usersProfiles
        const profilesMap = {};
        for (const comment of commentsResponse) {
          if (!profilesMap[comment.userId]) {
            const userProfile = await profileClient.getProfileByUserID(
              comment.userId
            );
            profilesMap[comment.userId] = userProfile;
          }
        }

        setUsersProfiles(profilesMap);
        setComments(commentsResponse);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setIsSubmitting(false); // Reset submission status
      }
    };

    fetchDetails();
  }, [postId]);
  return (
    <div className="comment-section m-2">
      <div className="comment-list" ref={commentListRef}>
        {comments
          .slice()
          .reverse()
          .map((comment) => (
            <div className="comment" key={comment._id}>
              <Link to={`/Dashboard/profile/${comment.userId}`}>
                <img src={usersProfiles[comment.userId]?.avatar} alt="avatar" />
              </Link>
              <div className="comment-body">
                <div className="comment-header">
                  <h4 className="userName">
                    <Link to={`/Dashboard/profile/${comment.userId}`}>
                      {"@" + usersProfiles[comment.userId]?.userName}
                    </Link>
                  </h4>

                  <h4>{comment.text}</h4>
                </div>
                <div className="comment-sub">
                  <h5>{formatDate(comment.createAt)}</h5>
                  <h5>
                    {/* {comment.likesCount} */}
                    <FiHeart />
                  </h5>
                </div>
              </div>
            </div>
          ))}
      </div>
      {user && userProfile && (
        <div className="comment-edit d-flex justify-content-around ">
          <img src={userProfile.avatar} alt="avatar" />
          <input
            className="comment-box"
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={handleCommentChange}
          />

          <FiCornerRightUp
            onClick={handleCommentSubmit}
            disabled={isSubmitting || !comment.trim() || isSubmittingRef}
          />
        </div>
      )}
    </div>
  );
};

export default PostCommentSection;
