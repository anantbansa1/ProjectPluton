import React from 'react'
import Navbar from "../Navbar";
import { TextField } from '@mui/material';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { useState, useCallback, useRef, useEffect } from 'react';
import SirfPencil from "../Images/SirfPencil.jpg";
import { db } from "../../firebase";
import { onSnapshot, collection, addDoc, doc, getDoc, updateDoc, setDoc, query, where, getDocs, QuerySnapshot } from 'firebase/firestore';
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import ReactCrop from "react-image-crop";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material"
import Backdrop from "@mui/material/Backdrop";
import anant from "../Images/Anant.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
  palette: {
    type: "dark"
  }
});

const allowedExtensions = ["jpg"];
export default function Addnewclub(props) {
  const [profile, setprofile] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [ClubImage, setclubimage] = useState('https://firebasestorage.googleapis.com/v0/b/pluton-684e6.appspot.com/o/Screenshot%202023-08-14%20at%203.02.08%20PM.png?alt=media&token=dfd92663-aaa6-4068-93b7-1735b1569339');
  const [upImg, setUpImg] = useState(ClubImage);
  // const [imageError, setimageerror] = useState('');
  // const [successMessage, setSuccessMessage] = useState('')
  // const [uploadError, setuploadError] = useState('');
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ aspect: 1, height: 500 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [error, setError] = useState("");
  const [clubName, setclubname] = useState('')
  const [clubDescription, setclubdescription] = useState('')
  const [Presidentrollno, setpresidentrollno] = useState('')
  const profileinput = React.useRef();
  const [Loading, setLoading] = useState(false);
  //const [imageurl, setimageurl] = useState('https://firebasestorage.googleapis.com/v0/b/pluton-684e6.appspot.com/o/Screenshot%202023-08-14%20at%203.02.08%20PM.png?alt=media&token=dfd92663-aaa6-4068-93b7-1735b1569339');
  const [canvasref, setcanvasref] = useState()
  const [etype, setetype] = useState("success");
  const [message, setmessage] = useState("Successfully Added!");
  const [openalert, setopenalert] = useState(false);
  const [imagecheck1, setimagecheck1] = useState(false)
  const [imagecheck2, setimagecheck2] = useState(false)
  const [imagecheck3, setimagecheck3] = useState(false)
  const [clubid, setclubid] = useState(null)

  function setCanvasImage(image, canvas, crop) {
    if (!crop || !canvas || !image) {
      return;
    }
    setimagecheck2(true)
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;
    console.log("here", canvas.width, canvas.height)
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

  const handleNewClub = async () => {
    if (clubName == '' || clubDescription == '' || Presidentrollno == '') {
      setmessage("No field can be empty before adding club")
      setetype("error")
      setopenalert(true)
    }
    else {
      const docRef = doc(db, "user", `${Presidentrollno}`)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        if (clubName.indexOf("%") == -1) {
          const q = query(collection(db, "clubs"), where("lowercasename", "==", `${clubName.toLowerCase()}`));
          const querySnapshot = await getDocs(q);
          console.log(querySnapshot)
          if (querySnapshot.empty) {
            if (imagecheck1 && imagecheck2 && imagecheck3) {
              setLoading(true)
              await addNewclub()
              await makeclubadmin()
              setLoading(false)
              console.log("its done.")
              setmessage("Club added :)")
              setetype("success")
              setopenalert(true)
              setimagecheck1(false)
              setimagecheck2(false)
              setimagecheck3(false)
            }
            else {
              if (!imagecheck1) {
                setmessage("You must upload a picture")
                setetype("error")
                setopenalert(true)
              }
              else {
                setmessage("You must crop correctly and save changes to cropped picture")
                setetype("error")
                setopenalert(true)
              }
            }
          }
          else {
            setmessage("A club with this name already exists!")
            setetype("error")
            setopenalert(true)
          }
        }
        else {
          setmessage("Club Name can not contain '%' ")
          setetype("error")
          setopenalert(true)
        }
      }
      else {
        setmessage("President ID could not be found :/")
        setetype("error")
        setopenalert(true)
      }
      setclubname('')
      setclubdescription('')
      setclubimage('https://firebasestorage.googleapis.com/v0/b/pluton-684e6.appspot.com/o/images%2Fgroup-default-pic.png?alt=media&token=fd5eddbc-91ab-42db-aee1-1fbd89bcc0d8')
      setpresidentrollno('')
      //setimageurl('https://firebasestorage.googleapis.com/v0/b/pluton-684e6.appspot.com/o/images%2Fgroup-default-pic.png?alt=media&token=fd5eddbc-91ab-42db-aee1-1fbd89bcc0d8')
    }
  }

  const makeclubadmin = async () => {
    const docRef = doc(db, "user", `${Presidentrollno}`, "clubs", `${clubName}`)
    await setDoc(docRef, {
      role: "admin"
    })

  }


  const addNewclub = async () => {
    console.log(canvasref)
    const storage = getStorage()
    canvasref.toBlob((blob) => {
      const file = new File([blob], `${clubName}.jpg`, { type: 'image/jpg' });
      const storageRef = ref(storage, `images/${clubName}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("HO GAYA UPLOAD7037432078rywehabhudfnhu3qfbhusdfad")
        const url = getDownloadURL(snapshot.ref).then(url => {
          const collectionRef = collection(db, "clubs")
          const payload = {
            name: clubName,
            active: true,
            desc: clubDescription,
            points: 1000,
            prollno: Presidentrollno,
            silver: 100,
            bronze: 50,
            gold: 100,
            logo: url.toString(),
            coverimage: "https://firebasestorage.googleapis.com/v0/b/pluton-684e6.appspot.com/o/cover.jpg?alt=media&token=4c48d4ed-e7ff-4cac-b3f9-919863e73930",
            lowercasename: clubName.toLowerCase()
          };
          addDoc(collectionRef, payload).then((docref) => {
            const collectionRef = doc(db, "clubs", `${docref.id}`, "members", `${Presidentrollno}`)
            const payload = {
            }
            setDoc(collectionRef, payload)
            console.log("member added")
          }

          )

        })
      })
    }, 'image/jpg')
  }



  function SaveChanges(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }
    setOpen(false);
    if (crop.width && crop.height) {
      canvas.toBlob((blob) => {
        const Imageuse = canvas.toDataURL("image/png");
        setclubimage(Imageuse);
      }, "image/png");
      setimagecheck3(true)
    }
    setcanvasref(previewCanvasRef.current)


  }
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      setimagecheck1(true)
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop);
  }, [completedCrop]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleclose = () => {
    setopenalert(false)
  }


  return (
    <div>
      <Navbar></Navbar>
      <div className="ml-[20vw] max-md:ml-[15vw] mt-10  max-md:content-center">
        <div className="flex justify-center mx-auto w-[60vw] text-center max-md:w-[75vw] h-[80vh] bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white text-2xl">
          <div className="flex flex-col min-lg:items-start max-md:items-center h-[60vh] max-[414px]:h-[40vh]">
            <div className="mx-auto h-[5vh] w-[40vh] min-[375px]:w-[30vh] font-semibold mb-2 max-md:mb-6">
              Add New Club
            </div>
            <div className="flex flex-col h-[40vw] w-[40vw] min-[414px]:h-[10vh] max-md:flex-row min-lg:items-start max-md:justify-center object-fill min-lg:mb-6 max-md:mb-6 ">
              <button
                onClick={handleClickOpen}
                onMouseOut={(e) => {
                  setprofile(true);
                }}
                onMouseOver={(e) => {
                  setprofile(false);
                }}
                className=" h-[5w] w-[5vw] self-start min-w-[80px] min-h-[80px] object-cover rounded-[50%]"
              >
                {profile === false ? (
                  <img
                    src={SirfPencil}
                    alt=""
                    className="object-fit rounded-[50%] border-white h-[5vw] w-[5vw] min-w-[80px] min-h-[80px]"
                  />
                ) : (
                  <img
                    src={ClubImage}
                    alt=""
                    className=" rounded-[50%] object-fit border-2 border-white h-[5vw] w-[5vw] min-w-[80px] min-h-[80px]"
                  />
                )}
              </button>
              <br />
            </div>
            <div className="flex flex-col max-[414px]:justify-center max-[414px]:w-[60vw] h-[65vh] max-[414px]:mt-[25vw] max-[414px]:h-[10vh] mt-[2vw]">
              <div className="max-[375px]:mt-[5vw] mt-[2vw]">
                <ThemeProvider theme={theme}>
                  <TextField
                    onChange={(e) => {
                      setclubname(e.target.value);
                    }} value={clubName}
                    sx={{
                      "& .MuiInputBase-root": {
                        color: '#DFE2E8'
                      },
                      "& .MuiFormLabel-root": {
                        color: '#AEB1B5'
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: '#AEB1B5'
                      },
                      ".MuiInputBase-input": {
                        background: '#0A0813'
                      },
                      ".MuiTextField-root": {
                        background: '#FFFFFF'
                      }
                    }}
                    id="myfilled-name"
                    label="Club Name"
                    variant="filled"
                    color="grey"
                    inputProps={{
                      style: {
                        height: "3vh",
                        width: "55vw",
                      },
                    }}
                  />
                </ThemeProvider>
              </div>
              <div className="max-[375px]:mt-[5vw] mt-[2vw]">
                <ThemeProvider theme={theme}>
                  <TextField
                    onChange={(e) => {
                      setclubdescription(e.target.value);
                    }} value={clubDescription}
                    sx={{
                      "& .MuiInputBase-root": {
                        color: '#DFE2E8'
                      },
                      "& .MuiFormLabel-root": {
                        color: '#AEB1B5'
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: '#AEB1B5'
                      },
                      ".MuiInputBase-input": {
                        background: '#0A0813'
                      },
                      ".MuiTextField-root": {
                        background: '#FFFFFF'
                      }
                    }}
                    id="myfilled-name"
                    label="Club Description"
                    variant="filled"
                    color="grey"
                    inputProps={{
                      style: {
                        height: "3vh",
                        width: "55vw ",
                      },
                    }}

                  />
                </ThemeProvider>
              </div>
              <div className="max-[375px]:mt-[5vw] mt-[2vw]">
                <ThemeProvider theme={theme}>
                  <TextField
                    onChange={(e) => {
                      setpresidentrollno(e.target.value);
                    }} value={Presidentrollno}
                    sx={{
                      "& .MuiInputBase-root": {
                        color: '#DFE2E8'
                      },
                      "& .MuiFormLabel-root": {
                        color: '#AEB1B5'
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: '#AEB1B5'
                      },
                      ".MuiInputBase-input": {
                        background: '#0A0813'
                      },
                      ".MuiTextField-root": {
                        background: '#FFFFFF'
                      }
                    }}
                    id="myfilled-name"
                    label="President Roll No."
                    variant="filled"
                    color="grey"
                    inputProps={{
                      style: {
                        height: "3vh ",
                        width: "55vw "
                      },
                    }}
                  />
                </ThemeProvider>
              </div>
              {/* <button

                className="bg-[#060606]  shadow-xl rounded-lg px-6 py-2 self-center mt-[8vh] text-xl text-[#FFFFFF] hover:bg-opacity-50 ">
                BUTTON
              </button> */}
              <div className='self-center mt-[8vh]'>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    handleNewClub();
                  }}
                  sx={{
                    background: "#0A0815",
                    color: "white",
                    borderColor: "#0A0815",
                    // borderRadius: "15px",
                    "&:hover": {
                      background: "#0A0815",
                      borderColor: "#0A0815",
                      color: "white",
                    },
                  }}
                >
                  SUBMIT
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
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
        <DialogTitle id="alert-dialog-title">
          {"Change Club Picture"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              ruleOfThirds={true}
              circularCrop={true}
              onComplete={(c) => { setCompletedCrop(c); }}
            />
            <div className="flex my-1 justify-between">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  background: "#130f22",
                  "&:hover": { background: "#100d1e" },
                }}
                onClick={() => profileinput.current.click()}
              >
                Upload Image{" "}
              </Button>
              <input
                className=" text-[#5d5d5d] hidden  file:mr-5 file:px-4 file:py-2 file:border-[1px] file:text-xs file:font-medium file:bg-black file:text-white hover:file:cursor-pointer hover:file:bg-black hover:file:text-white"
                type="file"
                accept="image/*"
                ref={profileinput}
                onChange={onSelectFile}
              ></input>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            sx={{ color: 'white', borderColor: '#100d1e', borderRadius: '15px', "&:hover": { borderColor: '#0a0813', color: 'white' } }}
            onClick={handleClose}
          >
            Cancel{" "}
          </Button>

          <div className="hidden">
            <canvas ref={previewCanvasRef} />
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{ background: "#130f22", color: 'white', borderColor: '#100d1e', borderRadius: '15px', "&:hover": { background: "#100d1e", borderColor: '#0a0813', color: 'white' } }}
            onClick={() => SaveChanges(previewCanvasRef.current, completedCrop)}
          >
            save changes{" "}
          </Button>

        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: "blur(20px)", }}
        open={Loading}
        close={Loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={openalert} autoHideDuration={6000} onClose={handleclose}>
        <Alert onClose={handleclose} severity={etype} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
