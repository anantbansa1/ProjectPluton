import React, { useCallback, useState } from "react";
import Navbar from "../Navbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef } from "react";
import { useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// import zoro from "../Images/zoro.jpg";
import default_img from "../Images/zoro.jpg";

function Image() {
  const [CoverImage, setcoverimage] =useState(default_img);
  const [upImgCover, setUpImgCover] = useState(CoverImage);
  const imgRefCover = useRef(null);
  const previewCanvasRefCover = useRef(null);
  const [cropCover, setCropCover] = useState({ aspect: 1, height: 500 });
  const [completedCropCover, setCompletedCropCover] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
 const [changeCover, setChangeCover] = useState(false);
  const [openCover, setOpenCover] = React.useState(false);
  
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  // const [announcement, setannouncement] = useState("");
  // const [achievement, setachievement] = useState("");
  // const [submit, setsubmit] = useState("");
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
      {/* <Navbar></Navbar> */}
      <div className="flex justify-center ml-[-20vw]">
        {/* <div className="ml-[37vw] flex items-center max-[414px]:ml-[10vh] max-[414px]:w-[75vw] max-[414px]:mt-1 max-[414px]:text-xl text-3xl w-[80vh] justify-between">
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
        </div> */}
        <div className="flex flex-col ml-[20vw] max-md:ml-[15vw] my-5 max-md:h-[50vw] max-md:w-[50vw] h-[30vw] w-[30vw]">
          <div className="mb-[3vw]">
            <div className="max-[414px]:ml-[0vw] ">
              {/* <div className="bg-[#f8f6f6] ml-[2vw] h-[40vh] w-[80vh] mt-[3vw] mb-[5vh] max-[420px]:ml-[20vw] max-[420px]:w-[250px]  max-[420px]:h-[200px]">
                <input type="file" onChange={handleChange} />
                <img src={file} className="h-[35vh] w-[80vw] object-cover" />
              </div> */}
              <div className="grid grid-rows-1 grid-cols-1">
              <img 
              src={CoverImage}
              alt=""
              className="object-cover cursor-pointer max-md:h-[50vw] max-md:w-[50vw] h-[30vw] w-[30vw] rounded-2xl row-start-1 col-start-1  "
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
            className={`${
              changeCover ? "" : "hidden"
            } px-4 py-2 shadow-inner shadow-black row-start-1 max-md:h-[50vw] max-md:w-[50vw] h-[30vw] w-[30vw] col-start-1 text-white text-3xl bg-black bg-opacity-10 rounded-md`}
           >
            Add Post
              </button>
          </div>
               <textarea
              onChange={(e) => {
                setoption(e.target.value);
              }}
              className="p-[1vw] max-[768px]:ml-0 max-[768px]:w-[50vw]  ml-[-4vw] max-md:h-[10vw] max-md:w-[40vw] text-white text-xl bg-[#070315] h-[7vw] w-[40vw] mt-[1vw] shadow-lg shadow-black rounded-lg"
              placeholder="Enter your Text"
              >
              </textarea>
        </div>
            {/*<div className=" max-[823px]:flex-col space-x-2 flex max-[414px]:ml-[20vw] text-black text-xl mt-[3vh] ">
              <div className="max-[414px]:ml-[2vw] ml-[2vw]">
                <button
                  onClick={(e) => {
                    console.log(1);
                  }}
                  className="bg-white p-[1vh] px-[4vh] rounded-full hover:text-red-500"
                >
                  +Event
                </button>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    console.log(2);
                  }}
                  className="bg-white p-[1vh] px-[4vh] rounded-full hover:text-red-500 max-[823px]:mt-[10px] max-[823px]:mb-[10px]"
                >
                  +Announcement
                </button>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    console.log(3);
                  }}
                  className="bg-white p-[1vh] px-[4vh] rounded-full hover:text-red-500"
                >
                  +Achievement
                </button>
              </div>
            </div> */}
            {/* <button
            onClick={(e) => {
              console.log(event);
            }}
            className="justify-self-end max-sm: min-[375px]: max-[414px]:mt-[4vh]  text-white  max-[414px]:text-[xl] text-2xl mt-[8vh] hover:font-semibold"
          >
            Submit
          </button> */}
          </div>
          
        </div>
      </div>
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
  );
}
export default Image;