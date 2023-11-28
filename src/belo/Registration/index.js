import Login from "./LogIn";
import SignUp from "./SignUp";
import "./index.css";
import { useParams } from "react-router";

const Register = () => {
  const { param } = useParams();
  console.log(param);
  return (
    <div className="background">
      <div className="register container">
        <div className="row">
          <div className="description col-sm-7 d-none d-lg-block">
            <h1> Belo.</h1>
            <p>
              A Social Media for music lovers where you can share melodies you
              love and discover new tunes
            </p>
          </div>

          <div className="register-box col-12 col-lg-5">
            {param === "Login" ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
