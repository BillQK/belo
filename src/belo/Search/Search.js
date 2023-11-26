import React from "react";
import db from "../Database/index";
import User from "../components/User/User";
import "./Search.css";
import EndOfFeed from "../components/EndOfFeed/EndOfFeed";
const suggestedUsers = db.users;

const Search = () => {
  return (
    <div className="search">
      <h1 id="suggestedFollow">Suggested Follow</h1>
      {suggestedUsers.map((user, index) => (
        <User key={index} user={user} />
      ))}
      <EndOfFeed />
    </div>
  );
};

export default Search;
