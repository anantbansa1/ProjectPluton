import React from "react";
import Minions from "../Images/Minions.jpg";

export default function Row(props) {
  return (
    <div>
      <div className={`grid bg-[#130f22]  ${props.rankno==1?'text-[#fee101] font-semibold':''} ${props.rankno%2==0?"bg-[#130f22]":"bg-[#17132b]"} shadow-slate-900 shadow-lg rounded-2xl mr-5  max-sm:grid-cols-[14%_33%_28%_8%] grid-cols-[12%_40%_23%_11%] mb-[1.2vw] max-sm:gap-[3vw] gap-[3vw] max-md:text-sm text-xl max-sm:mr-[2vw] ml-[1vw]  items-center`}>
        <div className=" ">
          <div className="py-3 px-2">
            <img src={props.rank} className=" max-[420px]:h-[35px] max-[420px]:w-[35px] h-[3vw] " />
          </div>
        </div>
        <div className=" ">
          <div className="">{props.name}</div>
        </div>
        <div className=" ">
          <div className="">{props.rollno}</div>
        </div>
        <div className=" ">
          <div className="">{props.points}</div>
        </div>
      </div>
    </div>
  );
}
