import React, { useState } from "react";
import Navbar from "../Navbar";
import Minions from "../Images/Minions.jpg";
import Tanjiro from "../Images/Tanjiro.jpg";
import Zoro from "../Images/zoro.jpg";

export default function UserFeed() {
  const [post, underline] = useState("text");
  const [club, setclub] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-md:mx-auto">
        <div className="min-[820px]:ml-[20vw] ml-[10vw] flex text-white mt-[-5vh] mr-[15vw] justify-between">
          <div className="flex-row flex space-x-20 my-[10vh] mx-[23.5vw] text-xl ">
            <div className="leading-10">
              <button
                onClick={(e) => {
                  underline("Post");
                }}
                className="w-[7vw] text-center"
              >
                Post
              </button>
              {post === "Post" ? (
                <hr className="max-[570px]:w-[9vw] w-[7vw] border-white border" />
              ) : (
                <hr className="hidden" />
              )}
            </div>
            <div className="leading-10">
              <button
                onClick={(e) => {
                  underline("Poll");
                }}
                className="w-[5vw] text-center"
              >
                Poll
              </button>
              {post === "Poll" ? (
                <hr className=" max-[570px]:w-[8vw] w-[5.5vw] border-white border" />
              ) : (
                <hr className="hidden" />
              )}
            </div>
          </div>
          <hr
            width="1"
            size="500"
            className=" mx-auto border-white border h-[100vh] fixed right-[15vw] top-0 max-md:hidden"
          />
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

        <div className="feed ">
          <div>
            <div className="ml-[20vw] flex items-center text-white ">
              <div className="flex flex-row  space-x-[35vw] items-center ">
                <div className="flex items-center">
                  <div>
                    <img
                      src={Minions}
                      alt=""
                      className="max-[750px]:h-[10vw] max-[750px]:w-[10vw] h-[5vw] w-[5vw] rounded-[50%] ml-[2vw]"
                    />
                  </div>
                  <div className="text-xl max-[750px]:ml-2 ml-8 ">
                    Club Name
                  </div>
                </div>
              </div>
            </div>
            <div className="  ml-[23vw] text-white">
              <div>
                <img
                  src={Tanjiro}
                  alt=""
                  className="max-md:w-[70vw] max-md:h-[250px] h-[350px] w-[59vw] bg-white mt-[2vh]"
                />
              </div>
              <div className="flex">
                <div>Date</div>
                <div>Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="logos absolute right-[4vw] top-[3vw] flex-col max-[769px]:hidden">
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
      </div>

      <button
        onClick={(e) => {
          setclub(!club);
        }}
        className="min-[769px]:hidden flex items-center space-x-1 text-white fixed top-3 right-2"
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
        <div className=" min-[769px]:hidden bg-[#ffffff72] h-[100vh] w-[12vw] fixed top-10 right-1 rounded-[10px] overflow-scroll">
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] mt-[2vw] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
          <button className="">
            <img
              src={Minions}
              alt=""
              className="bg-white h-[10vw] w-[10vw] rounded-[50%] mb-[2vh] ml-[1vw]"
            />
          </button>
          <br />
        </div>
      )}
    </div>
  );
}
