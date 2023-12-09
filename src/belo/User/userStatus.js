import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import "./userStatus.css";
import * as profileClient from "../Services/profilesClient"; // Import the profile client
import * as userClient from "../Services/userClient";
import { useNavigate } from "react-router";
const UserStatus = ({ user }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const signout = async () => {
    try {
      const status = await userClient.signOut();
      if (status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const userProfile = await profileClient.getProfileByUserID(user._id);
          setProfile(userProfile);
          setIsLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setIsLoading(false); // Set loading to false even on error
        }
      };
      fetchData();
    }
  }, [user]);

  return (
    <div className="container logout">
      {isLoading ? (
        <p>Anonymously</p>
      ) : user ? (
        <>
          {/* Display user profile data */}
          <div>
            <img src={profile.avatar} alt="Avatar" />
          </div>
          <div>
            <h1>{profile ? profile.userName : ""}</h1>
            <h2>Logged In</h2>
          </div>
          <div>
            <FiLogOut onClick={signout} />
          </div>
        </>
      ) : (
        <p>User is not logged in.</p>
      )}
    </div>
  );
};

export default UserStatus;
