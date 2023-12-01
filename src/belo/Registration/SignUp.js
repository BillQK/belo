import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "./index.css";
import { useNavigate } from "react-router";
import * as userClient from "../Services/userClient";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCurrentUser } from "../User/userReducer";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUp = async () => {
    try {
      const currentUser = await userClient.signUp(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Register/Setup");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underLine"></div>
      </div>
      <div className="inputs">
        <div className="inputs">
          <FaUser />
          <input
            type="text"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
        </div>
        <div className="inputs">
          <FaEnvelope />
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="inputs">
          <FaLock />
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
      </div>
      <div className="submit-container">
        <button onClick={signUp}>Sign Up</button>
        <Link to="/Register/Login" className="btn ">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
