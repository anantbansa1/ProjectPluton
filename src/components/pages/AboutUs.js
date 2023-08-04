import React from "react";
import Navbar from "../Navbar";
import Minions from "../Images/Minions.jpg";
import Rengoku from "../Images/Rengoku.png";
import Deadpool from "../Images/Deadpool.jpg";
import Sasuke from "../Images/Sasuke.jpg";
import Temp from "../Images/Temp.jpg";
import Beetles from "../Images/Beetles.jpg";

export default function AboutUs() {
  return (
    <div className="ml-[22vw]">
      <Navbar></Navbar>
      <div className="text-white text-3xl  mt-[2vw] text-center font-semibold">
        About Us
      </div>
      <div>
      <div className="Line1 max-sm:flex-col flex justify-around max-sm:mt-[-27vh] mt-[-22vh]">
          <div className="flex min-h-screen flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Beetles}
                    alt=""
                    className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40 "
                  />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80   text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus velit officiis ullam ipsum voluptatum, ab totam
                    earum modi neque! Commodi delectus aliquam sunt perspiciatis
                    voluptates, rerum quisquam. Esse, illum ex.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-sm:mt-[-60vh] min-h-screen flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Minions}
                    alt=""
                    className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40 "
                  />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80  text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus velit officiis ullam ipsum voluptatum, ab totam
                    earum modi neque! Commodi delectus aliquam sunt perspiciatis
                    voluptates, rerum quisquam. Esse, illum ex.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-sm:mt-[-60vh] min-h-screen flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Rengoku}
                    alt=""
                    className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40 "
                  />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80  text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus velit officiis ullam ipsum voluptatum, ab totam
                    earum modi neque! Commodi delectus aliquam sunt perspiciatis
                    voluptates, rerum quisquam. Esse, illum ex.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Line2 max-sm:flex-col flex justify-around max-sm:mt-[-60vh] mt-[-50vh]">
          <div className="flex min-h-screen flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Sasuke}
                    alt=""
                    className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40 "
                  />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80   text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus velit officiis ullam ipsum voluptatum, ab totam
                    earum modi neque! Commodi delectus aliquam sunt perspiciatis
                    voluptates, rerum quisquam. Esse, illum ex.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-sm:mt-[-60vh] min-h-screen flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Temp}
                    alt=""
                    className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40 "
                  />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80  text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="text-sm">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus velit officiis ullam ipsum voluptatum, ab totam
                    earum modi neque! Commodi delectus aliquam sunt perspiciatis
                    voluptates, rerum quisquam. Esse, illum ex.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
