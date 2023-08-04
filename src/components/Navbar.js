import React from "react";
import zoro from "./Images/zoro.jpg";
import HomeIcon from "@mui/icons-material/Home";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import InfoIcon from "@mui/icons-material/Info";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Pluton from "./Images/spaceship.png";
// bg-[#1c1733]
export default function Navbar(props) {
  return (
    <div className="">
      <div className="flex-col shadow-2xl shadow-black bg-white bg-opacity-5 backdrop-blur-2xl backdrop-filter text-white  font-semibold flex  fixed left-0 top-0 h-full w-[15vw] md:w-[20vw]  place-content-around">
        <button className="flex items-center flex-col font-bold italic text-3xl mx-2 ">
          <img src={Pluton} alt="" className=" justify-center md:h-[80px] " />

          <button className="max-lg:hidden font-roboto font-light ">
            Pluton
          </button>
        </button>
        <div className="flex flex-col space-y-[1.5vw]">
          <div
            className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4 flex items-center max-lg:justify-center ${
              props.selected === "home" ? " bg-opacity-10  bg-white" : ""
            } hover:bg-opacity-10 hover:bg-white rounded-full cursor-pointer  justify-start  text-center  text-xl`}
          >
            {" "}
            <HomeIcon className=" scale-[120%]"></HomeIcon>
            <button className="max-lg:hidden">&nbsp;&nbsp;Home</button>
          </div>
          {/* <hr className="mt-[3vh] w-[11vw] mx-auto border-black" /> */}
          <div
            className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4  ${
              props.selected === "faq"
                ? " bg-opacity-10 sm:px-6 px-2 py-4 bg-white  border-[#323232]"
                : ""
            } hover:bg-opacity-10  hover:bg-white rounded-full cursor-pointer  flex items-center   max-lg:justify-center justify-start text-center  text-xl`}
          >
            <LiveHelpIcon className=" scale-[120%]"></LiveHelpIcon>
            <button className="max-lg:hidden">&nbsp;&nbsp;FAQ</button>
          </div>
          {/* <hr className="mt-[3vh] w-[11vw] mx-auto border-black" /> */}
          <div
            className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4 flex ${
              props.selected === "leaderboard"
                ? " bg-opacity-10  bg-white  border-[#323232]"
                : ""
            } hover:bg-opacity-10 hover:bg-white rounded-full cursor-pointer items-center  max-lg:justify-center justify-start  text-center  text-xl`}
          >
            <LeaderboardIcon className=" scale-[120%]"></LeaderboardIcon>
            <button className="max-lg:hidden">&nbsp;&nbsp;Leaderboard</button>
          </div>
          {/* <hr className="mt-[3vh] w-[11vw] mx-auto border-black" /> */}
          <div
            className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4 flex ${
              props.selected === "aboutus"
                ? " bg-opacity-10  bg-white  border-[#323232]"
                : ""
            } hover:bg-opacity-10 cursor-pointer hover:bg-white rounded-full items-center max-lg:justify-center justify-start  text-center  text-xl`}
          >
            <InfoIcon className=" scale-[120%]"></InfoIcon>
            <button className="max-lg:hidden">&nbsp;&nbsp;About Us</button>
          </div>
          <div
            className={`max-lg:mx-auto mx-5 sm:px-6 px-2 py-4 flex ${
              props.selected === "profile" ? " bg-opacity-10  bg-white" : ""
            } rounded-full items-center max-lg:justify-center justify-start hover:bg-opacity-10 cursor-pointer hover:bg-white text-center  text-xl`}
          >
            {/* <InfoIcon className=" scale-[120%]"></InfoIcon> */}
            <button
              className={`flex justify-start  self-start border h-[26px] w-[26px] rounded-[100%] items-center text-xl  `}
            >
              <img
                src={zoro}
                alt=""
                className="h-[26px] w-[26px] rounded-[100%] "
              />
              &nbsp;&nbsp;
              {/* <button>Anant</button> */}
            </button>
            <button className="max-lg:hidden">&nbsp;&nbsp;Profile</button>
          </div>
        </div>

        <button className="flex  max-lg:text-center  items-center  text-[#E73A37]  text-xl max-lg:justify-center justify-start max-lg:mx-auto mx-5 sm:px-6 px-2 py-4  hover:bg-white hover:bg-opacity-10 rounded-full ">
          <PowerSettingsNewIcon />
          <div className="  max-lg:hidden">&nbsp;&nbsp;Logout</div>
        </button>
      </div>
    </div>
  );
}