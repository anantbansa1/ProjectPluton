import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

function Post(props) {
  const [open, setOpen] = useState(false);

  const handleNo = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="ml-[20vw] max-md:ml-[15vw] my-10 max-sm:mr-0">
        <div className=" mx-auto w-[50vw] max-md:w-[75vw] h-fit bg-[#130f22] shadow-xl rounded-2xl max-md:py-4 py-8 px-4 max-sm:px-0 shadow-black text-white">
          <div className="flex justify-between font-semibold items-center ">
            <div className="flex items-center max-sm:space-x-2 space-x-5">
              <img
                src={props.ClubImage}
                alt=""
                className=" rounded-[50%] object-cover border-2 border-white h-[2.5vw] w-[2.5vw] min-w-[30px] min-h-[30px] max-sm:m-2"
              />
              <div className="max-md:text-sm">{props.role}</div>
            </div>
            <div
              className="text-[#962a28] cursor-pointer hover:text-[#c43836] px-4"
              onClick={() => {
                setOpen(true);
              }}
            >
              <DeleteIcon className="max-sm:scale-[80%] lg:scale-[130%]" />
            </div>
          </div>
          <div className="my-5">
            <img src={props.image} alt="" />
          </div>
          <div className="text-lg max-md:text-sm text-[#dddbdb] ">
            <span className="font-bold text-white">{props.name}</span>{" "}
            {props.text}
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
        // TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        keepMounted
        onClose={handleNo}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="">{"Delete post"}</div>
        </DialogTitle>
        <DialogContent>
          <div className="text-[#e4e2e2] text-lg">
            Are you sure you want to delete?
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="" onClick={handleNo} sx={{ borderRadius: "15px" }}>
            No
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: "15px" }}
            onClick={handleYes}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Post;
