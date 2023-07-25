import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Userprofile from "./components/pages/Userprofile";
import zoro from "./components/Images/zoro.jpg";

function App() {
  return (
    <>
      <Userprofile name="Uday Yadav" rollno="41521069" dp={zoro}></Userprofile>
    </>
  );
}

export default App;
