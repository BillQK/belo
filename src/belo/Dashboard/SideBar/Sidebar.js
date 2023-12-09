import { useEffect, useState } from "react";
// import SearchBar from "../../Search/Search/SearchBar";
import "./Sidebar.css";
import * as userClient from "../../Services/userClient";
import UserStatus from "../../User/userStatus";
const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userClient.account();
        setUser(user);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="sidebar">
      {/* <SearchBar /> */}
      <UserStatus user={user} />
    </div>
  );
};

export default Sidebar;
