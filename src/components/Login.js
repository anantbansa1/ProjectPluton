import React from "react";
import { TextField } from "@mui/material";


anant
function Login() {
  return (
    <div>
      <div className="bg-[#a7c7e7] h-[100vh] flex justify-between overflow-hidden">
        <div className="bg-[#232323] h-[100vh] scale-150 w-[39%] rotate-[-10deg]"></div>
        <div className="px-4 items-end bg-white lg:h-[55vh] lg:w-[26vw] h-[300px] w-[300px] flex-col my-auto mr-[8vw] rounded-[10px] shadow-md shadow-black z-10 flex">
          <div className="mx-auto my-16 font-bold text-3xl">Sign in</div>
          <div className="mt-4 w-[100%]">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
            />
          </div>
          <div className="mt-6 w-[100%]">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
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
