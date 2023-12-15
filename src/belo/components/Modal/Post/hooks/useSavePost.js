// hooks/useSavePost.js
import { useState } from "react";
import * as postsClient from "../../../../Services/postsClient";

const useSavePost = () => {
  const [error, setError] = useState(null);

  const savePost = async (postId, postData) => {
    try {
      const response = await postsClient.updatePost(postId, postData);
      if (response === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving post:", error);
      setError(error);
    }
  };

  return { savePost, error };
};

export default useSavePost;
