import axios from "axios";

const request = axios.create({
  withCredentials: true,
  timeout: 5000, // Timeout set to 5000 milliseconds (5 seconds)
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
export const PROFILES_API = `${BASE_API}/api/profiles`;

export const getProfileByUserID = async (userId) => {
  try {
    const response = await request.get(`${PROFILES_API}/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createProfile = async (profileDetails) => {
  try {
    const response = await request.post(`${PROFILES_API}`, profileDetails);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProfileByUserId = async (userId, profile) => {
  try {
    const response = await request.put(`${PROFILES_API}/${userId}`, profile);
    return response.status;
  } catch (error) {
    handleError(error);
  }
};

export const findAllProfile = async () => {
  try {
    const response = await request.get(PROFILES_API);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
