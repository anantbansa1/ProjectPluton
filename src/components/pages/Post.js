import React from "react";

function post(props) {
  return (
    <div>
      <div className="ml-[20vw] max-md:ml-[15vw] my-10">
        <div className=" mx-auto w-[50vw] max-md:w-[75vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
          <div className="flex font-semibold items-center space-x-5">
            <img
              src={props.ClubImage}
              alt=""
              className=" rounded-[50%] object-cover border-2 border-white h-[2.5vw] w-[2.5vw] min-w-[30px] min-h-[30px]"
            />
            <div className="max-md:text-sm">{props.name}</div>
          </div>
          <div className="my-5">{/* <img src={props.image} alt="" /> */}</div>
          <div className="text-lg max-md:text-sm text-[#dddbdb] ">
            <span className="font-bold text-white">{props.name}</span>{" "}
            {props.text}
          </div>
          <div className="flex justify-between mx-2 ">
            <div className="text-md max-md:text-xs py-4  text-[#c5c2c2]">
              {props.date}
            </div>
            <div className="text-md max-md:text-xs py-4  text-[#c5c2c2]">
              {props.time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default post;
