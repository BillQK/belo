import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Home from "./belo/Home";
import DashBoard from "./belo/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/DashBoard/*" element={<DashBoard />} />
            <Route path="/Login/*" element={<h1>Login</h1>} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
