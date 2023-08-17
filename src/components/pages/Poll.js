import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { green } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Poll(props) {
  const navigate = useNavigate();
  const [option, setoption] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openmenu = Boolean(anchorEl);
  const [loading, setloading] = useState(false);
  const [votes1, setvotes1] = useState(props.votes1);
  const [votes2, setvotes2] = useState(props.votes2);
  const [votes3, setvotes3] = useState(props.votes3);
  const [votes4, setvotes4] = useState(props.votes4);
  const date = new Date(props.timestamp?.seconds * 1000);
  const options = { hour: "2-digit", minute: "2-digit" };
  const [uploaded, setuploaded] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (props.user) {
      const docref = doc(db, "polls", props.pollid, "votes", props.user);
      getDoc(docref).then((snapshot) => {
        if (snapshot) {
          if (snapshot.data()) {
            setoption(snapshot.data().selected);
          }
        }
        setuploaded(true);
      });
    }
  }, [props.user]);

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
    setloading(true);
    deleteDoc(doc(db, "polls", props.pollid)).then(() => {
      setloading(false);
      navigate(0);
    });
  };

  useEffect(() => {
    if (uploaded) {
      addvote();
    }
  }, [option]);

  async function addvote() {
    const docref = doc(db, "polls", props.pollid, "votes", props.user);
    const payload = {
      selected: option,
    };
    await setDoc(docref, payload);
  }

  const handleoption1 = (e) => {
    if (option === 1) {
      setoption(0);
      setvotes1(votes1 - 1);
    } else {
      if (option === 2) {
        setvotes2(votes2 - 1);
      }
      if (option === 3) {
        setvotes3(votes3 - 1);
      }
      if (option === 4) {
        setvotes4(votes4 - 1);
      }
      setoption(1);
      setvotes1(votes1 + 1);
    }
  };
  const handleoption2 = (e) => {
    if (option === 2) {
      setoption(0);
      setvotes2(votes2 - 1);
    } else {
      if (option === 1) {
        setvotes1(votes1 - 1);
      }
      if (option === 3) {
        setvotes3(votes3 - 1);
      }
      if (option === 4) {
        setvotes4(votes4 - 1);
      }
      setoption(2);
      setvotes2(votes2 + 1);
    }
  };
  const handleoption3 = (e) => {
    if (option === 3) {
      setoption(0);
      setvotes3(votes3 - 1);
    } else {
      if (option === 2) {
        setvotes2(votes2 - 1);
      }
      if (option === 1) {
        setvotes1(votes1 - 1);
      }
      if (option === 4) {
        setvotes4(votes4 - 1);
      }
      setoption(3);
      setvotes3(votes3 + 1);
    }
  };
  const handleoption4 = (e) => {
    if (option === 4) {
      setoption(0);
      setvotes4(votes4 - 1);
    } else {
      if (option === 2) {
        setvotes2(votes2 - 1);
      }
      if (option === 3) {
        setvotes3(votes3 - 1);
      }
      if (option === 1) {
        setvotes1(votes1 - 1);
      }
      setoption(4);
      setvotes4(votes4 + 1);
    }
  };

  return (
    <div>
      <div className="ml-[20vw] max-md:ml-[15vw] my-10">
        <div className=" mx-auto w-[40vw] max-lg:w-[70%] max-md:w-[75vw] h-fit bg-[#130f22] shadow-lg rounded-md max-md:py-4 py-4 px-2 shadow-black text-white">
          <div className="flex px-2 justify-between font-semibold items-center ">
            <Link
              to={`/club/${props.name}`}
              className="flex items-center space-x-5"
            >
              <img
                src={props.ClubImage}
                alt=""
                className=" rounded-[50%] object-cover border-2 border-white h-[2.5vw] w-[2.5vw] min-w-[30px] min-h-[30px]"
              />
              <div className="max-md:text-sm">{props.name}</div>
            </Link>
            {(props.isadmin === true ||
              props.role === "admin" ||
              props.role === "core") && (
              <div>
                <button
                  className="text-slate-200  hover:text-slate-300 px-4"
                  aria-controls={openmenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openmenu ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreHorizIcon className="max-sm:scale-[80%] lg:scale-[130%]" />
                </button>
                <div className="">
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openmenu}
                    onClose={handleClose}
                    sx={{
                      "& .MuiPaper-root": {
                        bgcolor: "#17132b",
                        color: "#fff",
                        margin: 1,
                        borderRadius: 2,
                      },
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setOpen(true);
                      }}
                      sx={{ borderRadius: 2 }}
                    >
                      {" "}
                      <span className="text-red-700 font-semibold">
                        {" "}
                        Delete poll
                      </span>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            )}
          </div>
          <div className="my-3"></div>
          <div className="text-lg max-md:text-sm text-[#dddbdb] ">
            {props.question}
            <div className="flex mt-2 flex-col space-y-2">
              {props.option1 && (
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center  cursor-pointer "
                    onClick={handleoption1}
                  >
                    <Checkbox
                      checked={option === 1}
                      label={props.option1}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={
                        option === 1 ? (
                          <CheckCircleIcon />
                        ) : (
                          <CircleOutlinedIcon />
                        )
                      }
                      checkedIcon={<CheckCircleIcon />}
                      sx={{
                        color: grey[500],
                        "&.Mui-checked": {
                          color: green[400],
                        },
                      }}
                    />{" "}
                    <div className="flex  ">{props.option1}</div>
                  </div>
                  <div className="px-3 max-sm:text-xs text-sm py-1 w-fit ml-5 whitespace-nowrap bg-white bg-opacity-30 rounded-full">
                    {" "}
                    {votes1} votes
                  </div>
                </div>
              )}
              {props.option2 && (
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center  cursor-pointer "
                    onClick={handleoption2}
                  >
                    <Checkbox
                      checked={option === 2}
                      label={props.option2}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={
                        option === 2 ? (
                          <CheckCircleIcon />
                        ) : (
                          <CircleOutlinedIcon />
                        )
                      }
                      checkedIcon={<CheckCircleIcon />}
                      sx={{
                        color: grey[500],
                        "&.Mui-checked": {
                          color: green[400],
                        },
                      }}
                    />{" "}
                    <div className="flex  ">{props.option2}</div>
                  </div>
                  <div className="px-3 ml-5 max-sm:text-xs text-sm py-1 w-fit whitespace-nowrap bg-white bg-opacity-30 rounded-full">
                    {" "}
                    {votes2} votes
                  </div>
                </div>
              )}
              {props.option3 && (
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center  cursor-pointer "
                    onClick={handleoption3}
                  >
                    <Checkbox
                      checked={option === 3}
                      label={props.option3}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={
                        option === 3 ? (
                          <CheckCircleIcon />
                        ) : (
                          <CircleOutlinedIcon />
                        )
                      }
                      checkedIcon={<CheckCircleIcon />}
                      sx={{
                        color: grey[500],
                        "&.Mui-checked": {
                          color: green[400],
                        },
                      }}
                    />{" "}
                    <div className="flex  ">{props.option3}</div>
                  </div>

                  <div className="px-3 max-sm:text-xs text-sm py-1 w-fit ml-5 whitespace-nowrap bg-white bg-opacity-30 rounded-full">
                    {" "}
                    {votes3} votes
                  </div>
                </div>
              )}
              {props.option4 && (
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center cursor-pointer "
                    onClick={handleoption4}
                  >
                    <Checkbox
                      checked={option === 4}
                      label={props.option4}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={
                        option === 4 ? (
                          <CheckCircleIcon />
                        ) : (
                          <CircleOutlinedIcon />
                        )
                      }
                      checkedIcon={<CheckCircleIcon />}
                      sx={{
                        color: grey[500],
                        "&.Mui-checked": {
                          color: green[400],
                        },
                      }}
                    />{" "}
                    <div className="flex  ">{props.option4}</div>
                  </div>
                  <div className="px-3 max-sm:text-xs text-sm py-1 w-fit ml-5 whitespace-nowrap bg-white bg-opacity-30 rounded-full">
                    {" "}
                    {votes4} votes
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mx-2 ">
            <div className="text-md max-md:text-xs py-4  text-[#c5c2c2]">
              {date.toLocaleDateString()}
            </div>
            <div className="text-md max-md:text-xs py-4  text-[#c5c2c2]">
              {date.toLocaleTimeString(undefined, options)}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
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
        onClose={handleNo}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Delete Poll"}</div>
        </DialogTitle>
        <DialogContent>
          <div className="text-[#e4e2e2] text-lg">
            Are you sure you want to delete?
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="" onClick={handleNo} sx={{ borderRadius: "15px" }}>
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: "15px" }}
            onClick={handleYes}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
    </div>
  );
}

export default Poll;
