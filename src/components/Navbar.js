import React, { useState } from "react";
import zoro from "./Images/zoro.jpg";
import SirfPencil from "./Images/SirfPencil.jpg";
import HomeIcon from "@mui/icons-material/Home";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import InfoIcon from "@mui/icons-material/Info";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Pluton from "./Images/spaceship.jpg";

export default function Navbar() {
  const [profile, setprofile] = useState(true);
  return (
    <>
      <div className="bg-[#A7C7E7]  font-semibold flex  fixed left-0 top-0 h-full w-[15vw] md:w-[20vw] flex-col  place-content-around">
        <div className="flex flex-col space-y-[6vh] ">
          <button className="flex items-center flex-col font-bold italic text-3xl mx-2 ">
            <img src={Pluton} alt="" className=" justify-center md:h-[80px] " />

            <button className="max-lg:hidden font-roboto font-light ">
              Pluton
            </button>
          </button>

          <div className="max-md:mx-auto mx-5 flex items-center max-md:justify-center justify-start  text-center  text-xl">
            {" "}
            <HomeIcon className=" scale-[120%]"></HomeIcon>
            <button className="max-md:hidden">&nbsp;&nbsp;Home</button>
          </div>
          {/* <hr className="mt-[3vh] w-[11vw] mx-auto border-black" /> */}
          <div className="max-md:mx-auto mx-5 flex items-center  max-md:justify-center justify-start text-center  text-xl">
            <LiveHelpIcon className=" scale-[120%]"></LiveHelpIcon>
            <button className="max-md:hidden">&nbsp;&nbsp;FAQ</button>
          </div>
          {/* <hr className="mt-[3vh] w-[11vw] mx-auto border-black" /> */}
          <div className="max-md:mx-auto mx-5 flex items-center max-md:justify-center justify-start  text-center  text-xl">
            <LeaderboardIcon className=" scale-[120%]"></LeaderboardIcon>
            <button className="max-md:hidden">&nbsp;&nbsp;Leaderboard</button>
          </div>
          {/* <hr className="mt-[3vh] w-[11vw] mx-auto border-black" /> */}
          <div className="max-md:mx-auto mx-5 flex items-center max-md:justify-center justify-start  text-center  text-xl">
            <InfoIcon className=" scale-[120%]"></InfoIcon>
            <button className="max-md:hidden">&nbsp;&nbsp;About Us</button>
          </div>
          <div className="max-md:mx-auto mx-5 flex items-center max-md:justify-center justify-start  text-center  text-xl">
            {/* <InfoIcon className=" scale-[120%]"></InfoIcon> */}
            <button className="flex justify-start self-start  h-[26px] w-[26px] rounded-[100%] items-center text-xl  ">
              <img
                src={zoro}
                alt=""
                className="h-[26px] w-[26px] rounded-[100%] "
              />
              &nbsp;&nbsp;
              {/* <button>Anant</button> */}
            </button>
            <button className="max-md:hidden">&nbsp;&nbsp;Profile</button>
          </div>
        </div>

        <div className="mb-5 max-md:text-center">
          <div className="max-md:justify-center justify-start text-[#E73A37]  text-xl flex-row">
            <button className="flex-row  max-md:justify-center justify-start max-md:mx-auto mx-5  ">
              <div className="flex items-center max-md:justify-center justify-start ">
                {/* <div className="scale-[120%] text-[#E73A37]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-power"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.5 1v7h1V1h-1z" />
                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                  </svg>
          
                </div> */}
                <PowerSettingsNewIcon />
                <div className=" mx-1 max-md:hidden">&nbsp;Logout</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
