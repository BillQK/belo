import axios from "axios";
const request = axios.create({
  withCredentials: true,
  timeout: 1000,
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
export const signIn = async (credentials) => {
  try {
    const response = await request.post(`${USERS_API}/signin`, credentials);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const signUp = async (credentials) => {
  try {
    const response = await request.post(`${USERS_API}/signup`, credentials);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const signOut = async () => {
  try {
    const response = await request.post(`${USERS_API}/signout`);
    return response.status;
  } catch (error) {
    handleError(error);
  }
};

export const account = async () => {
  try {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const findUserById = async (userId) => {
  try {
    const response = await request.get(`${USERS_API}/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const updateUser = async (userId, user) => {
  try {
    const response = await request.put(`${USERS_API}/${userId}`, user);
    return response.status;
  } catch (error) {
    handleError(error);
  }
};
export const findAllUsers = async () => {
  try {
    const response = await request.get(USERS_API);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
