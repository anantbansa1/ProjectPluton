import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

function Post(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openmenu = Boolean(anchorEl);
  const [loading, setloading] = useState(false);
  const date = new Date(props.timestamp?.seconds * 1000);
  const options = { hour: "2-digit", minute: "2-digit" };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNo = () => {
    setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
    setloading(true);
    const imageRef = ref(storage, props.image);
    deleteObject(imageRef)
      .then(() => {
        deleteDoc(doc(db, "posts", props.postid)).then(() => {
          setloading(false);
          navigate(0);
        });
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div className="ml-[20vw] max-md:ml-[18vw] flex my-10 max-sm:mr-0">
        <div
          className={`flex items-center flex-col mx-auto ${
            props.image !== ""
              ? "w-fit h-fit "
              : "max-sm:w-[100%] max-lg:w-[70%] lg:w-[40vw]   h-fit"
          } max-sm:pb-5 bg-[#130f22] max-lg:w-[70%] max-sm:w-full  shadow-lg rounded-md max-md:py-4 py-4 max-lg:px-0  shadow-black text-white`}
        >
          <div
            className={`flex   flex-col ${
              props.image !== "" ? "items-center" : "items-start"
            } space-y-5 w-full`}
          >
            {props.image !== "" && (
              <div className="  w-[40vw] max-lg:w-[100%] ">
                <div className="flex mb-5 justify-between self-start w-full">
                  <div className="flex px-0 justify-between font-semibold items-center self-start w-[90%]">
                    <Link
                      to={`/club/${props.name}`}
                      className="flex items-center  max-sm:space-x-2 space-x-5"
                    >
                      <img
                        src={props.ClubImage}
                        alt=""
                        className=" rounded-[50%] object-cover border-2 border-white h-[2.5vw] w-[2.5vw] min-w-[30px] min-h-[30px] max-sm:m-2"
                      />
                      <div className="max-md:text-sm ]">{props.name}</div>
                    </Link>
                  </div>
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
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
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
                              Delete post
                            </span>
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  )}
                </div>
                <img
                  src={props.image}
                  className="object-cover h-[100%] w-[100%] max-md:w-[100%]  max-md:h-[100%] rounded-md"
                  alt=""
                />
                <div className="text-lg my-5 max-sm:my-2 max-md:text-sm text-[#dddbdb] ">
                  <div className="px-2">
                    {props.text !== "" && (
                      <span className="font-bold  text-white">
                        {props.name}{" "}
                      </span>
                    )}{" "}
                    <span className="text-justify "> {props.text}</span>
                  </div>
                </div>
              </div>
            )}
            {props.image === "" && (
              <div className="self-start text-lg mt-5 max-md:text-sm  px-2 text-[#dddbdb] w-[100%]">
                <div className="flex mb-5 justify-between self-start w-full">
                  <div className="flex justify-between font-semibold items-center self-start w-[90%]">
                    <Link
                      to={`/club/${props.name}`}
                      className="flex items-center  max-sm:space-x-2 space-x-5"
                    >
                      <img
                        src={props.ClubImage}
                        alt=""
                        className=" rounded-[50%] object-cover border-2 border-white h-[2.5vw] w-[2.5vw] min-w-[30px] min-h-[30px] max-sm:m-2"
                      />
                      <div className="max-md:text-sm ]">{props.name}</div>
                    </Link>
                  </div>
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
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
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
                              Delete post
                            </span>
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  )}
                </div>
                {props.text}
              </div>
            )}
            <div className="flex justify-between w-full px-2">
              <div className="text-md max-md:text-xs  text-[#c5c2c2]">
                {date.toLocaleDateString()}
              </div>
              <div className="text-md max-md:text-xs  text-[#c5c2c2]">
                {date.toLocaleTimeString(undefined, options)}
              </div>
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
          <div className="">{"Delete post"}</div>
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

export default Post;
