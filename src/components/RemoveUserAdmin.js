import React, { useState } from "react";

function RemoveAlert(e){
    alert("Removed Successfully")
}

export default function RemoveUserAdmin(props){
    return(
        <>
        <div>
        <div className="bg-[#232323] text-white items-center ml-[20vw] mt-[10vh] flex justify-center text-2xl my-10">
            Remove Users
        </div>
        <div className="">
        <div className="bg-[#232323] text-white flex justify-center ">
            <div className="ml-[23vw] py-3" >
            To remove users upload the an Excel/CSV file in given template <br></br><br></br>
            Add a Excel/CSV file:  <strong>{props.filename}</strong>
            </div>
            
            <div className="my-0">
                <button className="rounded-full bg-white text-black  px-4 py-2 mx-5">Download Template</button> <br></br> <br></br>
            </div>
        </div>
        <div className="bg-[#232323] text-white items-center flex justify-center h-[5vh] ml-[23vw] my-6">
        <button className="rounded-full bg-white text-black px-4 py-2 mx-5">Upload</button>
        <button className="rounded-full bg-white text-black px-4 py-2 mx-5" onClick={RemoveAlert}>Confirm</button>
        </div>
            
        </div>
        </div>
        </>
        
    )
}