import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const POSTS_API = `${BASE_API}/api`;
export const USERS_API = `${BASE_API}/api/users`;
export const getAllPosts = async () => {
  const response = await axios.get(`${POSTS_API}/posts`);
  return response.data;
};

export const signin = async (credentials) => {
  const response = await axios.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const account = async () => {
  const response = await axios.post(`${USERS_API}/account`);
  return response.data;
};
