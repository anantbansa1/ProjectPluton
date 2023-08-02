import React, { useState } from "react";

function AddAlert(e) {
  alert("Added Successfully");
}
export default function AddUserAdmin(props) {
  const [file, setFile] = useState(null);
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setFile(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      <div>
        <div className="bg-[#232323] text-white items-center ml-[20vw] mt-[10vh] flex justify-center text-2xl my-10">
          Add Users
        </div>
        <div className="">
          <div className="bg-[#232323] text-white flex justify-center ">
            <div className="ml-[23vw] py-3">
              To add users upload the an Excel/CSV file in given template{" "}
              <br></br>
              <br></br>
              Add a Excel/CSV file: <strong>{props.filename}</strong>
            </div>

            <div className="my-0">
              <button className="rounded-full bg-white text-black  px-4 py-2 mx-5">
                Download Template
              </button>{" "}
              <br></br> <br></br>
            </div>
          </div>
          <div className="bg-[#232323] text-white items-center flex justify-center h-[5vh] ml-[23vw] my-6">
            <input
              className=" text-white px-4 py-2 mx-5"
              type="file"
              id="uploadbtn"
              accept=".csv"
              onChange={onSelectFile}
              hidden
            ></input>
            <label
              for="uploadbtn"
              className="rounded-full bg-white text-black px-4 py-2 mx-5 cursor-pointer"
            >
              Upload File
            </label>
            <button
              className="rounded-full bg-white text-black px-4 py-2 mx-5"
              onClick={AddAlert}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
