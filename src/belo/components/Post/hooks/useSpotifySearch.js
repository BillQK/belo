// hooks/useSpotifySearch.js
import { useState, useEffect } from "react";
import * as spotifyClient from "../../../Services/spotifyClient";
import { useNavigate } from "react-router";
const useSpotifySearch = (userId, searchTerm, contentID) => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    if (searchTerm === "") return;

    const performSearch = async () => {
      try {
        const results = await spotifyClient.searchSpotify(userId, searchTerm);
        setSearchResults(results);
        setSelectedAlbum(results.find((album) => album.id === contentID));
      } catch (error) {
        console.error("Spotify search error:", error);
        navigate("/Register/login");
      }
    };

    performSearch();
  }, [searchTerm, contentID, navigate]);

  return { searchResults, selectedAlbum, setSelectedAlbum };
};

export default useSpotifySearch;
