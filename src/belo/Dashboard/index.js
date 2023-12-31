import "./index.css";
import Feed from "../components/Feed/Feed";
import Sidebar from "../components/SideBar/Sidebar";
import { useParams } from "react-router";
import Profile from "../Profile/Profile";
import Search from "../Search/Search";
import DashNav from "../components/DashNav/DashNav";
const DashBoard = () => {
  const { param } = useParams();

  return (
    <div className="background">
      <div className="dashboard container">
        <div className="row">
          <div className=" col-sm-3">
            <DashNav />
          </div>
          <div className=" col-sm-6 ">
            {param === "profile" ? (
              <Profile />
            ) : param === "search" ? (
              <Search />
            ) : (
              <Feed />
            )}
          </div>
          <div className="  col-sm-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
