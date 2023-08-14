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
import Post from "./Post";
import GroupIcon from "@mui/icons-material/Group";
import Poll from "./Poll";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import tanjiro from "../Images/Tanjiro.jpg";
import { Link, useFetcher } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import minion from "../Images/Minions.jpg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CampaignIcon from "@mui/icons-material/Campaign";
import DoneIcon from "@mui/icons-material/Done";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Cancel,
  CheckCircle,
  ManageAccounts,
  MoreVert,
  Settings,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { doc, updateDoc } from "firebase/firestore";
import { collection, collectionGroup, where, query } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useAuth, upload } from "../../firebase";
import { getDocs , getDoc } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { onSnapshot } from "firebase/firestore";
import { type } from "@testing-library/user-event/dist/type";

function ClubProfile(props) {
  const navigate = useNavigate();
  const clubName = useParams().clubID;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const names = ["Anant", "Deepanshu", "Samrath", "Madhav", "Duke"];
  
  const user = useAuth();
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
        //   console.log("user   s", u.data());
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
      } catch (error) {
        console.log("firebase error");
      }
    }
  }
  useEffect(() => {
    checkClub();
  },[user])

// console.log(clubName);


const [final_array, setfinal_array] = useState([]);

  const [menuState, setMenuState] = useState(
    []
  );
  

