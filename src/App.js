import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import ClubProfile from "./components/pages/Clubprofile";
import zoro from "./components/Images/zoro.jpg";

function App() {
  return (
    <>
      <ClubProfile name="COPS" desc="
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, necessitatibus fugiat, voluptates reprehenderit temporibus architecto " dp={zoro}></ClubProfile>
    </>
  );
}

export default App;
