import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook

import User from "./Search/User/User";
import "./Search.css";
import EndOfFeed from "../Dashboard/Feed/EndOfFeed/EndOfFeed";
import * as profileClient from "../Services/profilesClient";
import * as userClient from "../Services/userClient";

const Search = () => {
  const navigate = useNavigate();
  const [profiles, setUsers] = useState([]);
  const [currentUser, setUser] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation(); // Initialize useLocation hook to get access to location object
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q"); // Get the value of the 'q' query parameter

  const fetchUser = async () => {
    try {
      const user = await userClient.account();
      if (Object.keys(user).length === 0) {
        navigate("/Register/Login");
        return;
      }
      setUser(user);
      fetchUsers(user._id);
    } catch (error) {
      setError(error);
    }
  };

  const fetchUsers = async (userId) => {
    const profiles = await profileClient.findAllProfile();
    setUsers(profiles.filter((profile) => profile.userId !== userId));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="search">
      {query ? (
        // If there's a query parameter 'q', render something based on the search
        <div>
          <h1>Search Results for "{query}"</h1>
          {/* Render search results based on the query */}
        </div>
      ) : (
        // If there's no query parameter 'q', show suggested follows
        <div>
          <h1 id="suggestedFollow">Suggested Follows</h1>
          {profiles.map((user, index) => (
            <User key={index} user={user} currentUser={currentUser} />
          ))}
        </div>
      )}
      <EndOfFeed />
    </div>
  );
};

export default Search;
