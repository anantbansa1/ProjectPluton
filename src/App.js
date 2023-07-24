import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import RemoveUserAdmin from "./components/RemoveUserAdmin";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <RemoveUserAdmin filename="filename.csv"></RemoveUserAdmin>
    </>
  );
}

export default App;
