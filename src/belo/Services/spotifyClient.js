import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
const SPOTIFY_BASE_API = `${BASE_API}/search`;

export const redirectToSpotifyLogin = async () => {
  try {
    const response = await request.get(`${BASE_API}/login`);
    const { authUrl } = response.data;
    console.log(authUrl);
    window.location.href = authUrl; // Redirect the user
  } catch (error) {
    console.error("Login error:", error);
    // Handle login error (e.g., show a message to the user)
  }
};

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
