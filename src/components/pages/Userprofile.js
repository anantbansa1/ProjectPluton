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
      <div className="font-montserrat grid gap-y-0 gap-x-0 mt-[7vh] max-md:ml-[15vw] ml-[20vw] text-[1.35rem] grid-cols-4 grid-rows-[repeat(2,minmax(10vh,auto))] max-md:grid-rows-[repeat(3,minmax(14vh,auto))] lg:text-[2rem] text-white">
        <div className=" bg-[#130f22] shadow-xl rounded-2xl col-span-4 col-start-1 row-start-1 row-span-1 py-8 px-4 shadow-black">
          <div className="  row-span-1 row-start-1 col-start-1 col-span-2 my-[2vw] ">
            {/* <div className=""> */}
            <div className="flex  items-center space-x-[2vw] pb-[2vw]">
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
                <div className="flex   lg:whitespace-nowrap md:text-[2.25rem] text-md justify-around  w-full font-semibold">
                  <div className="w-fit ">{props.name} </div>
                </div>

                <div className="flex space-x-[1vh] font-mono ">
                  <div className="text-sm lg:text-lg bg-opacity-30 bg-white w-fit px-3 py-1 rounded-full text-[#c7c6c6]">
                    {" "}
                    {"CSE"}
                  </div>
                  <div className="text-sm lg:text-lg bg-opacity-30 bg-white w-fit px-3 py-1 rounded-full text-[#c7c6c6]">
                    {" "}
                    {props.rollno}
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className=" mx-auto flex   row-start-1 col-start-3 row-span-1 col-span-1 ">
            <div className="    text-md md:text-[1.25rem] text-md  font-semibold">
              {" "}
              {props.joined}
            </div>
            <div className="text-sm lg:text-[1.1rem]  text-slate-300  font-normal mr-5">
              {" "}
              {"  clubs joined "}
            </div>
            <div className="md:text-[1.25rem]  whitespace-nowrap text-md   font-semibold">
              {" "}
              {props.points}
            </div>
          </div>
          <div className="text-sm lg:text-[1.1rem] text-slate-300 max-lg:row-start-2 row-start-1 col-start-4  max-lg:col-start-3 font-normal">
            {"  leaderboard points "}
          </div>
        </div>
          </div>
        </div>

      <div className="font-montserrat grid gap-y-0 gap-x-0 mt-[7vh] max-md:ml-[15vw] ml-[20vw] text-[1.35rem] grid-cols-4 grid-rows-[repeat(2,minmax(10vh,auto))] max-md:grid-rows-[repeat(3,minmax(14vh,auto))] lg:text-[2rem] text-white">

        {/* <div className=" col-span-12">
                  <hr  className="h-1" />
        </div> */}
        <div className="  my-[2vw] mr-[2vw] bg-[#130f22] shadow-xl rounded-2xl px-4 shadow-black row-start-2 col-start-1 max-lg:row-start-3 col-span-3 row-span-1">
          <div className=" grid  max-lg:border-t   items-center gap-y-10 text-center max-md:grid-cols-2 md:grid-cols-4 grid-rows-[repeat(5,minmax(5vh,auto))] max-md:grid-rows-[repeat(9,minmax(5vh,auto))]   ">
            <div className="row-span-1 col-span-4 max-md::col-span-2 font-semibold">
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
        </div>
        <div className=" my-[2vw] mr-[2vw] row-start-2 max-lg:row-start-3 col-start-4  bg-[#130f22] shadow-xl rounded-2xl py-8 px-4 shadow-black">
          <div className="p-2 items-center   text-center grid grid-rows-[repeat(5,minmax(5vh,auto))] gap-3 grid-cols-1">
            <div className="mt-[1vw] font-semibold"> Badges </div>
            <div className="row-span-1 col-span-1">
              <img
                className="h-[20vh]    mx-auto text-center"
                src={BadgeSilver}
                alt=""
              />
            </div>
            <div className="row-span-1 col-span-1">
              <img
                className="h-[20vh] ] mx-auto text-center"
                src={BadgeGolden}
                alt=""
              />
            </div>
            <div className="row-span-1 col-span-1">
              <img
                className="h-[20vh]  mx-auto text-center"
                src={BadgeSilver}
                alt=""
              />
            </div>
            <div className="row-span-1 col-span-1">
              <img
                className="h-[20vh]  mx-auto text-center"
                src={BadgeGolden}
                alt=""
              />
            </div>
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
