import axios from "axios";
const request = axios.create({
  withCredentials: true,
});
const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUrl = process.env.REACT_APP_CALLBACK_API;
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
const SPOTIFY_BASE_API = `${BASE_API}/api/spotify`;

export const searchSpotify = async (query, accessToken) => {
  try {
    const response = await request.get(SPOTIFY_BASE_API, {
      params: {
        q: query,
        accessToken: accessToken,
        type: "album",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during Spotify search:", error);
    throw error;
  }
};
