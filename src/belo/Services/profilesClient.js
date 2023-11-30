import axios from "axios";

const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const PROFILES_API = `${BASE_API}/api/profiles`;

export const getProfile = async (userId) => {
  const response = await request.get(`${PROFILES_API}/${userId}`);
  return response.data;
};

export const createProfile = async (profileDetails) => {
  const response = await request.post(`${PROFILES_API}`, profileDetails);
  return response.data;
};
