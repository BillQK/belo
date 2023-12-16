import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
const SPOTIFY_BASE_API = `${BASE_API}/search`;

export const loginEndpoint = process.env.REACT_APP_BASE_API_URL + "/login";

export const searchSpotify = async (userId, query) => {
  try {
    const response = await request.get(SPOTIFY_BASE_API, {
      params: {
        userId: userId,
        q: query,
        type: "album",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during Spotify search:", error);
    throw error;
  }
};
