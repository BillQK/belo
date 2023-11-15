import { FiUser, FiBell, FiSearch, FiHome, FiFolder } from "react-icons/fi";
import "./DashNav.css";

const DashNav = () => {
  return (
    <nav class="dashboard-nav">
      <ul>
        <h1>Belo</h1>
      </ul>
      <ul class="shadow-button-set">
        <li>
          <button>
            <FiHome />
            Home
          </button>
        </li>
        <li>
          <button>
            <FiSearch />
            Search
          </button>
        </li>
        <li>
          <button>
            <FiBell />
            Messages
          </button>
        </li>
        <li>
          <button>
            <FiFolder />
            Playlist
          </button>
        </li>
        <li>
          <button>
            <FiUser />
            Profile
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DashNav;
