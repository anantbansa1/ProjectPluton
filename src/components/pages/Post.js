import React, { useState } from "react";
import Navbar from "../Navbar";
// import zoro from ".components/Images/zoro";

export default function Text() {
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  const [announcement, setannouncement] = useState("");
  const [achievement, setachievement] = useState("");
  const [submit, setsubmit] = useState("");
  return (
    <div>
      <Navbar></Navbar>
      <div className=" text-white ml-[35vw] mx-auto mr-[10vw] flex space-x-40 items-center mt-[9vh] text-3xl">
        <div className="flex-col">
          <button
            onClick={(e) => {
              setoption("text");
            }}
            className=" text-lightgray rounded-full p-[1vh]  px-[3vh]"
          >
            Text
          </button>
          {option === "text" ? (
            <hr className="w-[7vw] border-white border-[2px]" />
          ) : (
            <hr className="hidden" />
          )}
        </div>
        <div className="flex-col">
          <button
            onClick={(e) => {
              setoption("image");
            }}
            className=" text-lightgray rounded-full p-[1vh]  px-[3vh]"
          >
            Posts
          </button>
          {option === "image" ? (
            <hr className="w-[8vw] border-white border-[2px]" />
          ) : (
            <hr className="hidden" />
          )}
        </div>
        <div className="flex-col">
          <button
            onClick={(e) => {
              setoption("Poll");
            }}
            className="text-lightgray rounded-full p-[1vh]  px-[3vh]"
          >
            Poll
          </button>
          {option === "Poll" ? (
            <hr className="w-[6.5vw] border-white border-[2px]" />
          ) : (
            <hr className="hidden" />
          )}
        </div>
      </div>
      <div className="bg-[#4B4A4A] ml-[37vw] h-[22vw] w-[38vw] mt-[1vw] mb-[2vh]">
      </div>
      <textarea className="bg-[#4B4A4A] ml-[32vw] h-[6vw] w-[50vw] mb-[1vh] text-white p-[0.5vh]"></textarea>
      <div className="ml-[32vw] text-black text-xl space-x-8 mt-[1vh]">
        <button 
        onClick={(e) => {
          setevent(console.log(1));
        }}
        className="bg-white p-[1vh] px-[4vh] rounded-full hover:text-red-500">
          +Event
        </button>
        <button 
        onClick={(e) => {
          setevent(console.log(2));
        }}
        className="bg-white p-[1vh] px-[4vh] rounded-full hover:text-red-500">
          +Announcement
        </button>
        <button 
        onClick={(e) => {
          setevent(console.log(3));
        }}
        className="bg-white p-[1vh] px-[4vh] rounded-full hover:text-red-500">
          +Achievement
        </button>
      </div>
      <div 
      onClick={(e) => {
        setevent(console.log(4));
      }}
      className="ml-[87vw] text-white text-2xl mt-[6vh] hover:font-semibold">
        <button>Submit</button>
      </div>
    </div>
  );
}
