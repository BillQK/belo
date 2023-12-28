import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const handleError = (error) => {
  if (error.code === "ECONNABORTED") {
    console.error("Request timed out, refreshing the page...");
    window.location.reload();
  } else {
    console.error(error);
  }
};

export const BASE_API = process.env.REACT_APP_BASE_API_URL;

export const COMMENTS_API = `${BASE_API}/api/comments`;

export const createComment = async (comment) => {
  const response = await request.post(`${COMMENTS_API}`, comment);
  return response.data;
};

export const updateComment = async (commentId, comment) => {
  try {
    const response = await request.put(`${COMMENTS_API}/${commentId}`, comment);
    return response.status;
  } catch (error) {
    handleError(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await request.delete(`${COMMENTS_API}/${commentId}`);
    return response.status;
  } catch (error) {
    handleError(error);
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await request.get(`${COMMENTS_API}/${postId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
