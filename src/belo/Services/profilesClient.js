import axios from "axios";

const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const PROFILES_API = `${BASE_API}/api/profiles`;

export const getProfileByUserID = async (userId) => {
  const response = await request.get(`${PROFILES_API}/${userId}`);
  return response.data;
};

export const createProfile = async (profileDetails) => {
  const response = await request.post(`${PROFILES_API}`, profileDetails);
  return response.data;
};

export const updateProfileByUserId = async (userId, profile) => {
  const response = await request.put(`${PROFILES_API}/${userId}`, profile);
  return response.status;
};

export const findAllProfile = async () => {
  const response = await request.get(PROFILES_API);
  return response.data;
};