///////////////////////////////////////////////////////////////////////////////////////////////////////

  const [club_id, setclub_id] = useState();
  async function fetch_data() {
    const q = query(collection(db, "clubs"), where("name", "==", clubName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      querySnapshot.forEach(async (doc) => {
        const docdata = doc.id;
        setclub_id(docdata);
      });
    }
  }
  useEffect(() => {
    fetch_data();
    if(club_id){
        // console.log(club_id);
    }
  },[club_id]);


/////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [member_id, setmembers] = useState();  
  useEffect(() => {
    const collectionref = collection(db,`clubs/${club_id}/Members`);
    let array = [];
    getDocs(collectionref).then((d) =>{
        if(d){
            d.forEach((dd) => {
                array.push(dd.id);
            })
        }
        setmembers(array);
    })
  },[club_id])

  useEffect(() => {
    //  console.log(member_id)
  },[member_id])
  
///////////////////////////////////////////////////////////////////////////////////////////////////////

  const [member_name, setmember_name] = useState();
  useEffect(() => {
    const collectionref2 = collection(db,`user`);
    let array = [];
    getDocs(collectionref2).then((d) => {
        if(d){
            member_id?.forEach((dd) => {
                d.forEach((search) => {
                    if(search.id === dd){
                        array.push(search.data().name);
                    }
                })
            })
        }
        setmember_name(array);
    })
  },[member_id]);

  useEffect(() => {
    // console.log(member_name);
  },[member_name]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [member_points , setmember_points] = useState([]);
  useEffect(() => {
    let memberpoints = [];
    for(let i=0;i<member_name?.length;i++){
      memberpoints.push(0);
    }
    setmember_points(memberpoints);
  },[member_name])

  useEffect(() => {
    // console.log(member_points);
  },[member_name])

//////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [member_role, setmember_role] = useState();
  useEffect(() => {
    let array = [];
    member_id?.forEach((member) => {
        const docRef = doc(db,`user/${member}/clubs/${clubName}`);
        getDoc(docRef).then((d) => {
            array.push(d.data().role);
        })
        
    })
    setmember_role(array);
  },[member_id]); 

  useEffect(() => {
    // console.log(member_role);
  },[member_role]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  useEffect(() => {
    if(member_role && member_id && member_name && member_points){
      let finalarray = [];
      for(let i=0;i<member_points?.length;i++){
        let obj = {
            roll_no: member_id[i],
            name: member_name[i],
            points: member_points[i],
            role: member_role[i],
        }
        finalarray.push(obj);
      }
      setfinal_array(finalarray);
    }
  },[member_role, member_name, member_points, member_id])
  useEffect(() => {
    setMenuState(final_array.map(() => ({ anchorEl: null, open: false })));
    console.log(final_array);
  },[final_array])


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const [points,setpoints] = useState();
useEffect(() => {
    const collectionref5 = collection(db,`clubs`)
    getDocs(collectionref5).then((d) => {
        if(d){
            d.forEach((dd) => {
                if(dd.id === club_id){
                    setpoints(dd.data().points);
                }
            })
        }
    })
},[member_name]);

useEffect(() => {
    console.log(points);
},[points]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function handleRemove(roll_no){

  }
  async function handlePromote(roll_no){

  }



  const handleoption = (event, index) => {
    const newMenuState = [...menuState];
    newMenuState[index] = { anchorEl: event.currentTarget, open: true };
    setMenuState(newMenuState);
  };

  const handleClose = (index) => {
    const newMenuState = [...menuState];
    newMenuState[index] = { anchorEl: null, open: false };
    setMenuState(newMenuState);
  };


  // clubName -> club ka naam
  // club_id -> club ka id

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  return (
    <div className="">
      <Navbar selected="profile"></Navbar>
      <div className=" md:ml-[22vw]  ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl py-8 px-4 shadow-black">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:space-y-8">
          <div className="max-sm:col-start-3 max-sm:col-span-3 row-start-6 col-start-2  row-span-1 col-span-2">
            <div className="text-[2.25rem]  max-lg:text-2xl text-center max-sm:text-lg text-white font-semibold mix-blend-difference">
              {" "}
              {clubName}{" "}
            </div>
          </div>

          <div className="flex">
            <div className="row-start-6 max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-self-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <button
                className={`px-4 py-2 max-sm:mt-2  max-sm:w-[25vw] max-[900px]:w-[15vw] lg:text-lg text-xs text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {points} points left
              </button>
            </div>

            <div className="row-start-6 max-sm:col-start-5 max-sm:col-span-1 max-sm:justify-self-center max-sm:row-start-[9] col-start-6 row-span-1 mx-5 col-span-1 text-center text-white">
              <button className="pr-4 pl-4 max-sm:mt-2 max-sm:w-[30vw] max-[900px]:w-[15vw] lg:text-lg text-xs  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full py-2 text-white text-center">
                {final_array?.length} members
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-3xl my-10 text-slate-100  md:ml-[22vw]  ml-[18vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl max-sm:px-0 py-8 px-4 shadow-black">
        <div className="flex justify-between">
          <div>Members</div>
          <div className="max-sm:hidden">
            <Button
              variant="contained"
              color="primary"
              sx={{
                background: "#15803d",
                color: "white",
                background: "#090811",
                borderColor: "#090811",
                "&:hover": {
                  background: "#090811",
                  borderColor: "#090811",
                  color: "white",
                },
              }}
            >
              save changes{" "}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[35%_55%_10%] max-sm:grid-cols-[35%_35%_30%] gap-y-4  bg-[#130f22]  items-stretch max-sm:px-0 p-4 rounded-lg max-sm:text-base text-lg my-10">
          <div className="row-start-1 bg-[#090811] p-4 col-start-1">Name</div>
          <div className="row-start-1 bg-[#090811] p-4 col-start-2">
            Assign Points
          </div>
          <div className="row-start-1 bg-[#090811] p-4 col-start-3 text-[#130f22b6]">
            <button className="cursor-default">
              <MoreVert />
            </button>
          </div>
          
          {final_array?.map((d, index) => {
            if(menuState.length)
            return (
              <React.Fragment key={index}>
                <div className={`row-start-${index + 2}   p-4 col-start-1`}>
                  {d.name}
                </div>
                <div className={`row-start-${index + 2}  p-4 col-start-2`}>
                  {" "}
                  <TextField
                    label="Points"
                    variant="outlined"
                    color="grey"
                    sx={{
                      "& input::placeholder": {
                        fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                      },
                      "& .MuiInputBase-root": { color: "#DFE2E8" },
                      "& .MuiFormLabel-root": { color: "#AEB1B5" },
                      "& .MuiFormLabel-root.Mui-focused": { color: "#AEB1B5" },
                      ".MuiInputBase-input": { background: "transparent" },
                      ".MuiTextField-root": { background: "transparent" },
                    }}
                    InputProps={{ style: { backgroundColor: "inherit" } }}
                  />{" "}
                </div>
                {/* <div className={`row-start-${index + 2}  p-4 col-start-3`}>
                  {" "}
                  <Button
                    aria-controls={menuState[index].open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuState[index].open ? "true" : undefined}
                    sx={{ color: "#fff", borderRadius: 50 }}
                    onClick={(event) => {
                      handleoption(event, index, d.name);
                    }}
                  >
                    <MoreVert />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    sx={{
                      "& .MuiPaper-root": {
                        bgcolor: "#130f22",
                        color: "#fff",
                        margin: 2,
                      },
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                {    console.log(d.role)}
                    
                    <MenuItem sx={{ padding: 2 }}
                    onClick={() => {
                      handleClose();
                      // handlePromote(d.roll_no);
                    }} 
                    >
                      {d.name}
                    </MenuItem>
                    <MenuItem
                      sx={{ padding: 2, color: "#b91c1c" }}
                      onClick={() => {
                        handleClose();
                        // handleRemove(d.roll_no);
                      }}
                    >
                      Remove
                    </MenuItem>
                  </Menu>{" "}
                </div> */}
                <div className={`row-start-${index + 2}  p-4 col-start-3`}>
              {" "}
              <Button
                aria-controls={menuState[index].open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuState[index].open ? "true" : undefined}
                sx={{ color: "#fff", borderRadius: 50 }}
                onClick={(event) => {
                  handleoption(event, index);
                }}
              >
                <MoreVert />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={menuState[index].anchorEl}
                sx={{
                  "& .MuiPaper-root": {
                    bgcolor: "#130f22",
                    color: "#fff",
                    margin: 2,
                  },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={menuState[index].open}
                onClose={() => handleClose(index)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  sx={{ padding: 2 }}
                  onClick={() => {
                    handleClose(index);
                    // handlePromote(d.roll_no);
                  }}
                >
                  {d.role === "admin" ? "Demote" : "Promote"}
                </MenuItem>
                <MenuItem
                  sx={{ padding: 2, color: "#b91c1c" }}
                  onClick={() => {
                    handleClose(index);
                    // handleRemove(d.roll_no);
                  }}
                >
                  Remove
                </MenuItem>
              </Menu>{" "}
            </div>
              </React.Fragment>
            );
          })}

          <div className="sm:hidden ">
            <Button
              variant="contained"
              color="primary"
              sx={{
                background: "#15803d",
                color: "white",
                background: "#090811",
                borderColor: "#090811",
                "&:hover": {
                  background: "#090811",
                  borderColor: "#090811",
                  color: "white",
                },
              }}
            >
              save changes{" "}
            </Button>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default ClubProfile;
