import { useEffect, useState } from "react";
import { FiLogOut, FiLogIn } from "react-icons/fi"; // Import for login/logout icons
import "./userStatus.css";
import * as profileClient from "../Services/profilesClient";
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

  const login = () => {
    navigate("/Register/Login"); // Navigate to login page
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const userProfile = await profileClient.getProfileByUserID(user._id);
          setProfile(userProfile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setIsLoading(false); // Set loading to false when done
        }
      };
      fetchData();
    } else {
      setIsLoading(false); // If there's no user, don't show loading
    }
  }, [user]);

  if (isLoading) {
    // Optionally, you can display a loader or a blank div here
    return <div className="container logout">Loading...</div>;
  }

  return (
    <div className="container logout">
      {user && profile ? (
        <>
          {/* Display user profile data */}
          <div>
            <img src={profile.avatar} alt="Avatar" />
          </div>
          <div>
            <h1>{profile.userName}</h1>
            <h2>Logged In</h2>
          </div>
          <div>
            <FiLogOut onClick={signout} />
          </div>
        </>
      ) : (
        <>
          <p>User is not logged in.</p>
          <div>
            <FiLogIn onClick={login} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserStatus;
