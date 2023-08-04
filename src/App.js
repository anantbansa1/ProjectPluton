import "./App.css";
import React, { Component } from "react";
import Row from "./components/pages/Row"

import Navbar from "./components/Navbar";
import AddUserAdmin from "./components/AddUserAdmin";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserFeed from "./components/pages/UserFeed"
import UserProfile from "./components/pages/Userprofile"
import FAQ from "./components/pages/FAQ"
import LoginPage from "./components/pages/Login"
import ClubProfile from "./components/pages/Clubprofile";
import Resetpass from './components/pages/resetpass';
import Leaderboard from "./components/pages/Leaderboard";
import Addtext from "./components/pages/Addtext";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<UserFeed/>} />
          <Route path="/home" element={<UserFeed />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/clubprofile" element={<ClubProfile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/getemail" element={<Resetpass /> } />
          <Route path="/leaderboard" element={<Leaderboard /> } />
          <Route path="/add" element={<Addtext /> } />
          <Route path="/aboutus" element={<AboutUs /> } />
        </Routes>
    </Router>

  );
}

export default App;
