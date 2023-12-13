import {
  FiUser,
  FiBell,
  FiSearch,
  FiHome,
  FiFolder,
  FiEdit3,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";

import * as postsClient from "../../Services/postsClient";
import * as userClient from "../../Services/userClient";
import * as spotifyClient from "../../Services/spotifyClient";
import "./DashNav.css";

const DashNav = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(null);

  // Function to close the modal
  const closeEditModal = () => {
    setIsCreating(false);
  };
  // Function to open the modal
  const openEditModal = () => {
    if (Object.keys(user).length === 0) {
      navigate("/Register/Login");
      return;
    }
    setIsCreating(true);
  };
  const handleSave = async (event) => {
    event.preventDefault();
    const post = {
      description: description,
      spotifyContent: {
        contentName: selectedAlbum ? selectedAlbum.name : "",
        contentType: selectedAlbum ? selectedAlbum.type : null,
        contentID: selectedAlbum ? selectedAlbum.id : "",
      },
    };
    try {
      const response = await postsClient.createPost(user._id, post);
      // Handle response if needed
      if (response === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error appropriately
    }
    closeEditModal();
  };
  const handleButtonClick = (path) => {
    navigate(`/Dashboard${path}`); // Adjusted path for parameterized routing
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userClient.account(); // This should now include the accessToken

        setUser(user);
        setAccessToken(user.accesstoken);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error);
      }
    };

    fetchUser();
  }, []); // Fetch user details when component mounts

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      try {
        const results = await spotifyClient.searchSpotify(
          searchTerm,
          accessToken
        );
        setSearchResults(results); // Assuming the response has an albums.items structure
      } catch (error) {
        alert("Token Has Expired, Request New Token By Login Again!");
        await userClient.signOut();
        navigate("/Register/Login");
        return;
      }
    };

    performSearch();
  }, [searchTerm]); // Run effect whenever searchTerm changes

  return (
    <nav className="dashboard-nav">
      <ul>
        <h1>Belo.</h1>
      </ul>
      <ul className="shadow-button-set">
        <li>
          <button onClick={() => handleButtonClick("/feed")}>
            <FiHome />
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick("/search")}>
            <FiSearch />
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick("/messages")}>
            <FiBell />
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick("/playlist")}>
            <FiFolder />
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick("/profile")}>
            <FiUser />
          </button>
        </li>
        <li>
          <button onClick={openEditModal}>
            <FiEdit3 />
          </button>
        </li>
      </ul>

      <Modal show={isCreating} onClose={closeEditModal}>
        <form onSubmit={handleSave}>
          <div className="edit-body">
            <div className="instructions">
              <p>Please follow the guidelines below for creating a post:</p>
              <ul>
                <li>Keep your language respectful and inclusive.</li>
                <li>Avoid sharing sensitive personal information.</li>
                <li>Ensure your post does not violate any community rules.</li>
              </ul>
            </div>

            <div>
              <input
                className="search-box"
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-results d-flex flex-wrap">
                {searchResults.map((album, index) => (
                  <div
                    key={index}
                    className={`album-item ${
                      selectedAlbum && selectedAlbum.id === album.id
                        ? "selected"
                        : ""
                    }`}
                  >
                    <label className="album-radio">
                      <input
                        type="radio"
                        name="albumSelection"
                        value={album.name}
                        checked={selectedAlbum && selectedAlbum.id === album.id}
                        onChange={() => setSelectedAlbum(album)}
                      />
                      <img
                        src={album.images[0].url}
                        alt={album.name}
                        height="50"
                        width="50"
                      />
                      {album.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <textarea
              id="description"
              name="description"
              placeholder="Start typing your post..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              cols="50"
            ></textarea>

            <button className="my-3 save-button" type="submit">
              Create Post
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => closeEditModal()}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </nav>
  );
};

export default DashNav;
