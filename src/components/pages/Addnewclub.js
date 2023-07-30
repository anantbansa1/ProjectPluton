import React from 'react'
import Navbar from "../Navbar";
import { TextField } from '@mui/material';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import SirfPencil from "../Images/SirfPencil.jpg";

const theme = createTheme({
  palette: {
    type: "dark"
  }
});


export default function Addnewclub(props) {
  const [event, setevent] = useState("");
  const [profile, setprofile] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [ClubImage, setclubimage] = useState(props.clubimage);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div>
    <Navbar></Navbar>
      <div className="ml-[20vw] max-md:ml-[15vw] my-10">
        <div className=" mx-auto w-[50vw] text-center max-md:w-[75vw] h-[40vw] bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white text-2xl">
          <div className="mx-auto px-1 py-1 h-[3vw] w-[20vw]  mb-[1vh] font-semibold font-orbitron">
            Add New Club
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <button 
                onClick={handleClickOpen}
                onMouseOut={(e) => {
                  setprofile(true);
                }}
                onMouseOver={(e) => {
                  setprofile(false);
                }}
                className="bg-white mr-auto h-[6vw] w-[6vw] min-w-[60px] min-h-[60px] object-cover rounded-[50%] "
              >
                {profile === false ? (
                  <img
                    src={SirfPencil}
                    alt=""
                    className="object-cover rounded-[50%]"
                  />
                ) : (
                  <img
                    src={ClubImage}
                    alt=""
                    className=" rounded-[50%] object-cover border-2 border-white h-[6vw] w-[6vw] min-w-[60px] min-h-[60px]"
                  />
                )}
              </button>
              <div className="ml-3">
                Club Logo
              </div>
            </div>
            <div className="mt-[2vw]">
             <ThemeProvider theme={theme}>
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
              label="Club Name" 
              variant="filled" 
              color="secondary"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "45vw"
                },
              }}
              />
            </ThemeProvider>
           </div>
            <div className="mt-[3vw]">
             <ThemeProvider theme={theme}>
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
              label="Club Description" 
              variant="filled" 
              color="secondary"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "45vw"
                },
              }}
              />
            </ThemeProvider>
           </div>
            <div className="mt-[3vw]">
             <ThemeProvider theme={theme}>
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
              label="President E-mail Id" 
              variant="filled" 
              color="secondary"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "45vw"
                },
              }}
              />
            </ThemeProvider>
           </div>
           <button
           onClick={(e) => {
            console.log(event);
          }} 
           className="bg-[#060606] shadow-xl rounded-lg px-6 py-2 self-center mt-[8vh] text-xl text-[#FFFFFF] hover:bg-opacity-50 ">
            Add
           </button>
          </div>
        </div>
      </div>
    </div>
  )
}
