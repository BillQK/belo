import "./index.css";
import Feed from "./Feed/Feed";
import Sidebar from "./SideBar/Sidebar";
import { useParams } from "react-router";
import Profile from "../Profile/Profile";
import Search from "../Search/Search";
import DashNav from "./DashNav/DashNav";
import { useState } from "react";

const DashBoard = () => {
  const { param } = useParams();
  const [currentSong, setCurrentSong] = useState(null); // Add state to keep track of the current song

  const handlePostClicked = (song) => {
    setCurrentSong(song); // Function to update the current song
  };
  const renderComponent = () => {
    switch (param) {
      case "profile":
        return <Profile onPostClicked={handlePostClicked} />;
      case "search":
        return <Search />;
      default:
        // Return null or a default component
        return <Feed onPostClicked={handlePostClicked} />;
    }
  };
  return (
    <div className="background">
      <div className="dashboard container">
        <div className="row">
          <div className="col-sm-3 d-none d-lg-block">
            <DashNav />
          </div>

          <div className="col-12 col-lg-6">{renderComponent()}</div>

          <div className="col-sm-3 d-none d-lg-block">
            <Sidebar currentSong={currentSong} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
