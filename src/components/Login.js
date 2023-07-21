import React from "react";
import { TextField } from "@mui/material";


function Login() {
  return (
    <div>
      <div className="bg-[#a7c7e7] h-[100vh] flex justify-between overflow-hidden">
        <div className="bg-[#232323] h-[100vh] scale-150 w-[39%] rotate-[-10deg]"></div>
        <div className="bg-white lg:h-[65vh] lg:w-[26vw] h-[300px] w-[300px] my-auto mr-[8vw] rounded-[10px] shadow-md shadow-black z-10 flex">
          <div className="mx-auto my-3 text-xl">Sign in</div>
          <CssTextField
            label="Username"
            className="username"
            name="username"
            onChange={this.onChange}
            type="text"
            autoComplete="current-password"
            margin="normal"
            inputProps={{ style: { fontFamily: "nunito", color: "white" } }}
          />
        </div>
      </div>
    </div>
  );
}
export default Login;
