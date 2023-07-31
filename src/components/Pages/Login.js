import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { grey } from "@mui/material/colors";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPass] = useState("");
  const [option, setoption] = useState("text");
  const [event, setevent] = useState("");
  const [announcement, setannouncement] = useState("");
  const [achievement, setachievement] = useState("");
  const [submit, setsubmit] = useState("");
  const [text, settext] = useState("");
  const searchStyle = {
    color: grey[100],
  };
  function handlePass(e) {
    setPass(e.target.value);
    console.log(Password);
  }
  return (
    <div>
      <div className="sm:bg-[#1c1733] h-[100vh] lg:flex lg:justify-between overflow-y-hidden max-[640px]: bg-[#1c1733]">
        <div className="bg-[#232323] h-[100vh] z-0 scale-150 w-[39%] rotate-[-10deg] overflow-hidden"></div>
        <div className=" max-[1024px]:absolute top-[10%] left-[20%] px-4 items-end bg-[#0d0728] max-[1024px]:w-[40vw] max-[640px]:w-[60vw] lg:w-[28vw] lg:flex-col my-auto mx-auto lg:mr-[8vw] rounded-[10px] shadow-xl shadow-black z-2  lg:flex overflow-hidden">
          <div className="mx-auto text-white my-16 text-center font-bold text-3xl">Sign in</div>
          <div className="text-white p-[10px]">
              <TextField
                onChange={(e) => {
                  setevent(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#DFE2E8",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#AEB1B5",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#AEB1B5",
                  },
                  // ".MuiInputBase-input": {
                  //   background: "#0A0813",
                  // },
                  ".MuiTextField-root": {
                    background: "#FFFFFF",
                  },
                }}
                id="myfilled-name"
                label="E-mail"
                variant="filled"
                color="grey"
                inputProps={{
                  style: {
                    height: "3vh",
                    width: "23vw",
                  },
                }}
              />
            </div>
            <div className="text-white p-[10px]">
              <TextField
                onChange={(e) => {
                  setevent(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#DFE2E8",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#AEB1B5",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "#AEB1B5",
                  },
                  // ".MuiInputBase-input": {
                  //   background: "#0A0813",
                  // },
                  ".MuiTextField-root": {
                    background: "#FFFFFF",
                  },
                }}
                id="myfilled-name"
                label="Password"
                variant="filled"
                color="grey"
                inputProps={{
                  style: {
                    height: "3vh",
                    width: "23vw",
                  },
                }}
              />
            </div>

          <button className="bg-[#232323] p-3 mt-10 w-[100%] mx-auto text-white ">
            Sign in
          </button>
          <button className="p-2 pt-4 mt- w-auto  text-white hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;