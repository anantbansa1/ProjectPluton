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
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import minion from "../Images/Minions.jpg"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CampaignIcon from '@mui/icons-material/Campaign';
import DoneIcon from '@mui/icons-material/Done';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Cancel, CheckCircle, ManageAccounts, MoreVert, Settings } from "@mui/icons-material";


import { doc, updateDoc } from "firebase/firestore";
import { collection, collectionGroup, where, query } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useAuth, upload } from "../../firebase";
import { getDocs } from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { onSnapshot } from "firebase/firestore";
import { type } from "@testing-library/user-event/dist/type";


function ClubProfile(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const names = ["Anant", "Deepanshu", "Samrath", "Madhav", "Duke"];
    function handleoption(event, index, name) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }


    return (
        <div className="">
            <Navbar selected="profile"></Navbar>
            <div className=" md:ml-[22vw]  ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl py-8 px-4 shadow-black">
                <div className="flex items-center justify-between max-sm:flex-col max-sm:space-y-8">

                    <div className="max-sm:col-start-3 max-sm:col-span-3 row-start-6 col-start-2  row-span-1 col-span-2">
                        <div className="text-[2.25rem]  max-lg:text-2xl text-center max-sm:text-lg text-white font-semibold mix-blend-difference">
                            {" "}
                            {props.name}{" "}
                        </div>
                    </div>

                    <div className="flex">
                        <div className="row-start-6 max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-self-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
                            <button
                                className={`px-4 py-2 max-sm:mt-2  max-sm:w-[25vw] max-[900px]:w-[15vw] lg:text-lg text-xs text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
                            >

                                500 points left
                            </button>
                        </div>

                        <div
                            className="row-start-6 max-sm:col-start-5 max-sm:col-span-1 max-sm:justify-self-center max-sm:row-start-[9] col-start-6 row-span-1 mx-5 col-span-1 text-center text-white"
                        >
                            <button className="pr-4 pl-4 max-sm:mt-2 max-sm:w-[30vw] max-[900px]:w-[15vw] lg:text-lg text-xs  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full py-2 text-white text-center">
                                57 members
                            </button>
                        </div>
                    </div>
                </div>


            </div>
            <div className="flex flex-col text-3xl my-10 text-slate-100  md:ml-[22vw]  ml-[18vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl max-sm:px-0 py-8 px-4 shadow-black">
                <div className="flex justify-between">
                    <div>
                        Members
                    </div>
                    <div className="max-sm:hidden">
                        <Button

                            variant="contained"
                            color="primary"
                            sx={{ background: "#15803d", color: 'white', background: "#090811", borderColor: '#090811', "&:hover": { background: "#090811", borderColor: '#090811', color: 'white' } }}

                        >
                            save changes{" "}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-[35%_55%_10%] max-sm:grid-cols-[35%_35%_30%] gap-y-4  bg-[#130f22]  items-stretch max-sm:px-0 p-4 rounded-lg max-sm:text-base text-lg my-10">
                    <div className="row-start-1 bg-[#090811] p-4 col-start-1">Name</div>
                    <div className="row-start-1 bg-[#090811] p-4 col-start-2">Assign Points</div>
                    <div className="row-start-1 bg-[#090811] p-4 col-start-3 text-[#130f22b6]"><button className="cursor-default"><MoreVert /></button></div>


                    {/* <div className="row-start-2 p-4 col-start-1">Anant Bansal</div>
                        <div className="row-start-2 p-4 col-start-2"> <TextField sx={{ "& .MuiInputBase-root": { color: '#DFE2E8' }, "& .MuiFormLabel-root": { color: '#AEB1B5' }, "& .MuiFormLabel-root.Mui-focused": { color: '#AEB1B5' }, ".MuiInputBase-input": { background: '#0A0813' }, ".MuiTextField-root": { background: '#FFFFFF' } }} id="myfilled-name" label="Assign Points" variant="filled" color="grey" /> </div>
                        <div className="row-start-2 p-4 col-start-3"> <Button sx={{ color: '#fff', borderRadius: 50 }}><MoreVert /></Button> </div> */}

                    {names.map((name, index) => {
                        return (<React.Fragment key={index}>
                            <div className={`row-start-${index + 2}   p-4 col-start-1`}>{name}</div>
                            <div className={`row-start-${index + 2}  p-4 col-start-2`}> <TextField label="Points" variant="outlined" color="grey" sx={{ '& input::placeholder': {fontSize: {xs: '0.75rem',sm: '0.875rem',md: '1rem',},},"& .MuiInputBase-root": { color: '#DFE2E8' }, "& .MuiFormLabel-root": { color: '#AEB1B5' }, "& .MuiFormLabel-root.Mui-focused": { color: '#AEB1B5' }, ".MuiInputBase-input": { background: 'transparent' }, ".MuiTextField-root": { background: 'transparent' } }} InputProps={{ style: { backgroundColor: 'inherit', }, }} /> </div>
                            <div className={`row-start-${index + 2}  p-4 col-start-3`}> <Button aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined} sx={{ color: '#fff', borderRadius: 50,  }} onClick={(event) => { handleoption(event, index, name) }}><MoreVert /></Button><Menu
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
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem sx={{ padding: 2 }} onClick={handleClose}>Promote</MenuItem>
                                    <MenuItem sx={{ padding: 2, color: '#b91c1c' }} onClick={handleClose}>Remove</MenuItem>
                                </Menu> </div>
                        </React.Fragment>)
                    })}

                    <div className="sm:hidden ">
                        <Button

                            variant="contained"
                            color="primary"
                            sx={{ background: "#15803d", color: 'white', background: "#090811", borderColor: '#090811', "&:hover": { background: "#090811", borderColor: '#090811', color: 'white' } }}

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