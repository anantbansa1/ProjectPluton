import React, { useState } from "react";

function RemoveAlert(e){
    alert("Removed Successfully")
}

export default function RemoveUserAdmin(props){
    const [file, setFile] = useState(null)
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setFile(reader.result)); 
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    return(
        <>
        <div>
        <div className=" text-white items-center ml-[20vw] mt-[10vh] flex justify-center text-2xl my-10">
            Remove Users
        </div>
        <div className="">
        <div className="ml-[23vw] text-white flex flex-col justify-center ">
            <div className="flex py-3 min-[823px]:text-md max-[823px]:flex-col items-center " >
            <div className=" max-[823px]:mr-4">To remove users upload the an Excel/CSV file in given template </div><br></br><br></br>
            <button className="rounded-full bg-white text-black px-4 py-2 mx-5 max-[823px]:rounded-3xl">Download Template</button> <br></br> <br></br>
            </div>
            
            <div className=" my-3 flex py-3 max-[823px]:justify-center">
                        <div>Add a Excel/CSV file:  <strong>{props.filename}</strong></div>
                        </div>
                    </div>
                    <div className=" text-white items-center flex justify-center h-[5vh] ml-[23vw] my-6 ">
                        <input
                            className=" text-white px-4 py-2 mx-5"
                            type="file"
                            id="uploadbtn"
                            accept=".csv"
                            onChange={onSelectFile}
                            hidden
                        ></input>
                        <label for="uploadbtn" className="rounded-full bg-white text-black px-4 py-2 mx-5 cursor-pointer max-[820px]:text-xs">Upload File</label>
                        <button className="rounded-full bg-white text-black px-4 py-2 mx-5 max-[823px]:text-xs" onClick={RemoveAlert}>Confirm</button>
                    </div>

                </div>
            </div>
        </>
        
    )
}