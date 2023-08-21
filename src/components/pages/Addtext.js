import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button, Chip } from "@mui/material";
import { Done } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  query,
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  serverTimestamp,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateDoc,
} from "firebase/storage";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Text() {
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  const [announcement, setannouncement] = useState("");
  const [achievement, setachievement] = useState("");
  const [submit, setsubmit] = useState("");
  const [text, settext] = useState("");
  const [selected, setSelected] = useState(3);
  const navigate = useNavigate();
  const [visibility, setvisibility] = useState("Public");
  const [CoverImage, setcoverimage] = useState(null);
  const [upImgCover, setUpImgCover] = useState(CoverImage);
  const imgRefCover = useRef(null);
  const previewCanvasRefCover = useRef(null);
  const [cropCover, setCropCover] = useState({ aspect: 1, height: 80 });
  const [completedCropCover, setCompletedCropCover] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [changeCover, setChangeCover] = useState(false);
  const [openCover, setOpenCover] = React.useState(false);
  const uploadRef = useRef(null);
  const [canvasupload, setcanvasupload] = useState();
  const [etype, setetype] = useState("error");
  const [message, setmessage] = useState("Please select a photo");
  const [optionno, setoptionno] = useState(2);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openVisibility = Boolean(anchorEl);
  const [polloption1, setpolloption1] = useState("");
  const [polloption2, setpolloption2] = useState("");
  const [polloption3, setpolloption3] = useState("");
  const [polloption4, setpolloption4] = useState("");

  const handleClickVisibility = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseVisibility = (vis) => {
    setvisibility(vis);
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setvisibility(event.target.value);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const Coverinput = useRef(null);

  const user = useAuth();
  const clubName = useParams().clubId;
  const tags = ["achievement", "event", "announcement", ""];

  const handleClick = (index) => {
    if (selected === index) setSelected(3);
    else setSelected(index);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    checkClub();
  }, [user]);

  async function handlepost() {
    if (option === "text") {
      if (text === "") {
        setOpen(true);
        setmessage("Please enter text");
      } else {
        const payload = {
          text: text,
          timestamp: serverTimestamp(),
          visibility: visibility,
          clubname: clubName,
          imageurl: "",
          tag: tags[selected],
        };
        const docref = collection(db, "posts");
        try {
          await addDoc(docref, payload);
          navigate(`/club/${clubName}`);
        } catch (error) {}
      }
    } else if (option === "post") {
      handleSubmit();
    } else if (option === "poll") {
      const collref = collection(db, "polls");
      const payload = {
        clubname: clubName,
        option1: polloption1,
        option2: polloption2,
        option3: polloption3,
        option4: polloption4,
        tag: tags[selected],
        visibility: visibility,
        text: text,
        timestamp: serverTimestamp(),
      };
      try {
        await addDoc(collref, payload);
        navigate(`/club/${clubName}`);
      } catch (error) {}
    }
  }

  async function checkClub() {
    if (user) {
      const email = user.email;
      try {
        const currentclub = await getDocs(
          query(collection(db, "clubs"), where("name", "==", clubName))
        );
        if (!currentclub) {
          navigate("/pagenotfound");
          return;
        }
        const currentuser = await getDocs(
          query(collection(db, "user"), where("email", "==", email))
        );
        currentuser.forEach(async (u) => {
          const id = u.id;
          const getuser = await getDoc(doc(db, "user", id, "clubs", clubName));
          if (getuser) {
            if (getuser.data()) {
              const role = getuser.data().role;

              if (role !== "admin") {
                navigate("/pagenotfound");
              }
            } else {
              navigate("/pagenotfound");
            }
          } else {
            navigate("/pagenotfound");
          }
        });
      } catch (error) {}
    }
  }

  /*********************************** Crop Image Start *****************************************/

  function SaveChangesCover(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }
    setOpenCover(false);
    if (crop.width && crop.height) {
      canvas.toBlob((blob) => {
        const Imageuse = canvas.toDataURL("image/png");
        setcoverimage(Imageuse);
      }, "image/png");
    }
    setcanvasupload(previewCanvasRefCover.current);
  }
  function setCanvasImageCover(image, canvas, crop) {
    if (!crop || !canvas || !image) {
      return;
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }

  const onSelectFileCover = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImgCover(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onLoadCover = useCallback((img) => {
    imgRefCover.current = img;
  }, []);

  useEffect(() => {
    setCanvasImageCover(
      imgRefCover.current,
      previewCanvasRefCover.current,
      completedCropCover
    );
  }, [completedCropCover]);
  const handleClickOpenCover = () => {
    setOpenCover(true);
  };
  const handleCloseCover = () => {
    setOpenCover(false);
  };

  /*********************************** Crop Image End *****************************************/
  const handleSubmit = () => {
    const storage = getStorage();
    const canvas = canvasupload;
    if (canvas) {
      canvas.toBlob((blob) => {
        const time = serverTimestamp();
        const date = new Date(time);
        const file = new File([blob], `${clubName}.png`, {
          type: "image/png",
        });
        const n = file.lastModified.toString();
        const storageRef = ref(storage, `posts/${clubName}${n}.png`);
        uploadBytes(storageRef, file)
          .then((snapshot) => {
            getDownloadURL(storageRef)
              .then((u) => {
                const payload = {
                  text: text,
                  timestamp: serverTimestamp(),
                  visibility: visibility,
                  clubname: clubName,
                  imageurl: u,
                  tag: tags[selected],
                };
                const collref = collection(db, "posts");
                addDoc(collref, payload).then(() => {
                  navigate(`/club/${clubName}`);
                });
              })
              .catch((error) => {});
          })
          .catch((error) => {});
      }, "image/png");
    } else {
      setOpen(true);
      setmessage("Please select a photo");
    }
  };
  return (
    <div className="">
      <div className="flex-col max-md:ml-[20vw] max-md:w-[75vw] ml-[28vw] w-[64vw]">
        <div className="   max-md:text-xl  flex items-center mt-[5vh] text-3xl justify-around">
          <div className="flex-col">
            <button
              onClick={(e) => {
                setoption("text");
              }}
              className={`p-[1vh] px-[3vh] border-white ${
                option === "text" ? "border-b text-white" : "text-slate-300"
              }`}
            >
              Text
            </button>
          </div>
          <div className="flex-col">
            <button
              onClick={(e) => {
                setoption("post");
              }}
              className={`p-[1vh] px-[3vh] border-white ${
                option === "post" ? "border-b text-white" : "text-slate-300"
              }`}
            >
              Image
            </button>
          </div>
          <div className="flex-col">
            <button
              onClick={(e) => {
                setoption("poll");
              }}
              className={`p-[1vh] px-[3vh] border-white ${
                option === "poll" ? "border-b text-white" : "text-slate-300"
              }`}
            >
              Poll
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[50vw] max-sm:w-[75vw] max-lg:w-[65vw] mx-auto">
          {option === "text" && (
            <div className="flex text-center mx-auto bg-[#130f22] w-[100%] justify-center my-10">
              <TextField
                onChange={(e) => {
                  settext(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#DFE2E8",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#AEB1B5",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#AEB1B5",
                  },
                  ".MuiInputBase-input": {
                    background: "#130f22",
                    "&:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0px 1000px #130f22 inset",
                      WebkitTextFillColor: "#AEBAB5",
                    },
                  },
                  ".MuiTextField-root": {
                    background: "#FFFFFF",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#475569 !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#475569 !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
                    borderColor: "#475569 !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline.Mui-focused": {
                    borderColor: "#475569 !important",
                  },
                }}
                multiline
                fullWidth
                rows={8}
                value={text}
                id="myfilled-name"
                label="Add text"
                variant="outlined"
                color="grey"
              />
            </div>
          )}
          {option === "post" && (
            <div className="">
              <div className="flex justify-center align-middle ">
                <div className="flex flex-col items-center  my-10 ">
                  <div className="mb flex flex-col items-center">
                    <div className="shadow-lg mb-5 shadow-black">
                      <div className="grid grid-rows-1 grid-cols-1 ">
                        {CoverImage ? (
                          <img
                            src={CoverImage}
                            alt=""
                            className="object-cover cursor-pointer w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] lg:w-[30vw] lg:h-[30vw] rounded-2xl row-start-1 col-start-1  "
                            onClick={handleClickOpenCover}
                            onMouseOver={(e) => {
                              setChangeCover(true);
                            }}
                            onMouseOut={(e) => {
                              setChangeCover(false);
                            }}
                          />
                        ) : (
                          <div
                            onClick={handleClickOpenCover}
                            className="text-slate-400 text-lg  hover:bg-[#0e0b1a] cursor-pointer  w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] lg:w-[30vw] lg:h-[30vw] rounded-2xl row-start-1 col-start-1 bg-[#130f22] flex justify-center items-center"
                          >
                            <div>Click to add an Image</div>
                          </div>
                        )}

                        <button
                          onMouseOver={(e) => {
                            setChangeCover(true);
                          }}
                          useRef={uploadRef}
                          onClick={handleClickOpenCover}
                          onMouseOut={(e) => {
                            setChangeCover(false);
                          }}
                          className={`${
                            changeCover ? "" : "hidden"
                          } px-4 py-2 shadow-inner  shadow-black z-10  row-start-1  w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] lg:w-[30vw] lg:h-[30vw] col-start-1 text-white text-3xl bg-black bg-opacity-10 rounded-2xl`}
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#130f22] my-5 w-[100%]">
                      <TextField
                        onChange={(e) => {
                          settext(e.target.value);
                        }}
                        sx={{
                          "& .MuiInputBase-root": {
                            color: "#DFE2E8",
                          },
                          "& .MuiFormLabel-root": {
                            color: "#AEB1B5",
                          },
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: "#AEB1B5",
                          },
                          ".MuiInputBase-input": {
                            background: "#130f22",
                            "&:-webkit-autofill": {
                              WebkitBoxShadow: "0 0 0px 1000px #130f22 inset",
                              WebkitTextFillColor: "#AEBAB5",
                            },
                          },
                          ".MuiTextField-root": {
                            background: "#FFFFFF",
                            
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#475569 !important",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#475569 !important",
                          },
                          "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
                            borderColor: "#475569 !important",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline.Mui-focused":
                            {
                              borderColor: "#475569 !important",
                            },
                        }}
                        multiline
                        fullWidth
                        rows={4}
                        value={text}
                        id="myfilled-name"
                        label="Caption (optional)"
                        variant="outlined"
                        color="grey"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {option === "poll" && (
            <div className="flex flex-col ">
              <div className=" bg-none  max-md:text-xl  flex items-center  text-3xl justify-between"></div>
              <div className="ml-[2vw] max-md:ml-[0vw] my-10">
                <div className=" mx-auto w-[50vw] max-md:w-[75vw] h-fit bg-[#130f22]  shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
                  <div className="flex flex-col  space-y-5">
                    <TextField
                      onChange={(e) => settext(e.target.value)}
                      sx={{
                        "& .MuiInputBase-root": {
                          color: "#DFE2E8",
                        },
                        "& .MuiFormLabel-root": {
                          color: "#AEB1B5",
                        },
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: "#AEB1B5",
                        },
                        ".MuiInputBase-input": {
                          background: "#130f22",
                          "&:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0px 1000px #130f22 inset",
                            WebkitTextFillColor: "#AEBAB5",
                          },
                        },
                        ".MuiTextField-root": {
                          background: "#FFFFFF",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#475569 !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#475569 !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
                          borderColor: "#475569 !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline.Mui-focused":
                          {
                            borderColor: "#475569 !important",
                          },
                      }}
                      multiline
                      value={text}
                      rows={4}
                      id="myfilled-name"
                      label="Poll Question"
                      variant="outlined"
                      color="grey"
                      inputProps={{
                        style: {
                          width: "45vw",
                        },
                      }}
                    />
                    <TextField
                      onChange={(e) => {
                        setpolloption1(e.target.value);
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          color: "#DFE2E8",
                        },
                        "& .MuiFormLabel-root": {
                          color: "#AEB1B5",
                        },
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: "#AEB1B5",
                        },
                        ".MuiInputBase-input": {
                          background: "#130f22",
                          "&:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0px 1000px #130f22 inset",
                            WebkitTextFillColor: "#AEBAB5",
                          },
                        },
                        ".MuiTextField-root": {
                          background: "#FFFFFF",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#475569 !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#475569 !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
                          borderColor: "#475569 !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline.Mui-focused":
                          {
                            borderColor: "#475569 !important",
                          },
                      }}
                      value={polloption1}
                      id="myfilled-name"
                      label="Option 1"
                      variant="outlined"
                      color="grey"
                      inputProps={{
                        style: {
                          width: "45vw",
                        },
                      }}
                    />
                    <TextField
                      onChange={(e) => {
                        setpolloption2(e.target.value);
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          color: "#DFE2E8",
                        },
                        "& .MuiFormLabel-root": {
                          color: "#AEB1B5",
                        },
                        "& .MuiFormLabel-root.Mui-focused": {
                          color: "#AEB1B5",
                        },
                        ".MuiInputBase-input": {
                          background: "#130f22",
                          "&:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0px 1000px #130f22 inset",
                            WebkitTextFillColor: "#AEBAB5",
                          },
                        },
                        ".MuiTextField-root": {
                          background: "#FFFFFF",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#475569 !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#475569 !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
                          borderColor: "#475569 !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline.Mui-focused":
                          {
                            borderColor: "#475569 !important",
                          },
                      }}
                      id="myfilled-name"
                      label="Option 2"
                      variant="outlined"
                      color="grey"
                      value={polloption2}
                      inputProps={{
                        style: {
                          width: "45vw",
                        },
                      }}
                    />
                    {optionno >= 3 && (
                      <TextField
                        onChange={(e) => {
                          setpolloption3(e.target.value);
                        }}
                        sx={{
                          "& .MuiInputBase-root": {
                            color: "#DFE2E8",
                          },
                          "& .MuiFormLabel-root": {
                            color: "#AEB1B5",
                          },
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: "#AEB1B5",
                          },
                          ".MuiInputBase-input": {
                            background: "#130f22",
                            "&:-webkit-autofill": {
                              WebkitBoxShadow: "0 0 0px 1000px #130f22 inset",
                              WebkitTextFillColor: "#AEBAB5",
                            },
                          },
                          ".MuiTextField-root": {
                            background: "#FFFFFF",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#475569 !important",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#475569 !important",
                          },
                          "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
                            borderColor: "#475569 !important",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline.Mui-focused":
                            {
                              borderColor: "#475569 !important",
                            },
                        }}
                        id="myfilled-name"
                        label="Option 3"
                        variant="outlined"
                        value={polloption3}
                        color="grey"
                        inputProps={{
                          style: {
                            width: "45vw",
                          },
                        }}
                      />
                    )}
                    {optionno > 3 && (
                      <TextField
                        onChange={(e) => {
                          setpolloption4(e.target.value);
                        }}
                        sx={{
                          "& .MuiInputBase-root": {
                            color: "#DFE2E8",
                          },
                          "& .MuiFormLabel-root": {
                            color: "#AEB1B5",
                          },
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: "#AEB1B5",
                          },
                          ".MuiInputBase-input": {
                            background: "#130f22",
                            "&:-webkit-autofill": {
                              WebkitBoxShadow: "0 0 0px 1000px #130f22 inset",
                              WebkitTextFillColor: "#AEBAB5",
                            },
                          },
                          ".MuiTextField-root": {
                            background: "#FFFFFF",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#475569 !important",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#475569 !important",
                          },
                          "& .MuiOutlinedInput-notchedOutline.Mui-focused": {
                            borderColor: "#475569 !important",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline.Mui-focused":
                            {
                              borderColor: "#475569 !important",
                            },
                        }}
                        id="myfilled-name"
                        label="Option 4"
                        value={polloption4}
                        variant="outlined"
                        color="grey"
                        inputProps={{
                          style: {
                            width: "45vw",
                          },
                        }}
                      />
                    )}

                    <div className="flex ">
                      <div className="w-fit">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            if (optionno < 4) {
                              setoptionno(optionno + 1);
                            }
                          }}
                          sx={{
                            background: "#130f22",
                            color: "white",
                            borderColor: "#100d1e",
                            borderRadius: "15px",
                            "&:hover": {
                              background: "#100d1e",
                              borderColor: "#130f22",
                              color: "white",
                            },
                          }}
                        >
                          Add option{" "}
                        </Button>
                      </div>
                      <div className="w-fit">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            if (optionno > 2) {
                              if (optionno === 3) setpolloption3("");
                              else if (optionno === 4) setpolloption4("");
                              setoptionno(optionno - 1);
                            }
                          }}
                          sx={{
                            background: "#130f22",
                            color: "white",
                            borderColor: "#100d1e",
                            borderRadius: "15px",
                            "&:hover": {
                              background: "#100d1e",
                              borderColor: "#130f22",
                              color: "white",
                            },
                          }}
                        >
                          remove option{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className=" flex max-[1076px]:space-y-3 max-md:text-sm max-[1076px]:flex-col justify-between min-[1076px]:items-center text-black text-xl  ">
            <Chip
              onClick={() => handleClick(0)}
              size="medium"
              icon={
                selected === 0 ? (
                  <Done sx={{ color: "fff !important" }} />
                ) : null
              }
              sx={{
                backgroundColor: selected === 0 ? "#dbdbdb" : "#130f22",
                height: "48px",
                padding: "0 12px",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#dbdbdb",
                },
              }}
              label={
                <div
                  className={`${
                    selected === 0 ? "text-black" : "text-white"
                  } hover:text-black flex items-center space-x-2`}
                >
                  <div className={`${selected === 0 ? "hidden" : ""}`}>
                    <AddIcon />
                  </div>
                  <div>Achievement</div>
                </div>
              }
            />

            <Chip
              onClick={() => handleClick(1)}
              size="medium"
              icon={
                selected === 1 ? (
                  <Done sx={{ color: "fff !important" }} />
                ) : null
              }
              sx={{
                backgroundColor: selected === 1 ? "#dbdbdb" : "#130f22",
                height: "48px",
                padding: "0 12px",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#dbdbdb",
                },
              }}
              label={
                <div
                  className={`${
                    selected === 1 ? "text-black" : "text-white"
                  } hover:text-black flex items-center space-x-2`}
                >
                  <div className={`${selected === 1 ? "hidden" : ""}`}>
                    <AddIcon />
                  </div>
                  <div>Event</div>
                </div>
              }
            />

            <Chip
              onClick={() => handleClick(2)}
              size="medium"
              icon={
                selected === 2 ? (
                  <Done sx={{ color: "fff !important" }} />
                ) : null
              }
              sx={{
                backgroundColor: selected === 2 ? "#dbdbdb" : "#130f22",
                height: "48px",
                padding: "0 12px",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#dbdbdb",
                },
              }}
              label={
                <div
                  className={`${
                    selected === 2 ? "text-black" : "text-white"
                  } hover:text-black flex items-center space-x-2`}
                >
                  <div className={`${selected === 2 ? "hidden" : ""}`}>
                    <AddIcon />
                  </div>
                  <div>Announcement</div>
                </div>
              }
            />
          </div>
          <div className="flex space-x-5 w-[100%] my-10 justify-between">
            <div className="">
              {" "}
              <button
                className="flex justify-center items-center text-slate-300 "
                onClick={handleClickVisibility}
              >
                {" "}
                <div className="ml-3">{visibility}</div>
                <div className="">
                  <KeyboardArrowDownIcon className=""></KeyboardArrowDownIcon>{" "}
                </div>
              </button>
              <div className="">
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openVisibility}
                  onClose={() => handleCloseVisibility(visibility)}
                  sx={{
                    "& .MuiPaper-root": {
                      bgcolor: "#17132b",
                      color: "#fff",
                      margin: 1,
                    },
                  }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => handleCloseVisibility("Public")}
                    sx={{
                      bgcolor: visibility === "Public" ? "#0e0c1b" : "inherit",
                    }}
                  >
                    {" "}
                    Public
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleCloseVisibility("Members")}
                    sx={{
                      bgcolor: visibility === "Members" ? "#0e0c1b" : "inherit",
                    }}
                  >
                    &nbsp;Members
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div className="space-x-5 flex">
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  color: "white",
                  borderColor: "#100d1e",
                  "&:hover": { borderColor: "#0a0813", color: "white" },
                }}
                onClick={() => {
                  navigate(`/club/${clubName}`);
                }}
              >
                Cancel{" "}
              </Button>
              <Button
                onClick={handlepost}
                variant="contained"
                color="primary"
                sx={{
                  background: "#15803d",
                  color: "white",
                  background: "#199245",
                  borderColor: "#199245",
                  "&:hover": {
                    background: "#22c55e",
                    borderColor: "#0a0813",
                    color: "white",
                  },
                }}
              >
                Post{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openCover}
        onClose={handleCloseCover}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
      >
        <DialogTitle id="alert-dialog-title">{"Select Photo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ReactCrop
              src={upImgCover}
              onImageLoaded={onLoadCover}
              crop={cropCover}
              onChange={(c) => setCropCover(c)}
              ruleOfThirds={true}
              onComplete={(c) => setCompletedCropCover(c)}
            />
            <div className="flex my-5 justify-between">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  background: "#130f22",
                  "&:hover": { background: "#100d1e" },
                }}
                onClick={() => Coverinput.current.click()}
              >
                Upload File{" "}
              </Button>
              <input
                className=" text-[#5d5d5d] hidden  file:mr-5 file:px-4 file:py-2 file:border-[1px] file:text-xs file:font-medium file:bg-black file:text-white hover:file:cursor-pointer hover:file:bg-black hover:file:text-white"
                type="file"
                accept="image/*"
                ref={Coverinput}
                onChange={onSelectFileCover}
              ></input>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              color: "white",
              borderColor: "#100d1e",
              borderRadius: "15px",
              "&:hover": { borderColor: "#0a0813", color: "white" },
            }}
            onClick={handleCloseCover}
          >
            Cancel{" "}
          </Button>

          <div className="hidden">
            <canvas ref={previewCanvasRefCover} />
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              background: "#130f22",
              color: "white",
              borderColor: "#100d1e",
              borderRadius: "15px",
              "&:hover": {
                background: "#100d1e",
                borderColor: "#0a0813",
                color: "white",
              },
            }}
            onClick={() =>
              SaveChangesCover(
                previewCanvasRefCover.current,
                completedCropCover
              )
            }
          >
            save changes{" "}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={etype} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
