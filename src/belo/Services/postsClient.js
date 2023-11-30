import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const POSTS_API = `${BASE_API}/api`;
export const USERS_API = `${BASE_API}/api/users`;
export const getAllPosts = async () => {
  const response = await request.get(`${POSTS_API}/posts`);
  return response.data;
};
