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
        <div className=" mx-auto w-[60vw] text-center max-md:w-[75vw] h-[80vh] bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white text-2xl">
          <div className="flex flex-col items-start h-[60vh] max-[414px]:h-[80vh] ">
          <div className="mx-auto h-[5vh] w-[40vh] min-[375px]:w-[30vh] mb-[2vh] min-[375px]:mb-[5vh] font-semibold ">
            Add New Club
          </div>
          <div className="flex flex-col h-[8vw] w-[40vw] min-[414px]:h-[15vh] items-start">
              <button 
                onClick={handleClickOpen}
                onMouseOut={(e) => {
                  setprofile(true);
                }}
                onMouseOver={(e) => {
                  setprofile(false);
                }}
                className="bg-white mr-auto h-[10vw] w-[10vw] min-w-[100px] min-h-[100px] min-[375px]:w-[100px] min-[375px]:h-[100px] object-cover rounded-[50%] "
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
                    className=" rounded-[50%] object-cover border-2 border-white h-[10vw] w-[10vw] min-w-[100px] min-h-[100px] min-[375px]:w-[100px] min-[375px]:h-[100px]"
                  />
                )}
              </button>
              </div>
            <div className="flex flex-col max-[414px]:justify-center max-[414px]:w-[60vw] h-[43vh] max-[414px]:mt-[25vw] max-[414px]:h-[40vh] ">
            <div className="mt-[1vw]">
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
              color="grey"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "55vw",
                },
              }}
              />
            </ThemeProvider>
           </div>
            <div className="max-[375px]:mt-[5vw] mt-[2vw]">
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
              color="grey"
              inputProps={{
                style: {
                  height: "3vh",
                  width: "55vw ",
                },
              }}
              
              />
            </ThemeProvider>
           </div>
            <div className="max-[375px]:mt-[5vw] mt-[2vw]">
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
              color="grey"
              inputProps={{
                style: {
                  height: "3vh ",
                  width: "55vw "
                },
              }}
              />
            </ThemeProvider>
           </div>
           <button
           onClick={(e) => {
            console.log(event);
            }} 
           className="bg-[#060606] max-[414px]:self-center shadow-xl rounded-lg px-6 py-2 self-center mt-[3vh] text-xl text-[#FFFFFF] hover:bg-opacity-50 ">
            Add
           </button>
           </div>
          </div>
          </div>
        
      </div>
    </div>
  )
}
