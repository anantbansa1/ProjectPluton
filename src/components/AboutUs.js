import React from "react";
import Navbar from "./Navbar";
import Tanjiro from "./Images/Tanjiro.jpg";

export default function AboutUs() {
  return (
    <div className="ml-[22vw]">
      <Navbar></Navbar>
      <div className="photos mt-[3vw]">
        <div className="grid grid-cols-[27%_70%]">
          {/* <div> */}
            <img src={Tanjiro} alt="" className="h-[20vw] w-[20vw] rounded-[20px]" />
          {/* </div> */}
          <div className="text-white float-right">
            <div className=" ">
              <div className=" w-[55vw] max-md:w-[75vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-2 py-5 px-4 shadow-black text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                pariatur, odio, in libero ullam cupiditate laudantium doloremque
                delectus qui alias voluptas, optio tenetur perspiciatis aperiam
                provident nulla corrupti vitae! Est modi officia ut suscipit
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
