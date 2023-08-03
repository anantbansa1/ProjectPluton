import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { green } from "@mui/material/colors";
import { grey } from "@mui/material/colors";

function Poll(props) {
  const [option1, setoption1] = useState(false);
  const [option2, setoption2] = useState(false);
  const [option3, setoption3] = useState(false);
  const [option4, setoption4] = useState(false);
  
  const [open, setOpen] = useState(false);

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
  };

  const handleoption1 = (e) => {
    setoption1(!option1);
    console.log("topion1");
    setoption2(false);
    setoption3(false);
    setoption4(false);
  };
  const handleoption2 = (e) => {
    setoption2(!option2);
    setoption1(false);
    setoption3(false);
    setoption4(false);
  };
  const handleoption3 = (e) => {
    setoption3(!option3);
    setoption2(false);
    setoption1(false);
    setoption4(false);
  };
  const handleoption4 = (e) => {
    setoption4(!option4);
    setoption2(false);
    setoption3(false);
    setoption1(false);
  };

  return (
    <div>
      <div className="ml-[20vw] max-md:ml-[15vw] my-10">
        <div className=" mx-auto w-[50vw] max-md:w-[75vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
        <div className="flex justify-between font-semibold items-center ">
            <div className="flex items-center space-x-5">
              <img
                src={props.ClubImage}
                alt=""
                className=" rounded-[50%] object-cover border-2 border-white h-[2.5vw] w-[2.5vw] min-w-[30px] min-h-[30px]"
              />
              <div className="max-md:text-sm">{props.name}</div>
            </div>
            <div className="text-[#962a28] cursor-pointer hover:text-[#c43836] px-4" onClick={()=>{setOpen(true)}}><DeleteIcon className="scale-[130%]" /></div>
          </div>
          <div className="my-3"></div>
          <div className="text-lg max-md:text-sm text-[#dddbdb] ">
            <span className="font-bold  text-white">{props.name}</span>{" "}
            {props.question}
            <div className="flex mt-2 flex-col space-y-2">
              {props.option1 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      checked={option1}
                      onChange={handleoption1}
                      label={props.option1}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={<CheckCircleIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      sx={{
                        color: grey[500],
                        "&.Mui-checked": {
                          color: green[400],
                        },
                      }}
                    />{" "}
                    <div className="flex">{props.option1}</div>
                  </div>
                  <div className="px-3 text-sm py-1 bg-white bg-opacity-30 rounded-full">
                    {" "}
                    {props.votes1} votes
                  </div>
                </div>
              )}
              {props.option2 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      checked={option2}
                      onChange={handleoption2}
                      label={props.option1}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={<CheckCircleIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      sx={{
                        color: grey[500],
                        "&.Mui-checked": {
                          color: green[400],
                        },
                      }}
                    />{" "}
                    <div className="flex">{props.option2}</div>
                  </div>
                  <div className="px-3 text-sm py-1 bg-white bg-opacity-30 rounded-full">
                    {" "}
                    {props.votes2} votes
                  </div>
                </div>
              )}
              {props.option3 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      checked={option3}
                      onChange={handleoption3}
                      label={props.option1}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={<CheckCircleIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      sx={{
                        color: grey[500],
                        "&.Mui-checked": {
                          color: green[400],
                        },
                      }}
                    />{" "}
                    <div className="flex">{props.option3}</div>
                  </div>
                  <div className="px-3 text-sm py-1 bg-white bg-opacity-30 rounded-full">
                    {" "}
                    {props.votes3} votes
                  </div>
                </div>
              )}
              {props.option4 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      checked={option4}
                      onChange={handleoption4}
                      label={props.option1}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={<CheckCircleIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      sx={{
                        color: grey[500],
                        "&.Mui-checked": {
                          color: green[400],
                        },
                      }}
                    />{" "}
                    <div className="flex">{props.option4}</div>
                  </div>
                  <div className="px-3 text-sm py-1 bg-white bg-opacity-30 rounded-full">
                    {" "}
                    {props.votes4} votes
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mx-2 ">
            <div className="text-md max-md:text-xs py-4  text-[#c5c2c2]">
              {props.date}
            </div>
            <div className="text-md max-md:text-xs py-4  text-[#c5c2c2]">
              {props.time}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            background: "#232323",
            color: "#fff",
          },
        }}
        // TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        keepMounted
        onClose={handleNo}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle><div className="">{"Delete Poll"}</div></DialogTitle>
        <DialogContent>
          <div className="text-[#e4e2e2] text-lg">Are you sure you want to delete?</div>
        </DialogContent>
        <DialogActions>
          <Button variant="" onClick={handleNo}>
            No
          </Button>
          <Button variant="outlined" color="error" onClick={handleYes}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Poll;