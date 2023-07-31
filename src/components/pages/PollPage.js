import React, { useState } from "react";
import Navbar from "../Navbar";
import Poll from "./Poll";

export default function UserFeed() {
  const [post, underline] = useState(true);
  const [select, set] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="ml-[20vw] flex text-white mt-[-5vh]">
        <div className="flex-row flex space-x-20 my-[10vh] mx-[23.5vw] text-xl">
          <div className="leading-10">
            <button
              onClick={(e) => {
                underline(true);
              }}
              className="w-[7vw] text-center"
            >
              Post
            </button>
            {post === true ? (
              <hr className="w-[7vw]" />
            ) : (
              <hr className="hidden" />
            )}
          </div>
          <div className="leading-10">
            <button
              onClick={(e) => {
                underline(false);
              }}
              className="w-[7vw] text-center"
            >
              Poll
            </button>
            {post === false ? (
              <hr className="w-[7vw]" />
            ) : (
              <hr className="hidden" />
            )}
          </div>
        </div>
        <hr
          width="1"
          size="500"
          className=" mx-auto border-white border h-[100vh] fixed right-[15vw] top-0"
        />
      </div>

      <div className="flex items-center ml-[70vw] mt-[-4vh] text-white">
        <button className="flex items-center">
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
          <div className="text-lg ml-[0.5vw]">Filters</div>
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

      <div className="feed">
        <div>
          <div className="ml-[20vw] flex items-center text-white">
            <div className="flex flex-row  space-x-[35vw] items-center">
              <div className="flex items-center">
                <div className="bg-white h-[5vw] w-[5vw] rounded-[50%] ml-[5vw] "></div>
                <div className="text-xl ml-8">Club Name</div>
              </div>
            </div>
          </div>
          <div className="ml-[35vw] text-white">
            <div className="h-[22vw] w-[40vw] bg-[#323232]  mt-[2vh] rounded-[10px]">
              <div className="p-[1vw]  max-[1192px]:text-md lg:text-xl">Poll Question ?</div>
              <div className="flex items-center  text-xl space-x-56 mt-[2vh]">
                <div className="flex items-center lg:space-x-4  ">
                  <button className="flex space-x-4">
                    <div className="h-[3vw] w-[3vw] bg-white rounded-[50%] ml-[1vw]"></div>
                    <div>Selected Option</div>
                  </button>
                </div>
                <div>
                  <div className="bg-[#656464] text-sm rounded-[20px] p-[0.3vw]">
                    2 votes
                  </div>
                </div>
              </div>
              <div className="flex items-center text-xl space-x-56 mt-[2vh]">
                <div className="flex items-center space-x-4">
                  <button className="flex space-x-4">
                    <div className="h-[3vw] w-[3vw] bg-white rounded-[50%] ml-[1vw]"></div>
                    <div>Selected Option</div>
                  </button>
                </div>
                <div>
                  <div className="bg-[#656464] text-sm rounded-[20px] p-[0.3vw]">
                    2 votes
                  </div>
                </div>
              </div>
              <div className="flex items-center text-xl space-x-56 mt-[2vh]">
                <div className="flex items-center space-x-4">
                  <button className="flex space-x-4">
                    <div className="h-[3vw] w-[3vw] bg-white rounded-[50%] ml-[1vw]"></div>
                    <div>Selected Option</div>
                  </button>
                </div>
                <div>
                  <div className="bg-[#656464] text-sm rounded-[20px] p-[0.3vw]">
                    2 votes
                  </div>
                </div>
              </div>
              <div className="flex items-center text-xl space-x-56 mt-[2vh]">
                <div className="flex items-center space-x-4">
                  <button className="flex space-x-4">
                    <div className="h-[3vw] w-[3vw] bg-white rounded-[50%] ml-[1vw]"></div>
                    <div>Selected Option</div>
                  </button>
                </div>
                <div>
                  <div className="bg-[#656464] text-sm rounded-[20px] p-[0.3vw]">
                    2 votes
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-[34vw]">
              <div>Date</div>
              <div>Time</div>
            </div>
          </div>
        </div>
      </div>
      

      <Poll></Poll>



      <div className="logos absolute right-[4vw] top-[3vw] flex-col">
        <button className="bg-white h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"></button>
        <br />
        <button className="bg-white h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"></button>
        <br />
        <button className="bg-white h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"></button>
        <br />
        <button className="bg-white h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"></button>
        <br />
        <button className="bg-white h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"></button>
        <br />
        <button className="bg-white h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"></button>
        <br />
        <button className="bg-white h-[6vw] w-[6vw] rounded-[50%] mb-[2vh]"></button>
        <br />
      </div>
    </div>
  );
}
