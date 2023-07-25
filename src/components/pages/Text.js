import React from 'react'
import Navbar from "../Navbar";
export default function Text() {
  return (
    <div>
      <Navbar></Navbar>
      <div className=' text-white ml-[35vw] mr-[15vw] flex justify-between items-center mt-[15vh] text-3xl'>
        <button className='hover:bg-[#4B4A4A] text-lightgray rounded-full p-[1vh]  px-[3vh]'>
          Text
        </button>
        <button className='hover:bg-[#4B4A4A] rounded-full p-[1vh]  px-[3vh]'>
          Images
        </button>
        <button className='hover:bg-[#4B4A4A] rounded-full p-[1vh]  px-[3vh]'>
          Polls
        </button>
        </div>
      <div className='bg-[#4B4A4A] ml-[28vw] h-[19vw] w-[64vw] mt-[5vw]'></div>
      <div className='ml-[28vw] text-black text-xl space-x-8 mt-[2vh]'>
        <button className='bg-white p-[1vh] px-[5vh] rounded-full'>+Event</button>
        <button className='bg-white p-[1vh] px-[5vh] rounded-full'>+Announcement</button>
        <button className='bg-white p-[1vh] px-[5vh] rounded-full'>+Achievement</button>
      </div>
      <div className='ml-[87vw] text-white text-2xl mt-[6vh]'>
        <button>
          Submit
        </button>
      </div>
    </div>
  )
}