import React, { useState } from "react";
import Navbar from "../Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";

export default function Text() {
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  const [announcement, setannouncement] = useState("");
  const [achievement, setachievement] = useState("");
  const [submit, setsubmit] = useState("");
  const [text, settext] = useState("");
  const searchStyle = {
    color: grey[100],
  };
  return (
    <div className=" mt-[-2vw]">
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
        <div className="  max-md:ml-[0vw] my-10">
          <div className=" mx-auto w-[60vw] max-md:w-[75vw] h-fit bg-[#d6d5d959] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white border border-white">
            <div className="text-white  p-[10px]">
            <TextField  color='grey' id="standard-basic" label="Question" variant="outlined" />
            </div>

            <div className="text-white p-[10px]">
              <TextField
                sx={{ input: { color: "white" }, label: { color: "white" } }}
                id="outlined-basic"
                label="Option 1"
                variant="filled"
              />
            </div>
            <div className="text-white p-[10px]">
              <TextField
                sx={{ input: { color: "white" }, label: { color: "white" } }}
                id="outlined-basic"
                label="Option 2"
                variant="filled"
              />
            </div>
            <div className="text-white p-[10px]">
              <TextField
                sx={{ input: { color: "white" }, label: { color: "white" } }}
                id="outlined-basic"
                label="Option 3"
                variant="filled"
              />
            </div>
            <div className="text-white p-[10px]">
              <TextField
                sx={{ input: { color: "white" }, label: { color: "white" } }}
                id="outlined-basic"
                label="Option 4"
                variant="filled"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
