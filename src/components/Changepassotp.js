import React from "react";
import { TextField } from "@mui/material";

export default function changepassotp(props) {
  return (
    <div>
      <div className="flex bg-[#232323] items-center justify-center h-[100vh]">
        <div className="flex w-[450px] h-[500px] rounded-lg bg-white m-auto flex-col ">
          <div className="flex justify-start mx-3 my-2">
            <button>back</button>
          </div>
          <div className="flex justify-center flex-col items-center">
            <div className="flex font-bold text-2xl text-center  mt-[10vh] ">
              Enter OTP
            </div>
            <div className="flex font-bold text-2xl  mt-[5vh] ">
              Email : {props.Email}
            </div>
            <div className="flex mt-[5vh]  ">
              <div className="">
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  color="primary"
                />
              </div>
            </div>
            <div className="flex mt-[5vh] ">
              <div className="bg-black px-10 py-2 text-white">
                <button>Submit</button>
              </div>
              <div className="bg-black px-6 py-2 mx-4 text-white">
                <button>Resend OTP</button>
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
