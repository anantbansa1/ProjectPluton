import React from "react";
import Navbar from "../Navbar";
import { useState } from "react";
import SirfPencil from "../Images/pencil_black.jpg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";




function ClubProfile(props) {
  const [open, setOpen] = React.useState(false);
  const [profile, setprofile] = useState(true);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const perc_bronze = (((props.clubpoint/props.tbronze)*100).toString()+"%");
  const pb = perc_bronze + "%";
  console.log(pb)

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

        <div className="grid p-10   grid-rows-1 grid-cols-1 row-start-2 col-span-3 justify-center">
          <div className={`row-start-1 ${props.clubpoint<props.tbronze?'':'hidden'} rounded-full col-start-1 bg-[#824a02] z-10 h-[1.5vh] ` } style={{width: (((props.clubpoint/props.tbronze)*100).toString()+"%")}} />
          <div  className={`row-start-1 ${props.clubpoint<props.tbronze?'':'hidden'} rounded-full w-[100%]  col-start-1 bg-[#a77044] h-[1.5vh] `} />
          <div className={`row-start-1 ${props.clubpoint<props.tsilver && props.clubpoint >= props.tbronze?'':'hidden'} rounded-full w-[50%] col-start-1 bg-[#d7d7d7] z-10 h-[1.5vh] `} style={{width: ((((props.clubpoint-props.tbronze)/(props.tsilver-props.tbronze))*100).toString()+"%")}} />
          <div  className={`row-start-1 ${props.clubpoint<props.tsilver && props.clubpoint >= props.tbronze?'':'hidden'} rounded-full w-[100%]  col-start-1 bg-[#a7a7ad] h-[1.5vh] `} />
          <div className={`row-start-1  ${props.clubpoint>=props.tsilver?'':'hidden'}  rounded-full w-[50%] col-start-1  z-10 h-[1.5vh] ` } style={{width: (props.clubpoint>props.tgold)?"100%":((((props.clubpoint-props.tsilver)/(props.tgold-props.tsilver))*100).toString()+"%")}}  />
          <div  className={`row-start-1 ${props.clubpoint>=props.tsilver?'':'hidden'}  rounded-full w-[100%]  col-start-1 bg-[#d6af36] h-[1.5vh]  `} />
          {props.clubpoint}  Pb: {((((props.clubpoint-props.tbronze)/props.tsilver)*100).toString()+"%")
          }
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
