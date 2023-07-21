import React, {useState} from "react";
import { TextField } from "@mui/material";

export default function Resetpass(props){
    const [Email, setEmail] = useState("");
    function resetpassemail(e){
        setEmail(e.target.value);
    }
    function displayemail(e){
        console.log(Email)
    }
    return(    
    <div>
        <div className="bg-[#232323] items-center justify-center flex h-[100vh] font-bold">
          <div className="flex w-[450px] h-[500px] rounded-lg bg-white m-auto flex-col">
            <div className="flex justify-start mx-3 my-2">
                <button>back</button>
            </div>
            <div className="flex justify-center flex-col items-center">
            <div className="flex font-bold text-2xl mt-[14vh] "> 
                    Reset Password
                </div>
                <div className="flex mt-[13vh]">
                <div className="">
                    <TextField 
                    id="fullWidth"
                    label="Enter your Email"
                    variant="outlined"
                    style={{
                        width:350,
                    }}
                    value = {Email}
                    onChange={resetpassemail}
                    />
                </div>
                </div>
                <div className="flex justify-end w-[350px]">
                <div className="flex text-red-600 font-medium text-normal">Invalid email</div>
                </div>
                <div className="flex mt-[7vh] bg-black text-white margin px-10 py-2">
                    <button className="font-normal text-lg" onClick={displayemail}>Send OTP</button>
                </div>
            </div>
        </div>
    </div>
            </div>
                 
    );
}
