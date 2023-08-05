import React, { useState } from "react";
import Navbar from "../Navbar";
import Minions from "../Images/Minions.jpg";
import Tanjiro from "../Images/Tanjiro.jpg";
import Post from "./Post";
import Poll from "./Poll";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CampaignIcon from '@mui/icons-material/Campaign';

export default function UserFeed() {
  const [post, underline] = useState("post");
  const [club, setclub] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Navbar selected="home" />
      <div className="">
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
              <button className="flex justify-center items-center text-xl " onClick={handleClick}>
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
                  open={open}
                  onClose={handleClose}
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
                  <MenuItem sx={{ padding: 2 }} onClick={handleClose}> <EmojiEventsIcon /> &nbsp;Achievements</MenuItem>
                  <MenuItem sx={{ padding: 2 }} onClick={handleClose}><EventAvailableIcon />&nbsp;Events</MenuItem>
                  <MenuItem sx={{ padding: 2 }} onClick={handleClose}><CampaignIcon />&nbsp;Announcements</MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>


      </div>

      {post === "post" && (
        <div className="-ml-[12vw] max-[769px]:m-0">
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
          ></Post>
          <Post
            name="Club of Programmers"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nisi omnis aliquam maxime iste sunt porro. Dignissimos repudiandae ratione blanditiis velit, nisi dolorem non quasi quaerat quibusdam tenetur quia aspernatur."
            date="08/03/2023"
            time="09:06"
          ></Post>


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
        <Link to="/clubprofile" className="h-[7vw] w-[7vw] border-white rounded-full" >
          <Tooltip title="clubname">
            {" "}
            <img
              src={Minions}
              className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
              alt=""
            />
          </Tooltip>
        </Link>
        <div className="h-[7vw] w-[7vw] border-white rounded-full">
          <Tooltip title="clubname">
            {" "}
            <img
              src={Minions}
              className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
              alt=""
            />
          </Tooltip>
        </div>
        <div className="h-[7vw] w-[7vw] border-white rounded-full">
          <Tooltip title="clubname">
            {" "}
            <img
              src={Minions}
              className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
              alt=""
            />
          </Tooltip>
        </div>
        <div className="h-[7vw] w-[7vw] border-white rounded-full">
          <Tooltip title="clubname">
            {" "}
            <img
              src={Minions}
              className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
              alt=""
            />
          </Tooltip>
        </div>
        <div className="h-[7vw] w-[7vw] border-white rounded-full">
          <Tooltip title="clubname">
            {" "}
            <img
              src={Minions}
              className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
              alt=""
            />
          </Tooltip>
        </div>
        <div className="h-[7vw] w-[7vw] border-white rounded-full">
          <Tooltip title="clubname">
            {" "}
            <img
              src={Minions}
              className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
              alt=""
            />
          </Tooltip>
        </div>
        <div className="h-[7vw] w-[7vw] border-white rounded-full">
          <Tooltip title="clubname">
            {" "}
            <img
              src={Minions}
              className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
              alt=""
            />
          </Tooltip>
        </div>
        <div className="h-[7vw] w-[7vw] border-white rounded-full">
          <Tooltip title="clubname">
            {" "}
            <img
              src={Minions}
              className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
              alt=""
            />
          </Tooltip>
        </div>
        <div className="h-[7vw] w-[7vw] border-white rounded-full">
          <Tooltip title="clubname">
            {" "}
            <img
              src={Minions}
              className="h-[7vw] w-[7vw] cursor-pointer rounded-full  "
              alt=""
            />
          </Tooltip>
        </div>
      </div>

      {/* <div className="bg-white bg-opacity-10 p-10 h-full backdrop-filter logos absolute right-[4vw] top-[3vw] flex-col max-[769px]:hidden">
        <button className="">
          <img
            src={Minions}
            alt=""
            className="bg-white max-[750px]:h-[10vw] max-[750px]:w-[10vw] h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"
          />
        </button>
        <br />
        <button className="">
          <img
            src={Zoro}
            alt=""
            className="bg-white max-[750px]:h-[10vw] max-[750px]:w-[10vw] h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"
          />
        </button>
        <br />
        <button className="">
          <img
            src={Minions}
            alt=""
            className="bg-white max-[750px]:h-[10vw] max-[750px]:w-[10vw] h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"
          />
        </button>
        <br />
        <button className="">
          <img
            src={Zoro}
            alt=""
            className="bg-white max-[750px]:h-[10vw] max-[750px]:w-[10vw] h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"
          />
        </button>
        <br />
        <button className="">
          <img
            src={Minions}
            alt=""
            className="bg-white max-[750px]:h-[10vw] max-[750px]:w-[10vw] h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"
          />
        </button>
        <br />
        <button className="">
          <img
            src={Zoro}
            alt=""
            className="bg-white max-[750px]:h-[10vw] max-[750px]:w-[10vw] h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"
          />
        </button>
        <br />
      </div> */}

      <button
        onClick={(e) => {
          setclub(!club);
        }}
        className="min-[769px]:hidden flex items-center  space-x-1 text-white fixed top-3 right-2"
      >
        {/* <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-double-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
            <path
              fill-rule="evenodd"
              d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div> */}
        <div><GroupsIcon></GroupsIcon> Clubs</div>
      </button>
      {club === false ? (
        <img
          src={Minions}
          alt=""
          className="h-[20vw] w-[15vw] fixed top-10 right-1 hidden"
        />
      ) : (
        // <img src={Zoro} alt="" className="h-[20vw] w-[15vw] fixed top-10 right-1"/>
        <div className=" min-[769px]:hidden scrollbar-hide  shadow-2xl shadow-black space-y-5 bg-white bg-opacity-5 backdrop-blur-2xl flex flex-col backdrop-filter h-[100vh] w-[25vw] fixed top-10 right-1 rounded-[10px] overflow-scroll">
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
          </Link>
          <Link to="/clubprofile" className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[22vw] w-[22vw] rounded-[50%]  mx-auto"
            />
          </Link>
          

        </div>
      )}
    </div>
  );
}
