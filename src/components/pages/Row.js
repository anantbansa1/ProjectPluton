import React from "react";

export default function Row(props) {
  return (
    <div>
      <div
        className={`grid bg-[#130f22]  font-semibold ${
          props.rankno <= 5
            ? "text-[#fee101]"
            : props.rankno <= 10
            ? "text-[#d7d7d7]"
            : props.rankno <= 20
            ? "text-[#a77044]"
            : "text-[#cda678]"
        } ${
          props.rankno % 2 == 0 ? "bg-[#130f22]" : "bg-[#17132b]"
        } shadow-slate-900 shadow-lg rounded-2xl  max-sm:gap-1 grid-cols-[10%_10%_35%_22.5%_22.5%] mb-[1.2vw] max-md:text-sm text-xl   items-center`}
      >
        <div className=" ">
          <div className="flex justify-center py-3 max-md:px-0 px-2">
            <img src={props.rank} className=" max-md:h-[35px]  h-[80px] " />
          </div>
        </div>
        <div className="text-center">{props.rankno}</div>
        <div className=" ">
          <div className="">{props.name}</div>
        </div>
        <div className=" ">
          <div className="text-center">{props.rollno}</div>
        </div>
        <div className=" ">
          <div className="text-center">{props.points}</div>
        </div>
      </div>
    </div>
  );
}
