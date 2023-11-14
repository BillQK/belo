import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Home from "./belo/Home";
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
            <Route path="/Login/*" element={<h1>Login</h1>} />
            <Route path="/Details/*" element={<h1>Details</h1>} />
            <Route path="/Profile/*" element={<h1>Profile</h1>} />
            <Route path="/Search/*" element={<h1>Search</h1>} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
