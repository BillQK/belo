import { useState } from "react";

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <form onSubmit={null}>
      <div className="edit-body">
        <div class="instructions">
          <h2>User Management Guidelines</h2>
          <ul>
            <li>Use respectful and inclusive language.</li>
            <li>Protect users' privacy and confidential information.</li>
            <li>Comply with community rules and standards.</li>
            <li>Provide prompt and helpful responses.</li>
            <li>Encourage and constructively handle feedback.</li>
            <li>Resolve conflicts fairly and amicably.</li>
            <li>Stay informed and continuously improve.</li>
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
            {searchResults.map((user, index) => (
              <div
                key={index}
                className={`user-item ${
                  selectedUser && selectedUser.id === user.id ? "selected" : ""
                }`}
              >
                <label className="user-radio">
                  <input
                    type="radio"
                    name="albumSelection"
                    value={user.name}
                    checked={selectedUser && selectedUser.id === user.id}
                    onChange={() => setSelectedUser(user)}
                  />
                  <img
                    src={user.images[0].url}
                    alt={user.name}
                    height="50"
                    width="50"
                  />
                  {user.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button className="my-3 save-button" type="submit">
          Create Post
        </button>
        <button className="cancel-button" type="button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Admin;
