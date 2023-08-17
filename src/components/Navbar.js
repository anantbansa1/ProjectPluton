import React, { useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import InfoIcon from "@mui/icons-material/Info";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Pluton from "./Images/spaceship.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logOut, useAuth } from "../firebase";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { getDocs, query, collection, where } from "firebase/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { db } from "../firebase";
import { useLocation, useParams } from "react-router-dom";

export default function Navbar(props) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const user = useAuth();
  const [useremail, setuseremail] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const userid = useParams().email;
  const path = location.pathname;
  const regex = /^[\w-.]+@dseu\.ac\.in$/;
  const email = path.split("/")[2];

  const [Loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileimage, setprofileimage] = useState(
    "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature-825x465.jpg"
  );
  const [isadmin, setisadmin] = useState(false);

  useEffect(() => {
    if (user) {
      setuseremail(user.email);
      getDocs(query(collection(db, "user"))).then((snapshot) => {
        snapshot.forEach((u) => {
          if (u.data().email === user.email) {
            setprofileimage(u.data().profileimage);
            setisadmin(u.data().isadmin);
          }
        });
      });
    }
  }, [user]);

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
    handleLogOut();
  };

  const Title = ({ children }) => <div className="title">{children}</div>;

  async function handleLogOut() {
    setLoading(true);
    try {
      await logOut();
      navigate("/login");
    } catch {
      alert("Something went wrong! Please try again later.");
    }
    setLoading(false);
  }

  return (
    <div className="">
      <div className="flex-col shadow-2xl shadow-black bg-white bg-opacity-5 backdrop-blur-2xl backdrop-filter text-white  font-semibold flex  fixed left-0 top-0 h-full w-[15vw] md:w-[20vw]  place-content-around">
        <Link
          to="/home"
          className="flex items-center flex-col font-bold italic text-3xl mx-2 "
        >
          <img src={Pluton} alt="" className=" justify-center md:h-[80px] " />

          <button className="max-lg:hidden font-roboto font-light ">
            Pluton
          </button>
        </Link>
        <div className="flex flex-col space-y-[1.5vw]">
          <Link
            to="/home"
            className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4 flex items-center max-lg:justify-center ${
              path === "/home" ? " bg-opacity-10  bg-white" : ""
            } hover:bg-opacity-10 hover:bg-white rounded-full cursor-pointer  justify-start  text-center  text-base`}
          >
            {" "}
            <HomeIcon className=" scale-[120%]"></HomeIcon>
            <button className="max-lg:hidden">&nbsp;&nbsp;Home</button>
          </Link>
          <Link
            to="/leaderboard"
            className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4 flex ${
              path === "/leaderboard"
                ? " bg-opacity-10  bg-white  border-[#323232]"
                : ""
            } hover:bg-opacity-10 hover:bg-white rounded-full cursor-pointer items-center  max-lg:justify-center justify-start  text-center  text-base`}
          >
            <LeaderboardIcon className=" scale-[120%]"></LeaderboardIcon>
            <button className="max-lg:hidden">&nbsp;&nbsp;Leaderboard</button>
          </Link>
          {isadmin && (
            <Link
              to="/adduser"
              className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4 flex ${
                path === "/manageusers"
                  ? " bg-opacity-10  bg-white  border-[#323232]"
                  : ""
              } hover:bg-opacity-10 hover:bg-white rounded-full cursor-pointer items-center  max-lg:justify-center justify-start  text-center  text-base`}
            >
              <ManageAccountsIcon className=" scale-[120%]"></ManageAccountsIcon>
              <button className="max-lg:hidden">&nbsp;&nbsp;Manage </button>
            </Link>
          )}

          <Link
            to="/faq"
            className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4  ${
              path === "/faq"
                ? " bg-opacity-10 sm:px-6 px-2 py-4 bg-white  border-[#323232]"
                : ""
            } hover:bg-opacity-10  hover:bg-white rounded-full cursor-pointer  flex items-center   max-lg:justify-center justify-start text-center  text-base`}
          >
            <LiveHelpIcon className=" scale-[120%]"></LiveHelpIcon>
            <button className="max-lg:hidden">&nbsp;&nbsp;FAQ</button>
          </Link>
          <Link
            to="/ourteam"
            className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4 flex ${
              path === "/ourteam"
                ? " bg-opacity-10  bg-white  border-[#323232]"
                : ""
            } hover:bg-opacity-10 cursor-pointer hover:bg-white rounded-full items-center max-lg:justify-center justify-start  text-center  text-base`}
          >
            <InfoIcon className=" scale-[120%]"></InfoIcon>
            <button className="max-lg:hidden">&nbsp;&nbsp;Our Team</button>
          </Link>
          {!isadmin && (
            <Link
              to={`/user/${useremail}`}
              className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4 flex ${
                regex.test(userid) && email === useremail
                  ? " bg-opacity-10  bg-white"
                  : ""
              } rounded-full items-center max-lg:justify-center justify-start hover:bg-opacity-10 cursor-pointer hover:bg-white text-center  text-base`}
            >
              <button
                className={`flex justify-start  self-start border h-[26px] w-[26px] rounded-[100%] items-center text-base  `}
              >
                <AccountCircleIcon className=" scale-[120%]" />
                &nbsp;&nbsp;
              </button>
              <button className="max-lg:hidden">&nbsp;&nbsp; Profile </button>
            </Link>
          )}
        </div>

        <button
          onClick={() => {
            setOpen(true);
          }}
          className="flex  max-lg:text-center  items-center  text-[#E73A37]  text-base max-lg:justify-center justify-start max-lg:mx-auto mx-5 sm:px-6 px-2 py-4  hover:bg-white hover:bg-opacity-10 rounded-full "
        >
          <PowerSettingsNewIcon />
          <div className="  max-lg:hidden">&nbsp;&nbsp;Logout</div>
        </button>
      </div>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            background: "#1e1936",
            color: "#fff",
            borderRadius: 25,
            padding: "10px",
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(20px)",
          },
        }}
        fullWidth
        maxWidth="sm"
        keepMounted
        onClose={handleNo}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Logout"}</div>
        </DialogTitle>
        <DialogContent>
          <div className="text-[#e4e2e2] text-lg">
            Are you sure you want to logout?
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="" onClick={handleNo} sx={{ borderRadius: "15px" }}>
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: "15px" }}
            onClick={handleYes}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
