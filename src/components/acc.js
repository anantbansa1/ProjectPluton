import React, { useState } from 'react';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
  const [isAct, setIsAct] = useState('transition-all duration-500');

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive) && setIsAct(!isAct)}>
        <button className="p-4 ml-[1vw] mt-[2vw] text-2xl w-[80%] text-start text-white bg-[#1D1B1B] ">
            <div className="flex justify-between">
            {title}
            <div className=" w-fit">{isActive ? '-' : '+'}</div>
            </div>
        </button>
      </div>
      {isActive && isAct && <div className="accordion-content overflow-hidden transition-all duration-500  p-2 text-xl ml-[1vw] w-[80%] text-white bg-[#1D1B1B]">
            {content}
        </div>}
    </div>
  );
};

export default Accordion;