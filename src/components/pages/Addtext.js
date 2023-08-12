import React, { useState } from "react";
import Navbar from "../Navbar";
import Addimage from "./AddImage"
import Addpoll from "./AddPoll"
import { Button, Chip } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { Done } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';


export default function Text() {
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  const [announcement, setannouncement] = useState("");
  const [achievement, setachievement] = useState("");
  const [submit, setsubmit] = useState("");
  const [text, settext] = useState("");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleClick = (index) => {
    if (selected === index) setSelected(-1)
    else setSelected(index);
  };

  return (
    <div className="mt-[-2vw]">
      <Navbar></Navbar>
      <div className="flex-col max-md:ml-[20vw] max-md:w-[75vw] ml-[28vw] w-[64vw]">
        <div className="text-center">add new post</div>
        <div className=" bg-none  max-md:text-xl  flex items-center mt-[9vh] text-3xl justify-around">
          <div className="flex-col">
            <button
              onClick={(e) => {
                setoption("text");
              }}
              className={`p-[1vh] px-[3vh] border-white ${option === "text" ? "border-b text-white" : "text-slate-300"
                }`}
            >
              Text
            </button>
          </div>
          <div className="flex-col">
            <button
              onClick={(e) => {
                setoption("post");
              }}
              className={`p-[1vh] px-[3vh] border-white ${option === "post" ? "border-b text-white" : "text-slate-300"
                }`}
            >
              Post
            </button>
          </div>
          <div className="flex-col">
            <button
              onClick={(e) => {
                setoption("poll");
              }}
              className={`p-[1vh] px-[3vh] border-white ${option === "poll" ? "border-b text-white" : "text-slate-300"
                }`}
            >
              Poll
            </button>
          </div>
        </div>
        {option === "text" && (
          <div>
            <textarea
              onChange={(e) => {
                settext(e.target.value);
              }}
              className="p-[1vw] max-sm:h-[70vw] max-md:h-[40vw] outline-none border-none max-md:w-[75vw] text-white text-xl bg-[#070315] h-[50vh] w-[64vw] mt-[3vw] shadow-lg shadow-black rounded-lg"
              placeholder="Enter your Text"
            ></textarea>
          </div>
        )}
        {option === "post" && (
          <div className="max-sm:mb-[10vh] mb-[5vh]">
            <Addimage></Addimage>
          </div>
        )}
        {option === "poll" && (
          <Addpoll></Addpoll>

        )}
        <div className=" flex max-[1076px]:space-y-3 max-md:text-sm max-[1076px]:flex-col justify-around min-[1076px]:items-center text-black text-xl  mt-[4vh]">


          <Chip
            onClick={() => handleClick(0)}
            size="medium"
            icon={selected === 0 ? <Done sx={{ color: 'fff !important', }} /> : null}
            sx={{
              backgroundColor: selected === 0 ? '#dbdbdb' : '#130f22', height: '48px',
              padding: '0 12px',
              fontSize: '18px', '&:hover': {
                backgroundColor: '#dbdbdb', 
              },
            }}
            label={<div className={`${selected === 0?'text-black':'text-white'} hover:text-black flex items-center space-x-2`}><div className={`${selected===0?'hidden':''}`}><AddIcon /></div><div>Achievement</div></div>}
          />

          <Chip
            onClick={() => handleClick(1)}
            size="medium"
            icon={selected === 1 ? <Done sx={{ color: 'fff !important', }} /> : null}
            sx={{
              backgroundColor: selected === 1 ? '#dbdbdb' : '#130f22', height: '48px',
              padding: '0 12px',
              fontSize: '18px',  '&:hover': {
                backgroundColor: '#dbdbdb', 
              },
            }}
            label={<div className={`${selected === 1?'text-black':'text-white'} hover:text-black flex items-center space-x-2`}><div className={`${selected===1?'hidden':''}`}><AddIcon /></div><div>Event</div></div>}
          />

          <Chip
            onClick={() => handleClick(2)}
            size="medium"
            icon={selected === 2 ? <Done sx={{ color: 'fff !important', }} /> : null}
            sx={{
              backgroundColor: selected === 2 ? '#dbdbdb' : '#130f22', height: '48px',
              padding: '0 12px',
              fontSize: '18px', '&:hover': {
                backgroundColor: '#dbdbdb', 
              },
            }}
            label={<div className={`${selected === 2?'text-black':'text-white'} hover:text-black flex items-center space-x-2`}><div className={`${selected===2?'hidden':''}`}><AddIcon /></div><div>Announcement</div></div>}
          />
         




        </div>
        <div className="flex space-x-5 w-[100%] my-10 justify-end">
        <Button 
            variant="outlined"
            color="primary"
            sx={{ color: 'white', borderColor: '#100d1e', "&:hover": { borderColor: '#0a0813', color: 'white' } }}
            onClick={()=>{navigate("/clubprofile")}}

          >
            Cancel{" "}
          </Button>
          <Button
          
            variant="contained"
            color="primary"
            sx={{ background: "#15803d", color: 'white',  background: "#199245", borderColor: '#199245',  "&:hover": { background: "#22c55e", borderColor: '#0a0813', color: 'white' } }}

          >
            Post{" "}
          </Button>

        </div>
      </div>
    </div>
  );
}