import React from "react";
import Navbar from "../Navbar";
import { useState } from "react";
import zoro from "../Images/zoro.jpg";
import SirfPencil from "../Images/pencil_black.jpg";
import Rank5 from "../Images/rank5.png";
import Rank1 from "../Images/rank1.png";
import Rank3 from "../Images/rank3.png";
import Rank20p from "../Images/rank20p.png";
import Rank2 from "../Images/rank2.png";
import BadgeSilver from "../Images/badge_silver.png";
import BadgeGolden from "../Images/badge_golden.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { yellow } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import { brown } from "@mui/material/colors";
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { makeStyles } from "@mui/material";
import styled from "styled-components";



function ClubProfile(props) {
  const [open, setOpen] = React.useState(false);
  const [profile, setprofile] = useState(true);
  const [progress, setProgress] = React.useState(0);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <Navbar></Navbar>

      <div className=" grid gap-y-0 gap-x-0 mt-[7vh] max-md:ml-[15vw] ml-[20vw] text-[1.35rem] grid-cols-3 grid-rows-[repeat(2,minmax(20vh,auto))] lg:text-[2rem] text-white">
        <div className="row-span-1 row-start-1 col-start-1 col-span-2 ">
          <div className="flex  items-center space-x-[2vw]">
            <div></div>
            <div></div>
            <button
              onClick={handleClickOpen}
              onMouseOut={(e) => {
                setprofile(true);
              }}
              onMouseOver={(e) => {
                setprofile(false);
              }}
              className="bg-white h-[5vw] w-[5vw] min-w-[100px] min-h-[100px]  rounded-[50%] "
            >
              {profile === false ? (
                <img src={SirfPencil} alt="" className="rounded-[50%]" />
              ) : (
                <img
                  src={props.dp}
                  alt=""
                  className=" rounded-[50%] border border-white h-[5vw] w-[5vw] min-w-[100px] min-h-[100px]"
                />
              )}
            </button>
            <div className="flex flex-col space-y-2">
              <div className="text-[2.25rem] font-semibold"> {props.name} </div>
              <div className="text-lg lg:text-xl text-[#a5a5a5]">
                {" "}
                {props.desc}
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div className="flex row-start-2 col-span-3 justify-center">
          {/* <div></div> */}
          <Box  sx={{ width: "80%", color: brown[700],height:[500] }}>
            <LinearProgress  color="inherit" width="500" variant="determinate" value={30} />
          </Box>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Change Profile Picture"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img
              src={props.dp}
              alt=""
              className="rounded-[50%] w-[20vw] h-[20vw] text-center mx-auto"
            />
            <div className="flex my-5 justify-between">
              <input
                className=" text-[#5d5d5d]
   file:mr-5 file:px-4 file:py-2 file:border-[1px]
   file:text-xs file:font-medium
   file:bg-black file:text-white
   hover:file:cursor-pointer hover:file:bg-black 
   hover:file:text-white"
                type="file"
              ></input>
              {/* <button className="hover:underline"> Change Photo</button> */}
              <button className="hover:underline"> Unset Photo</button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="mx-3 hover:underline px-3 py-2 "
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="mx-3 bg-black text-white px-3 py-2 "
            onClick={handleClose}
            autoFocus
          >
            Save Changes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClubProfile;
