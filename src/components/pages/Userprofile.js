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
import Zoro from "../Images/zoro.jpg";
import "react-image-crop/dist/ReactCrop.css";
import Rank5 from "../Images/rank5.png";
import Rank1 from "../Images/rank1.png";
import Rank3 from "../Images/rank3.png";
import Rank20p from "../Images/rank20p.png";
import Rank2 from "../Images/rank2.png";
import { Leaderboard } from "@mui/icons-material";

function ClubProfile(props) {
  const [medal, setmedal] = useState(true);
  const [profile, setprofile] = useState(true);
  const [ClubImage, setclubimage] = useState(props.clubimage);
  const [CoverImage, setcoverimage] = useState(props.coverimage);
  const [open, setOpen] = React.useState(false);
  const [openCover, setOpenCover] = React.useState(false);
  const [upImg, setUpImg] = useState(ClubImage);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ aspect: 1, height: 500 });
  const [changeCover, setChangeCover] = useState(false);
  const [upImgCover, setUpImgCover] = useState(CoverImage);
  const imgRefCover = useRef(null);
  const previewCanvasRefCover = useRef(null);
  const [cropCover, setCropCover] = useState({ aspect: 3.8, height: 500 });
  const [completedCropCover, setCompletedCropCover] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  const image =
    props.clubpoint < props.tbronze
      ? Bronzebadge
      : props.clubpoint <= props.tsilver
      ? Silverbadge
      : Goldbadge;

  const badge =
    props.clubpoint < props.tbronze
      ? "bronze"
      : props.clubpoint <= props.tsilver
      ? "silver"
      : "gold";

  const pointleft =
    props.clubpoint < props.tbronze
      ? props.tbronze - props.clubpoint
      : props.clubpoint <= props.tsilver
      ? props.tsilver - props.clubpoint
      : props.tgold - props.clubpoint;

  const color =
    props.clubpoint < props.tbronze
      ? "text-[#824a02]"
      : props.clubpoint <= props.tsilver
      ? "text-[#d7d7d7]"
      : "text-[#fee101]";

  function SaveChanges(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }
    setOpen(false);
    console.log("hahahah");
    if (crop.width && crop.height) {
      canvas.toBlob((blob) => {
        const Imageuse = canvas.toDataURL("image/png");
        setclubimage(Imageuse);
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
    <div className="">
      <Navbar selected="profile"></Navbar>
      <div className=" md:ml-[22vw] ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22] shadow-xl rounded-2xl py-8 px-4 shadow-black">
        <div className="   grid grid-rows-[repeat(8,minmax(30px,auto))] gap-y-2 grid-cols-[repeat(7,minmax(10px,auto))] ">
          <div className="row-start-1 col-start-1 shadow-inner shadow-black row-span-4 max-sm:row-start-1 max-sm:col-start-1  max-sm:row-end-5 col-span-7 ">
            <img
              src={CoverImage}
              alt=""
              className="object-cover cursor-pointer rounded-2xl  max-sm:h-[38vw] h-[20vw] w-full"
              onClick={handleClickOpenCover}
              onMouseOver={(e) => {
                setChangeCover(true);
              }}
              onMouseOut={(e) => {
                setChangeCover(false);
              }}
            />
          </div>
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
            } px-4 py-2 shadow-inner shadow-black row-start-1 row-span-4 col-start-1 col-span-7 text-white text-3xl bg-black bg-opacity-10 rounded-md`}
          >
            Edit Cover Photo
          </button>
          <div className="max-sm:mx-auto max-sm:col-start-4 items-center row-span-2 row-start-4  col-start-2 col-span-1 w-fit ">
            <div className=" ">
              <button
                onClick={handleClickOpen}
                onMouseOut={(e) => {
                  setprofile(true);
                }}
                onMouseOver={(e) => {
                  setprofile(false);
                }}
                className="bg-white h-[10vw] w-[10vw] self-center min-w-[80px] min-h-[80px] object-cover rounded-[50%] "
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
                    className=" rounded-[50%] object-cover border-2 border-white h-[10vw] w-[10vw] min-w-[80px] min-h-[80px]"
                  />
                )}
              </button>
            </div>
          </div>
          <div className="row-start-6 col-start-1 "></div>
          <div className="row-start-6 col-start-7 "></div>
          <div className="max-sm:col-start-3 max-sm:col-span-3 row-start-6 col-start-2  row-span-1 col-span-2">
            <div className="text-[2.25rem]  max-lg:text-2xl text-center max-sm:text-xl text-white font-semibold mix-blend-difference">
              {" "}
              {props.name}{" "}
            </div>
          </div>
          <div className="max-sm:col-start-3 row-start-7 col-start-2 row-span-2 col-span-3 max-sm:text-center text-sm md:text-md lg:text-xl  text-[#a5a5a5]">
            {" "}
            {props.desc}
          </div>

          <div className="row-start-6 max-sm:col-start-3 max-sm:col-span-1 max-[375px]:m-0  max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
            <button
              className={`px-4 lg:py-2 py-[0.65rem] max-sm:mt-2 whitespace-nowrap  lg:text-lg text-xs max-[375px]:px-2  flex items-center bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
            >
              {" "}
              &nbsp; <div>3 Clubs Joined</div>
            </button>
          </div>

          <div className="row-start-6 max-sm:col-start-5 max-sm:col-span-1 max-sm:justify-self-center max-sm:row-start-[9] col-start-6 row-span-1 mx-5 col-span-1 text-center text-white">
            <button className="  flex items-center px-4 max-sm:mt-2 whitespace-nowrap lg:text-lg text-xs bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full py-2 text-white text-center">
              <Leaderboard className="scale-[80%]"></Leaderboard>{" "}
              <div>&nbsp;3 Rank</div>
            </button>
          </div>
          <div className="row-start-6 col-start-7"></div>
        </div>
      </div>

      <div className="max-lg:hidden flex space-x-[3vw] md:ml-[22vw] ml-[18vw] my-[2vw] mr-[2vw] max-md:py-4 py-8 px-4 shadow-black text-white">
        <div className="flex flex-col space-y-8 w-[50vw] max-md:w-[60vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
          <div className="p-4 max-lg:text-lg text-2xl">
            Medals &nbsp;
            <span className="text-green-500 font-semibold"> 8 </span>
          </div>
          <div className="flex  justify-start flex-wrap">
            <img src={Rank1} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
          </div>
        </div>
        <div className="flex max-lg:hidden flex-col w-[20vw] max-md:w-[60vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
          <div className="p-4 max-lg:text-lg text-2xl">
            Badges &nbsp;
            <span className="text-green-500 font-semibold"> 3 </span>
          </div>
          <div className="flex max-[1300px]:justify-around flex-wrap">
            <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
              <img
                src={image}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[100px] sm:w-[100px] w-[70px] h-[70px] object-cover "
              />

              <img
                src={ClubImage}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
            </div>
            <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
              <img
                src={image}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[100px] sm:w-[100px] w-[70px] h-[70px] object-cover "
              />

              <img
                src={ClubImage}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
            </div>
            <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
              <img
                src={image}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[100px] sm:w-[100px] w-[70px] h-[70px] object-cover "
              />

              <img
                src={ClubImage}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
            </div>
            <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
              <img
                src={image}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[100px] sm:w-[100px] w-[70px] h-[70px] object-cover "
              />

              <img
                src={ClubImage}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
            </div>
            <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
              <img
                src={image}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[100px] sm:w-[100px] w-[70px] h-[70px] object-cover "
              />

              <img
                src={ClubImage}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:ml-[22vw] mr-[2vw] mt-8 ml-[18vw]">
        <div className=" lg:hidden flex-col w-[80vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
          <div className="flex space-x-4 justify-center">
            <button
              className={`px-4 py-2 ${medal ? "border-b" : ""} border-white`}
              onClick={(e) => {
                setmedal(true);
              }}
            >
              Medals
            </button>
            <button
              className={`px-4 py-2 ${medal ? "" : "border-b"} border-white`}
              onClick={(e) => {
                setmedal(false);
              }}
            >
              Badges
            </button>
          </div>
          {medal && (
            <div className="flex mt-5 justify-center  flex-wrap">
              <img src={Rank1} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
            </div>
          )}
          {!medal && (
            <div className="flex mt-5 justify-center  flex-wrap">
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
            </div>
          )}
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

export default ClubProfile;