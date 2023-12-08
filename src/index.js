import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as  Route, Routes, HashRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter basename="/the_headline">
      <Routes>
        <Route path="/the_headline" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
