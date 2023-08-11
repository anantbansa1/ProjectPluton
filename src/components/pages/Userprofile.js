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
import corebadge from "../Images/badge_core.png";
import React, { useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import Zoro from "../Images/zoro.jpg";
import "react-image-crop/dist/ReactCrop.css";
import { doc, updateDoc } from "firebase/firestore";

import Rank1 from "../Images/rank1.png";
import Rank2 from "../Images/rank2.png";
import Rank3 from "../Images/rank3.png";
import Rank4 from "../Images/rank4.png";
import Rank5 from "../Images/rank5.png";
import Rank6 from "../Images/rank6.png";
import Rank7 from "../Images/rank7.png";
import Rank8 from "../Images/rank8.png";
import Rank9 from "../Images/rank9.png";
import Rank10 from "../Images/rank10.png";
import Rank11 from "../Images/rank11.png";
import Rank12 from "../Images/rank12.png";
import Rank13 from "../Images/rank13.png";
import Rank14 from "../Images/rank14.png";
import Rank15 from "../Images/rank15.png";
import Rank16 from "../Images/rank16.png";
import Rank17 from "../Images/rank17.png";
import Rank18 from "../Images/rank18.png";
import Rank19 from "../Images/rank19.png";
import Rank20 from "../Images/rank20.png";
import Rank20p from "../Images/rank20p.png";

import { Leaderboard } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import minion from "../Images/Minions.jpg";
import Tanjiro from "../Images/Tanjiro.jpg";

import { collection, collectionGroup, where, query } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useAuth, upload } from "../../firebase";
import { getDocs } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { onSnapshot } from "firebase/firestore";

