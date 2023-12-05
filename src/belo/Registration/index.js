import Login from "./LogIn";
import SetUpProfile from "./SetUpProfile";
import SignUp from "./SignUp";
import "./index.css";
import { useParams } from "react-router";
import "./registration.css";
const Register = () => {
  const { param } = useParams();

  const renderComponent = () => {
    switch (param) {
      case "Login":
        return <Login />;
      case "Signup":
        return <SignUp />;
      case "Setup":
        return <SetUpProfile />;
      default:
        // Return null or a default component
        return <Login />;
    }
  };

  return (
    <div className="background">
      <div className="register container-fluid">
        <div className="row">
          <div className="description col-sm-5 d-none d-lg-block">
            <h1> Belo.</h1>
            <p>
              A Social Media for music lovers where you can share melodies you
              love and discover new tunes
            </p>
          </div>

          <div className="register-box col-12 col-lg-5">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
