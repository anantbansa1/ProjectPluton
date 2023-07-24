import React, { useState } from "react";
import zoro from "./Images/default-pic.png";
import SirfPencil from "./Images/SirfPencil.jpg";

export default function Navbar() {
  const [profile, setprofile] = useState(true);
  return (
    <>
      <div className="bg-[#a7c7e7] fixed left-0 top-0 h-[100vh] w-[20vw] flex-col items-center space-y-[20vh]">
        <div className="flex-col">
          <button
            onMouseOut={(e) => {
              setprofile(true);
            }}
            onMouseOver={(e) => {
              setprofile(false);
            }}
            className="bg-white w-[7vw] h-[7vw] mx-auto mt-[10vh]  rounded-[50%] ml-[6.5vw]"
          >
            {profile === false ? (
              <img src={SirfPencil} alt="" className="rounded-[50%]" />
            ) : (
              <img
                src={zoro}
                alt=""
                className="rounded-[50%] w-[7vw] h-[7vw]"
              />
            )}
          </button>
          <div className="mx-auto text-center mt-[6vh] text-xl">
            <button>Home</button>
          </div>
          <hr className="mt-[3vh] w-[11vw] mx-auto border-black" />
          <div className="mx-auto text-center mt-[3vh] text-xl">
            <button>FAQ</button>
          </div>
          <hr className="mt-[3vh] w-[11vw] mx-auto border-black" />
          <div className="mx-auto text-center mt-[3vh] text-xl">
            <button>Leaderboard</button>
          </div>
          <hr className="mt-[3vh] w-[11vw] mx-auto border-black" />
          <div className="mx-auto text-center mt-[3vh] text-xl">
            <button>About Us</button>
          </div>
        </div>

        <div>
          <div className=" text-center text-xl flex-row text-red-600">
            <button className="flex-row">
              <div className="flex items-center">
                <div>
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
                </div>
                <div className="mx-1">Logout</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
