// hooks/usePostDetails.js
import { useState, useEffect } from "react";
import * as userClient from "../../../../Services/userClient";
import * as likesClient from "../../../../Services/likesClient";

const usePostDetails = (postId) => {
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [error, setError] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await userClient.account();
        setAccessToken(userDetails.accesstoken);
        setUser(userDetails);

        const likesResponse = await likesClient.findLikesByPost(postId);
        if (likesResponse.find((like) => like.user._id === userDetails._id)) {
          setLiked(true);
        }
        setNumberOfLikes(likesResponse.length);
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
    error,
    accessToken,
  };
};

export default usePostDetails;
