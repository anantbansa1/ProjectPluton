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
import Post from "./Post";
import GroupIcon from "@mui/icons-material/Group";
import Poll from "./Poll";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase';

import { TextField } from "@mui/material";

function ClubProfile(props) {
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
  const [underline, setUnderline] = useState("post");
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

  useEffect(()=>{
    onSnapshot(collection(db,"test"), (snapshot)=>{
      console.log(snapshot.docs.map((doc)=>doc.data()));
    })
  },[])

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
            <div className="text-[2.25rem]  max-lg:text-2xl text-center max-sm:text-lg text-white font-semibold mix-blend-difference">
              {" "}
              {props.name}{" "}
            </div>
          </div>
          <div className="max-sm:col-start-3 row-start-7 col-start-2 row-span-2 col-span-3 max-sm:text-center text-xs md:text-md lg:text-xl  text-[#a5a5a5]">
            {" "}
            {props.desc}
          </div>
          {props.Role === "user" && (
            <div className="row-start-6 max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-self-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <button 
                className={`px-4 py-2 max-sm:mt-2  max-sm:w-[25vw] lg:text-lg text-xs text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {" "}
                Apply Now
              </button>
            </div>
          )}
          {props.Role !== "user" && (
            <div className="row-start-6 max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <button
                className={`px-4 py-2 max-sm:py-1 max-sm:mt-2 max-sm:w-[25vw] lg:text-lg text-xs   flex items-center bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {" "}
                <GroupIcon className="scale-[80%]" />
                &nbsp; <div>Pending</div>
              </button>
            </div>
          )}
          <div className="row-start-6 max-sm:col-start-5 max-sm:col-span-1 max-sm:justify-self-center max-sm:row-start-[9] col-start-6 row-span-1 mx-5 col-span-1 text-center text-white">
            <button className="pr-4 pl-4 max-sm:mt-2 max-sm:w-[30vw]  lg:text-lg text-xs  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full py-2 text-white text-center">
              57 members
            </button>
          </div>
          <div className="row-start-6 col-start-7"></div>
        </div>
        <div className="flex max-sm:mt-5  items-center ">
          <div className=" grid max-sm:mx-2 mx-10 w-[65vw] gap-0 items-center text-[1.35rem] grid-cols-[repeat(9,minmax(10px,auto))] grid-rows-2 lg:text-[1.5rem] text-white">
            <div
              className={`row-start-2 mt-2 self-start col-start-9 lg:text-xl md:text-sm  text-[0.68rem] text-right ${
                props.clubpoint >= props.tgold ? "hidden" : ""
              } ${color}`}
            >
              {pointleft} points to {badge}
            </div>
            <div
              className={`row-start-2 mt-2 self-start col-start-9 lg:text-xl md:text-sm  text-[0.68rem] text-right ${
                props.clubpoint >= props.tgold ? "" : "hidden"
              } ${color}`}
            >
              {props.clubpoint} points
            </div>
            <div
              className={`row-start-1 ${
                props.clubpoint < props.tbronze ? "" : "hidden"
              } rounded-full  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#824a02] z-10  `}
              style={{
                width:
                  ((props.clubpoint / props.tbronze) * 100).toString() + "%",
              }}
            />
            <div
              className={`row-start-1 ${
                props.clubpoint < props.tbronze ? "" : "hidden"
              } rounded-full w-[100%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#a77044] `}
            />
            <div
              className={`row-start-1 ${
                props.clubpoint < props.tsilver &&
                props.clubpoint >= props.tbronze
                  ? ""
                  : "hidden"
              } rounded-full w-[50%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#d7d7d7] z-10  `}
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
              } rounded-full w-[100%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#a7a7ad] `}
            />
            <div
              className={`row-start-1  ${
                props.clubpoint >= props.tsilver ? "" : "hidden"
              }  rounded-full  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#fee101] z-10  `}
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
              }  rounded-full w-[100%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#d6af36]   `}
            />
          </div>
          <div className="grid grid-rows-1 items-center grid-cols-1">
            <div className="  mx-auto row-start-1  col-start-1 ">
              <img
                src={image}
                alt=""
                className="sm:h-[150px]  h-[70px] object-cover "
              />
            </div>
            <img
              src={ClubImage}
              alt=""
              className="row-start-1 col-start-1 mx-auto sm:h-[100px] sm:w-[100px] h-[50px] w-[50px] rounded-full  object-cover "
            />
          </div>
        </div>
      </div>

      <div className=" md:ml-[22vw] ml-[18vw] my-[2vw] mr-[2vw] max-md:py-4 py-8 px-4 text-white">
        <div className="flex max-md:text-lg text-3xl items-center justify-between  ">
          {" "}
          <div></div>
          <div className="flex space-x-[5vw] max-md:space-x-4  ">
            <button
              className={`${
                underline === "post" ? "border-b" : ""
              } border-white py-4  px-8`}
              onClick={(e) => {
                setUnderline("post");
              }}
            >
              Post
            </button>
            <button
              className={`${
                underline === "poll" ? "border-b" : ""
              } border-white py-4  px-8`}
              onClick={(e) => {
                setUnderline("poll");
              }}
            >
              Poll
            </button>
          </div>
          <div className="">
            {" "}
            <button className="flex items-center text-xl ">
              {" "}
              <FilterAltIcon className="scale-[150%]"></FilterAltIcon>
              <div className="ml-3">Filter</div>
              <KeyboardArrowDownIcon className="ml-3 scale-[150%]"></KeyboardArrowDownIcon>{" "}
            </button>
          </div>
        </div>
      </div>

      <div className="ml-[20vw] max-md:ml-[15vw] my-10">
        <div className=" mx-auto w-[50vw] max-md:w-[75vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
          <div className="flex font-semibold items-center space-x-5">
            <img
              src={props.clubimage}
              alt=""
              className=" rounded-[50%] object-cover border-2 border-white h-[2.5vw] w-[2.5vw] min-w-[30px] min-h-[30px]"
            />
            {/* <div className="max-md:text-sm">{props.name}</div> */}
            
            <div className="w-[90%] cursor-pointer h-[7vh] bg-[#0b0914] ml-5 rounded-3xl text-[#dad6d6] py-5 px-4">Add a Post/Poll</div>
          </div>
          {/* <div className="my-5"><img src={props.image}   alt="" /></div> */}
          {/* <div className="flex items-center text-lg max-md:text-sm text-[#dddbdb] ">
            <span className="font-bold text-white">{props.name}</span>{" "}

          </div> */}

        </div>
      </div>

      {underline === "post" && (
        <Post
          name={props.name}
          ClubImage={ClubImage}
          image={Zoro}
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, ea. Excepturi blanditiis aut impedit culpa officia consectetur quos eos alias sunt. Ipsam dolores perferendis tempora non sequi, odio amet sint recusandae, sapiente at velit eligendi?"
          date="7/29/2023"
          time="10:24 PM"
        ></Post>
      )}
      {underline === "post" && (
        <Post
          name={props.name}
          ClubImage={ClubImage}
          image={Zoro}
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, ea. Excepturi blanditiis aut impedit culpa officia consectetur quos eos alias sunt. Ipsam dolores perferendis tempora non sequi, odio amet sint recusandae, sapiente at velit eligendi?"
          date="7/29/2023"
          time="10:24 PM"
        ></Post>
      )}
      {underline === "post" && (
        <Post
          name={props.name}
          ClubImage={ClubImage}
          image={Zoro}
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, ea. Excepturi blanditiis aut impedit culpa officia consectetur quos eos alias sunt. Ipsam dolores perferendis tempora non sequi, odio amet sint recusandae, sapiente at velit eligendi?"
          date="7/29/2023"
          time="10:24 PM"
        ></Post>
      )}
      {underline === "post" && (
        <Post
          name={props.name}
          ClubImage={ClubImage}
          image={Zoro}
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, ea. Excepturi blanditiis aut impedit culpa officia consectetur quos eos alias sunt. Ipsam dolores perferendis tempora non sequi, odio amet sint recusandae, sapiente at velit eligendi?"
          date="7/29/2023"
          time="10:24 PM"
        ></Post>
      )}

      {underline === "poll" && (
        <Poll
          name={props.name}
          option1="Option 1"
          votes1={6}
          votes2={9}
          votes3={4}
          votes4={2}
          option2="Option 2"
          option3="Option 3"
          option4="Option 4"
          ClubImage={ClubImage}
          question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aut iure ipsa, dolorem consequatur mollitia?"
          date="7/29/2023"
          time="10:24 PM"
        ></Poll>
      )}
      {underline === "poll" && (
        <Poll
          name={props.name}
          option1="Option 1"
          votes1={6}
          votes2={9}
          votes3={4}
          votes4={2}
          option2="Option 2"
          option3="Option 3"
          option4="Option 4"
          ClubImage={ClubImage}
          question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aut iure ipsa, dolorem consequatur mollitia?"
          date="7/29/2023"
          time="10:24 PM"
        ></Poll>
      )}
      {underline === "poll" && (
        <Poll
          name={props.name}
          option1="Option 1"
          votes1={6}
          votes2={9}
          votes3={4}
          votes4={2}
          option2="Option 2"
          option3="Option 3"
          option4="Option 4"
          ClubImage={ClubImage}
          question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aut iure ipsa, dolorem consequatur mollitia?"
          date="7/29/2023"
          time="10:24 PM"
        ></Poll>
      )}
      {underline === "poll" && (
        <Poll
          name={props.name}
          option1="Option 1"
          votes1={6}
          votes2={9}
          votes3={4}
          votes4={2}
          option2="Option 2"
          option3="Option 3"
          option4="Option 4"
          ClubImage={ClubImage}
          question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aut iure ipsa, dolorem consequatur mollitia?"
          date="7/29/2023"
          time="10:24 PM"
        ></Poll>
      )}
      {underline === "poll" && (
        <Poll
          name={props.name}
          option1="Option 1"
          votes1={6}
          votes2={9}
          votes3={4}
          votes4={2}
          option2="Option 2"
          option3="Option 3"
          option4="Option 4"
          ClubImage={ClubImage}
          question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita aut iure ipsa, dolorem consequatur mollitia?"
          date="7/29/2023"
          time="10:24 PM"
        ></Poll>
      )}

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
