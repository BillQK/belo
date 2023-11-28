// Third-party library imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import React, { Suspense, lazy } from "react";

// Style imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

// Store import
import store from "./belo/store";

// Local component imports
import Home from "./belo/Home";
import LoadingScreen from "./belo/components/Utility/LoadingScreen";

const DashBoard = lazy(() => import("./belo/Dashboard"));
const Register = lazy(() => import("./belo/Registration"));
const Callback = lazy(() => import("./belo/Registration/Callback"));
const NotFound = lazy(() => import("./belo/components/Utility/NotFound"));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <div>
              <Routes>
                <Route path="/*" element={<Navigate to="/Home" />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/Dashboard/:param" element={<DashBoard />} />
                <Route path="/Register/:param" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
