import React from "react";

export default function changepassotp(props) {
  return (
    <div>
      <div className="flex bg-[#232323] items-center justify-center h-[100vh]">
        <div className="flex w-[450px] h-[500px] rounded-lg bg-white m-auto flex-col items-center">
          <div className="flex font-bold text-2xl mt-[13vh] "> Enter OTP</div>
          <div className="flex font-bold text-2xl mt-[5vh] ">
            Email : {props.Email}
          </div>
          <div className="flex mt-[5vh] border-2 border-black">
            <textarea name="otp" id="otp" cols="10" rows="1"></textarea>
          </div>
          <div className="flex "></div>
        </div>
      </div>
    </div>
  );
}
