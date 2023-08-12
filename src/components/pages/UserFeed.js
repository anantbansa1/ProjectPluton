import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Minions from "../Images/Minions.jpg";
import Tanjiro from "../Images/Tanjiro.jpg";
import Post from "./Post";
import Poll from "./Poll";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GroupsIcon from "@mui/icons-material/Groups";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useAuth } from "../../firebase";
import { db } from "../../firebase";
import { doc,getDoc, getDocs, collection, where, query } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';


export default function UserFeed() {
  const [post, underline] = useState("post");
  const [club, setclub] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [allclubs, setallclubs] = useState([]);
  const [roles, setroles] = useState([]);
  const [userid, setuserid]=  useState();
  const open = Boolean(anchorEl);
  const location = useLocation();

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useAuth();

  useEffect(()=>{
    console.log('allclubs: ', allclubs)
  },[allclubs])

  useEffect(()=>{
    if (user) {
      const email = user.email;
      const collref = collection(db, 'user');
      const q = query(collref, where('email','==', email));
      getDocs(q).then((snapshot)=>{
        if (snapshot) {
          snapshot.forEach((userData)=>{
            if (userData.data()) {
              console.log("rollno ", userData.id);
              setuserid(userData.id);
            }
          })
        }
      })
    }
    
  },[user])


  async function fetchClubs() {
    try {
      const clubs = await getDocs(collection(db, 'clubs'));
      if (clubs) {
        let clubnames = [];
        let clubroles = [];
        clubs.forEach(async(element) => {
          console.log('inside loop clubs')
          const docref = doc(db, 'user', userid, 'clubs', element.data().name);
          const getrole = await getDoc(docref);
          clubroles.push({clubname: element.data().name, role: getrole.data().role});
          clubnames.push(element.data())
        })
        setallclubs(clubnames);
        setroles(clubroles);
        console.log("clubroles ",roles)
        console.log("clubs ",allclubs)
      }

    } catch (error) {
      console.log('firebase error')
    }
  }

  useEffect(() => {
    // console.log("userid ", user.email)
      if (userid)
        fetchClubs();
  }, [user,userid]);   

  return (
    <div>
      <Navbar selected="home" />
      <div className="hello">
        <div className=" md:ml-[22vw] ml-[18vw] max-[769px]:mt-[8vh]  my-[2vw] max-[769px]:mr-0 mr-[12vw] max-md:py-0 py-8 px-4  text-white ">
          <div className="flex max-md:text-lg text-3xl items-center justify-between  ">
            {" "}
            <div className=""> </div>
            <div className="flex space-x-[5vw] max-md:space-x-4  ">
              <button
                className={`${post === "post" ? "border-b" : ""
                  } border-white py-4  px-8`}
                onClick={(e) => {
                  underline("post");
                }}
              >
                Post
              </button>
              <button
                className={`${post === "poll" ? "border-b" : ""
                  } border-white py-4  px-8`}
                onClick={(e) => {
                  underline("poll");
                }}
              >
                Poll
              </button>
            </div>
            <div className="">
              {" "}
              <button
                className="flex justify-center items-center text-xl "
                onClick={handleClick}
              >
                {" "}
                <FilterAltIcon className="lg:scale-[125%]"></FilterAltIcon>
                <div className="ml-3 max-lg:hidden">Filter</div>
                <div className="max-lg:hidden">
                  <KeyboardArrowDownIcon className="ml-3 scale-[150%]"></KeyboardArrowDownIcon>{" "}
                </div>
              </button>
              <div className="">
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  sx={{
                    "& .MuiPaper-root": {
                      bgcolor: "#130f22",
                      color: "#fff",
                      margin: 2,
                    },
                  }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem sx={{ padding: 2 }} onClick={handleClose}>
                    {" "}
                    <EmojiEventsIcon /> &nbsp;Achievements
                  </MenuItem>
                  <MenuItem sx={{ padding: 2 }} onClick={handleClose}>
                    <EventAvailableIcon />
                    &nbsp;Events
                  </MenuItem>
                  <MenuItem sx={{ padding: 2 }} onClick={handleClose}>
                    <CampaignIcon />
                    &nbsp;Announcements
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>

      {post === "post" && (
        <div className="-ml-[12vw] max-[769px]:m-0">

          {/* <Post
            name="Club of Programmers"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nisi omnis aliquam maxime iste sunt porro. Dignissimos repudiandae ratione blanditiis velit, nisi dolorem non quasi quaerat quibusdam tenetur quia aspernatur."
            date="08/03/2023"
            time="09:06"
          ></Post>
          <Post
            name="Club of Programmers"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nisi omnis aliquam maxime iste sunt porro. Dignissimos repudiandae ratione blanditiis velit, nisi dolorem non quasi quaerat quibusdam tenetur quia aspernatur."
            date="08/03/2023"
            time="09:06"
          ></Post>
          <Post
            name="Club of Programmers"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nisi omnis aliquam maxime iste sunt porro. Dignissimos repudiandae ratione blanditiis velit, nisi dolorem non quasi quaerat quibusdam tenetur quia aspernatur."
            date="08/03/2023"
            time="09:06"
          ></Post>
          <Post
            name="Club of Programmers"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nisi omnis aliquam maxime iste sunt porro. Dignissimos repudiandae ratione blanditiis velit, nisi dolorem non quasi quaerat quibusdam tenetur quia aspernatur."
            date="08/03/2023"
            time="09:06"
          ></Post>
          <Post
            name="Club of Programmers"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nisi omnis aliquam maxime iste sunt porro. Dignissimos repudiandae ratione blanditiis velit, nisi dolorem non quasi quaerat quibusdam tenetur quia aspernatur."
            date="08/03/2023"
            time="09:06"
          ></Post>
          <Post
            name="Club of Programmers"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nisi omnis aliquam maxime iste sunt porro. Dignissimos repudiandae ratione blanditiis velit, nisi dolorem non quasi quaerat quibusdam tenetur quia aspernatur."
            date="08/03/2023"
            time="09:06"
          ></Post> */}
        </div>
      )}

      {post === "poll" && (
        <div className="-ml-[12vw] max-[769px]:m-0">
          <Poll
            name="Club of Programmers"
            ClubImage={Minions}
            question="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita doloremque ex vitae molestias tempora quasi rerum ipsa aperiam aut itaque!"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
            votes1={5}
            votes2={1}
            votes3={6}
            votes4={2}
          ></Poll>
          <Poll
            name="Club of Programmers"
            ClubImage={Minions}
            question="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita doloremque ex vitae molestias tempora quasi rerum ipsa aperiam aut itaque!"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
            votes1={5}
            votes2={1}
            votes3={6}
            votes4={2}
          ></Poll>
          <Poll
            name="Club of Programmers"
            ClubImage={Minions}
            question="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita doloremque ex vitae molestias tempora quasi rerum ipsa aperiam aut itaque!"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
            votes1={5}
            votes2={1}
            votes3={6}
            votes4={2}
          ></Poll>
          <Poll
            name="Club of Programmers"
            ClubImage={Minions}
            question="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita doloremque ex vitae molestias tempora quasi rerum ipsa aperiam aut itaque!"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
            votes1={5}
            votes2={1}
            votes3={6}
            votes4={2}
          ></Poll>
          <Poll
            name="Club of Programmers"
            ClubImage={Minions}
            question="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita doloremque ex vitae molestias tempora quasi rerum ipsa aperiam aut itaque!"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
            votes1={5}
            votes2={1}
            votes3={6}
            votes4={2}
          ></Poll>
        </div>
      )}

      <div className="flex max-[769px]:hidden  flex-col fixed h-[100%] w-[12vw] items-center overflow-y-scroll scrollbar-hide top-0 right-0  py-4  shadow-2xl shadow-black space-y-10 bg-white bg-opacity-5 backdrop-blur-2xl ">

        {allclubs?.map((club) => {
          {console.log(' afafd: ', club.name)}
          return (
            <Link to={`/club/${club.name}`} className="h-[7vw] w-[7vw] border-white rounded-full">
              <Tooltip title={club.name}>
                {" "}
                <img
                  src={club.logo} 
                  className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
                  alt=""
                />
              </Tooltip>
            </Link>
          )
        })}
        <Link to="/addclub" className="h-[7vw] w-[7vw] border-white rounded-full">
          <Tooltip title="Add New Club">
            {" "}
            <div
              className="flex items-center justify-center h-[7vw] w-[7vw] cursor-pointer  bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-2xl rounded-full  "
              alt=""
            > <AddIcon className="text-slate-400 scale-[150%]" /> </div>
          </Tooltip>
        </Link>
      </div>

      <button
        onClick={(e) => {
          setclub(!club);
        }}
        className="min-[769px]:hidden flex items-center  space-x-1 text-white fixed top-3 right-2"
      >

        <div>
          <GroupsIcon></GroupsIcon> Clubs
        </div>
      </button>
      {club === false ? (
        <img
          src={Minions}
          alt=""
          className="h-[20vw] w-[15vw] fixed top-10 right-1 hidden"
        />
      ) : (
        <div className=" min-[769px]:hidden scrollbar-hide  shadow-2xl shadow-black space-y-5 bg-white bg-opacity-5 backdrop-blur-2xl flex flex-col backdrop-filter h-[100vh] w-[25vw] fixed top-10 right-1 rounded-[10px] overflow-scroll">
          {allclubs?.map((club) => {
            return (
              <Link to={`/club/${club['name']}`} params={club['name']} state={club} className="">
                <Tooltip title={club['name']}>
                  {" "}
                  <img
                    src={club['logo']}
                    className="bg-white h-[22vw] w-[22vw] rounded-[50%]  mx-auto "
                    alt=""
                  />
                </Tooltip>
              </Link>
            )
          })}
          <Link to="/addclub" className="">
            <Tooltip title="Add New Club">
              {" "}
              <div
                className="flex items-center justify-center h-[22vw] w-[22vw] mx-auto cursor-pointer  bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-2xl rounded-[50%]  "
                alt=""
              > <AddIcon className="text-slate-400 scale-[150%]" /> </div>
            </Tooltip>
          </Link>

          {/* <Link to="/clubprofile" className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[22vw] w-[22vw] rounded-[50%]  mx-auto"
            />
          </Link>
          <Link to="/clubprofile" className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[22vw] w-[22vw] rounded-[50%]  mx-auto"
            />
          </Link>
          <Link to="/clubprofile" className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[22vw] w-[22vw] rounded-[50%]  mx-auto"
            />
          </Link>
          <Link to="/clubprofile" className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[22vw] w-[22vw] rounded-[50%]  mx-auto"
            />
          </Link>
          <Link to="/clubprofile" className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[22vw] w-[22vw] rounded-[50%]  mx-auto"
            />
          </Link>
          <Link to="/clubprofile" className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[22vw] w-[22vw] rounded-[50%]  mx-auto"
            />
          </Link> */}
        </div>
      )}
    </div>
  );
}
