import "./App.css";
import Navbar from "./components/Navbar";
import Userprofile from "./components/pages/Userprofile";
import zoro from "./components/Images/zoro.jpg";

function App() {
  return (
    <>
      <Userprofile
        name="John Doe"
        rollno="41521069"
        dp={zoro}
        joined="5"
        points="45"
      ></Userprofile>
    </>
  );
}

export default App;
