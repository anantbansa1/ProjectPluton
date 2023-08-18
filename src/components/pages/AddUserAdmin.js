import React, { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { doc, setDoc } from "firebase/firestore";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { db } from "../../firebase";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  deleteDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddUserAdmin() {
  const user = useAuth();
  const allowedExtensions = ["csv"];
  const [file, setFile] = useState([]);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [valueArray, setvaluearray] = useState([]);
  const [filename, setfilename] = useState("No file selected");
  const [etype, setetype] = useState("success");
  const [message, setmessage] = useState("Successfully Added!");
  const [isfile, setisfile] = useState(0);
  const [add, setadd] = useState("Add");
  const inputaddref = useRef();
  const [opendialog, setdialog] = useState(false);
  const [token, setToken] = useState("");
  const [isadmin, setisadmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      let flag = false;
      getDocs(
        query(collection(db, "user")),
        where("email", "==", user.email)
      ).then((snapshot) => {
        snapshot.forEach((u) => {
          if (u.data().email === user.email) {
            setisadmin(u.data().isadmin);
            flag = u.data().isadmin;
          }
        });
        if (flag === false) {
          navigate("/pagenotfound");
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      user.getIdToken().then((idtoken) => {
        console.log(idtoken);
        setToken(idtoken);
      });
    }
  }, [user]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href =
      "https://firebasestorage.googleapis.com/v0/b/pluton-684e6.appspot.com/o/template.csv?alt=media&token=b04e33b3-2c2c-4540-adaa-da5cb68ae57a";
    link.download = "template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const manageusers = async (parsedData, operation) => {
    if (token) {
      const parsedDataString = encodeURIComponent(JSON.stringify(parsedData));
      console.log(parsedDataString);
      const url = `http://localhost:3001/api/pluton?parsedData=${parsedDataString}`;
      setloading(true);
      await axios
        .get(url, {
          headers: {
            Authorization: token,
            type: operation,
          },
        })
        .then((response) => {
          setOpen(true);
          setmessage(response.data.message);
          setetype(response.data.type);
          setloading(false);
          console.log(
            "response: ",
            response.data.message,
            " ",
            response.data.type
          );
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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

  async function handleParse() {
    setdialog(false);
    if (!isfile) {
      setOpen(true);
      setetype("error");
      setmessage("Please upload a file");
      return;
    }
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      if (add == "Add") {
        parsedData.map(async (d) => {
          const data = Object.values(d);
          if (data[0]) {
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
            await setDoc(docref, payload);
          }
        });
        manageusers(parsedData, "add");
      } else {
        manageusers(parsedData, "remove");
        parsedData.map(async (d) => {
          const data = Object.values(d);
          if (data[0]) {
            const docref = doc(db, "user", data[0]);
            const collref = collection(db, "clubs");
            const collrefpolls = collection(db, "polls");
            const allpolls = await getDocs(collrefpolls);
            const clubs = await getDocs(collref);
            if (clubs) {
              clubs.forEach(async (club) => {
                const docref2 = doc(db, "clubs", club.id, "Members", data[0]);
                try {
                  await deleteDoc(docref2);
                  console.log("user deleted ", data[0]);
                } catch (error) {
                  console.log("User not found in club ", club.data().name);
                }
                try {
                } catch (error) {
                  console.log("Cant delete user ", data[0]);
                }
              });
            }
            if (allpolls) {
              allpolls.forEach(async (poll) => {
                const docref2 = doc(db, "polls", poll.id, "votes", data[0]);
                try {
                  await deleteDoc(docref2);
                  console.log("user deleted poll", data[0]);
                } catch (error) {
                  console.log("cant find vote");
                }
              });
            }
            try {
              await deleteDoc(docref);
            } catch (error) {
              console.log("firebase error");
            }
          }
        });
      }
    };
    reader.readAsText(file);
  }

  return (
    <>
      <div className=" md:ml-[22vw] flex flex-col space-y-5 max-md:w-[78%] text-white  ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl py-8 px-4 shadow-black">
        <div className="text-3xl max-md:text-xl">Manage Users</div>
        <div className="flex space-x-5 self-center text-2xl max-md:text-lg text-slate-200">
          <button
            onClick={() => {
              setadd("Add");
            }}
            className={`px-6 py-4 ${
              add === "Add" ? "border-b" : ""
            } border-slate-200`}
          >
            Add Users
          </button>
          <button
            onClick={() => {
              setadd("Remove");
            }}
            className={`px-6 py-4 ${
              add === "Remove" ? "border-b" : ""
            }  border-slate-200`}
          >
            {" "}
            Remove User
          </button>
        </div>
        <div>
          <div className="mt-10">
            <div className="flex md:space-x-10 gap-y-2 max-sm:flex-col max-sm:items-center max-sm:text-sm text-xl max-md:text-base">
              <div>To {add} users upload the an CSV file in given template</div>
              <div className="self-center">
                <Button
                  onClick={handleDownload}
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
            <div className="my-5 gap-y-5 flex max-md:flex-col gap-x-2 items-center">
              <div className="flex items-center">
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
              </div>
              <div className="flex items-center">
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
                  onClick={() => {
                    setdialog(true);
                  }}
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
          </div>
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
        <div className="flex flex-col space-y-2 items-center">
          <CircularProgress color="inherit" />
          <div>This may take some time...</div>
        </div>
      </Backdrop>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={etype} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog
        open={opendialog}
        PaperProps={{
          style: {
            background: "#1e1936",
            color: "#fff",
            borderRadius: 25,
            padding: "10px",
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(20px)",
          },
        }}
        fullWidth
        maxWidth="sm"
        keepMounted
        onClose={() => {
          setdialog(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{add} users</div>
        </DialogTitle>
        <DialogContent>
          <div className="text-[#e4e2e2] text-lg">
            Are you sure you want to {add} users?
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant=""
            onClick={() => {
              setdialog(false);
            }}
            sx={{ borderRadius: "15px" }}
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: "15px" }}
            onClick={handleParse}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
