import React, { useState } from "react";
import Navbar from "../Navbar";
import Image from "./Image"
import Poll from "./Poll"
export default function Text() {
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  const [announcement, setannouncement] = useState("");
  const [achievement, setachievement] = useState("");
  const [submit, setsubmit] = useState("");
  const [text,settext] = useState("");
  return (
    <div className="mt-[-2vw]">
      <Navbar></Navbar>
      <div className="flex-col max-md:ml-[20vw] max-md:w-[75vw] ml-[28vw] w-[64vw]">
        <div className=" bg-none  max-md:text-xl  flex items-center mt-[9vh] text-3xl justify-between">
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
                setoption("post");
              }}
              className={`p-[1vh] px-[3vh] border-white ${
                option === "post" ? "border-b text-white" : "text-slate-300"
              }`}
            >
              Post
            </button>
          </div>
          <div className="flex-col">
          <button
              onClick={(e) => {
                setoption("poll");
              }}
              className={`p-[1vh] px-[3vh] border-white ${
                option === "poll" ? "border-b text-white" : "text-slate-300"
              }`}
            >
              Poll
            </button>
          </div>
        </div>
        {option === "text" && (
          <div>
          <textarea
            onChange={(e) => {
              settext(e.target.value);
            }}
            className="p-[1vw] max-sm:h-[70vw] max-md:h-[40vw] max-md:w-[75vw] text-white text-xl bg-[#070315] h-[25vw] w-[64vw] mt-[3vw] shadow-lg shadow-black rounded-lg"
            placeholder="Enter your Text"
          ></textarea>
        </div>
        )}
        {option === "post" && (
          <Image></Image>
        )}
        {option === "poll" && (
          <Poll></Poll>
        )}
        <div className=" flex max-md:text-sm max-[1076px]:flex-col justify-around text-black text-xl  mt-[4vh]">
          <button
            onClick={(e) => {
              setevent(console.log(1));
            }}
            className="bg-white p-[1vh] px-[5vh] rounded-full hover:text-red-500"
          >
            +Event
          </button>
          <button
            onClick={(e) => {
              setevent(console.log(2));
            }}
            className="bg-white p-[1vh] max-[1076px]:mt-3  px-[5vh] rounded-full hover:text-red-500"
          >
            +Announcement
          </button>
          <button
            onClick={(e) => {
              setevent(console.log(3));
            }}
            className="bg-white p-[1vh] max-[1076px]:mt-3 px-[5vh] rounded-full hover:text-red-500"
          >
            +Achievement
          </button>
        </div>
        <div 
        onClick={(e) =>{
          console.log(text);
        }}
        className="text-white text-xl flex max-sm:ml-[57vw] ml-[59vw] mt-[3vw] hover:font-semibold cursor-pointer">
          Submit
        </div>
      </div>
    </div>
  );
}