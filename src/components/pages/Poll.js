import React, { useState } from "react";
import Navbar from "../Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

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
        <div className="ml-[2vw] max-md:ml-[0vw] my-10">
          <div className=" mx-auto w-[50vw] max-md:w-[75vw] h-fit bg-[#0A0813] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
              <div>
              <TextField
              onChange={(e) => {
                setevent(e.target.value);
              }}
              sx={{ 
              "& .MuiInputBase-root": {
                  color: '#DFE2E8'
              },
              "& .MuiFormLabel-root": {
                color: '#AEB1B5'
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: '#AEB1B5'
              },
              ".MuiInputBase-input":  {
                background: '#0A0813'
              },
              ".MuiTextField-root": {
                background: '#FFFFFF'
              }
              }} 
              id="myfilled-name" 
              label="Question" 
              variant="outlined" 
              color="grey"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "45vw"
                },
              }}
              />
              <TextField
              onChange={(e) => {
                setevent(e.target.value);
              }}
              sx={{ 
              "& .MuiInputBase-root": {
                  color: '#DFE2E8'
              },
              "& .MuiFormLabel-root": {
                color: '#AEB1B5'
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: '#AEB1B5'
              },
              ".MuiInputBase-input":  {
                background: '#0A0813'
              },
              ".MuiTextField-root": {
                background: '#FFFFFF'
              }
              }} 
              id="myfilled-name" 
              label="Option 1" 
              variant="outlined" 
              color="grey"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "45vw"
                },
              }}
              />
              <TextField
              onChange={(e) => {
                setevent(e.target.value);
              }}
              sx={{ 
              "& .MuiInputBase-root": {
                  color: '#DFE2E8'
              },
              "& .MuiFormLabel-root": {
                color: '#AEB1B5'
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: '#AEB1B5'
              },
              ".MuiInputBase-input":  {
                background: '#0A0813'
              },
              ".MuiTextField-root": {
                background: '#FFFFFF'
              }
              }} 
              id="myfilled-name" 
              label="Option 2" 
              variant="outlined" 
              color="grey"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "45vw"
                },
              }}
              />
              <TextField
              onChange={(e) => {
                setevent(e.target.value);
              }}
              sx={{ 
              "& .MuiInputBase-root": {
                  color: '#DFE2E8'
              },
              "& .MuiFormLabel-root": {
                color: '#AEB1B5'
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: '#AEB1B5'
              },
              ".MuiInputBase-input":  {
                background: '#0A0813'
              },
              ".MuiTextField-root": {
                background: '#FFFFFF'
              }
              }} 
              id="myfilled-name" 
              label="Option 3" 
              variant="outlined" 
              color="grey"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "45vw"
                },
              }}
              />
              <TextField
              onChange={(e) => {
                setevent(e.target.value);
              }}
              sx={{ 
              "& .MuiInputBase-root": {
                  color: '#DFE2E8'
              },
              "& .MuiFormLabel-root": {
                color: '#AEB1B5'
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: '#AEB1B5'
              },
              ".MuiInputBase-input":  {
                background: '#0A0813'
              },
              ".MuiTextField-root": {
                background: '#FFFFFF'
              }
              }} 
              id="myfilled-name" 
              label="Option 4" 
              variant="outlined" 
              color="grey"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "45vw"
                },
              }}
              />
              </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}