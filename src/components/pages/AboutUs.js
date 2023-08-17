import React from "react";
import Rengoku from "../Images/Rengoku.png";
import Deadpool from "../Images/Deadpool.jpg";
import Madhav from "../Images/Madhav.jpg";
import Anant from "../Images/Anant.jpg";
import Deepanshu from "../Images/Deepanshu.jpg";

export default function AboutUs() {
  return (
    <div className="ml-[22vw]">
      <div className="text-white text-3xl items-center  mt-[2vw] text-center font-semibold">
        Our Team
      </div>
      <div>
        <div className="Line1 max-sm:space-y-10 my-10 max-sm:flex-col flex justify-around ">
          <div className="flex flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Anant}
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
          <div className="flex  flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Madhav}
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
          <div className="flex   flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Deepanshu}
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
        <div className="Line2  max-sm:space-y-10 my-10 max-sm:flex-col flex justify-around ">
          <div className="flex flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Rengoku}
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
          <div className="flex flex-col justify-center">
            <div className="group max-sm:h-[70vw] max-sm:w-[70vw] h-[20vw] w-[20vw] [perspective:1000px]">
              <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0">
                  <img
                    src={Deadpool}
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
