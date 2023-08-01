import "./App.css";
import Navbar from "./components/Navbar";
import ClubProfile from "./components/pages/Clubprofile";
import zoro from "./components/Images/cjeck.jpg";
import cops from "./components/Images/cops-logo.png";

// db.collection("test").get().then((snapshot)=>{snapshot.docs.forEach(element => {
//   console.log(element);
// });})

function App() {
  return (
    <>
      {/* {(getCities(db)} */}
      <ClubProfile
        name="Club Of Pokemon"
        desc="
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, necessitatibus fugiat, voluptates reprehenderit temporibus architecto "
        clubimage={cops}
        coverimage={zoro}
        clubpoint={160}
        tgold={150}
        tsilver={100}
        tbronze={50}
        Role={"user"}
      ></ClubProfile>
    </>
  );
}

export default App;
