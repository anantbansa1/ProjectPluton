import "./App.css";
import React from "react";
import AddUserAdmin from "./components/pages/AddUserAdmin";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserFeed from "./components/pages/UserFeed";
import UserProfile from "./components/pages/Userprofile";
import FAQ from "./components/pages/FAQ";
import LoginPage from "./components/pages/Login";
import ClubProfile from "./components/pages/Clubprofile";
import Resetpass from "./components/pages/resetpass";
import Leaderboard from "./components/pages/Leaderboard";
import Addtext from "./components/pages/Addtext";
import Manage from "./components/pages/Manage";
import AboutUs from "./components/pages/AboutUs";
import Pagenotfound from "./components/pages/Pagenotfound";
import Addnewclub from "./components/pages/Addnewclub";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "./firebase";

function App() {
  const user = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/getemail" element={<Resetpass />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<UserFeed />} />
          <Route path="/user/:email" element={<UserProfile />} />
          <Route path={"/club/:clubID"} element={<ClubProfile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add/:clubId" element={<Addtext />} />
          <Route path="/addclub" element={<Addnewclub />} />
          <Route path="/adduser" element={<AddUserAdmin />} />
          <Route path="*" element={<Pagenotfound />} />
          <Route path="/pagenotfound" element={<Pagenotfound />} />
          <Route path="/ourteam" element={<AboutUs />} />
          <Route path="/manage/:clubID" element={<Manage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
