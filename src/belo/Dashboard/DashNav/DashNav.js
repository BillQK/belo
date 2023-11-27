import {
  FiUser,
  FiBell,
  FiSearch,
  FiHome,
  FiFolder,
  FiEdit3,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./DashNav.css";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";

const DashNav = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  // Function to close the modal
  const closeEditModal = () => setIsCreating(false);
  // Function to open the modal
  const openEditModal = () => setIsCreating(true);

  const handleSave = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = (path) => {
    navigate(`/Dashboard${path}`); // Adjusted path for parameterized routing
  };
  return (
    <nav className="dashboard-nav">
      <ul>
        <h1>Belo.</h1>
      </ul>
      <ul className="shadow-button-set">
        <li>
          <button onClick={() => handleButtonClick("/feed")}>
            <FiHome />
            Home
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick("/search")}>
            <FiSearch />
            Search
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick("/messages")}>
            <FiBell />
            Alerts
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick("/playlist")}>
            <FiFolder />
            Playlist
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick("/profile")}>
            <FiUser />
            Profile
          </button>
        </li>
      </ul>
      <button onClick={openEditModal}>
        <FiEdit3 />
        Create New Post
      </button>

      <Modal show={isCreating} onClose={closeEditModal}>
        <form onSubmit={handleSave}>
          <div className="edit-body">
            {/* <div className="instructions">
              <p>Please follow the guidelines below for creating a post:</p>
              <ul>
                <li>Keep your language respectful and inclusive.</li>
                <li>Avoid sharing sensitive personal information.</li>
                <li>Ensure your post does not violate any community rules.</li>
                
              </ul>
            </div> */}

            {/* Search Tool */}
            <div>
              <input
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-results">
                {searchResults.map((track, index) => (
                  <div key={index} className="search-result-item">
                    <div>{track.name}</div>
                    <div>
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <textarea
              id="description"
              name="description"
              placeholder="Start typing your post..."
              defaultValue="Something Meaningful"
              rows="4"
              cols="50"
            ></textarea>

            <button className="my-3 save-button" type="submit">
              Save Changes
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
