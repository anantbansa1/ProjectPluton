import React from 'react'
import Navbar from "../Navbar"

export default function Leaderboard() {
  return (
    <div>
      <Navbar></Navbar>
      <div className='mt-[3vw] ml-[20vw] text-white'>
      <div className=' text-center text-3xl font-pressStart'>
        Leaderboard
        <br />
        <br />
      </div>
      <div className='flex flex-col'>
        <div className="part1">
            {/* <hr className='mt-[3vw]'/> */}
            <div className='flex max-md:text-xl text-2xl justify-around'>
                <div className='ml-[-4vw]'>
                    <div className='font-bold'>
                        Rank
                        {/* <hr className=' fixed top-[9vw] left-[34vw] border border-white h-[100vh]'/> */}
                    </div>
                    <div className='text-center'>
                        1
                    </div>
                    <div className='text-center'>
                        10
                    </div>
                    <div className='text-center'>
                        23
                    </div>
                    <div className='text-center'>
                        120
                    </div>
                    <div className='text-center'>
                        250
                    </div>
                </div>
                <div>
                    <div className='text-center font-bold'>
                        Name
                    </div>
                    <div className='items-center'>
                        Ricky Chandra Paul Minj
                    </div>
                </div>
                <div className='flex mr-[-4vw] space-x-[12vw]'>
                    <div>
                        <div className='font-bold'>
                            Roll No.
                        </div>
                        <div className='text-center'>
                            41521032
                        </div>
                    </div>
                    <div>
                        <div className='font-bold'>
                            Points
                        </div>
                        <div className='text-center'>
                            100
                        </div>
                    </div>
                </div>
            </div>
            {/* <hr className='fixed top-[11.5vw] left-0 w-[100vw]'/> */}
        </div>
      </div>
      </div>

    </div>
  )
}
