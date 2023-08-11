import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


export default function Poll2() {
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  const [announcement, setannouncement] = useState("");
  const [achievement, setachievement] = useState("");
  const [submit, setsubmit] = useState("");
  const [text, settext] = useState("");
  const [optionno, setoptionno] = useState(2);
  const [visibility, setVisibility] = React.useState('Public');
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);
  const handleClickVisibility = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseVisibility = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setVisibility(event.target.value);
  };


  return (
    <div className=" mt-[-5vw] max-md:ml-[-20vw] ml-[-30vw]">
      {/* <Navbar></Navbar> */}
      <div className="flex-col max-md:ml-[20vw] max-md:w-[75vw] ml-[28vw] w-[64vw]">
        <div className=" bg-none  max-md:text-xl  flex items-center mt-[9vh] text-3xl justify-between">
        </div>
        <div className="ml-[2vw] max-md:ml-[0vw] my-10">
          <div className=" mx-auto w-[50vw] max-md:w-[75vw] h-fit bg-[#0A0813]  shadow-xl rounded-2xl max-md:py-4 py-8 px-4 shadow-black text-white">
            <div className="flex flex-col  space-y-5">
              <TextField
                onChange={(e) => {
                  setevent(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: '#DFE2E8'
                  },
                  "& .MuiFormLabel-root": {
                    color: '#AEB1B5'
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: '#AEB1B5'
                  },
                  ".MuiInputBase-input": {
                    background: '#0A0813'
                  },
                  ".MuiTextField-root": {
                    background: '#FFFFFF'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                    borderWidth: '1px',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                  },

                }}
                multiline
                rows={4}
                maxRows={4}
                id="myfilled-name"
                label="Poll Question"
                variant="outlined"
                color="grey"
                inputProps={{
                  style: {
                    width: "45vw",
                  },
                }}
              />
              <TextField
                onChange={(e) => {
                  setevent(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: '#DFE2E8'
                  },
                  "& .MuiFormLabel-root": {
                    color: '#AEB1B5'
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: '#AEB1B5'
                  },
                  ".MuiInputBase-input": {
                    background: '#0A0813'
                  },
                  ".MuiTextField-root": {
                    background: '#FFFFFF'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                    borderWidth: '1px',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                  },

                }}

                id="myfilled-name"
                label="Option 1"
                variant="outlined"
                color="grey"
                inputProps={{
                  style: {
                    width: "45vw",
                  },
                }}
              /><TextField
                onChange={(e) => {
                  setevent(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: '#DFE2E8'
                  },
                  "& .MuiFormLabel-root": {
                    color: '#AEB1B5'
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: '#AEB1B5'
                  },
                  ".MuiInputBase-input": {
                    background: '#0A0813'
                  },
                  ".MuiTextField-root": {
                    background: '#FFFFFF'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                    borderWidth: '1px',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                  },

                }}

                id="myfilled-name"
                label="Option 2"
                variant="outlined"
                color="grey"
                inputProps={{
                  style: {
                    width: "45vw",
                  },
                }}
              />
              {optionno >= 3 && (
                <TextField
                  onChange={(e) => {
                    setevent(e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: '#DFE2E8'
                    },
                    "& .MuiFormLabel-root": {
                      color: '#AEB1B5'
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: '#AEB1B5'
                    },
                    ".MuiInputBase-input": {
                      background: '#0A0813'
                    },
                    ".MuiTextField-root": {
                      background: '#FFFFFF'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#475569',
                      borderWidth: '1px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#475569',
                    },

                  }}

                  id="myfilled-name"
                  label="Option 3"
                  variant="outlined"
                  color="grey"
                  inputProps={{
                    style: {
                      width: "45vw",
                    },
                  }}
                />
              )}
              {optionno > 3 && (
                <TextField
                  onChange={(e) => {
                    setevent(e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: '#DFE2E8'
                    },
                    "& .MuiFormLabel-root": {
                      color: '#AEB1B5'
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: '#AEB1B5'
                    },
                    ".MuiInputBase-input": {
                      background: '#0A0813'
                    },
                    ".MuiTextField-root": {
                      background: '#FFFFFF'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#475569',
                      borderWidth: '1px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#475569',
                    },

                  }}

                  id="myfilled-name"
                  label="Option 4"
                  variant="outlined"
                  color="grey"
                  inputProps={{
                    style: {
                      width: "45vw",
                    },
                  }}
                />
              )}

              <div className="flex ">

                <div className="w-fit">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { if (optionno < 4) setoptionno(optionno + 1); console.log(optionno + 1) }}
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
                  >
                    Add option{" "}
                  </Button>

                </div>
                <div className="w-fit">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { if (optionno > 2) setoptionno(optionno - 1); console.log(optionno + 1) }}
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
                  >
                    remove option{" "}
                  </Button>

                </div>
              </div>
              <div className="">
              {" "}
              <button
                className="flex justify-center items-center text-slate-300 "
                onClick={handleClickVisibility}
              >
                {" "}
                <div className="ml-3">Visibility</div>
                <div className="">
                  <KeyboardArrowDownIcon className=""></KeyboardArrowDownIcon>{" "}
                </div>
              </button>
              <div className="">
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseVisibility}
                  sx={{
                    "& .MuiPaper-root": {
                      bgcolor: "#130f22",
                      color: "#fff",
                      margin: 1,
                    },
                  }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleCloseVisibility}>
                    {" "}
                   Public
                  </MenuItem>
                  <MenuItem onClick={handleCloseVisibility}>
                    &nbsp;Members
                  </MenuItem>
                </Menu>
              </div>
            </div>

            </div>


          </div>
        </div>

      </div>
    </div>
  );
}