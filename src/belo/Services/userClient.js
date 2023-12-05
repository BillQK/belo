import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
export const POSTS_API = `${BASE_API}/api/posts`;

export const signIn = async (credentials) => {
  const response = await request.post(`${USERS_API}/signin`, credentials);
  return response.data;
};
export const signUp = async (credentials) => {
  console.log(credentials);
  const response = await request.post(`${USERS_API}/signup`, credentials);
  return response.data;
};
export const signOut = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};
export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  return response.data;
};
export const findUserById = async (userId) => {
  const response = await request.get(`${USERS_API}/${userId}`);
  return response.data;
};
export const updateUser = async (userId, user) => {
  const response = await request.put(`${USERS_API}/${userId}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await request.get(USERS_API);
  return response.data;
};
