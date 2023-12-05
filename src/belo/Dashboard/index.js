import "./index.css";
import Feed from "./Feed/Feed";
import Sidebar from "./SideBar/Sidebar";
import { useParams } from "react-router";
import Profile from "../Profile/Profile";
import Search from "../Search/Search";
import DashNav from "./DashNav/DashNav";

const DashBoard = () => {
  const { param, userId } = useParams();

  const renderComponent = () => {
    if (param === "profile") {
      if (userId) {
        // Render the Profile component with the specified userId
        return <Profile otherUserID={userId} />;
      } else {
        // Render the user's own profile (assuming user is authenticated)
        return <Profile otherUserID={undefined} />;
      }
    } else if (param === "search") {
      return <Search />;
    } else {
      // Return null or a default component
      return <Feed />;
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
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
