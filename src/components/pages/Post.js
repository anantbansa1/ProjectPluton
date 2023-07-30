import React, { useState } from "react";
import Navbar from "../Navbar";
// import zoro from ".components/Images/zoro";

export default function Text() {
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  // const [announcement, setannouncement] = useState("");
  // const [achievement, setachievement] = useState("");
  // const [submit, setsubmit] = useState("");
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex-col max-[710px]:mx-auto  max-[619px]:mx-auto max-[820px]:space-x-100">
        <div className="ml-[37vw] flex items-center max-[414px]:mt-8 text-3xl w-[38vw] justify-between  max-[420px]:ml-[12vw]">
          <div className="flex-col">
            <button
              onClick={(e) => {
                setoption("text");
              }}
              className={`p-[1vh] px-[3vh] border-white ${
                option === "text" ? "border-b text-white" : "text-slate-300"
              }`}
            >
              Text
            </button>
          </div>
          <div className="flex-col">
            <button
              onClick={(e) => {
                setoption("image");
              }}
              className={`p-[1vh] px-[3vh] border-white  ${
                option === "image" ? "border-b text-white" : "text-slate-300"
              }`}
            >
              Posts
            </button>
          </div>
          <div className="flex-col">
            <button
              onClick={(e) => {
                setoption("Poll");
              }}
              className={` p-[1vh] px-[3vh] border-white ${
                option === "Poll" ? "border-b text-white" : "text-slate-300"
              }`}
            >
              Poll
            </button>
          </div>
        </div>
        <div className="bg-[#4B4A4A] ml-[37vw] h-[30vh] w-[50vh] mt-[3vw] mb-[2vh] max-[420px]:ml-[20vw] max-[420px]:w-[250px] max-[420px]:h-[200px]"></div>
        <textarea className="bg-[#4B4A4A] ml-[32vw] h-[10vh] w-[70vh] mb-[1vh] text-white p-[0.5vh] max-[420px]:ml-[20vw] max-[420px]:w-[250px]"></textarea>
      
      <div className=" max-[823px]:flex-col space-x-2 flex ml-[32vw] text-black text-xl mt-[3vh] ">
        <div>
          <button
            onClick={(e) => {
              setevent(console.log(1));
            }}
            className="bg-white p-[1vh] px-[4vh] rounded-full hover:text-red-500"
          >
            +Event
          </button>
        </div>
        <div>
          <button
            onClick={(e) => {
              setevent(console.log(2));
            }}
            className="bg-white p-[1vh] px-[4vh] rounded-full hover:text-red-500 max-[823px]:mt-[10px] max-[823px]:mb-[10px]"
          >
            +Announcement
          </button>
        </div>
        <div>
          <button
            onClick={(e) => {
              setevent(console.log(3));
            }}
            className="bg-white p-[1vh] px-[4vh] rounded-full hover:text-red-500"
          >
            +Achievement
          </button>
        </div>
      </div>
    </div>
      <div
        onClick={(e) => {
          setevent(console.log(4));
        }}
        className="max-[600px]:mr-[20vw] min-[375px]:ml-[75vw] ml-[100vw] text-white text-2xl mt-[7vh] hover:font-semibold"
      >
        <button>Submit</button>
      </div>
    </div>
  );
}
