import MusicPlayer from "../../components/MusicPlayer/Musicplayer";
import SearchBar from "../../Search/Search/SearchBar";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <SearchBar />
      <MusicPlayer />
    </div>
  );
};

export default Sidebar;
