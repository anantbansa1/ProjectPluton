
import "./App.css";
import React, { Component } from "react";

export default function Row() {
  return (
    <div>
      <div className='font-bold text-[#ebff3a]'>
            Rank
            <br />
            <br />
            <div className='text-white'>
                {props.rank}
            </div>
        </div>
        <div className='font-bold text-[#ebff3a]'>Name
        <br /> <br />
            <div className='text-white'>
                {props.name}
            </div>
        </div>
        <div className='font-bold text-[#ebff3a]'>Roll No.
        <br /> <br />
            <div className='text-white'>
                {props.rollno}
            </div>
        </div>
        <div className='font-bold text-[#ebff3a]'>Points
        <br /><br />
            <div className='text-white'>
                {props.points}
            </div>
        </div>
    </div>
  )
}
