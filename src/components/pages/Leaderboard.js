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
      <div className="mt-[3vw] ml-[20vw] text-white">
        <div className="font-press-start text-center text-5xl text-[#FFC700] ">
          Leaderboard
          <br />
          <br />
        </div>

        <div className="flex m-5 space-x-5 h-[20vh] ">
          <div className="w-[33%] shadow-[#39495f] shadow-md rounded-lg bg-[#130f22]">rank 2</div>
          <div className="w-[33%] shadow-[#39495f] shadow-md rounded-lg bg-[#130f22]">rank 1</div>
          <div className="w-[33%] shadow-[#39495f] shadow-md rounded-lg bg-[#130f22]">rank 3</div>
        </div>

        <div className="bg-[#0b0914] py-6 px-4 rounded-lg mr-5 grid max-sm:grid-cols-[14%_33%_28%_8%] grid-cols-[12%_40%_23%_11%] max-sm:gap-[3vw] gap-[3vw] max-md:text-lg text-2xl max-sm:mr-[2vw] ml-[1vw] text-white">
          <div className="font-semibold text-[#FFF]">
            Rank

          </div>
          <div className="font-semibold text-[#FFF]">
            Name
          </div>
          <div className="font-semibold text-[#FFF]">
            Roll No.
          </div>
          <div className="font-semibold text-[#FFF]">
            Points
          </div>
        </div>
        {/* <Row rank={rank1} rankno={1} name="Madhav Nakra" rollno="41521032" points="100"></Row>
        <Row rank={rank2} rankno={2} name="Ricky Chandra Paul Minj" rollno="41521032" points="1000"></Row>
        <Row rank={rank3} rankno={3} name="Duke Dhal" rollno="41521032" points="1000"></Row> */}
        <Row rank={rank4} rankno={4} name="Anant Bansal" rollno="41521032" points="1000"></Row>
        <Row rank={rank5} rankno={5} name="Samrath Ahluwalia" rollno="41521032" points="1000"></Row>
        <Row rank={rank6} rankno={6} name="Deepanshu Pal" rollno="41521032" points="1000"></Row>
        <Row rank={rank7} rankno={7} name="Nakul Khanna" rollno="41521032" points="1000"></Row>
        <Row rank={rank8} rankno={8} name="Ujjawal Sharma" rollno="41521032" points="1000"></Row>
        <Row rank={rank9} rankno={9} name="Devesh Singh" rollno="41521032" points="1000"></Row>
        <Row rank={rank10} rankno={10} name="Shubham Yadav" rollno="41521032" points="1002"></Row>

      </div>
    </div>
  );
}
