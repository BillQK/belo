import axios from "axios";

const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const STORAGES_API = `${BASE_API}/api/storage`;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file); // 'file' should match the expected field in the server
  const response = await request.post(`${STORAGES_API}/upload`, formData);
  return response.data;
};
