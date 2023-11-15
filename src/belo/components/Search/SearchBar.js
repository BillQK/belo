import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    onSearch(searchTerm); // This could be a prop function that handles the search logic
  };

  return (
    <form
      onSubmit={handleSearch}
      className="search-form border border-secondary m-3"
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <FaSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
