import React, { useState } from "react";

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="accordion-item">
      <div className="accordion-title" >
        <button className="p-4 ml-[1vw] mt-[2vw] text-lg md:text-2xl w-[80%] text-start text-white shadow-2xl shadow-black bg-[#130f22] " onClick={() => setIsActive(!isActive)}>
          <div className="flex justify-between">
            {title}
            <div className="max-sm:hidden w-fit">{isActive ? "-" : "+"}</div>
          </div>
        </button>
      </div>
      <div className={`transition-all duration-300 w-[80%] text-lg md:text-2xl px-4 bg-[#130f22] ml-[1vw]  overflow-hidden ${isActive ? 'max-h-screen py-4' : 'max-h-0'}`}>
        <div className="overflow-hidden">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
