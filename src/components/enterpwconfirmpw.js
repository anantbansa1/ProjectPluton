import React, {useState} from "react";
import { TextField } from "@mui/material";

export default function Resetpass(props){
    const [passwordIntial, setPasswordInitial] = useState("");
    const [passwordFinal,setPasswordFinal]=useState("");
    function pwinitial(e){
        setPasswordInitial(e.target.value)
    }
    function pwfinal(e){
        setPasswordFinal(e.target.value)
    }
    function submitPassword(e){
        console.log(passwordIntial)
        console.log(passwordFinal)
    }
    return(    
    <div>
        <div className="bg-[#232323] items-center justify-center flex h-[100vh] font-bold">
          <div className="flex w-[450px] h-[500px] rounded-lg bg-white m-auto flex-col">
            <div className="flex justify-start mx-3 my-2">
                <button>back</button>
            </div>
            <div className="flex mx-auto my-auto justify-center flex-col items-center">
            <div className="flex-col ont-bold text-2xl justify-center items-center align-middle mb-[3vh] "> 
                    Reset Password
                </div>
                <div className="">
                <div className="flex mt-[5vh]">
                    <TextField 
                    id="fullWidth"
                    label="Enter New Password"
                    variant="outlined"
                    style={{
                        width:350,
                    }}
                    value = {passwordIntial}
                    onChange={pwinitial}
                    />
                    </div>
                    <div className="flex mt-[5vh]">
                    <TextField 
                    id="fullWidth"
                    label="Confirm New Password"
                    variant="outlined"
                    style={{
                        width:350,
                    }}
                    value = {passwordFinal}
                    onChange={pwfinal}
                    />
                    </div>
                </div>
                <div className="flex justify-end w-[350px]">
                <div className="flex text-red-600 font-medium text-normal">Passwords don't match</div>
                </div>
                <div className="flex mt-[7vh] bg-black text-white margin px-10 py-2">
                    <button className="font-normal text-lg" onClick={submitPassword}>Change Password</button>
                </div>
            </div>
        </div>
    </div>
            </div>
                 
    );
}
