import React from "react";
import Minions from "../Images/Minions.jpg";

export default function Row(props) {
  return (
    <div>
      <div className="grid max-sm:grid-cols-[14%_33%_28%_8%] grid-cols-[12%_40%_23%_11%] mb-[1vw] max-sm:gap-[3vw] gap-[3vw] max-md:text-sm text-2xl max-sm:mr-[2vw] ml-[1vw] text-white items-center">
        <div className=" text-[#ebff3a]">
          <div className="text-white">
            <img src={props.rank} className=" max-[420px]:h-[35px] max-[420px]:w-[35px] h-[5vw] w-[5vw] rounded-[50%]" />
          </div>
        </div>
        <div className=" text-[#ebff3a]">
          <div className="text-white">{props.name}</div>
        </div>
        <div className=" text-[#ebff3a]">
          <div className="text-white">{props.rollno}</div>
        </div>
        <div className=" text-[#ebff3a]">
          <div className="text-white">{props.points}</div>
        </div>
      </div>
    </div>
  );
}
