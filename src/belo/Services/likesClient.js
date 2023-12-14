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
export const LIKES_API = `${BASE_API}/api/likes`;

export const findLikesByPost = async (postId) => {
  try {
    const response = await request.get(`${LIKES_API}/post/${postId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const findLikesByUser = async (userId) => {
  try {
    const response = await request.get(`${LIKES_API}/user/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const createLike = async (userId, postId) => {
  try {
    const response = await request.post(`${LIKES_API}/${userId}/${postId}`);
    return response.status;
  } catch (error) {
    handleError(error);
  }
};
export const deleteLike = async (userId, postId) => {
  try {
    const response = await request.delete(`${LIKES_API}/${userId}/${postId}`);
    return response.status;
  } catch (error) {
    handleError(error);
  }
};
