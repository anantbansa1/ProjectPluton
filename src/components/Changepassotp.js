import React, { useState } from "react";
import { TextField } from "@mui/material";



export default function Changepassotp(props) {
  const[otp,set_otp] = useState('');
  const Handle_OTP=(event) => {
    const newvalue = event.target.value;
    set_otp(newvalue);
    
  } 
  const Submit_OTP=(event) => {
    console.log(otp);
  } 
  const Resend_OTP=(event) => {
    console.log(otp);
  }
  const Back_OTP=(event) => {
    console.log(otp);
  }
  
  return (
    <div>
      <div className="flex bg-[#232323] items-center justify-center h-[100vh]">
        <div className="flex w-[450px] h-[500px] rounded-lg bg-white m-auto flex-col ">
          <div className="flex justify-start mx-3 my-2 text-lg">
            <button onClick={Back_OTP} className="hover:underline">back</button>
          </div>
          <div className="flex justify-center flex-col items-center">
            <div className="flex font-bold text-3xl text-center  mt-[10vh] ">
              Enter OTP
            </div>
            <div className="flex font-bold text-2xl  mt-[5vh] ">
              Email : {props.Email}
            </div>
            <div className="flex mt-[5vh]  ">
              <div className="border-[#232323]">
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  color="primary"
                  value={otp}
                  onChange={Handle_OTP}
                />
              </div>
            </div>
            <div className="flex mt-[5vh] ">
              <div className="bg-black px-10 py-2 mx-5 text-white hover:bg-[#302e2e]">
                <button onClick={Submit_OTP} >Submit</button>
              </div>
              <div className="bg-black px-6 py-2 mx-4 text-white hover:bg-[#302e2e]">
                <button onClick={Resend_OTP} >Resend OTP</button>
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
