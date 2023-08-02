import React, { useState } from "react";
import Navbar from "../Navbar";
import Minions from "../Images/Minions.jpg";
import Tanjiro from "../Images/Tanjiro.jpg";
import Post from "./Post";
import Poll from "./Poll";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

export default function UserFeed() {
  const [post, underline] = useState("Post");
  const [club, setclub] = useState(false);

  return (
    <div>
      <Navbar selected="home" />
      <div className="">
        <div className="max-lg:ml-[15vw] max-lg:mr-0 ml-[20vw] flex text-white  mr-[12vw] justify-center">
          <div className="flex-row flex space-x-20 my-[5vh] text-xl ">
            <div className="leading-10">
              <button
                onClick={(e) => {
                  underline("Post");
                }}
                className={` ${
                  post === "Post" ? "border-b" : ""
                } border-white px-8 py-2 text-center`}
              >
                Post
              </button>
              {post === "Post"
                ? // <hr className="max-[570px]:w-[9vw] w-[7vw] border-white border" />
                  ""
                : // <hr className="hidden" />
                  ""}
            </div>
            <div className="leading-10">
              <button
                onClick={(e) => {
                  underline("Poll");
                }}
                className={` ${
                  post === "Poll" ? "border-b" : ""
                } border-white px-8 py-2 text-center`}
              >
                Poll
              </button>
              {post === "Poll"
                ? // <hr className=" max-[570px]:w-[8vw] w-[5.5vw] border-white border" />""
                  ""
                : // <hr className="hidden" />
                  ""}
            </div>
          </div>
          {/* <hr
            width="1"
            size="500"
            className=" mx-auto border-white border h-[100vh] fixed right-[15vw] top-0 max-md:hidden"
          /> */}
        </div>

        <div className="flex ml-[70vw] mt-[-4vh] text-white">
          <button className="flex items-center ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-funnel-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
              </svg>
            </div>
            <div className="text-lg ml-[0.7vw]">Filters</div>
            <div className="ml-[0.5vw]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {post === "Post" && (
        <div className="-ml-[12vw] max-[769px]:m-0">
          <Post
            name="Club Name"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Caption"
            date="Date"
            time="Time"
          ></Post>
          <Post
            name="Club Name"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Caption"
            date="Date"
            time="Time"
          ></Post>
          <Post
            name="Club Name"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Caption"
            date="Date"
            time="Time"
          ></Post>
          <Post
            name="Club Name"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Caption"
            date="Date"
            time="Time"
          ></Post>
          <Post
            name="Club Name"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Caption"
            date="Date"
            time="Time"
          ></Post>
          <Post
            name="Club Name"
            ClubImage={Tanjiro}
            image={Tanjiro}
            text="Caption"
            date="Date"
            time="Time"
          ></Post>
        </div>
      )}

      {post === "Poll" && (
          <div className="-ml-[12vw] max-[769px]:m-0">
          <Poll
            name="Club Name"
            ClubImage={Minions}
            question="Question"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
          ></Poll>
          <Poll
            name="Club Name"
            ClubImage={Minions}
            question="Question"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
          ></Poll>
          <Poll
            name="Club Name"
            ClubImage={Minions}
            question="Question"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
          ></Poll>
          <Poll
            name="Club Name"
            ClubImage={Minions}
            question="Question"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
          ></Poll>
          <Poll
            name="Club Name"
            ClubImage={Minions}
            question="Question"
            option1="Option 1"
            option2="Option 2"
            option3="Option 3"
            option4="Option 4"
          ></Poll>
        </div>
      )}

      <div className="flex max-[769px]:hidden  flex-col fixed h-[100%] w-[12vw] items-center overflow-y-scroll scrollbar-hide top-0 right-0  py-4  space-y-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-3xl ">
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
        <div>
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
        </div>
        <div>All Clubs</div>
      </button>
      {club === false ? (
        <img
          src={Minions}
          alt=""
          className="h-[20vw] w-[15vw] fixed top-10 right-1 hidden"
        />
      ) : (
        // <img src={Zoro} alt="" className="h-[20vw] w-[15vw] fixed top-10 right-1"/>
        <div className=" min-[769px]:hidden scrollbar-hide  flex flex-col bg-white backdrop-filter bg-opacity-10 backdrop-blur-2xl h-[100vh] w-[20vw] fixed top-10 right-1 rounded-[10px] overflow-scroll">
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[15vw] w-[15vw] rounded-[50%] mb-[2vh] mt-[2vw] mx-auto"
            />
          </button>
        </div>
      )}
    </div>
  );
}
