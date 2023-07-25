import React, { useState } from "react";
import Navbar from "../Navbar";
export default function Text() {
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  const [announcement, setannouncement] = useState("");
  const [achievement, setachievement] = useState("");
  const [submit, setsubmit] = useState("");
  return (
    <div>
      <Navbar></Navbar>
      <div className="  ml-[35vw] mx-auto mr-[10vw] flex space-x-40 items-center mt-[9vh] text-3xl">
        <div className="flex-col">
          <button
            onClick={(e) => {
              setoption("text");
            }}
            className={`${option === "text" ? 'text-white' : 'text-slate-300' } rounded-full p-[1vh]  px-[3vh] `}
          >
            Text
          </button>
          {option === "text" ? (
            <hr className="w-[7vw] border-white border" />
          ) : (
            <hr className="hidden" />
          )}
        </div>
        <div className="flex-col">
          <button
            onClick={(e) => {
              setoption("image");
            }}
            className={`${option === "image" ? 'text-white' : 'text-slate-300' } rounded-full p-[1vh]  px-[3vh] `}
          >
            Posts
          </button>
          {option === "image" ? (
            <hr className="w-[8vw] border-white border" />
          ) : (
            <hr className="hidden" />
          )}
        </div>
        <div className="flex-col">
          <button
            onClick={(e) => {
              setoption("Poll");
            }}
            className={`${option === "Poll" ? 'text-white' : 'text-slate-300' } rounded-full p-[1vh]  px-[3vh] `}
          >
            Poll
          </button>
          {option === "Poll" ? (
            <hr className="w-[6.5vw] border-white border" />
          ) : (
            <hr className="hidden" />
          )}
        </div>
      </div>
      <textarea className="p-[1vw]  text-white rounded-[10px] bg-[#4B4A4A] ml-[28vw] h-[19vw] w-[64vw] mt-[3vw]"></textarea>
      <div className="ml-[28vw] text-black text-xl space-x-8 mt-[4vh]">
        <button 
        onClick={(e) => {
          setevent(console.log(1));
        }}
        className="bg-white p-[1vh] px-[5vh] rounded-full hover:text-red-500">
          +Event
        </button>
        <button 
        onClick={(e) => {
          setevent(console.log(2));
        }}
        className="bg-white p-[1vh] px-[5vh] rounded-full hover:text-red-500">
          +Announcement
        </button>
        <button 
        onClick={(e) => {
          setevent(console.log(3));
        }}
        className="bg-white p-[1vh] px-[5vh] rounded-full hover:text-red-500">
          +Achievement
        </button>
      </div>
      <div 
      onClick={(e) => {
        setevent(console.log(4));
      }}
      className="ml-[87vw] text-white text-2xl mt-[8vh] hover:font-semibold">
        <button>Submit</button>
      </div>
    </div>
  );
}
