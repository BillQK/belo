// hooks/useDeletePost.js
import { useState } from "react";
import * as postsClient from "../../../Services/postsClient";

const useDeletePost = () => {
  const [error, setError] = useState(null);

  const deletePost = async (postId) => {
    try {
      const response = await postsClient.deletePost(postId);
      if (response === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setError(error);
    }
  };

  return { deletePost, error };
};

export default useDeletePost;
