import React from 'react'
import Navbar from "../Navbar";
import { TextField } from '@mui/material';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import SirfPencil from "../Images/SirfPencil.jpg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef } from "react";
import { useEffect,useCallback } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import zoro from "../Images/zoro.jpg"


const theme = createTheme({
  palette: {
    type: "dark"
  }
});


export default function Addnewclub(props) {
  const [CoverImage, setcoverimage] =useState(zoro);
  const [upImgCover, setUpImgCover] = useState(CoverImage);
  const imgRefCover = useRef(null);
  const previewCanvasRefCover = useRef(null);
  const [cropCover, setCropCover] = useState({ aspect: 1, height: 500 });
  const [completedCropCover, setCompletedCropCover] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
 const [changeCover, setChangeCover] = useState(false);
  const [openCover, setOpenCover] = React.useState(false);
  const [event, setevent] = useState("");
  const [profile, setprofile] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [ClubImage, setclubimage] = useState(props.clubimage);
  const handleClickOpen = () => {
    setOpen(true);
  };
  function SaveChangesCover(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }
    setOpenCover(false);
    console.log("hahahah");
    if (crop.width && crop.height) {
      canvas.toBlob((blob) => {
        const Imageuse = canvas.toDataURL("image/png");
        setcoverimage(Imageuse);
      }, "image/png");
    }
  }
  function setCanvasImageCover(image, canvas, crop) {
    if (!crop || !canvas || !image) {
      return;
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }

  const onSelectFileCover = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImgCover(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      console.log("idarbeta");
    }
  };
  const onLoadCover = useCallback((img) => {
    imgRefCover.current = img;
  }, []);

  useEffect(() => {
    setCanvasImageCover(
      imgRefCover.current,
      previewCanvasRefCover.current,
      completedCropCover
    );
  }, [completedCropCover]);
  const handleClickOpenCover = () => {
    setOpenCover(true);
  };
  const handleCloseCover = () => {
    setOpenCover(false);
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
          <div className="grid grid-rows-1 grid-cols-1">
              <img 
              src={CoverImage}
              alt=""
              className="bg-white mr-auto h-[10vw] w-[10vw] min-w-[100px] min-h-[100px] min-[375px]:w-[100px] min-[375px]:h-[100px] object-cover rounded-[50%] "
              onClick={handleClickOpenCover}
              onMouseOver={(e) => {
                setChangeCover(true);
              }}
              onMouseOut={(e) => {
                setChangeCover(false);
              }}
            />
              
          <button
            onMouseOver={(e) => {
              setChangeCover(true);
            }}
            // onClick={handleClickOpen}
            onClick={handleClickOpenCover}
            onMouseOut={(e) => {
              setChangeCover(false);
            }}
            // className={`${
            //   changeCover ? "" : "hidden"
            // } px-4 py-2 shadow-inner shadow-black row-start-1 col-start-1 text-white text-3xl bg-black bg-opacity-10 rounded-md`}
          >
              </button>
            </div>
              {/* <button 
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
              </button> */}
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
    <div>
      <Dialog
        open={openCover}
        onClose={handleCloseCover}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Change Cover Picture"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ReactCrop
              src={upImgCover}
              onImageLoaded={onLoadCover}
              crop={cropCover}
              onChange={(c) => setCropCover(c)}
              ruleOfThirds={true}
              onComplete={(c) => setCompletedCropCover(c)}
              circularCrop={true}
            />
            <div className="flex my-5 justify-between">
              <input
                className=" text-[#5d5d5d] file:mr-5 file:px-4 file:py-2 file:border-[1px] file:text-xs file:font-medium file:bg-black file:text-white hover:file:cursor-pointer hover:file:bg-black hover:file:text-white"
                type="file"
                accept="image/*"
                onChange={onSelectFileCover}
              ></input>
              {/* <button className="hover:underline" onClick={setclubimage(gold)}> Unset Photo</button> */}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="mx-3 hover:underline px-3 py-2 "
            onClick={handleCloseCover}
          >
            Cancel
          </button>
          <div className="hidden">
            <canvas ref={previewCanvasRefCover} />
          </div>
          <button
            className="mx-3 bg-black text-white px-3 py-2 "
            onClick={() =>
              SaveChangesCover(
                previewCanvasRefCover.current,
                completedCropCover
              )
            }
            autoFocus
          >
            Save Changes
          </button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
}