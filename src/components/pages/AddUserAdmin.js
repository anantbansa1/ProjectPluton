import React, { useState } from "react";
import Button from "@mui/material/Button";
import Papa from "papaparse";

// function AddAlert(e) {
//   alert("Added Successfully");
// }

const allowedExtensions = ["csv"];
export default function AddUserAdmin(props) {
  const [file, setFile] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const onSelectFile = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };
  const handleParse = () => {
    // AddAlert();
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.keys(parsedData[0]);
      const value = Object.values(parsedData);
      console.log(columns);
      console.log(value);
      setData(columns);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div>
        <div className=" text-white items-center ml-[20vw] mt-[10vh] flex justify-center text-2xl my-10">
          Add Users
        </div>
        <div className="">
          <div className="ml-[23vw] text-white flex flex-col justify-center ">
            <div className="flex py-3 min-[823px]:text-md max-[823px]:flex-col items-center ">
              <div className=" max-[823px]:mr-4">
                To add users upload the an Excel/CSV file in given template
              </div>{" "}
              <br></br>
              <br></br>
              <button className="rounded-full bg-white text-black px-4 py-2 mx-5 max-[823px]:rounded-3xl">
                Download Template
              </button>{" "}
              <br></br> <br></br>
              {/* <div className="mx-5">
                            <Button variant="contained" className="">Download template</Button>
                            </div> */}
            </div>

            <div className=" my-3 flex py-3 max-[823px]:justify-center">
              <div>
                Add a Excel/CSV file: <strong>{props.filename}</strong>
              </div>
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
            <label
              for="uploadbtn"
              className="rounded-full bg-white text-black px-4 py-2 mx-5 cursor-pointer max-[820px]:text-xs"
            >
              Upload File
            </label>
            <button
              className="rounded-full bg-white text-black px-4 py-2 mx-5 max-[823px]:text-xs"
              onClick={handleParse}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
