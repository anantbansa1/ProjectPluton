import React from "react";
import Navbar from "../Navbar";
import Row from "./Row";
import Minions from "../Images/Minions.jpg"
import Tanjiro from "../Images/Tanjiro.jpg"
import zoro from "../Images/zoro.jpg"

export default function Leaderboard(props) {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-[3vw] ml-[20vw] text-white">
        <div className=" text-center text-5xl ">
          Leaderboard
          <br />
          <br />
        </div>
        <div className="grid max-sm:grid-cols-[14%_33%_28%_8%] grid-cols-[12%_40%_23%_11%] max-sm:gap-[3vw] gap-[3vw] max-md:text-lg text-4xl max-sm:mr-[2vw] ml-[1vw] text-white">
          <div className="font-bold text-[#ebff3a]">
            Rank
            <br />
            <br />
          </div>
          <div className="font-bold text-[#ebff3a]">
            Name
            <br />
            <br />
          </div>
          <div className="font-bold text-[#ebff3a]">
            Roll No.
            <br />
            <br />
          </div>
          <div className="font-bold text-[#ebff3a]">
            Points
            <br />
            <br />
          </div>
        </div>
        <Row rank={Minions} name = "Madhav Nakra" rollno="41521032" points="100"></Row>
        <Row rank={zoro} name = "Ricky Chandra Paul Minj" rollno="41521032" points="1000"></Row>
        <Row rank={Tanjiro} name = "Duke Dhal" rollno="41521032" points="1000"></Row>
        <Row rank={Minions} name = "Anant Bansal" rollno="41521032" points="1000"></Row>
        <Row rank={zoro} name = "Samrath Ahluwalia" rollno="41521032" points="1000"></Row>
        <Row rank={Tanjiro} name = "Deepanshu Pal" rollno="41521032" points="1000"></Row>
        <Row rank={Minions} name = "Nakul Khanna" rollno="41521032" points="1000"></Row>
        <Row rank={zoro} name = "Ujjawal Sharma" rollno="41521032" points="1000"></Row>
        <Row rank={Tanjiro} name = "Devesh Singh" rollno="41521032" points="1000"></Row>
        <Row rank={Minions} name = "Shubham Yadav" rollno="41521032" points="1002"></Row>
        
      </div>
    </div>
  );
}