function ClubProfile(props) {
  const medal_data = [
    Rank1,
    Rank2,
    Rank3,
    Rank4,
    Rank5,
    Rank6,
    Rank7,
    Rank8,
    Rank9,
    Rank10,
    Rank11,
    Rank12,
    Rank13,
    Rank14,
    Rank15,
    Rank16,
    Rank17,
    Rank18,
    Rank19,
    Rank20,
    Rank20p,
  ];
  // const [prof, setprof] = useState({minion})
  // const [cov, setcov] = useState({Zoro})
  // const currentUser = useAuth();
  // // const [photo, setPhoto] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [photoURL, setPhotoURL] = useState(
  //   "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  // );

  // function handleClick() {
  //   upload(photo, currentUser, setLoading);
  // }

  // useEffect(() => {
  //   if (currentUser?.photoURL) {
  //     setPhotoURL(currentUser.photoURL);
  //   }
  // }, [currentUser]);

  // const q2 = collection(db, path);
  // const [doc2, error] = useCollectionData(query);
  // {doc2.map((doc) )}

  const user = useAuth();
  const [id, setid] = useState();
  async function up() {
    const q = query(collection(db, "user"), where("email", "==", user?.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      querySnapshot.forEach(async (doc) => {
        const docdata = doc.data();
        // console.log(doc.id, " => ", doc.data());
        setname(docdata["name"]);
        setUrl(docdata["profileimage"]);
        setUrl1(docdata["coverimage"]);
        setdes(docdata["desc"]);
        // setcov(docdata["coverimage"])
        // setprof(docdata["profileimage"])

        // console.log(doc.data()['profileimage'])
        console.log(doc.id);
        setid(doc.id);
      });
    }
  }

  const s = collection(db, `user/${id}/medals`);
  const [docs, loadin, error] = useCollectionData(s);
  useEffect(() => {
    if (docs) {
      docs.map((d) => {
        // console.log(d.rank);
      });
    }
  }, [docs]);

  useEffect(() => {
    if (user) {
      up();
    }
  }, [user]);

  const t = collection(db, `user/${id}/medals`);

  const [name, setname] = useState("");
  const [medal, setmedal] = useState(true);
  const [profile, setprofile] = useState(true);
  const [ClubImage, setclubimage] = useState(props.clubimage);
  const [CoverImage, setcoverimage] = useState(props.coverimage);
  const [open, setOpen] = React.useState(false);
  const [openCover, setOpenCover] = React.useState(false);
  const [upImg, setUpImg] = useState(ClubImage);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ aspect: 1, height: 500 });
  const [changeCover, setChangeCover] = useState(false);
  const [upImgCover, setUpImgCover] = useState(CoverImage);
  const imgRefCover = useRef(null);
  const previewCanvasRefCover = useRef(null);
  const [cropCover, setCropCover] = useState({ aspect: 3.8, height: 500 });
  const [completedCropCover, setCompletedCropCover] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [clubs, setclubs] = useState(false);
  const profileinput = React.useRef();
  const Coverinput = React.useRef();
  const [img, setimg] = useState("");
  const [url, setUrl] = useState("");
  const [img1, setimg1] = useState("");
  const [url1, setUrl1] = useState("");
  const [des, setdes] = useState("");

  const image =
    props.clubpoint < props.tbronze
      ? Bronzebadge
      : props.clubpoint <= props.tsilver
      ? Silverbadge
      : Goldbadge;

  // function handleChange(e) {
  //   if (e.target.files[0]) {
  //     setimg(e.target.files[0]);
  //   }
  // }

  // const handleSubmit = () => {
  //   const storage = getStorage();
  //   const imageRef = ref(storage, "images/image.jpg");

  //   const metadata = {
  //     contentType: 'image/jpeg',
  //   };
  //   console.log(typeof(img))
  //   // imageRef.putData(Rank1);
  //   uploadBytesResumable(imageRef, img, metadata)
  //     .then(() => {
  //   getDownloadURL(imageRef)
  //     .then((u) => {
  //       setUrl(u);
  //     })
  //     .catch((error) => {
  //       console.log(error.message, "error getting the image url");
  //     });
  //   setimg(null);
  // })
  // .catch((error) => {
  //   console.log(error.message);
  // });
  // };
  // const docref = doc(db, `user`,id)
  const handleSubmit = (img) => {
    const storage = getStorage();
    const canvas = previewCanvasRef.current;
    canvas.toBlob((blob) => {
      const file = new File([blob], `${user?.email}.png`, {
        type: "image/png",
      });
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          // console.log("Uploaded a blob or file!");
          getDownloadURL(storageRef)
            .then((u) => {
              const docref = doc(db, `user`, id);
              setUrl(u);
              console.log(u);
              // console.log(id);
              updateDoc(docref, { profileimage: u });
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
          setimg(null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, "image/png");
  };

  //Edit Cover Image Backend
  const handleSubmit1 = (img) => {
    const storage = getStorage();
    const canvas = previewCanvasRefCover.current;
    canvas?.toBlob((blob) => {
      const file = new File([blob], `${user?.email}_1.png`, {
        type: "image/png",
      });
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          // console.log("Uploaded a blob or file!");
          getDownloadURL(storageRef)
            .then((u) => {
              const dc = doc(db, "user", id);
              setUrl1(u);
              updateDoc(dc, { coverimage: u });
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
          setimg1(null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, "image/png");
  };

  // getDocs(collectionGroup(db, "badges")).then((querySnapshot) => {
  //   console.log(querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  // });

  async function SaveChanges(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }
    setOpen(false);
    console.log("hahahah");
    if (crop.width && crop.height) {
      canvas.toBlob((blob) => {
        const Imageuse = canvas.toDataURL("image/png");
        setclubimage(Imageuse);
      }, "image/png");
    }
    console.log(url);
    // console.log(upImg);
    // console.log(user);
    // console.log(setLoading);
    // await upload(upImg, user, setLoading);
  }
  function setCanvasImage(image, canvas, crop) {
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

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      console.log("idarbeta");
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

  function SaveChangesCover(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }
    setOpenCover(false);
    console.log("hahahah");
    if (crop.width && crop.height) {
      canvas.toBlob((blob) => {
        const Imageuse = canvas.toDataURL("image/png");
        setcoverimage(Imageuse);
      }, "image/png");
    }
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
      // console.log("idarbeta");
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

  // const badgetype = {     gold: "#fee101",     silver: "#d7d7d7",     bronze: "#a77044",     core: "#00ffff",     none: "-",   };

  // const [badges2, setbadges2] = useState([]);
  // useEffect(() => {
  //   const collectionRef = collection(db, `user/${id}/badges`);
  //   const query2 = query(collectionRef);
  //   // const unsub = onSnapshot(query2, (snapshot) =>
  //   //   setbadges2(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })
  //   console.log(badges2)
  //   return unsub;

  // },[badges2]);

  const collectionRef = collection(db, `user/${id}/badges`);

  const [type2, settype2] = useState();
  const [id2, setid2] = useState();
  useEffect(() => {
    getDocs(collectionRef).then((d) => {
      let type_arr = [];
      let id_arr = [];
      // console.log(d)
      if (d) {
        d.forEach((dd) => {
          const a = dd.data()["type"];
          const b = dd.id;
          // console.log(a);
          type_arr.push(a);
          // console.log(b);
          id_arr.push(b);
        });
      }
      // console.log(type_arr);
      settype2(type_arr);
      // console.log(id_arr);
      setid2(id_arr);
    });
  }, [id]);
  // console.log(id2);
  useEffect(() => {
    // console.log(type2);
    // console.log(id2);
  }, [id2, type2]);

  const badgetype = {
    gold: "#fee101",
    silver: "#d7d7d7",
    bronze: "#a77044",
    core: "#00ffff",
    none: "-",
  };
  console.log(type2);
  return (
    <div className="">
      <Navbar selected="profile"></Navbar>
      <div className=" md:ml-[22vw] ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22] shadow-xl rounded-2xl py-8 px-4 shadow-black">
        <div className="   grid grid-rows-[repeat(8,minmax(30px,auto))] gap-y-2 grid-cols-[repeat(7,minmax(10px,auto))] ">
          <div className="row-start-1 col-start-1 shadow-inner shadow-black row-span-4 max-sm:row-start-1 max-sm:col-start-1  max-sm:row-end-5 col-span-7 ">
            <img
              src={url1}
              key={id}
              alt=""
              className="object-cover cursor-pointer rounded-2xl  max-sm:h-[38vw] h-[20vw] w-full"
              onClick={handleClickOpenCover}
              onMouseOver={(e) => {
                setChangeCover(true);
              }}
              onMouseOut={(e) => {
                setChangeCover(false);
              }}
            />
          </div>
          <button
            onMouseOver={(e) => {
              setChangeCover(true);
            }}
            // onClick={handleClickOpen}
            onClick={handleClickOpenCover}
            onMouseOut={(e) => {
              setChangeCover(false);
            }}
            className={`${
              changeCover ? "" : "hidden"
            } px-4 py-2 shadow-inner shadow-black row-start-1 row-span-4 col-start-1 col-span-7 text-white text-3xl bg-black bg-opacity-10 rounded-md`}
          >
            Edit Cover Photo
          </button>
          <div className="max-sm:mx-auto max-sm:col-start-4 items-center row-span-2 row-start-4  col-start-2 col-span-1 w-fit ">
            <div className=" ">
              <button
                onClick={handleClickOpen}
                onMouseOut={(e) => {
                  setprofile(true);
                }}
                onMouseOver={(e) => {
                  setprofile(false);
                }}
                className="bg-white h-[10vw] w-[10vw] self-center min-w-[80px] min-h-[80px] object-cover rounded-[50%] "
              >
                {profile === false ? (
                  <img
                    src={SirfPencil}
                    alt=""
                    className="object-cover rounded-[50%]"
                  />
                ) : (
                  <img
                    src={url}
                    key={id}
                    alt=""
                    className=" rounded-[50%] object-cover border-2 border-white h-[10vw] w-[10vw] min-w-[80px] min-h-[80px]"
                  />
                )}
              </button>
            </div>
          </div>
          <div className="row-start-6 col-start-1 "></div>
          <div className="row-start-6 col-start-7 "></div>
          <div className="max-sm:col-start-3 max-sm:col-span-3 row-start-6 col-start-2  row-span-1 col-span-2">
            <div className="text-[2.25rem]  max-lg:text-2xl text-center max-sm:text-xl text-white font-semibold mix-blend-difference">
              {" "}
              {name}{" "}
            </div>
          </div>
          <div className="max-sm:col-start-3 row-start-7 col-start-2 row-span-2 col-span-3 max-sm:text-center text-sm md:text-md lg:text-xl  text-[#a5a5a5]">
            {" "}
            {des}
          </div>

          <div className="row-start-6 max-sm:col-start-3 max-sm:col-span-1 max-[375px]:m-0  max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
            <button
              onClick={() => {
                setclubs(true);
              }}
              className={`px-4 lg:py-2 py-[0.65rem] max-sm:mt-2 whitespace-nowrap  lg:text-lg text-xs max-[375px]:px-2  flex items-center bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
            >
              {" "}
              &nbsp; <div>3 Clubs Joined</div>
            </button>
          </div>

          <div className="row-start-6 max-sm:col-start-5 max-sm:col-span-1 max-sm:justify-self-center max-sm:row-start-[9] col-start-6 row-span-1 mx-5 col-span-1 text-center text-white">
            <Link
              to="/leaderboard"
              className="  flex items-center px-4 max-sm:mt-2 whitespace-nowrap lg:text-lg text-xs bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full py-2 text-white text-center"
            >
              <Leaderboard className="scale-[80%]"></Leaderboard>{" "}
              <div>&nbsp;3 Rank</div>
            </Link>
          </div>
          <div className="row-start-6 col-start-7"></div>
        </div>
      </div>

      <div className="max-lg:hidden flex space-x-[3vw] md:ml-[22vw] ml-[18vw] my-[2vw] mr-[2vw] max-md:py-4 py-8 px-4 shadow-black text-white">
        <div className="flex flex-col space-y-8 w-[50vw] max-md:w-[60vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
          <div className="p-4 max-lg:text-lg text-2xl">
            Medals &nbsp;
            <span className="text-green-500 font-semibold">
              {" "}
              {docs?.length}{" "}
            </span>
          </div>
          <div className="flex  justify-start flex-wrap">
            {docs
              ? docs.map((d) => {
                  return (
                    <img
                      src={medal_data[Math.min(20, d.rank - 1)]}
                      alt={Rank20p}
                      className="p-4 w-[150px]"
                    />
                  );
                  // console.log("hello")
                })
              : ""}
            {/* <img src={Rank1} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" />
            <img src={Rank2} alt="" className="p-4 w-[150px]" /> */}
          </div>
        </div>
        <div className="flex max-lg:hidden flex-col w-[20vw] max-md:w-[60vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
          <div className="p-4 max-lg:text-lg text-2xl">
            Badges &nbsp;
            <span className="text-green-500 font-semibold">
              {" "}
              {id2?.length}{" "}
            </span>
          </div>
          <div className="flex max-[1300px]:justify-around flex-wrap">
            <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
            <div>
              <img
                src={ClubImage}
                alt=""
                className="mx-auto border-[5px] border-[#d7d7d7] row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
              </div>
              <div>
              <img
                src={ClubImage}
                alt=""
                className="mx-auto border-[5px] border-[#d7d7d7] row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
              </div>
              <div>
              <img
                src={ClubImage}
                alt=""
                className="mx-auto border-[5px] border-[#d7d7d7] row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
              </div>
              {/* <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
              <img
                src={image}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[100px] sm:w-[100px] w-[70px] h-[70px] object-cover "
              />

              <img
                src={ClubImage}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
              </div>
              <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
              <img
                src={image}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[100px] sm:w-[100px] w-[70px] h-[70px] object-cover "
              />

              <img
                src={ClubImage}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
                </div>
              <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
              <img
                src={image}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[100px] sm:w-[100px] w-[70px] h-[70px] object-cover "
              />

              <img
                src={ClubImage}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              />
              </div>
              <div className="badge grid grid-rows-1 py-2 px-2 items-center grid-cols-1">
              <img
                src={image}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[100px] sm:w-[100px] w-[70px] h-[70px] object-cover "
              />

              <img
                src={ClubImage}
                alt=""
                className="mx-auto row-start-1 col-start-1 sm:h-[65px] sm:w-[65px] h-[45px] w-[45px] rounded-full  object-cover "
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:ml-[22vw] mr-[2vw] mt-8 ml-[18vw]">
        <div className=" lg:hidden flex-col w-[80vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
          <div className="flex space-x-4 justify-center">
            <button
              className={`px-4 py-2 ${medal ? "border-b" : ""} border-white`}
              onClick={(e) => {
                setmedal(true);
              }}
            >
              Medals
            </button>
            <button
              className={`px-4 py-2 ${medal ? "" : "border-b"} border-white`}
              onClick={(e) => {
                setmedal(false);
              }}
            >
              Badges
            </button>
          </div>
          {medal && (
            <div className="flex mt-5 justify-center  flex-wrap">
              <img src={Rank1} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
              <img src={Rank2} alt="" className="p-4 w-[130px]" />
            </div>
          )}
          {!medal && (
            <div className="flex mt-5 justify-center  flex-wrap">
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
              <div className="badge grid grid-rows-1 p-2 items-center grid-cols-1">
                <img
                  src={image}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[120px] w-[120px]  object-cover "
                />

                <img
                  src={ClubImage}
                  alt=""
                  className="mx-auto row-start-1 col-start-1 h-[85px] w-[85px] rounded-full  object-cover "
                />
              </div>
            </div>
          )}
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
                // onChange={() => handleChange()}
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
            onClick={() => {
              SaveChanges(previewCanvasRef.current, completedCrop);
              handleSubmit(url);
            }}
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
                // onChange={() => handleChange()}
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
            onClick={() => {
              SaveChangesCover(
                previewCanvasRefCover.current,
                completedCropCover
              );
              handleSubmit1(url1);
            }}
          >
            save changes{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={clubs}
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
        // TransitionComponent={Transition}
        // fullWidth
        height={50}
        keepMounted
        onClose={() => {
          setclubs(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Clubs Joined"}</div>
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: "auto",
            scrollbarWidth: "none", // Hide the scrollbar for Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
            },
          }}
        >
          {/* <div className="text-[#e4e2e2] text-lg">Are you sure you want to logout?</div> */}
          <div className="flex text-lg max-sm:text-base  scrollbar-hide flex-col space-y-5 ">
            <div className=" flex justify-between">
              <div className="flex items-center space-x-2 ">
                <img
                  src={Tanjiro}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto  h-[50px] w-[50px] rounded-full  object-cover "
                />

                <div className="font-semibold">Music Club</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={Tanjiro}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#FEE101] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>
            <div className=" flex justify-between">
              <div className="flex items-center space-x-2 ">
                <img
                  src={Tanjiro}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto  h-[50px] w-[50px] rounded-full  object-cover "
                />

                <div className="font-semibold">Music Club</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={Tanjiro}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#FEE101] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>
            <div className=" flex justify-between">
              <div className="flex items-center space-x-2 ">
                <img
                  src={CoverImage}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto  h-[50px] w-[50px] rounded-full  object-cover "
                />

                <div className="font-semibold">Sports Club</div>
              </div>
              <div className="grid grid-rows-1 items-center grid-cols-1">
                <img
                  src={CoverImage}
                  alt=""
                  className="row-start-1 col-start-1 mx-auto border-4 border-[#d7d7d7] h-[50px] w-[50px] rounded-full  object-cover "
                />
              </div>
            </div>{" "}
            */
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ClubProfile;
