import React from 'react'
import Navbar from '../Navbar'

function Pagenotfound() {
  return (
    <>
    <Navbar></Navbar>
    <div className=" md:ml-[22vw] flex flex-col space-y-5 max-md:w-[78%] text-white  ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl py-8 px-4 shadow-black">
       <div className='text-3xl'> Error 404! Page not found</div>      
    </div>
    </>
  )
}

export default Pagenotfound
