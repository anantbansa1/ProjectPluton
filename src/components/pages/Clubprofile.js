import Navbar from "../Navbar";
import { useState } from "react";
import SirfPencil from "../Images/pencil_black.jpg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Bronzebadge from "../Images/badge_bronze.png";
import Silverbadge from "../Images/badge_silver.png";
import Goldbadge from "../Images/badge_golden.png";
import React, { useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import Zoro from "../Images/zoro.jpg";
import "react-image-crop/dist/ReactCrop.css";
import Post from "./Post";
import Poll from "./Poll";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import tanjiro from "../Images/Tanjiro.jpg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Tooltip from "@mui/material/Tooltip";
import CampaignIcon from "@mui/icons-material/Campaign";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  Cancel,
  CheckCircle,
  ManageAccounts,
  Settings,
} from "@mui/icons-material";
import { useAuth } from "../../firebase";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { uploadBytes, getStorage, getDownloadURL, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutIcon from "@mui/icons-material/Logout";
import { TextField } from "@mui/material";

function ClubProfile(props) {
  const clubName = useParams().clubID;
  const navigate = useNavigate();
  const [profile, setprofile] = useState(true);
  const [ClubImage, setclubimage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/pluton-684e6.appspot.com/o/images%2Fgroup-default-pic.png?alt=media&token=fd5eddbc-91ab-42db-aee1-1fbd89bcc0d8"
  );
  const [CoverImage, setcoverimage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/pluton-684e6.appspot.com/o/cover.jpg?alt=media&token=4c48d4ed-e7ff-4cac-b3f9-919863e73930"
  );
  const [open, setOpen] = React.useState(false);
  const [openCover, setOpenCover] = React.useState(false);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ aspect: 1, height: 500 });
  const [changeCover, setChangeCover] = useState(false);
  const [underline, setUnderline] = useState("post");
  const [upImgCover, setUpImgCover] = useState();
  const imgRefCover = useRef(null);
  const previewCanvasRefCover = useRef(null);
  const [cropCover, setCropCover] = useState({ aspect: 3.8, height: 500 });
  const [completedCropCover, setCompletedCropCover] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [memberdialog, setmemberdialog] = useState(false);
  const [pending, setpending] = useState(false);
  const [deleteclub, setdeleteclub] = useState(false);
  const [currentClub, setCurrentClub] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [userRollNo, setUserRollNo] = useState();
  const [role, setRole] = useState();
  const [points, setPoints] = useState(0);
  const [leavedialog, setleavedialog] = useState(false);
  const profileinput = React.useRef();
  const Coverinput = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openfilter = Boolean(anchorEl);
  const user = useAuth();
  const [members, setmember] = useState([]);
  const [memberscount, setmemberscount] = useState();
  const [memberdetails, setmemberdetails] = useState();
  const [clubId, setClubId] = useState();
  const [application, setapplication] = useState();
  const [posts, setposts] = useState([]);
  const [polls, setpolls] = useState([]);
  const [filterposts, setfilterposts] = useState([]);
  const [filterpolls, setfilterpolls] = useState([]);
  const [selected, setselected] = useState("Filter");
  const [feedCount, setfeedCount] = useState(0);
  const [pollcount, setpollCount] = useState(0);
  const [etype, setetype] = useState("success");
  const [message, setmessage] = useState("Successfully Added!");
  const [openAlert, setOpenAlert] = useState(false);
  const [isadmin, setisadmin] = useState(false);
  const [text, settext] = useState("");
  const [opendesc, setOpendesc] = useState(false);
  const [opendeleteclub, setopendeleteclub] = useState(false);
  const [openenableclub, setopenenableclub] = useState(false);
  const [isactive, setisactive] = useState();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    if (isactive === false && isadmin === false) {
      navigate("/pagenotfound");
    }
  }, [isactive]);
  const badgetype = {
    gold: "#fee101",
    silver: "#d7d7d7",
    bronze: "#a77044",
    core: "#00ffff",
    none: "-",
  };
  const image =
    points < currentClub.bronze
      ? Bronzebadge
      : points < currentClub.silver
      ? Silverbadge
      : Goldbadge;

  const badge =
    points < currentClub.bronze
      ? "bronze"
      : points < currentClub.silver
      ? "silver"
      : "gold";

  const pointleft =
    points < currentClub.bronze
      ? currentClub.bronze - points
      : points < currentClub.silver
      ? currentClub.silver - points
      : currentClub.gold - points;

  const color =
    points < currentClub.bronze
      ? "text-[#824a02]"
      : points <= currentClub.silver
      ? "text-[#d7d7d7]"
      : "text-[#fee101]";

  useEffect(() => {
    fetchClub();
  }, [clubName]);

  useEffect(() => {
    if (user) {
      getUserDetails();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getmembersdetails();
    }
  }, [members]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function getmembersdetails() {
    let details = [];
    members?.forEach(async (mem) => {
      try {
        const docref = doc(db, "user", mem);
        const docref2 = doc(db, "user", mem, "badges", clubName);
        const snapshot = await getDoc(docref);
        const snapshot2 = await getDoc(docref2);
        let memimage, memname, membadge, mememail;
        if (snapshot.data()) {
          memimage = snapshot.data().profileimage;
          memname = snapshot.data().name;
          mememail = snapshot.data().email;
        }
        if (snapshot2) {
          if (snapshot2.data()) {
            membadge = snapshot2.data().type;
          } else {
            membadge = "none";
          }
        }
        details.push({
          memname: memname,
          memimage: memimage,
          membadge: membadge,
          mememail: mememail,
        });
      } catch (error) {}
    });
    setmemberdetails(details);
  }

  const handleNodesc = () => {
    setOpendesc(false);
  };

  const handleYesdesc = () => {
    if (text !== "") {
      setOpendesc(false);
      const docref = doc(db, "clubs", clubId);
      const payload = { desc: text };
      settext("");
      updateDoc(docref, payload).then(() => {
        navigate(0);
      });
    } else {
      setOpenAlert(true);
      setmessage("Description can't be empty ");
      setetype("error");
    }
  };

  const handleNodeleteclub = () => {
    setopendeleteclub(false);
  };
  const handleNoEnableclub = () => {
    setopendeleteclub(false);
  };

  async function handleYesdeleteclub() {
    const docref = doc(db, "clubs", clubId);
    const payload = { active: false };
    await updateDoc(docref, payload);
    setopendeleteclub(false);
    navigate(0);
  }
  async function handleYesenableclub() {
    const docref = doc(db, "clubs", clubId);
    const payload = { active: true };
    await updateDoc(docref, payload);
    setopenenableclub(false);
    navigate(0);
  }

  useEffect(() => {
    if (clubId) {
      let applications = [];
      const colRef = collection(db, "clubs", clubId, "Applications");
      try {
        const unsub = onSnapshot(colRef, async (snapshot) => {
          const changes = snapshot.docChanges();
          for (const change of changes) {
            if (change.type === "added") {
              const usera = await getDoc(doc(db, "user", change.doc.id));
              const d = usera.data();
              applications.push({
                name: d.name,
                rollno: change.doc.id,
                profileimage: d.profileimage,
              });
            } else if (change.type === "removed") {
              applications = applications.filter(
                (application) => application.rollno !== change.doc.id
              );
            }
          }
          setapplication(applications, () => {
            setpending(false);
            setpending(true);
          });
        });
        return () => {
          unsub();
        };
      } catch (error) {}
    }
  }, [clubId]);

  useEffect(() => {
    const fetchMembers = async () => {
      const q = query(collection(db, "clubs"), where("name", "==", clubName));
      const snapshot = await getDocs(q);
      try {
        if (snapshot) {
          snapshot.forEach(async (club) => {
            const clubid = club.id;
            let memberarray = [];
            setClubId(clubid);
            setisactive(club.data().active);
            const colRef = collection(db, "clubs", clubid, "Members");
            const unsub = onSnapshot(colRef, (snapshot) => {
              snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                  memberarray.push(change.doc.id);
                } else if (change.type === "removed") {
                  memberarray = memberarray.filter(
                    (member) => member !== change.doc.id
                  );
                }
              });
              setmember(memberarray);
              setmemberscount(memberarray.length);
            });
            return () => {
              unsub();
            };
          });
        }
      } catch (error) {}
    };
    fetchMembers();
  }, [clubName]);

  useEffect(() => {
    if (clubId) {
      fetchpost();
      fetchpolls();
    }
  }, [clubId]);

  async function fetchpost() {
    const posts = await getDocs(
      query(
        collection(db, "posts"),
        where("clubname", "==", clubName),
        orderBy("timestamp", "desc")
      )
    );
    const postarray = [];
    if (posts) {
      posts.forEach((post) => {
        let data = post.data();
        data.id = post.id;
        postarray.push(data);
      });
      setposts(postarray);
    }
  }

  async function fetchpolls() {
    const pollDocs = await getDocs(
      query(
        collection(db, "polls"),
        where("clubname", "==", clubName),
        orderBy("timestamp", "desc")
      )
    );
    const pollarray = [];
    if (pollDocs) {
      pollDocs.forEach((poll) => {
        let data = poll.data();
        data.id = poll.id;
        pollarray.push(data);
      });
      setpolls(pollarray);
      let temppolls = [];
      Promise.all(
        pollarray.map((poll) => {
          return getDocs(collection(db, "polls", poll.id, "votes"))
            .then((snapshot) => {
              let a = { ...poll };
              a.votes1 = 0;
              a.votes2 = 0;
              a.votes3 = 0;
              a.votes4 = 0;
              snapshot.forEach((p) => {
                const sel = p.data().selected;
                a[`votes${sel}`]++;
              });
              temppolls.push(a);
            })
            .catch((error) => {
              let a = { ...poll };
              a.votes1 = 0;
              a.votes2 = 0;
              a.votes3 = 0;
              a.votes4 = 0;
              temppolls.push(a);
            });
        })
      ).then(() => {
        setpolls(temppolls);
        setfilterpolls(temppolls);
      });
    }
  }
  useEffect(() => {
    const tempposts = posts.filter(
      (post) => selected === "Filter" || post.tag === selected
    );
    const temppolls = polls.filter(
      (poll) => selected === "Filter" || poll.tag === selected
    );
    setfilterposts(tempposts);
    setfilterpolls(temppolls);
  }, [posts, polls, selected]);

  useEffect(() => {
    setfeedCount(0);
    filterposts.map((filterpost) => {
      if (
        isadmin === true ||
        filterpost.visibility === "Public" ||
        role === "admin" ||
        role === "core" ||
        role === "member"
      ) {
        setfeedCount(feedCount + 1);
      }
    });
  }, [filterposts]);

  useEffect(() => {
    setpollCount(0);
    filterpolls.map((filterpoll) => {
      if (
        isadmin === true ||
        filterpoll.visibility === "Public" ||
        role === "admin" ||
        role === "core" ||
        role === "member"
      ) {
        setpollCount(pollcount + 1);
      }
    });
  }, [filterpolls]);

  async function getUserDetails() {
    const q = query(collection(db, "user"), where("email", "==", user.email));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docp) => {
        setUserData(docp.data());
        setisadmin(docp.data().isadmin);
        setUserRollNo(docp.id);
        const docref = doc(db, "user", docp.id, "clubs", clubName);
        const docSnap = await getDoc(docref);
        setLoading(false);
        if (docSnap) {
          if (docSnap.data()) {
            setRole(docSnap.data().role);
            setPoints(docSnap.data().points);
          } else {
            setRole("visitor");
          }
        } else {
          setRole("visitor");
        }
      });
    } catch (error) {}
  }

  async function fetchClub() {
    setLoading(true);
    try {
      const clubs = await getDocs(collection(db, "clubs"));
      if (clubs) {
        let clubnames = [];
        let flag = 0;
        clubs.forEach((element) => {
          const a = element.data()["name"];
          clubnames.push(a);
          if (a === clubName) {
            setCurrentClub(element.data());
            setclubimage(element.data().logo);
            setcoverimage(element.data().coverimage);
            flag = 1;
          }
        });
        if (flag === 0) navigate("/pagenotfound");
      }
    } catch (error) {}
  }
  //////////////////////////////////////////images start////////////////////////////////////////////////////////
  function SaveChanges(canvas, crop) {
    if (!crop || !canvas) {
      setOpenAlert(true);
      setmessage("Please select an image before uploading");
      setetype("error");
      return;
    }
    setOpen(false);
    if (crop.width && crop.height) {
      canvas.toBlob((blob) => {
        const Imageuse = canvas.toDataURL("image/png");
        setclubimage(Imageuse);
      }, "image/png");
      handleSubmit();
    } else {
      setOpenAlert(true);
      setmessage("Please crop the image correctly before uploading");
      setetype("error");
    }
  }

  const handleSubmit = () => {
    const storage = getStorage();
    const canvas = previewCanvasRef.current;
    canvas.toBlob((blob) => {
      const file = new File([blob], `${clubName}.png`, {
        type: "image/png",
      });
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(storageRef)
            .then((u) => {
              const docref = doc(db, `clubs`, clubId);
              updateDoc(docref, { logo: u });
            })
            .catch((error) => {});
        })
        .catch((error) => {});
    }, "image/png");
  };

  function setCanvasImage(image, canvas, crop) {
    if (!crop || !canvas || !image) {
      return;
    } else {
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
  }

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop);
  }, [completedCrop]);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

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
      handleSubmitCover();
    }
  }
  const handleSubmitCover = () => {
    const storage = getStorage();
    const canvas = previewCanvasRefCover.current;
    canvas.toBlob((blob) => {
      const file = new File([blob], `${clubName}_1.png`, {
        type: "image/png",
      });
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(storageRef)
            .then((u) => {
              const docref = doc(db, `clubs`, clubId);
              updateDoc(docref, { coverimage: u });
            })
            .catch((error) => {});
        })
        .catch((error) => {});
    }, "image/png");
  };

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

  //////////////////////////////////////////images end////////////////////////////////////////////////////////
  async function handleapply() {
    const docref = doc(db, "user", userRollNo, "clubs", clubName);
    const payload = { role: "pending", points: 0 };
    try {
      await setDoc(docref, payload);
      const q = query(collection(db, "clubs"), where("name", "==", clubName));
      const docs = await getDocs(q);
      if (docs) {
        docs.forEach(async (ele) => {
          const docrefa = doc(db, "clubs", ele.id, "Applications", userRollNo);
          const payloada = {};
          await setDoc(docrefa, payloada);
        });
      }
      setRole("pending");
      navigate(0);
    } catch (error) {}
  }
  async function handleleave() {
    setleavedialog(true);
  }

  const handleClickfilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosefilter = (s) => {
    if (s === "close") setselected(selected);
    else if (s === selected) setselected("Filter");
    else setselected(s);
    setAnchorEl(null);
  };

  const Leavebox = async () => {
    const docref = doc(db, "user", userRollNo, "clubs", clubName);
    try {
      await deleteDoc(docref);
      const q = query(collection(db, "clubs"), where("name", "==", clubName));
      const docs = await getDocs(q);
      if (docs) {
        docs.forEach(async (ele) => {
          const docrefa = doc(db, "clubs", ele.id, "Members", userRollNo);
          await deleteDoc(docrefa);
        });
      }
      navigate(0);
      setleavedialog(false);
    } catch (error) {}
  };

  return (
    <div className="">
      <div className=" md:ml-[22vw]  ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl py-8 px-4 shadow-black">
        <div className="   grid grid-rows-[repeat(8,minmax(30px,auto))] gap-y-2 grid-cols-[repeat(7,minmax(10px,auto))] ">
          <div className="row-start-1 col-start-1 shadow-inner shadow-black row-span-4 max-sm:row-start-1 max-sm:col-start-1  max-sm:row-end-5 col-span-7 ">
            <img
              src={CoverImage}
              alt=""
              className={`object-cover cursor-pointer rounded-2xl  max-sm:h-[38vw] h-[20vw] w-full ${
                isactive === true ? "" : "grayscale"
              }`}
              onClick={() => {
                if (isadmin === true || role === "admin" || role === "core")
                  handleClickOpenCover();
              }}
              onMouseOver={(e) => {
                setChangeCover(true);
              }}
              onMouseOut={(e) => {
                setChangeCover(false);
              }}
            />
          </div>
          {(isadmin === true || role === "admin" || role === "core") && (
            <button
              onMouseOver={(e) => {
                setChangeCover(true);
              }}
              onClick={handleClickOpenCover}
              onMouseOut={(e) => {
                setChangeCover(false);
              }}
              className={`${
                changeCover ? "" : "hidden"
              } px-4 py-2 shadow-inner shadow-black row-start-1 row-span-4 col-start-1 col-span-7 text-white text-3xl bg-black bg-opacity-10 rounded-md`}
            >
              Edit Cover Image
            </button>
          )}
          <div className="max-sm:mx-auto max-sm:col-start-4 items-center row-span-2 row-start-4  col-start-2 col-span-1 w-fit ">
            <div className=" ">
              <button
                onClick={() => {
                  if (isadmin === true || role === "admin" || role === "core")
                    handleClickOpen();
                }}
                onMouseOut={(e) => {
                  setprofile(true);
                }}
                onMouseOver={(e) => {
                  setprofile(false);
                }}
                className="bg-white h-[10vw] w-[10vw] self-center min-w-[80px] min-h-[80px] object-cover rounded-[50%] "
              >
                {isadmin === true || role === "admin" || role === "core" ? (
                  <>
                    {profile === false ? (
                      <img
                        src={SirfPencil}
                        alt=""
                        className="object-cover rounded-[50%] grayscale"
                      />
                    ) : (
                      <img
                        src={ClubImage}
                        alt=""
                        className={`rounded-[50%] object-cover border-2 border-white h-[10vw] w-[10vw] min-w-[80px] min-h-[80px] ${
                          isactive === true ? "" : "grayscale"
                        }`}
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={ClubImage}
                    alt=""
                    className={`rounded-[50%] object-cover border-2 border-white h-[10vw] w-[10vw] min-w-[80px] min-h-[80px] ${
                      isactive === true ? "" : "grayscale"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="row-start-6 col-start-1 "></div>
          <div className="row-start-6 col-start-7 "></div>
          <div className="max-sm:col-start-3 max-sm:col-span-3 row-start-6 col-start-2  row-span-1 col-span-2">
            <div className="text-[2.25rem]  max-lg:text-2xl max-md:text-center max-sm:text-lg text-white font-semibold mix-blend-difference">
              {" "}
              {currentClub.name}{" "}
            </div>
          </div>
          {isadmin === true || role === "core" || role === "admin" ? (
            <Tooltip>
              <div className="max-sm:col-start-3 sm:w-[50vw] row-start-7 col-start-2 row-span-2 col-span-3 max-sm:text-center text-xs md:text-md lg:text-xl  text-[#a5a5a5]">
                {" "}
                <Tooltip
                  title="Edit description"
                  className="cursor-pointer"
                  onClick={() => {
                    setOpendesc(true);
                  }}
                >
                  {currentClub.desc}
                </Tooltip>
              </div>
            </Tooltip>
          ) : (
            <div className="max-sm:col-start-3 sm:w-[50vw] row-start-7 col-start-2 row-span-2 col-span-3 max-sm:text-center text-xs md:text-md lg:text-xl  text-[#a5a5a5]">
              {" "}
              {currentClub.desc}
            </div>
          )}
          {role === "visitor" && isadmin === false && (
            <div className="row-start-6 max-sm:hidden max-sm:col-start-3  max-sm:col-span-1  max-sm:justify-self-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <button
                onClick={handleapply}
                className={`px-4 py-2 max-sm:mt-2  max-sm:w-[30vw] lg:text-lg text-xs text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {" "}
                Apply
              </button>
            </div>
          )}
          {role === "pending" && isadmin === false && (
            <div className="row-start-6 max-sm:hidden max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <div
                className={`px-4 py-2 max-sm:pr-2  max-sm:mt-2 max-sm:w-[30vw] justify-center lg:text-lg text-xs   flex items-center bg-opacity-10  bg-white rounded-full  text-white`}
              >
                {" "}
                &nbsp; <div>Applied</div> &nbsp;
              </div>
            </div>
          )}
          {role === "member" && isadmin === false && (
            <div className="row-start-6 max-sm:hidden max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <button
                onClick={handleleave}
                className={`px-4 py-2 max-sm:pr-2 max-lg:py-1 max-sm:w-[30vw]  max-sm:mt-2  justify-center lg:text-lg text-xs   flex items-center bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                <div className="h-fit">
                  {" "}
                  <LogoutIcon className="scale-[80%] max-sm:scale-[65%]" />
                </div>
                &nbsp; <div>Leave </div> &nbsp;
              </button>
            </div>
          )}
          {((isadmin === false && role === "admin") || role === "core") && (
            <div className="row-start-6 max-sm:hidden max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <button
                onClick={() => {
                  setpending(true);
                }}
                className={`px-4 py-2 max-sm:hidden  max-sm:mt-2 max-sm:w-[27vw] justify-center lg:text-lg text-xs   flex items-center bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {" "}
                &nbsp; <div>Pending</div> &nbsp;
              </button>
            </div>
          )}

          {isadmin === true && isactive === true && (
            <div className="row-start-6 max-sm:hidden max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <button
                onClick={() => {
                  setopendeleteclub(true);
                }}
                className={`px-4 py-2 max-sm:hidden  max-sm:mt-2 max-sm:w-[27vw] justify-center lg:text-lg text-xs   flex items-center bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {" "}
                &nbsp; <div>Disable club</div> &nbsp;
              </button>
            </div>
          )}
          {isadmin === true && isactive === false && (
            <div className="row-start-6 max-sm:hidden max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <button
                onClick={() => {
                  setopenenableclub(true);
                }}
                className={`px-4 py-2 max-sm:hidden  max-sm:mt-2 max-sm:w-[27vw] justify-center lg:text-lg text-xs   flex items-center bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {" "}
                &nbsp; <div>Enable club</div> &nbsp;
              </button>
            </div>
          )}
          <div
            onClick={() => {
              setmemberdialog(true);
            }}
            className="row-start-6 max-sm:hidden max-sm:col-start-5 max-sm:col-span-1 max-sm:justify-self-center max-sm:row-start-[9] col-start-6 row-span-1 mx-5 col-span-1 text-center text-white"
          >
            <button className="px-4 max-sm:mt-2 max-sm:w-[30vw] whitespace-nowrap lg:text-lg text-xs  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full py-2 text-white text-center">
              {memberscount} members
            </button>
          </div>
          <div className="row-start-6 col-start-7"></div>
        </div>
        <div className="flex sm:hidden space-x-6 mt-5">
          {role === "visitor" && isadmin === false && (
            <div className="  text-center w-full ">
              <button
                onClick={handleapply}
                className={`p-2 h-fit text-xs w-full text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {" "}
                Apply
              </button>
            </div>
          )}
          {role === "pending" && isadmin === false && (
            <div className=" text-center w-full">
              <div
                className={`p-2 h-fit text-xs w-full text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {" "}
                &nbsp; <div>Applied</div> &nbsp;
              </div>
            </div>
          )}
          {role === "member" && isadmin === false && (
            <div className="text-center w-full">
              <button
                onClick={handleleave}
                className={`p-1 h-fit flex justify-center items-center text-xs w-full text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                <div className="h-fit">
                  {" "}
                  <LogoutIcon className="scale-[60%]" />
                </div>
                &nbsp; <div>Leave </div> &nbsp;
              </button>
            </div>
          )}
          {role === "admin" && isadmin === false && (
            <div className=" text-center w-full">
              <button
                onClick={() => {
                  setpending(true);
                }}
                className={`p-2 h-fit text-xs w-full text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                <div>Pending</div>
              </button>
            </div>
          )}
          {isadmin === true && isactive === true && (
            <div className=" text-center w-full">
              <button
                onClick={() => {
                  setopendeleteclub(true);
                }}
                className={`p-2 h-fit text-xs w-full text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                <div>Disable club</div>
              </button>
            </div>
          )}
          {isadmin === true && isactive === false && (
            <div className=" text-center w-full">
              <button
                onClick={() => {
                  setopenenableclub(true);
                }}
                className={`p-2 h-fit text-xs w-full text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                <div>Enable club</div>
              </button>
            </div>
          )}

          <div
            onClick={() => {
              setmemberdialog(true);
            }}
            className=" text-center text-white w-full"
          >
            <button className="whitespace-nowrap p-2 w-full text-xs  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white text-center">
              {memberscount} members
            </button>
          </div>
        </div>
        {isadmin === false && role === "member" ? (
          <div className="flex max-sm:mt-5  items-center ">
            <div className=" grid max-sm:mx-2 mx-10 w-[65vw] gap-0 items-center text-[1.35rem] grid-cols-[repeat(9,minmax(10px,auto))] grid-rows-2 lg:text-[1.5rem] text-white">
              <div
                className={`row-start-2 mt-2 self-start col-start-9 lg:text-xl md:text-sm  text-[0.68rem] text-right ${
                  points >= currentClub.gold ? "hidden" : ""
                } ${color}`}
              >
                {pointleft} points to {badge}
              </div>
              <div
                className={`row-start-2 mt-2 self-start col-start-9 lg:text-xl md:text-sm  text-[0.68rem] text-right ${
                  points >= currentClub.gold ? "" : "hidden"
                } ${color}`}
              >
                {points} points
              </div>
              <div
                className={`row-start-1 ${
                  points < currentClub.bronze ? "" : "hidden"
                } rounded-full  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#824a02] z-10  `}
                style={{
                  width: ((points / currentClub.bronze) * 100).toString() + "%",
                }}
              />
              <div
                className={`row-start-1 ${
                  points < currentClub.bronze ? "" : "hidden"
                } rounded-full w-[100%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#a77044] `}
              />
              <div
                className={`row-start-1 ${
                  points < currentClub.silver && points >= currentClub.bronze
                    ? ""
                    : "hidden"
                } rounded-full w-[50%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#d7d7d7] z-10  `}
                style={{
                  width:
                    (
                      ((points - currentClub.bronze) /
                        (currentClub.silver - currentClub.bronze)) *
                      100
                    ).toString() + "%",
                }}
              />
              <div
                className={`row-start-1 ${
                  points < currentClub.silver && points >= currentClub.bronze
                    ? ""
                    : "hidden"
                } rounded-full w-[100%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#a7a7ad] `}
              />
              <div
                className={`row-start-1  ${
                  points >= currentClub.silver ? "" : "hidden"
                }  rounded-full  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#fee101] z-10  `}
                style={{
                  width:
                    points > currentClub.gold
                      ? "100%"
                      : (
                          ((points - currentClub.silver) /
                            (currentClub.gold - currentClub.silver)) *
                          100
                        ).toString() + "%",
                }}
              />
              <div
                className={`row-start-1 ${
                  points >= currentClub.silver ? "" : "hidden"
                }  rounded-full w-[100%]  py-[1.2vh] row-start-1 col-span-9 justify-center col-start-1 bg-[#d6af36]   `}
              />
            </div>
            <div className="grid grid-rows-1 items-center grid-cols-1">
              <div className="  mx-auto row-start-1  col-start-1 ">
                <img
                  src={image}
                  alt=""
                  className="sm:h-[150px]  h-[70px] object-cover "
                />
              </div>
              <img
                src={ClubImage}
                alt=""
                className="row-start-1 col-start-1 mx-auto sm:h-[100px] sm:w-[100px] h-[50px] w-[50px] rounded-full  object-cover "
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className=" md:ml-[22vw] ml-[18vw] my-[2vw] mr-[2vw] max-md:py-4 py-8 px-4 text-white">
        <div className="flex max-md:text-lg text-3xl items-center justify-between  ">
          {" "}
          <div className=""> </div>
          <div className="flex space-x-[5vw] max-md:space-x-4  ">
            <button
              className={`${
                underline === "post" ? "border-b" : ""
              } border-white py-4  px-8`}
              onClick={(e) => {
                setUnderline("post");
              }}
            >
              Post
            </button>
            <button
              className={`${
                underline === "poll" ? "border-b" : ""
              } border-white py-4  px-8`}
              onClick={(e) => {
                setUnderline("poll");
              }}
            >
              Poll
            </button>
          </div>
          <div className="">
            {" "}
            <button
              className="flex justify-center items-center text-xl "
              onClick={handleClickfilter}
            >
              {" "}
              <FilterAltIcon className="lg:scale-[125%]"></FilterAltIcon>
              <div className="ml-3 max-lg:hidden">
                {(() => {
                  let a =
                    selected.charAt(0).toUpperCase() + selected.slice(1) + "s";
                  return a;
                })()}
              </div>
              <div className="max-lg:hidden">
                <KeyboardArrowDownIcon className="ml-3 scale-[150%]"></KeyboardArrowDownIcon>{" "}
              </div>
            </button>
            <div className="">
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openfilter}
                onClose={() => {
                  handleClosefilter("close");
                }}
                sx={{
                  "& .MuiPaper-root": {
                    bgcolor: "#130f22",
                    color: "#fff",
                    margin: 2,
                  },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  sx={{
                    padding: 2,
                    bgcolor: selected === "achievement" ? "#000" : "inherit",
                  }}
                  onClick={() => {
                    handleClosefilter("achievement");
                  }}
                >
                  {" "}
                  <EmojiEventsIcon /> &nbsp;Achievement
                </MenuItem>
                <MenuItem
                  sx={{
                    padding: 2,
                    bgcolor: selected === "event" ? "#000" : "inherit",
                  }}
                  onClick={() => handleClosefilter("event")}
                >
                  <EventAvailableIcon />
                  &nbsp;Events
                </MenuItem>
                <MenuItem
                  sx={{
                    padding: 2,
                    bgcolor: selected === "announcement" ? "#000" : "inherit",
                  }}
                  onClick={() => handleClosefilter("announcement")}
                >
                  <CampaignIcon />
                  &nbsp;Announcements
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {(role === "admin" || role === "core") && isactive && (
        <div className="ml-[20vw] max-md:ml-[15vw] my-10">
          <div className=" mx-auto w-[40vw] max-md:w-[75vw] h-fit bg-[#130f22] shadow-lg max-lg:w-[70%] max-sm:w-[100%] rounded-md max-md:py-4 py-8 px-4 shadow-black text-white">
            <div className="flex font-semibold items-center space-x-5">
              <img
                src={ClubImage}
                alt=""
                className=" rounded-[50%] object-cover border-2 border-white h-[2.5vw] w-[2.5vw] min-w-[30px] min-h-[30px]"
              />
              <Link
                to={`/add/${clubName}`}
                className="w-[90%] flex items-center cursor-pointer h-[7vh] bg-[#0b0914] ml-5 rounded-3xl text-[#dad6d6] py-5 px-4"
              >
                Add a Post/Poll
              </Link>
            </div>
          </div>
        </div>
      )}

      {underline === "post" && (
        <>
          {filterposts.map((post) => {
            if (
              isadmin === true ||
              post.visibility === "Public" ||
              role === "admin" ||
              role === "core" ||
              role === "member"
            ) {
              return (
                <Post
                  name={post.clubname}
                  ClubImage={ClubImage}
                  image={post.imageurl}
                  text={post.text}
                  visibility={post.visibility}
                  timestamp={post.timestamp}
                  role={role}
                  postid={post.id}
                ></Post>
              );
            }
          })}
          {feedCount == 0 && (
            <div className="text-slate-300 ml-[15vw] md:ml-[20vw] text-center py-5 text-xl max-sm:text-base">
              Hmm... nothing to show here.
            </div>
          )}
        </>
      )}

      {underline === "poll" && (
        <>
          {filterpolls.map((poll) => {
            if (
              isadmin === true ||
              poll.visibility === "Public" ||
              role === "admin" ||
              role === "core" ||
              role === "member"
            ) {
              return (
                <Poll
                  name={poll.clubname}
                  ClubImage={ClubImage}
                  question={poll.text}
                  option1={poll.option1}
                  option2={poll.option2}
                  option3={poll.option3}
                  option4={poll.option4}
                  timestamp={poll.timestamp}
                  votes1={poll.votes1}
                  votes2={poll.votes2}
                  votes3={poll.votes3}
                  votes4={poll.votes4}
                  role={role}
                  user={userRollNo}
                  pollid={poll.id}
                />
              );
            }
          })}
          {pollcount == 0 && (
            <div className="text-slate-300 ml-[15vw] md:ml-[20vw] text-center py-5 text-xl max-sm:text-base">
              Hmm... nothing to show here.
            </div>
          )}
        </>
      )}
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
          {"Change Profile Picture"}
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
              onComplete={(c) => setCompletedCrop(c)}
            />
            <div className="flex my-5 justify-between">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  background: "#130f22",
                  "&:hover": { background: "#100d1e" },
                }}
                onClick={() => profileinput.current.click()}
              >
                Upload File{" "}
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
            sx={{
              color: "white",
              borderColor: "#100d1e",
              borderRadius: "15px",
              "&:hover": { borderColor: "#0a0813", color: "white" },
            }}
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
            onClick={() => SaveChanges(previewCanvasRef.current, completedCrop)}
          >
            save changes{" "}
          </Button>
        </DialogActions>
      </Dialog>
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
        <DialogTitle id="alert-dialog-title">
          {"Change Cover Picture"}
        </DialogTitle>
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
      <Dialog
        open={memberdialog}
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(20px)",
          },
        }}
        PaperProps={{
          sx: {
            background: "#1e1936",
            color: "#fff",
            width: { xs: "100%", md: "75%", lg: "100%" },
            height: { xs: "50%", md: "50%", lg: "50%" },
            borderRadius: 15,
            padding: "15px",
          },
        }}
        height={50}
        keepMounted
        onClose={() => {
          setmemberdialog(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <div>Members</div>
            {isadmin === true || role === "admin" || role === "core" ? (
              <Link
                to={`/manage/${clubName}`}
                className="text-sm text-slate-200 flex items-center cursor-pointer hover:text-slate-300"
              >
                {" "}
                <Settings className="scale-[80%]" /> Manage
              </Link>
            ) : (
              ""
            )}
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <div className="flex text-lg max-sm:text-base  scrollbar-hide flex-col space-y-5 ">
            {memberdetails?.map((element) => {
              return (
                <>
                  <div className="flex text-white justify-between">
                    <Link to={`/user/${element.mememail}`} className="">
                      <div className="flex items-center space-x-2 ">
                        <img
                          src={element.memimage}
                          className="w-[40px] h-[40px] border-2 border-white rounded-full"
                          alt=""
                        />
                        <Tooltip title={element.memname}>
                          <div
                            className={`font-semibold`}
                            style={{ color: badgetype[element.membadge] }}
                          >
                            {element.memname}
                          </div>
                        </Tooltip>
                      </div>
                    </Link>
                    {element.membadge !== "none" && (
                      <div className="grid grid-rows-1 items-center grid-cols-1">
                        <img
                          src={ClubImage}
                          style={{ borderColor: badgetype[element.membadge] }}
                          alt=""
                          className={`row-start-1 col-start-1 mx-auto border-4 h-[50px] w-[50px] rounded-full  object-cover `}
                        />
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={pending}
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(20px)",
          },
        }}
        PaperProps={{
          sx: {
            background: "#1e1936",
            color: "#fff",
            width: { xs: "100%", md: "75%", lg: "100%" },
            height: { xs: "50%", md: "50%", lg: "50%" },
            borderRadius: 15,
            padding: "15px",
          },
        }}
        height={50}
        keepMounted
        onClose={() => {
          setpending(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Pending Applications"}</div>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <div className="flex text-lg max-sm:text-base  scrollbar-hide flex-col space-y-5 ">
            {application?.map((element) => {
              return (
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src={element.profileimage}
                      className="w-[40px] h-[40px] border-2 border-white rounded-full"
                      alt=""
                    />

                    <div className="text-[#d7d7d7] font-semibold">
                      {element.name}
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    <CheckCircle
                      onClick={async (e) => {
                        deleteDoc(
                          doc(
                            db,
                            "clubs",
                            clubId,
                            "Applications",
                            element.rollno
                          )
                        ).then(() => {
                          setDoc(
                            doc(db, "clubs", clubId, "Members", element.rollno),
                            {}
                          ).then(() => {
                            updateDoc(
                              doc(
                                db,
                                "user",
                                element.rollno,
                                "clubs",
                                clubName
                              ),
                              {
                                role: "member",
                              }
                            ).then(() => {});
                          });
                        });
                      }}
                      className="text-green-500 hover:text-green-600 cursor-pointer"
                    ></CheckCircle>
                    <Cancel
                      onClick={async (e) => {
                        deleteDoc(
                          doc(
                            db,
                            "clubs",
                            clubId,
                            "Applications",
                            element.rollno
                          )
                        ).then(() => {
                          updateDoc(
                            doc(db, "user", element.rollno, "clubs", clubName),
                            {
                              role: "visitor",
                            }
                          ).then(() => {});
                        });
                      }}
                      className="text-red-600 hover:text-red-700 cursor-pointer"
                    ></Cancel>
                  </div>
                </div>
              );
            })}

            {application?.length === 0 && (
              <div className="text-slate-400">
                Hmmm... nothing to show here.
              </div>
            )}
          </div>
        </DialogContent>
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
      <Dialog
        open={leavedialog}
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
        onClose={() => setleavedialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Leave Club"}</div>
        </DialogTitle>
        <DialogContent>
          <div className="text-[#e4e2e2] text-lg">
            Are you sure you want to leave club? (All your progress will be
            lost)
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant=""
            onClick={() => setleavedialog(false)}
            sx={{ borderRadius: "15px" }}
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: "15px" }}
            onClick={Leavebox}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={opendesc}
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
        onClose={handleNodesc}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Edit description"}</div>
        </DialogTitle>
        <DialogContent>
          <div className="text-[#e4e2e2] text-lg">
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
                  "&:hover .MuiOutlinedInput-notchedOutline.Mui-focused": {
                    borderColor: "#475569 !important",
                  },
                }}
                multiline
                fullWidth
                rows={4}
                value={text}
                id="myfilled-name"
                label="Description"
                variant="outlined"
                color="grey"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant=""
            onClick={handleNodesc}
            sx={{ borderRadius: "15px" }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: "15px" }}
            onClick={handleYesdesc}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={opendeleteclub}
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
        onClose={handleNodeleteclub}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Are you sure you want to Disable club?"}</div>
        </DialogTitle>
        <DialogContent>
          <div className="text-[#c0bebe] text-lg">
            When a club is Disabled, its status will be changed to inactive,
            resulting in the removal of all associated posts and polls from both
            user and club feeds. This action is reversible and will not impact
            members' points and badges.
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant=""
            onClick={handleNodeleteclub}
            sx={{ borderRadius: "15px" }}
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: "15px" }}
            onClick={handleYesdeleteclub}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openenableclub}
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
        onClose={handleNoEnableclub}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Are you sure you want to Enable club?"}</div>
        </DialogTitle>
        <DialogActions>
          <Button
            variant=""
            onClick={handleNoEnableclub}
            sx={{ borderRadius: "15px" }}
          >
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: "15px" }}
            onClick={handleYesenableclub}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={etype}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default ClubProfile;
