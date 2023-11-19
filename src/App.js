import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Home from "./belo/Home";
import DashBoard from "./belo/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Login from "./belo/Login";
import SignUp from "./belo/SignUp";
import store from "./belo/store";
import { Provider } from "react-redux";
import Callback from "./belo/Login/Callback";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/Dashboard/:param" element={<DashBoard />} />
              <Route path="/Login/" element={<Login />} />
              <Route path="/SignUp/" element={<SignUp />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
