import React, { useState } from "react";

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
  // const [isAct, setIsAct] = useState('transition-all duration-500');

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <button className="p-4 ml-[1vw] mt-[2vw] text-2xl w-[80%] text-start text-white bg-[#130f22] ">
          <div className="flex justify-between">
            {title}
            <div className=" w-fit">{isActive ? "-" : "+"}</div>
          </div>
        </button>
      </div>
      <div className="hidden">{content}</div>
      {isActive && (
        <div className=" transition-transform duration-1000 p-2 text-xl ml-[1vw] w-[80%] text-white bg-[#130f22]">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;
