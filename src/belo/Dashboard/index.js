import DashBoardNavigation from "./DashBoardNavigation";
import "./Dashboard.css";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import { useParams } from "react-router";
const DashBoard = () => {
  return (
    <div className="background">
      <div class="dashboard container">
        <div class="row">
          <div class=" col-sm-3">
            <DashBoardNavigation />
          </div>
          <div class=" col-sm-6 ">
            <Feed />
          </div>
          <div class="  col-sm-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
