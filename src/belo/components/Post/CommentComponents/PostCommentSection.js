import { useState, useEffect, useRef } from "react";
import * as userClient from "../../../Services/userClient";
import * as profileClient from "../../../Services/profilesClient";
import * as commentClient from "../../../Services/commentsClient";
import "./PostCommentSection.css";
import { FiCornerRightUp, FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { updatePostComments } from "./CommentsReducer";
import { formatDate } from "../../Utility/FormatDate";

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
      const commentResponse = await commentClient.createComment({
        userId: user._id,
        text: comment,
        postParentId: postId,
      });

      if (commentResponse) {
        setComment(""); // Reset comment box
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
      <div className="comment-list">
        {comments
          .slice()
          .reverse()
          .map((comment) => (
            <div className="comment" key={comment._id}>
              <img src={usersProfiles[comment.userId]?.avatar} alt="avatar" />
              <div className="comment-body">
                <div className="comment-header">
                  <h4 className="userName">
                    {"@" + usersProfiles[comment.userId]?.userName}
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
            disabled={isSubmitting || !comment.trim()}
          />
        </div>
      )}
    </div>
  );
};

export default PostCommentSection;
