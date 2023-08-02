import "./App.css";
import Navbar from "./components/Navbar";
import AddUserAdmin from "./components/AddUserAdmin";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserFeed from "./components/pages/UserFeed"
import UserProfile from "./components/pages/Userprofile"
import FAQ from "./components/pages/FAQ"
import LoginPage from "./components/pages/Login"
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<UserFeed/>} />
          <Route path="/home" element={<UserFeed />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>

  );
}

export default App;
