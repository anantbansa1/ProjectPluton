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
import { Button } from "@mui/material";
// import zoro from "../Images/zoro.jpg";
//import default_img from "../Images/zoro.jpg";
import def_img from "../Images/def_img.jpg";

function Image() {
  const [CoverImage, setcoverimage] =useState(null);
  const [upImgCover, setUpImgCover] = useState(CoverImage);
  const imgRefCover = useRef(null);
  const previewCanvasRefCover = useRef(null);
  const [cropCover, setCropCover] = useState({ aspect: 1, height: 80 });
  const [completedCropCover, setCompletedCropCover] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
 const [changeCover, setChangeCover] = useState(false);
  const [openCover, setOpenCover] = React.useState(false);
  const uploadRef= useRef(null);
  
  const [file, setFile] = useState();
  const Coverinput = useRef(null);
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
    <div className="max-md:h-[62vw]">
      {/* <Navbar></Navbar> */}
      <div className="flex justify-center align-middle max-md:ml-[-10vw] ml-[-15vw] h-[40vw] max-[767px]:h-[60vw] w-[80vw]">
     
        <div className="flex flex-col items-center ml-[20vw] max-md:ml-[15vw] my-5 max-md:h-[50vw] max-md:w-[50vw] h-[30vw] w-[30vw]">
          <div className="mb-[3vw]">
            <div className="max-[414px]:ml-[0vw] ">
              <div className="grid grid-rows-1 grid-cols-1">
                {CoverImage ? (
              <img 
              src={CoverImage}
              alt=""
              className="object-cover cursor-pointer max-[768px]:w-[50vw] max-md:h-[50vw] max-md:w-[50vw] h-[30vw] w-[30vw] rounded-2xl row-start-1 col-start-1  "
              onClick={handleClickOpenCover}
              onMouseOver={(e) => {
                setChangeCover(true);
              }}
              onMouseOut={(e) => {
                setChangeCover(false);
              }}
            />
                ): (
                  <div onClick={handleClickOpenCover} className="text-slate-200 text-lg hover:bg-[#0e0b1a] cursor-pointer max-[768px]:w-[50vw] max-md:h-[50vw] max-md:w-[50vw] h-[30vw] w-[30vw] rounded-2xl row-start-1 col-start-1 bg-[#130f22] flex justify-center items-center">
                    <div>Click to add an Image</div>
                  </div>
                )}

              
           <button
            onMouseOver={(e) => {
              setChangeCover(true);
            }}
            useRef={uploadRef}
            // onClick={handleClickOpen}
            onClick={handleClickOpenCover}
            onMouseOut={(e) => {
              setChangeCover(false);
            }}
            className={`${
              changeCover ? "" : "hidden"
            } px-4 py-2 shadow-inner shadow-black z-10 max-[768px]:w-[50vw] row-start-1 max-md:h-[50vw] max-md:w-[50vw] h-[30vw] w-[30vw] col-start-1 text-white text-3xl bg-black bg-opacity-10 rounded-md`}
           >
            Change Image
              </button>
          </div>

        </div>
        <textarea
              onChange={(e) => {
                setoption(e.target.value);
              }}
              className="p-[1vw] max-[768px]:ml-0 text-base  max-[768px]:w-[50vw] w-[30vw] outline-none border-none  max-md:h-[10vw] max-md:w-[40vw] text-white  bg-[#070315] h-[7vw]  mt-[1vw] shadow-lg shadow-black rounded-lg"
              placeholder="Enter your Text"
              >
              </textarea>
          </div>
          
        </div>
      </div>
      <Dialog
        open={openCover}
        onClose={handleCloseCover}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            background: "#1e1936",
            color: "#fff",
            borderRadius: 25,
            padding: "10px",
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Select Photo"}
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
              <Button
                variant="contained"
                color="primary"
                sx={{
                  background: "#130f22",
                  "&:hover": { background: "#100d1e" },
                }}
                onClick={() => Coverinput.current.click()}
              >
                Upload File{" "}
              </Button>
              <input
                className=" text-[#5d5d5d] hidden  file:mr-5 file:px-4 file:py-2 file:border-[1px] file:text-xs file:font-medium file:bg-black file:text-white hover:file:cursor-pointer hover:file:bg-black hover:file:text-white"
                type="file"
                accept="image/*"
                ref={Coverinput}
                onChange={onSelectFileCover}
              ></input>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            sx={{ color: 'white', borderColor: '#100d1e', borderRadius: '15px', "&:hover": { borderColor: '#0a0813', color: 'white' } }}
            onClick={handleCloseCover}
          >
            Cancel{" "}
          </Button>

          <div className="hidden">
            <canvas ref={previewCanvasRefCover} />
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{ background: "#130f22", color: 'white', borderColor: '#100d1e', borderRadius: '15px', "&:hover": { background: "#100d1e", borderColor: '#0a0813', color: 'white' } }}
            onClick={() => SaveChangesCover(previewCanvasRefCover.current, completedCropCover)}
          >
            save changes{" "}
          </Button>

        </DialogActions>
      </Dialog>

    </div>
  );
}
export default Image;