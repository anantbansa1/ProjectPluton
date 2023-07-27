import "./App.css";
import Navbar from "./components/Navbar";
import ClubProfile from "./components/pages/Clubprofile";
import zoro from "./components/Images/zoro.jpg";
import cops from "./components/Images/cops-logo.png"

function App() {
  return (
    <>
      <ClubProfile
        name="Club Of Programmers"
        desc="
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, necessitatibus fugiat, voluptates reprehenderit temporibus architecto "
        dp={zoro}
        clubpoint={110}
        tgold={150}
        tsilver={100}
        tbronze={50}
      ></ClubProfile>
    </>
  );
}

export default App;
