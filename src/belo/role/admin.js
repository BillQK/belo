import { useState, useEffect } from "react";
import * as profileClient from "../Services/profilesClient";
import { Link } from "react-router-dom";
import * as userClient from "../Services/userClient";
import "./admin.css";
const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleRestrict = async (userId) => {
    const response = await userClient.restrictUser(userId);
    if (response === 200) {
      window.location.reload();
    }
  };

  const handleUnRestrict = async (userId) => {
    const response = await userClient.unRestrictUser(userId);
    if (response === 200) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const performSearch = async () => {
      try {
        if (searchTerm !== "") {
          const results = await profileClient.findUserByUserName(searchTerm);
          console.log(results);
          setSearchResults(results); // Assuming the response has an albums.items structure
        }
      } catch (error) {
        console.log(error);
      }
    };

    performSearch();
  }, [searchTerm]); // Run effect whenever searchTerm changes

  return (
    <div className="edit-body">
      <div class="instructions">
        <h2>User Management Guidelines</h2>
        <ul>
          <li>Use respectful and inclusive language.</li>
          <li>Protect users' privacy and confidential information.</li>
          <li>Comply with community rules and standards.</li>
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
        <div className="search-results d-flex flex-column">
          {searchResults &&
            searchResults.map((user) => (
              <div key={user.userId} className="user-item d-flex">
                <Link to={`/Dashboard/profile/${user.userId}`}>
                  <img src={user.avatar} alt={`Avatar of ${user.userName}`} />
                  <span className="mt-2">{"@" + user.userName}</span>
                </Link>
                <button
                  type="submit"
                  className={`ms-auto delete-button ${
                    user.restricted ? "d-none" : ""
                  }`}
                  onClick={() => handleRestrict(user.userId)}
                >
                  Restrict
                </button>
                <button
                  type="submit"
                  className={`ms-auto delete-button ${
                    user.restricted ? "unrestrict-button" : "d-none"
                  }`}
                  onClick={() => handleUnRestrict(user.userId)}
                >
                  Restricted
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
