import Navbar from "../Navbar";
import { useState } from "react";
import SirfPencil from "../Images/pencil_black.jpg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Bronzebadge from "../Images/badge_bronze.png";
import Silverbadge from "../Images/badge_silver.png";
import Goldbadge from "../Images/badge_golden.png";
import corebadge from "../Images/badge_core.png";
import React, { useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ClubProfile(props) {
  const [profile, setprofile] = useState(true);
  const [ClubImage, setimage] = useState(props.clubimage);
  const [CoverImage, setcoverimage] = useState(props.coverimage);
  const [open, setOpen] = React.useState(false);
  const [upImg, setUpImg] = useState(ClubImage);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ aspect: 1, height: 500 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const image =
    props.clubpoint < props.tbronze
      ? Bronzebadge
      : props.clubpoint <= props.tsilver
      ? Silverbadge
      : Goldbadge;

  function SaveChanges(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }
    setOpen(false);
    console.log("hahahah");
    if (crop.width && crop.height) {
      canvas.toBlob((blob) => {
        const Imageuse = canvas.toDataURL("image/png");
        setimage(Imageuse);
      }, "image/png");
    }
  }
  function setCanvasImage(image, canvas, crop) {
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

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      console.log("idarbeta");
    }
  };
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop);
  }, [completedCrop]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <Navbar></Navbar>
      <div className="ml-[15vw] md:ml-[20vw] grid grid-rows-[repeat(8,minmax(30px,auto))] gap-2 grid-cols-[repeat(7,minmax(30px,auto))] ">
        <div className="row-start-1 col-start-1 row-span-4 col-span-7 ">
          <img
            src={CoverImage}
            alt=""
            className="object-cover h-[20vw] w-full"
          />
        </div>
        <div className=" row-span-2 row-start-4 col-start-2 col-span-1 w-fit ">
          <div className=" ">
            <button
              onClick={handleClickOpen}
              onMouseOut={(e) => {
                setprofile(true);
              }}
              onMouseOver={(e) => {
                setprofile(false);
              }}
              className="bg-white h-[10vw] w-[10vw] min-w-[80px] min-h-[80px] object-cover rounded-[50%] "
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
                  className=" rounded-[50%] object-cover border border-white h-[10vw] w-[10vw] min-w-[80px] min-h-[80px]"
                />
              )}
            </button>
          </div>
        </div>
        <div className="row-start-6 col-start-1 "></div>
        <div className=" row-start-6 col-start-2  row-span-1 col-span-2">
          <div className="text-[2.25rem] text-white font-semibold mix-blend-difference">
            {" "}
            {props.name}{" "}
          </div>
        </div>
        <div className="row-start-7 col-start-2 row-span-2 col-span-3 text-lg lg:text-md  text-[#a5a5a5]">
          {" "}
          {props.desc}
        </div>
        <div className="row-start-6 col-start-5 row-span-1 col-span-1 text-center ">
          <button className="px-4 py-2 mx-auto text-white"> Apply Now</button>
        </div>
        <div className="row-start-6 col-start-6 row-span-1 col-span-1 text-center text-white">
          <button className="pr-4 pl-1 py-2 text-white mx-auto text-center">
            57 members
          </button>
        </div>
        <div className="row-start-6 col-start-7"></div>
      </div>
      <div className=" grid gap-y-0 gap-x-0  max-md:ml-[15vw] ml-[20vw] text-[1.35rem] grid-cols-3 grid-rows-[repeat(2,minmax(,auto))] lg:text-[2rem] text-white">
        <div className="grid pt-10 px-10   grid-rows-1 grid-cols-1 row-start-2 col-span-3 justify-center">
          <div
            className={`row-start-1 ${
              props.clubpoint < props.tbronze ? "" : "hidden"
            } rounded-full col-start-1 bg-[#824a02] z-10 h-[1.5vh] `}
            style={{
              width: ((props.clubpoint / props.tbronze) * 100).toString() + "%",
            }}
          />
          <div
            className={`row-start-1 ${
              props.clubpoint < props.tbronze ? "" : "hidden"
            } rounded-full w-[100%]  col-start-1 bg-[#a77044] h-[1.5vh] `}
          />
          <div
            className={`row-start-1 ${
              props.clubpoint < props.tsilver &&
              props.clubpoint >= props.tbronze
                ? ""
                : "hidden"
            } rounded-full w-[50%] col-start-1 bg-[#d7d7d7] z-10 h-[1.5vh] `}
            style={{
              width:
                (
                  ((props.clubpoint - props.tbronze) /
                    (props.tsilver - props.tbronze)) *
                  100
                ).toString() + "%",
            }}
          />
          <div
            className={`row-start-1 ${
              props.clubpoint < props.tsilver &&
              props.clubpoint >= props.tbronze
                ? ""
                : "hidden"
            } rounded-full w-[100%]  col-start-1 bg-[#a7a7ad] h-[1.5vh] `}
          />
          <div
            className={`row-start-1  ${
              props.clubpoint >= props.tsilver ? "" : "hidden"
            }  rounded-full  col-start-1 bg-[#fee101] z-10 h-[1.5vh] `}
            style={{
              width:
                props.clubpoint > props.tgold
                  ? "100%"
                  : (
                      ((props.clubpoint - props.tsilver) /
                        (props.tgold - props.tsilver)) *
                      100
                    ).toString() + "%",
            }}
          />
          <div
            className={`row-start-1 ${
              props.clubpoint >= props.tsilver ? "" : "hidden"
            }  rounded-full w-[100%]  col-start-1 bg-[#d6af36] h-[1.5vh]  `}
          />
        </div>
      </div>
      <div className="grid py-2 items-center grid-cols-[repeat(25,minmax(13px,auto))]  grid-rows-1 gap-0">
        <div className=" m-auto  row-start-1 col-start-[25]  ">
          <img src={image} alt="" className="  h-[15vh] object-cover " />
        </div>
        <div className=" object-cover  row-start-1 col-start-[25] ">
          <img
            src={ClubImage}
            alt=""
            className=" m-auto h-[10vh] w-[10vh] rounded-full  object-cover "
          />
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Change Profile Picture"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              ruleOfThirds={true}
              circularCrop={true}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <div className="flex my-5 justify-between">
              <input
                className=" text-[#5d5d5d] file:mr-5 file:px-4 file:py-2 file:border-[1px] file:text-xs file:font-medium file:bg-black file:text-white hover:file:cursor-pointer hover:file:bg-black hover:file:text-white"
                type="file"
                accept="image/*"
                onChange={onSelectFile}
              ></input>
              <button className="hover:underline"> Unset Photo</button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="mx-3 hover:underline px-3 py-2 "
            onClick={handleClose}
          >
            Cancel
          </button>
          <div className="hidden">
            <canvas ref={previewCanvasRef} />
          </div>
          <button
            className="mx-3 bg-black text-white px-3 py-2 "
            onClick={() => SaveChanges(previewCanvasRef.current, completedCrop)}
            autoFocus
          >
            Save Changes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClubProfile;
