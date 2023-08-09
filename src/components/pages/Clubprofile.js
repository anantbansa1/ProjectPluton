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
import tanjiro from "../Images/Tanjiro.jpg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import minion from "../Images/Minions.jpg"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CampaignIcon from '@mui/icons-material/Campaign';
import DoneIcon from '@mui/icons-material/Done';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Cancel, CheckCircle, ManageAccounts, Settings } from "@mui/icons-material";
import { useAuth } from "../../firebase";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";



function ClubProfile(props) {
  const clubName = useParams().clubID;
  const navigate = useNavigate();
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
  const [member, setmember] = useState(false);
  const [pending, setpending] = useState(false);
  const [currentClub, setCurrentClub] = useState([]);
  const [loading, setLoading] = useState(false);

  const profileinput = React.useRef();
  const Coverinput = React.useRef();


  const [anchorEl, setAnchorEl] = React.useState(null);
  const openfilter = Boolean(anchorEl);

  const user = useAuth();

  async function fetchClub() {
    // const q = query(collection(db, "clubs"), where("name", "==", club));
    // const querySnapshot = await getDocs(q);
    // console.log(querySnapshot)
    // if (querySnapshot) {
    //   console.log("No matching documents.");
    // } else {
    //   console.log('here')
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // }
    setLoading(true);
    const clubs = await getDocs(collection(db, 'clubs'));
    setLoading(false);
    if (clubs) {
      let clubnames = [];
      let flag = 0;
      clubs.forEach((element) => {
        // console.log(element.data());
        const a = element.data()['name'];
        clubnames.push(a)
        // console.log(`${clubName} ===== ${a}`)
        if (a === clubName) { setCurrentClub(element.data());flag=1 }
      })
    if (flag===0) navigate("/pagenotfound")
      // console.log(clubnames)
    }
  }
  // const clubname = 
  useEffect(() => {
    console.log(clubName);
    fetchClub();

    // const q = query(collection(db,'clubs',where('name','==',club)));
  }, [clubName])

  // useEffect(() => {
  //   console.log(currentClub.logo);
  //   // fetchClub();
  //   // const q = query(collection(db,'clubs',where('name','==',club)));
  // }, [currentClub])

  const handleClickfilter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosefilter = () => {
    setAnchorEl(null);
  };

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
      <div className=" md:ml-[22vw]  ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl py-8 px-4 shadow-black">
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
            className={`${changeCover ? "" : "hidden"
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
            <div className="text-[2.25rem]  max-lg:text-2xl max-md:text-center max-sm:text-lg text-white font-semibold mix-blend-difference">
              {" "}
              {currentClub.name}{" "}
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
              <button onClick={() => { setpending(true) }}
                className={`px-4 py-2 max-sm:pr-2 max-sm:py-1 max-sm:mt-2 max-sm:w-[27vw] justify-center lg:text-lg text-xs   flex items-center bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {" "}
                <GroupIcon className="scale-[80%]" />
                &nbsp; <div>Pending</div> &nbsp;
              </button>
            </div>
          )}
          <div
            onClick={() => {
              setmember(true);
            }}
            className="row-start-6 max-sm:col-start-5 max-sm:col-span-1 max-sm:justify-self-center max-sm:row-start-[9] col-start-6 row-span-1 mx-5 col-span-1 text-center text-white"
          >
            <button className="pr-4 pl-4 max-sm:mt-2 max-sm:w-[30vw]  lg:text-lg text-xs  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full py-2 text-white text-center">
              57 members
            </button>
          </div>
          <div className="row-start-6 col-start-7"></div>
        </div>
        <div className="flex max-sm:mt-5  items-center ">
          <div className=" grid max-sm:mx-2 mx-10 w-[65vw] gap-0 items-center text-[1.35rem] grid-cols-[repeat(9,minmax(10px,auto))] grid-rows-2 lg:text-[1.5rem] text-white">
            <div
              className={`row-start-2 mt-2 self-start col-start-9 lg:text-xl md:text-sm  text-[0.68rem] text-right ${props.clubpoint >= props.tgold ? "hidden" : ""
                } ${color}`}
            >
              {pointleft} points to {badge}
            </div>
            <div
              className={`row-start-2 mt-2 self-start col-start-9 lg:text-xl md:text-sm  text-[0.68rem] text-right ${props.clubpoint >= props.tgold ? "" : "hidden"
                } ${color}`}
            >
              {props.clubpoint} points
            </div>
            <div
              className={`row-start-1 ${props.clubpoint < props.tbronze ? "" : "hidden"
                } rounded-full  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#824a02] z-10  `}
              style={{
                width:
                  ((props.clubpoint / props.tbronze) * 100).toString() + "%",
              }}
            />
            <div
              className={`row-start-1 ${props.clubpoint < props.tbronze ? "" : "hidden"
                } rounded-full w-[100%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#a77044] `}
            />
            <div
              className={`row-start-1 ${props.clubpoint < props.tsilver &&
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
              className={`row-start-1 ${props.clubpoint < props.tsilver &&
                props.clubpoint >= props.tbronze
                ? ""
                : "hidden"
                } rounded-full w-[100%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#a7a7ad] `}
            />
            <div
              className={`row-start-1  ${props.clubpoint >= props.tsilver ? "" : "hidden"
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
              className={`row-start-1 ${props.clubpoint >= props.tsilver ? "" : "hidden"
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
          <div className=""> </div>
          <div className="flex space-x-[5vw] max-md:space-x-4  ">
            <button
              className={`${underline === "post" ? "border-b" : ""
                } border-white py-4  px-8`}
              onClick={(e) => {
                setUnderline("post");
              }}
            >
              Post
            </button>
            <button
              className={`${underline === "poll" ? "border-b" : ""
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
            <button className="flex items-center text-xl " onClick={handleClickfilter}>
              {" "}
              <FilterAltIcon className="lg:scale-[125%]"></FilterAltIcon>
              <div className="ml-3 max-lg:hidden">Filter</div>
              <div className="max-lg:hidden">
                <KeyboardArrowDownIcon className="ml-3 scale-[150%]"></KeyboardArrowDownIcon>{" "}</div>
            </button>
            <div className="">
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openfilter}
                onClose={handleClosefilter}
                sx={{
                  '& .MuiPaper-root': {
                    bgcolor: '#130f22',
                    color: '#fff',
                    margin: 2,
                  },
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',

                }}
              >
                <MenuItem sx={{ padding: 2 }} onClick={handleClosefilter}> <EmojiEventsIcon /> &nbsp;Achievements</MenuItem>
                <MenuItem sx={{ padding: 2 }} onClick={handleClosefilter}><EventAvailableIcon />&nbsp;Events</MenuItem>
                <MenuItem sx={{ padding: 2 }} onClick={handleClosefilter}><CampaignIcon />&nbsp;Announcements</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-[20vw] max-md:ml-[15vw] my-10">
        <div className=" mx-auto w-[50vw] max-md:w-[75vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
          <div className="flex font-semibold items-center space-x-5">
            <img
              src={ClubImage}
              alt=""
              className=" rounded-[50%] object-cover border-2 border-white h-[2.5vw] w-[2.5vw] min-w-[30px] min-h-[30px]"
            />
            {/* <div className="max-md:text-sm">{props.name}</div> */}

            <Link
              to="/add"
              className="w-[90%] flex items-center cursor-pointer h-[7vh] bg-[#0b0914] ml-5 rounded-3xl text-[#dad6d6] py-5 px-4"
            >
              Add a Post/Poll
            </Link>
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
          image={tanjiro}
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, ea. Excepturi blanditiis aut impedit culpa officia consectetur quos eos alias sunt. Ipsam dolores perferendis tempora non sequi, odio amet sint recusandae, sapiente at velit eligendi?"
          date="7/29/2023"
          time="10:24 PM"
        ></Post>
      )}
      {underline === "post" && (
        <Post
          name={props.name}
          ClubImage={ClubImage}
          image={tanjiro}
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
              <Button
                variant="contained"
                color="primary"
                sx={{
                  background: "#130f22",
                  "&:hover": { background: "#100d1e" },
                }}
                onClick={() => profileinput.current.click()}
              >
                Upload File{" "}
              </Button>
              <input
                className=" text-[#5d5d5d] hidden  file:mr-5 file:px-4 file:py-2 file:border-[1px] file:text-xs file:font-medium file:bg-black file:text-white hover:file:cursor-pointer hover:file:bg-black hover:file:text-white"
                type="file"
                accept="image/*"
                ref={profileinput}
                onChange={onSelectFile}
              ></input>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            sx={{ color: 'white', borderColor: '#100d1e', borderRadius: '15px', "&:hover": { borderColor: '#0a0813', color: 'white' } }}
            onClick={handleClose}
          >
            Cancel{" "}
          </Button>

          <div className="hidden">
            <canvas ref={previewCanvasRef} />
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{ background: "#130f22", color: 'white', borderColor: '#100d1e', borderRadius: '15px', "&:hover": { background: "#100d1e", borderColor: '#0a0813', color: 'white' } }}
            onClick={() => SaveChanges(previewCanvasRef.current, completedCrop)}
          >
            save changes{" "}
          </Button>

        </DialogActions>
      </Dialog>


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

      <Dialog
        open={member}
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(20px)",
          },
        }}
        PaperProps={{
          sx: {
            background: "#1e1936",
            color: "#fff",
            width: { xs: '100%', md: '75%', lg: '100%' },
            height: { xs: '50%', md: '50%', lg: '50%' },
            borderRadius: 15,
            padding: "15px",
          },
        }}
        // TransitionComponent={Transition}
        // fullWidth
        height={50}
        keepMounted
        onClose={() => {
          setmember(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <div>Members</div>
            <Link to="/manage" className="text-sm text-slate-200 flex items-center cursor-pointer hover:text-slate-300"> <Settings className="scale-[80%]" /> Manage</Link>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: "auto",
            scrollbarWidth: "none", // Hide the scrollbar for Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
            },
          }}
        >
          {/* <div className="text-[#e4e2e2] text-lg">Are you sure you want to logout?</div> */}
          <div className="flex text-lg max-sm:text-base  scrollbar-hide flex-col space-y-5 ">
            <div className=" flex justify-between">
              <div className="flex items-center space-x-2 ">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#a77044] font-semibold">Anant Bansal</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={minion}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#a77044] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#d7d7d7] font-semibold">Deepanshu Pal</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={tanjiro}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#d7d7d7] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#fee101] font-semibold">Duke Dhal</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={minion}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#fee101] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#00ffff] font-semibold">Ricky Chandra Paul Minj</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={tanjiro}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#00ffff] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>
            <div className=" flex justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className=" font-semibold">Samrath Ahluwalia</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={minion}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#00ffff] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#fee101] font-semibold">Madhav Nakra</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={tanjiro}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#fee101] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>
            <div className=" flex justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#00ffff] font-semibold">Shubham Yadav</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={tanjiro}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#00ffff] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>



      <Dialog
        open={pending}
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(20px)",
          },
        }}
        PaperProps={{
          sx: {
            background: "#1e1936",
            color: "#fff",
            width: { xs: '100%', md: '75%', lg: '100%' },
            height: { xs: '50%', md: '50%', lg: '50%' },
            borderRadius: 15,
            padding: "15px",
          },
        }}
        // TransitionComponent={Transition}
        // fullWidth
        height={50}
        keepMounted
        onClose={() => {
          setpending(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Pending Applications"}</div>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: "auto",
            scrollbarWidth: "none", // Hide the scrollbar for Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
            },
          }}
        >
          {/* <div className="text-[#e4e2e2] text-lg">Are you sure you want to logout?</div> */}
          <div className="flex text-lg max-sm:text-base  scrollbar-hide flex-col space-y-5 ">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#d7d7d7] font-semibold">Deepanshu Pal</div>
              </div>
              <div className="flex space-x-5">
                <CheckCircle className="text-green-500 hover:text-green-600 cursor-pointer"></CheckCircle>
                <Cancel className="text-red-600 hover:text-red-700 cursor-pointer"></Cancel>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#d7d7d7] font-semibold">Deepanshu Pal</div>
              </div>
              <div className="flex space-x-5">
                <CheckCircle className="text-green-500 hover:text-green-600 cursor-pointer"></CheckCircle>
                <Cancel className="text-red-600 hover:text-red-700 cursor-pointer"></Cancel>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#d7d7d7] font-semibold">Deepanshu Pal</div>
              </div>
              <div className="flex space-x-5">
                <CheckCircle className="text-green-500 hover:text-green-600 cursor-pointer"></CheckCircle>
                <Cancel className="text-red-600 hover:text-red-700 cursor-pointer"></Cancel>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#d7d7d7] font-semibold">Deepanshu Pal</div>
              </div>
              <div className="flex space-x-5">
                <CheckCircle className="text-green-500 hover:text-green-600 cursor-pointer"></CheckCircle>
                <Cancel className="text-red-600 hover:text-red-700 cursor-pointer"></Cancel>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#d7d7d7] font-semibold">Deepanshu Pal</div>
              </div>
              <div className="flex space-x-5">
                <CheckCircle className="text-green-500 hover:text-green-600 cursor-pointer"></CheckCircle>
                <Cancel className="text-red-600 hover:text-red-700 cursor-pointer"></Cancel>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#d7d7d7] font-semibold">Deepanshu Pal</div>
              </div>
              <div className="flex space-x-5">
                <CheckCircle className="text-green-500 hover:text-green-600 cursor-pointer"></CheckCircle>
                <Cancel className="text-red-600 hover:text-red-700 cursor-pointer"></Cancel>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src={Zoro}
                  className="w-[40px] h-[40px] border-2 border-white rounded-full"
                  alt=""
                />

                <div className="text-[#d7d7d7] font-semibold">Deepanshu Pal</div>
              </div>
              <div className="flex space-x-5">
                <CheckCircle className="text-green-500 hover:text-green-600 cursor-pointer"></CheckCircle>
                <Cancel className="text-red-600 hover:text-red-700 cursor-pointer"></Cancel>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: "blur(20px)", }}
        open={loading}
        close={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ClubProfile;
