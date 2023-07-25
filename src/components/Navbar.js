import React, { useState } from "react";
import zoro from "./Images/zoro.jpg";
import SirfPencil from "./Images/SirfPencil.jpg";
import HomeIcon from "@mui/icons-material/Home";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import InfoIcon from "@mui/icons-material/Info";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function Navbar() {
  const [profile, setprofile] = useState(true);
  return (
    <>
      <div className="bg-[#a7c7e7] flex  fixed left-0 top-0 h-[100vh] w-[15vw] md:w-[20vw] flex-col  place-content-around">
        <div className="flex flex-col space-y-[6vh] ">
      <button className="flex self-center items-center text-xl bg-white w-[7vw] h-[7vw] mx-5  rounded-[50%] ">
            <img src={zoro} alt="" className="rounded-[50%] w-[7vw] h-[7vw]" />&nbsp;&nbsp;
            {/* <button>Anant</button> */}
          </button>

          <div className="mx-5 flex items-center max-[768px]:justify-center justify-start  text-center  text-xl">
            {" "}
            <HomeIcon className=" scale-[120%]"></HomeIcon>&nbsp;&nbsp;
            <button className="max-[768px]:hidden">Home</button>
          </div>
          {/* <hr className="mt-[3vh] w-[11vw] mx-auto border-black" /> */}
          <div className="mx-5 flex items-center  max-[768px]:justify-center justify-start text-center  text-xl">
            <LiveHelpIcon className=" scale-[120%]"></LiveHelpIcon>&nbsp;&nbsp;
            <button className="max-[768px]:hidden">FAQ</button>
          </div>
          {/* <hr className="mt-[3vh] w-[11vw] mx-auto border-black" /> */}
          <div className="mx-5 flex items-center max-[768px]:justify-center justify-start  text-center  text-xl">
            <LeaderboardIcon className=" scale-[120%]"></LeaderboardIcon>
            &nbsp;&nbsp;
            <button className="max-[768px]:hidden">Leaderboard</button>
          </div>
          {/* <hr className="mt-[3vh] w-[11vw] mx-auto border-black" /> */}
          <div className="mx-5 flex items-center max-[768px]:justify-center justify-start  text-center  text-xl">
            <InfoIcon className=" scale-[120%]"></InfoIcon>&nbsp;&nbsp;
            <button className="max-[768px]:hidden">About Us</button>
          </div>
        </div>

        <div className="mb-5 max-[768px]:text-center">
          <div className="max-[768px]:justify-center justify-start text-[#E73A37]  text-xl flex-row">
            <button className="flex-row  max-[768px]:justify-center justify-start mx-5">
              <div className="flex items-center max-[768px]:justify-center justify-start ">
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
                <div className="text-black mx-1 max-[768px]:hidden">&nbsp;Logout</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
