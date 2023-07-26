import React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPass] = useState("");
  function handlePass(e) {
    setPass(e.target.value);
    console.log(Password);
  }
  return (
    <div>
      <div className="sm:bg-[#a7c7e7] h-[100vh] lg:flex lg:justify-between overflow-y-hidden max-[640px]: bg-[#232323]">
        <div className="bg-[#232323] h-[100vh] z-0 scale-150 w-[39%] rotate-[-10deg] overflow-hidden"></div>
        <div className=" max-[1024px]:absolute top-[10%] left-[20%] px-4 items-end bg-white max-[1024px]:w-[40vw] max-[640px]:w-[60vw] lg:w-[28vw] lg:flex-col my-auto mx-auto lg:mr-[8vw] rounded-[10px] shadow-md shadow-black z-2  lg:flex overflow-hidden">
          <div className="mx-auto my-16 text-center font-bold text-3xl">Sign in</div>
          <div className="mt-1 w-[100%]">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mt-6 w-[100%]">
            <TextField type="password"
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={Password}
              onChange={handlePass}
            />
          </div>

          <button className="bg-[#232323] p-3 mt-10 w-[100%] mx-auto text-white ">
            Sign in
          </button>
          <button className="p-2 pt-4 mt- w-auto  text-[#232323] hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;