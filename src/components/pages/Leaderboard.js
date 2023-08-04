import React from "react";
import Navbar from "../Navbar";
import Row from "./Row";
import Minions from "../Images/Minions.jpg"
import Tanjiro from "../Images/Tanjiro.jpg"
import zoro from "../Images/zoro.jpg"
import '@fontsource/press-start-2p';
import rank1 from "../Images/rank1.png"
import rank2 from "../Images/rank2.png"
import rank3 from "../Images/rank3.png"
import rank4 from "../Images/rank4.png"
import rank5 from "../Images/rank5.png"
import rank6 from "../Images/rank6.png"
import rank7 from "../Images/rank7.png"
import rank8 from "../Images/rank8.png"
import rank9 from "../Images/rank9.png"
import rank10 from "../Images/rank10.png"


export default function Leaderboard(props) {
  return (
    <div>
      <Navbar selected="leaderboard">
      </Navbar>
      <div className="mt-[3vw] max-md:ml-[15vw] ml-[20vw] text-white">
        <div className="font-press-start text-center max-md:text-2xl max-sm:text-xl text-5xl text-[#FFC700] ">
          Leaderboard
        </div>

        <div className="flex  max-md:mx-0 max-xl:text-base items-end h-[30vh] mt-5 mb-10 w-[85vw] md:w-[78vw] space-x-2   ">
          <div className="w-[33%] h-[20vh] grid grid-rows-[repeat(5,minmax(40px,auto))] grid-cols-[2fr_1fr_2fr]">

            <div className="flex flex-col shadow-[#39495f] bg-[#130f22]  h-[18vh] shadow-md rounded-lg row-start-2 col-start-1 row-span-4 col-span-3">
            </div>
            <img src={rank2} className="row-start-1 row-span-2 mx-auto col-start-1 col-span-3 h-[80px]" ></img>
            <div className="row-start-3 pr-8 col-span-3 items-center space-x-2 col-start-1 self-center justify-self-center flex ">
              <img src={zoro} className=" w-[30px] h-[30px] rounded-full border-white"></img>
              <span className="text-lg max-md:text-sm font-semibold text-[#fee101] ">Anant Bansal</span>
            </div>
            {/* <div className="row-start-5 col-start-1 row-span-1 col-span-3 flex justify-around ">
              <div className="text-[#fee101]">
                <span className="font-semibold"> Points:</span> <span className="">5000</span>
              </div>

            </div> */}
            <div className="self-center text-slate-200 font-semibold row-start-4 col-start-3 justify-self-end pr-4"> RollNo</div>
            <div className=" self-center row-start-5 col-start-3 text-[#fee101] justify-self-end pr-4">
              41521005
            </div>
            <div className="px-4 self-center text-slate-200 font-semibold row-start-4 col-start-1"> Points</div>
            <div className=" px-4 self-center row-start-5 col-start-1 text-[#fee101]">
              5000
            </div>

          </div>
          <div className="w-[33%] h-[25vh] grid grid-rows-[repeat(5,minmax(40px,auto))] grid-cols-[2fr_1fr_2fr]">

            <div className="flex flex-col shadow-[#39495f] bg-[#130f22]  h-[22vh] shadow-md rounded-lg row-start-2 col-start-1 row-span-4 col-span-3">
            </div>
            <img src={rank1} className="row-start-1 row-span-2 mx-auto  col-start-1 col-span-3 h-[80px]" ></img>
            <div className="row-start-3 pr-8 col-span-3 items-center space-x-2 col-start-1 self-center justify-self-center flex ">
              <img src={zoro} className=" w-[30px] h-[30px] rounded-full border-white"></img>
              <span className="text-lg  text-[#fee101] font-bold text-transparent bg-clip-text  bg-gradient-to-r from-red-400 max-md:text-sm   to-yellow-500">Anant Bansal</span>
            </div>

            <div className="self-center text-slate-200 font-semibold row-start-4 col-start-3 justify-self-end pr-4"> RollNo</div>
            <div className=" self-center row-start-5 col-start-3 font-bold text-transparent bg-clip-text  bg-gradient-to-r from-red-400  to-yellow-500 text-[#fee101] justify-self-end pr-4">
              41521005
            </div>
            <div className="px-4 self-center text-slate-200 font-semibold row-start-4 col-start-1"> Points</div>
            <div className=" px-4 self-center row-start-5 font-bold text-transparent bg-clip-text  bg-gradient-to-r from-red-400  to-yellow-500 col-start-1 text-[#fee101]">
              5000
            </div>

          </div>
          <div className="w-[33%] h-[20vh] grid grid-rows-[repeat(5,minmax(40px,auto))] grid-cols-[2fr_1fr_2fr]">

            <div className="flex flex-col shadow-[#39495f] bg-[#130f22]  h-[18vh] shadow-md rounded-lg row-start-2 col-start-1 row-span-4 col-span-3">
            </div>
            <img src={rank3} className="row-start-1 row-span-2 mx-auto col-start-1 col-span-3 h-[80px]" ></img>
            <div className="row-start-3 pr-8 col-span-3 items-center space-x-2 col-start-1 self-center justify-self-center flex ">
              <img src={zoro} className=" w-[30px] h-[30px] rounded-full border-white"></img>
              <span className="text-lg font-semibold text-[#fee101] max-md:text-sm  ">Anant Bansal</span>
            </div>
            {/* <div className="row-start-5 col-start-1 row-span-1 col-span-3 flex justify-around ">
              <div className="text-[#fee101]">
                <span className="font-semibold"> Points:</span> <span className="">5000</span>
              </div>

            </div> */}
            <div className="self-center text-slate-200 font-semibold row-start-4 col-start-3 justify-self-end pr-4"> RollNo</div>
            <div className=" self-center row-start-5 col-start-3 text-[#fee101] justify-self-end pr-4">
              41521005
            </div>
            <div className="px-4 self-center text-slate-200 font-semibold row-start-4 col-start-1"> Points</div>
            <div className=" px-4 self-center row-start-5 col-start-1 text-[#fee101]">
              5000
            </div>

          </div>



        </div>
        <div className="w-[85vw] md:w-[78vw]">

          <div className="bg-[#0b0914] py-6 max-sm:text-xs max-sm:gap-1  rounded-lg max-sm:p-0 grid  grid-cols-[10%_10%_35%_22.5%_22.5%]  max-md:text-base text-xl max-sm:mr-0  text-white">
            <div className="font-semibold text-center ">Medal</div>
            <div className="font-semibold text-[#FFF] text-center" >
              Rank

            </div>
            <div className="font-semibold text-[#FFF]">
              Name
            </div>
            <div className="font-semibold text-center text-[#FFF]">
              Roll No.
            </div>
            <div className="font-semibold text-center text-[#FFF]">
              Points
            </div>

          </div>
          {/* <Row rank={rank1} rankno={1} name="Madhav Nakra" rollno="41521032" points="100"></Row>
        <Row rank={rank2} rankno={2} name="Ricky Chandra Paul Minj" rollno="41521032" points="1000"></Row>
        <Row rank={rank3} rankno={3} name="Duke Dhal" rollno="41521032" points="1000"></Row> */}
          <div className="">
            <Row rank={rank4} rankno={4} name="Anant Bansal" rollno="41521032" points="1000"></Row>
            <Row rank={rank5} rankno={5} name="Samrath Ahluwalia" rollno="41521032" points="1000"></Row>
            <Row rank={rank6} rankno={6} name="Deepanshu Pal" rollno="41521032" points="1000"></Row>
            <Row rank={rank7} rankno={7} name="Nakul Khanna" rollno="41521032" points="1000"></Row>
            <Row rank={rank8} rankno={8} name="Ujjawal Sharma" rollno="41521032" points="1000"></Row>
            <Row rank={rank9} rankno={9} name="Devesh Singh" rollno="41521032" points="1000"></Row>
            <Row rank={rank10} rankno={10} name="Shubham Yadav" rollno="41521032" points="1002"></Row>
            <Row rank={rank10} rankno={15} name="Shubham Yadav" rollno="41521032" points="1002"></Row>
            <Row rank={rank10} rankno={21} name="Shubham Yadav" rollno="41521032" points="1002"></Row>
          </div>
        </div>

      </div>
    </div>
  );
}
