import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import db from "../Database/index";
import User from "./Search/User/User";
import "./Search.css";
import EndOfFeed from "../Dashboard/Feed/EndOfFeed/EndOfFeed";

const suggestedUsers = db.users;

const Search = () => {
  const location = useLocation(); // Initialize useLocation hook to get access to location object
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q"); // Get the value of the 'q' query parameter

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
          {suggestedUsers.map((user, index) => (
            <User key={index} user={user} />
          ))}
        </div>
      )}
      <EndOfFeed />
    </div>
  );
};

export default Search;
