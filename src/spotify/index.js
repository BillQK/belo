const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUrl = "http://localhost:3001/callback";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
