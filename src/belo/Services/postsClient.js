import axios from "axios";
import { FaTrophy } from "react-icons/fa";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
export const POSTS_API = `${BASE_API}/api/posts`;
export const getAllPosts = async () => {
  const response = await request.get(`${POSTS_API}`);
  return response.data;
};

export const getPostsbyUserId = async (userId) => {
  const response = await request.get(`${USERS_API}/${userId}/posts`);
  return response.data;
};

export const createPost = async (userId, description) => {
  const response = await request.post(`${POSTS_API}`, { userId, description });
  const createdPost = response.data;
  console.log("postId: " + createdPost._id);
  return response.data;
};
