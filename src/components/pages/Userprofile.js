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

function Userprofile(props) {
  const [open, setOpen] = React.useState(false);
  const [profile, setprofile] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <Navbar></Navbar>

      <div className=" grid gap-y-0 gap-x-0 mt-[7vh] max-[768px]:ml-[15vw] ml-[20vw] text-[1.35rem] grid-cols-4 grid-rows-[repeat(2,minmax(20vh,auto))] lg:text-[2rem] text-white">
        <div className="row-span-1 row-start-1 col-start-1 col-span-4 border-b border-b-white">
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
              <div className="md:text-[2.25rem] text-lg font-semibold"> {props.name} </div>
              <div className="text-sm lg:text-xl  text-[#a5a5a5]">
                {" "}
                {props.rollno}
              </div>
            </div>
          </div>
        </div>
        {/* <div className=" col-span-12">
                  <hr  className="h-1" />
        </div> */}
        <div className="p-2 grid border-r row-start-2 col-start-1  border-white items-center gap-0 text-center max-[768px]:grid-cols-2 md:grid-cols-4 grid-rows-[repeat(5,minmax(5vh,auto))] max-[768px]:grid-rows-[repeat(9,minmax(5vh,auto))] col-span-3 row-span-1  ">
          <div className="row-span-1 col-span-4 max-[768mx]:col-span-2 font-semibold">
            Medals
          </div>
          <div className="col-span-1 row-span-1 max-md:row-start-2">
            <img
              className="lg:h-[20vh] h-[20vw] mx-auto text-center"
              src={Rank1}
              alt=""
            />{" "}
          </div>
          <div className="lg:text-xl text-sm  p-1 row-span-1 col-span-1 row-start-3 text-[#c0bebe] max-md:row-start-3">
            Spring 2023
          </div>{" "}
          <div className="col-span-1 row-span-1 max-md:row-start-2">
            <img
              className="lg:h-[20vh] h-[20vw]  mx-auto text-center"
              src={Rank20p}
              alt=""
            />
          </div>
          <div className="lg:text-xl text-xs  p-1 row-span-1 col-span-1 row-start-3 text-[#c0bebe] max-md:row-start-3">
            Autumn 2022
          </div>{" "}
          <div className="col-span-1 row-span-1 max-md:row-start-4">
            <img
              className="lg:h-[20vh] h-[20vw]  mx-auto text-center"
              src={Rank3}
              alt=""
            />
          </div>
          <div className="lg:text-xl text-sm  p-1 row-span-1 col-span-1 row-start-3 max-md:row-start-5 text-[#c0bebe]">
            Spring 2022
          </div>{" "}
          <div className="col-span-1 row-span-1 max-md:row-start-4">
            <img
              className="lg:h-[20vh] h-[20vw]  mx-auto text-center"
              src={Rank5}
              alt=""
            />
          </div>
          <div className="lg:text-xl text-xs  p-1 row-span-1 row-start-3 max-md:row-start-5 col-span-1 text-[#c0bebe]">
            Autumn 2021
          </div>{" "}
          <div className="col-span-1 row-span-1 max-md:row-start-6">
            <img
              className="lg:h-[20vh] h-[20vw]  mx-auto text-center"
              src={Rank2}
              alt=""
            />
          </div>
          <div className="lg:text-xl text-sm  p-1 row-span-1 col-span-1  row-start-5 max-md:row-start-7 text-[#c0bebe]">
            Spring 2021
          </div>{" "}
          <div className="col-span-1 row-span-1 max-md:row-start-6">
            <img
              className="lg:h-[20vh] h-[20vw]  mx-auto text-center"
              src={Rank2}
              alt=""
            />
          </div>
          <div className="lg:text-xl text-sm  p-1 row-span-1 col-span-1  row-start-5 max-md:row-start-7 text-[#c0bebe]">
            Spring 2021
          </div>{" "}
          <div className="col-span-1 row-span-1 max-md:row-start-[8] ">
            <img
              className="lg:h-[20vh] h-[20vw]  mx-auto text-center"
              src={Rank2}
              alt=""
            />
          </div>
          <div className="lg:text-xl text-sm  p-1 row-span-1 col-span-1  row-start-5 max-md:row-start-[9] text-[#c0bebe]">
            Spring 2021
          </div>{" "}
          <div className="col-span-1 row-span-1 max-md:row-start-[8]">
            <img
              className="lg:h-[20vh] h-[20vw]  mx-auto text-center"
              src={Rank2}
              alt=""
            />
          </div>
          <div className="lg:text-xl text-sm  p-1 row-span-1 col-span-1  row-start-5 max-md:row-start-[9] text-[#c0bebe]">
            Spring 2021
          </div>{" "}
        </div>
        <div className="p-2 items-center row-start-2 col-start-4 text-center grid grid-rows-[repeat(5,minmax(5vh,auto))] gap-3 grid-cols-1">
          <div className="mt-3 font-semibold"> Badges </div>
          <div className="row-span-1 col-span-1">
            <img
              className="h-[20vw] lg:h-[20vh] mx-auto text-center"
              src={BadgeSilver}
              alt=""
            />
          </div>
          <div className="row-span-1 col-span-1">
            <img
              className="h-[20vw] lg:h-[20vh] mx-auto text-center"
              src={BadgeGolden}
              alt=""
            />
          </div>
          <div className="row-span-1 col-span-1">
            <img
              className="h-[20vw] lg:h-[20vh] mx-auto text-center"
              src={BadgeSilver}
              alt=""
            />
          </div>
          <div className="row-span-1 col-span-1">
            <img
              className="h-[20vw] lg:h-[20vh] mx-auto text-center"
              src={BadgeGolden}
              alt=""
            />
          </div>
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

export default Userprofile;
