import React, { useState } from "react";
import Papa from "papaparse";
import Navbar from "../Navbar";
import { doc, setDoc } from "firebase/firestore";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddUserAdmin(props) {
  const allowedExtensions = ["csv"];
  const [file, setFile] = useState([]);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [etype, setetype] = useState("success");
  const [message, setmessage] = useState("Successfully Added!");
  const [isfile, setisfile] = useState(0);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function signup(email, docref, payload) {
    await setDoc(docref, payload);
    createUserWithEmailAndPassword(auth, email, "chhotahathi")
      .then((userCredential) => {
        setOpen(true);
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        setOpen(true);
        const errorMessage = error.message;
        setetype("error");

        switch (errorCode) {
          case "auth/email-already-in-use":
            setmessage("Email already in use!");
            break;
          case "auth/invalid-email":
            setmessage("Invalid email!");
            break;
          case "auth/operation-not-allowed":
            setmessage("Operation not allowed");
            break;
          default:
            setmessage("Something went wrong! Please try again later.");
            break;
        }
      });
  }

  const onSelectFile = (e) => {
    setisfile(e.target.files.length);
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        return;
      }
      setFile(inputFile);
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleParse() {
    if (!isfile) {
      setOpen(true);
      setetype("error");
      setmessage("Please upload a file");
      return;
    }
    const valuesArray = [];
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      setloading(true);
      sleep(2000).then(() => {
        setloading(false);
      });
      parsedData.map(async (d) => {
        const data = Object.values(d);
        const docref = doc(db, "user", data[0]);
        const payload = {
          name: data[1],
          email: data[2],
          isadmin: false,
          coverimage:
            "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature-825x465.jpg",
          profileimage:
            "https://i.pinimg.com/474x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg",
        };
        await signup(data[2], docref, payload);
      });
    };
    reader.readAsText(file);
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
        <Alert onClose={handleClose} severity={etype} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
