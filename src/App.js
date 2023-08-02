import "./App.css";
import Navbar from "./components/Navbar";
import AddUserAdmin from "./components/AddUserAdmin";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <AddUserAdmin filename="filename.csv"></AddUserAdmin>
    </>
  );
}

export default App;
