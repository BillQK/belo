import axios from "axios";

const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
export const POSTS_API = `${BASE_API}/api/posts`;
const handleError = (error) => {
  if (error.code === "ECONNABORTED") {
    console.error("Request timed out, refreshing the page...");
    window.location.reload();
  } else {
    console.error(error);
  }
};
export const getAllPosts = async () => {
  try {
    const response = await request.get(`${POSTS_API}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getPostsbyUserId = async (userId) => {
  try {
    const response = await request.get(`${USERS_API}/${userId}/posts`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createPost = async (userId, post) => {
  const response = await request.post(`${POSTS_API}`, { userId, post });
  return response.data;
};

export const updatePost = async (postId, post) => {
  try {
    const response = await request.put(`${POSTS_API}/${postId}`, post);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await request.delete(`${POSTS_API}/${postId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
