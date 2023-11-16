import { FiUser, FiBell, FiSearch, FiHome, FiFolder } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./DashNav.css";

const DashNav = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleButtonClick = (path) => {
    navigate(`/dashboard${path}`); // Adjusted path for parameterized routing
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
            Messages
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
    </nav>
  );
};

export default DashNav;
