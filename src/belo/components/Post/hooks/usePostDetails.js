// hooks/usePostDetails.js
import { useState, useEffect } from "react";
import * as userClient from "../../../Services/userClient";
import * as likesClient from "../../../Services/likesClient";
import * as commentClient from "../../../Services/commentsClient";

const usePostDetails = (postId) => {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await userClient.account();
        setUser(userDetails);

        const likesResponse = await likesClient.findLikesByPost(postId);
        const commentsResponse = await commentClient.getCommentsByPostId(
          postId
        );
        if (likesResponse.find((like) => like.user._id === userDetails._id)) {
          setLiked(true);
        }
        setNumberOfLikes(likesResponse.length);
        setNumberOfComments(commentsResponse.length);
      } catch (error) {
        console.error("Error fetching details:", error);
        setError(true);
      }
    };

    fetchDetails();
  }, [postId]);

  return {
    user,
    liked,
    setLiked,
    numberOfLikes,
    setNumberOfLikes,
    numberOfComments,
    setNumberOfComments,
    error,
  };
};

export default usePostDetails;
