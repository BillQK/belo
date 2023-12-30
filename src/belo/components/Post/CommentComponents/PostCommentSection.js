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
    const handleScroll = (event) => {
      if (
        commentListRef.current &&
        commentListRef.current.contains(event.target)
      ) {
        // Translate vertical scroll into horizontal
        commentListRef.current.scrollLeft += event.deltaY;

        // Prevent scrolling on the outer elements
        event.preventDefault();
      }
    };

    // Add event listener to the comment list
    const commentListElement = commentListRef.current;
    commentListElement.addEventListener("wheel", handleScroll, {
      passive: false,
    });

    // Clean up the event listener
    return () => {
      if (commentListElement) {
        commentListElement.removeEventListener("wheel", handleScroll);
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
            disabled={isSubmitting || !comment.trim() || isSubmittingRef}
          />
        </div>
      )}
    </div>
  );
};

export default PostCommentSection;
