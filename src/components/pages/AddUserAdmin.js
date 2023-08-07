import React, { useEffect, useRef, useState } from "react";
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
import { Button } from "@mui/material";

export default function AddUserAdmin(props) {
  const allowedExtensions = ["csv"];
  const [file, setFile] = useState([]);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [valueArray, setvaluearray] = useState([]);
  const [filename, setfilename] = useState("No file selected");
  const [etype, setetype] = useState("success");
  const [message, setmessage] = useState("Successfully Added!");
  const [isfile, setisfile] = useState(0);
  const [add, setadd] = useState(true);
  const inputaddref = useRef();

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
      setfilename(e.target.files[0].name);
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (result) {
          const valuearray = [];

          result.data.map((d) => {
            valuearray.push(Object.values(d));
          });
          setvaluearray(valuearray);
        },
      });
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
      <Navbar selected="manageusers"></Navbar>

      <div className=" md:ml-[22vw] flex flex-col space-y-5 max-md:w-[78%] text-white  ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl py-8 px-4 shadow-black">
        <div className="text-3xl max-md:text-xl">Manage Users</div>
        <div className="flex space-x-5 self-center text-2xl max-md:text-lg text-slate-200">
          <button
            onClick={() => {
              setadd(!add);
            }}
            className={`px-6 py-4 ${add ? "border-b" : ""} border-slate-200`}
          >
            Add Users
          </button>
          <button
            onClick={() => {
              setadd(!add);
            }}
            className={`px-6 py-4 ${!add ? "border-b" : ""}  border-slate-200`}
          >
            {" "}
            Remove Users
          </button>
        </div>
        <div>
          {add && (
            <div className="mt-10">
              <div className="flex space-x-10 text-xl max-md:text-base">
                <div>To add users upload the an CSV file in given template</div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      background: "#15803d",
                      color: "white",
                      background: "#100d1e",
                      borderColor: "#199245",
                      "&:hover": {
                        background: "#100d1e",
                        borderColor: "#0a0813",
                        color: "white",
                      },
                    }}
                  >
                    Download Template
                  </Button>
                </div>
              </div>
              <div className="my-5 flex space-x-5 gap-x-2 items-center">
                Add CSV file
                <Button
                  className="mx-5"
                  variant="contained"
                  onClick={() => {
                    inputaddref.current.click();
                    console.log("hello");
                  }}
                  color="primary"
                  sx={{
                    background: "#15803d",
                    color: "white",
                    background: "#100d1e",
                    borderColor: "#199245",
                    "&:hover": {
                      background: "#100d1e",
                      borderColor: "#0a0813",
                      color: "white",
                    },
                  }}
                >
                  Select file
                </Button>
                <div>{filename}</div>
                <input
                  ref={inputaddref}
                  className="hidden text-[#5d5d5d] file:mr-5 file:px-4 file:py-2 file:border-[1px] file:text-xs file:font-medium file:bg-black file:text-white hover:file:cursor-pointer hover:file:bg-black hover:file:text-white"
                  type="file"
                  accept="csv"
                  onChange={onSelectFile}
                ></input>
                <Button
                  className="mx-5"
                  variant="contained"
                  color="primary"
                  onClick={handleParse}
                  sx={{
                    background: "#15803d",
                    color: "white",
                    background: "#100d1e",
                    borderColor: "#199245",
                    "&:hover": {
                      background: "#100d1e",
                      borderColor: "#0a0813",
                      color: "white",
                    },
                  }}
                >
                  upload
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" md:ml-[22vw] flex flex-col space-y-5 w-[78%]  text-white  ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl py-8 px-4 shadow-black">
        <div className="grid gap-y-2 text-slate-200 max-md:grid-cols-[repeat(4,minmax(auto,21vw))] grid-cols-[1fr_1fr_2.5fr_3fr] striped text-lg max-md:text-sm max-lg:text-base">
          <div className="row-start-1 overflow-hidden w-[100%] whitespace-nowrap  text-ellipsis col-start-1 font-semibold text-xl max-md:text-sm max-lg:text-base bg-[#100d1e] p-2 rounded-lg text-center">
            S.No
          </div>
          <div className="row-start-1 overflow-hidden w-[100%] whitespace-nowrap  text-ellipsis col-start-2 font-semibold text-xl max-md:text-sm max-lg:text-base bg-[#100d1e] p-2 rounded-lg text-center">
            Roll No
          </div>
          <div className="row-start-1 overflow-hidden w-[100%] whitespace-nowrap  text-ellipsis col-start-3  font-semibold text-xl max-md:text-sm max-lg:text-base bg-[#100d1e] p-2 rounded-lg text-center">
            Name
          </div>
          <div className="row-start-1 overflow-hidden w-[100%] whitespace-nowrap  text-ellipsis col-start-4 font-semibold text-xl  max-md:text-sm max-lg:text-base bg-[#100d1e] p-2 rounded-lg text-center">
            Email ID
          </div>

          {valueArray.map((value, index) => {
            return (
              <>
                <div
                  className={`row-start-${
                    index + 2
                  } col-start-1 p-2 overflow-hidden w-[100%] whitespace-nowrap  text-ellipsis rounded-lg text-center`}
                >
                  {index + 1}
                </div>
                <div
                  className={`row-start-${
                    index + 2
                  } col-start-2 p-2 overflow-hidden w-[100%] whitespace-nowrap  text-ellipsis rounded-lg text-center`}
                >
                  {value[0]}
                </div>
                <div
                  className={`row-start-${
                    index + 2
                  } col-start-3 p-2 overflow-hidden w-[100%] whitespace-nowrap  text-ellipsis rounded-lg text-center`}
                >
                  {value[1]}
                </div>
                <div
                  className={`row-start-${
                    index + 2
                  } col-start-4 p-2 overflow-hidden w-[100%] whitespace-nowrap  text-ellipsis  rounded-lg text-center`}
                >
                  {value[2]}
                </div>
              </>
            );
          })}
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
