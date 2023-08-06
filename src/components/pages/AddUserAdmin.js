import React, { useState } from "react";
import Button from "@mui/material/Button";
import Papa from "papaparse";
import Navbar from "../Navbar";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
// import { Auth } from "firebase/auth";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// function AddAlert(e) {
//   alert("Added Successfully");
// }
import { signUp } from "../../firebase";
import { db } from "../../firebase";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const allowedExtensions = ["csv"];
export default function AddUserAdmin(props) {
  const [file, setFile] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [values, setvalue] = useState([]);
  const [open, setOpen] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
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

  async function handleParse() {
    console.log("here");
    // setloading(true);
    try {
      console.log("here");
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const rowsArray = [];
        const valuesArray = [];
        csv.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        console.log(csv);
        setvalue(valuesArray);
      };
      reader.readAsText(file);
      console.log(file);

      // setloading(true);
      values.map(async (value, index) => {
        const docref = doc(db, "user", value[0]);
        const payload = {
          name: value[1],
          email: value[2],
          isadmin: false,
          coverimage:
            "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature-825x465.jpg",
          profileimage:
            "https://i.pinimg.com/474x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg",
        };
        try {
          // setloading(true);
          await setDoc(docref, payload);
          // setloading(false);
        } catch {}
        console.log(value[0]);
        console.log(index);

        createUserWithEmailAndPassword(auth, value[2], "chhotahathi")
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode);
          });
      });
      // setloading(false);
      console.log("here");
    } catch {
      setOpen(true);
    }
  }

  return (
    <>
      <Navbar selected="Adduser"></Navbar>

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
            </div>

            <div className=" my-3 flex py-3 max-[823px]:justify-center">
              <div>
                Add a Excel/CSV file: <strong>{props.filename}</strong>
              </div>
            </div>
          </div>
          <div className=" text-white items-center flex justify-center h-[5vh] ml-[23vw] my-6 ">
            <input
              className=" text-[#5d5d5d] file:mr-5 file:px-4 file:py-2 file:border-[1px] file:text-xs file:font-medium file:bg-black file:text-white hover:file:cursor-pointer hover:file:bg-black hover:file:text-white"
              type="file"
              accept="csv"
              // ref={Coverinput}
              onChange={onSelectFile}
            ></input>
            <button
              className="rounded-full bg-white text-black px-4 py-2 mx-5 max-[823px]:text-xs"
              onClick={handleParse}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(20px)",
        }}
        open={loading}
        close={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid File;
        </Alert>
      </Snackbar>
    </>
  );
}
