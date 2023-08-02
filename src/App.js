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
        clubimage={zoro}
        coverimage={zoro}
        desc="
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo sapiente laboriosam ratione, vero doloribus possimus et ut deserunt animi distinctio? Facilis tenetur commodi molestias minima, dicta possimus earum qui quaerat."
      ></Userprofile>
    </>
  );
}

export default App;
