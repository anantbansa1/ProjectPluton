import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Clubprofile from "./components/pages/Clubprofile";
import zoro from "./components/Images/default-pic.png";

function App() {
  return (
    <>
      <Clubprofile name="Uday Yadav" rollno="41521069" dp={zoro}></Clubprofile>
    </>
  );
}

export default App;
