import React from "react";
import db from "../Database/index";
import User from "../components/User/User";
const suggestedUsers = db.users;

const Search = () => {
  return (
    <div className="search">
      <h1>Suggested Follow</h1>
      {suggestedUsers.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
  );
};

export default Search;
