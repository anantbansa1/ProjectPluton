import React, { useState,useEffect } from "react";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const auth = getAuth();

export default function Resetpass(props) {
  const navigate = useNavigate();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [Email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [helperText, sethelperText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [time,setTime] = useState(30);

  // useEffect(() => {
  //   const timer = setInterval(function() {
  //       console.log("minus: ", time)
  //       setTime(time - 1);
  //   }, 1000)

  //   return () => { // this runs as the clean up function for the useEffect
  //      clearTimeout(timer);
  //   }


  //  },30);

  function resetpassemail(e) {
    setEmail(e.target.value);
    sethelperText("");
    setError(false);
  }

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function displayemail(e) {
    // console.log(Email);
    setLoading(true);
    sendPasswordResetEmail(auth, Email)
      .then(() => {
        // Password reset email sent!
        sethelperText("   ");
        setOpen(true);
          sleep(2000).then(() => {
            setLoading(false);
          });
      
        // for(let i=0;i<31;i++) {
        //   if (time === 0) {
        //     setLoading(false);
        //     setTime(30);
        //   }
        //   sleep(1000).then(() => {
        //     setTime(time-1);
        //   });
        // }
        
        // setLoading(false);
        // navigate("/login");

        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-email") {
          sethelperText("Invalid Email Address");
        } else if (errorCode == "auth/user-not-found") {
          sethelperText("User Not Found!");
        } else {
          sethelperText("Something went wrong! Please try again later.");
          console.log(errorCode);
        }
        setError(true);
        setEmail("");
        setLoading(false);

        // ..
      });
  }

  return (
    <div>
      {/* <div className="bg-[#232323] items-center justify-center flex h-[100vh] font-bold">
        <div className="flex w-[450px] h-[500px] rounded-lg bg-white m-auto flex-col">
          <div className="flex justify-start mx-3 my-2">
            <Link to="/login">back</Link>
          </div>
          <div className="flex justify-center flex-col items-center">
            <div className="flex font-bold text-2xl  ">Reset Password</div>
            <div className="flex mt-[13vh]">
              <div className="">
                <TextField
                  id="fullWidth"
                  label="Enter your Email"
                  variant="outlined"
                  style={{
                    width: 350,
                  }}
                  value={Email}
                  onChange={resetpassemail}
                  helperText={helperText}
                  error={error}
                />
              </div>
            </div>
            <div className="flex mt-[7vh] bg-black text-white margin px-10 py-2">
              <button className="font-normal text-lg" onClick={displayemail}>
                Send Password Reset Email
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex justify-center h-[100vh] bg-white bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/33/Microsoft_login_screen.svg')] items-center">
        {/* <div className="flex flex-row w-[60vw] h-[100vh] ">

           <div className="animation " ref={animation}></div> 
        </div> */}
        <div className="flex flex-col bg-white rounded-3xl shadow-2xl shadow-slate-300 p-6 items-center space-y-10 justify-start h-fit pt-16 pb-10 px-10 max-[450px]:h-[100%] max-[450px]:w-[100%] w-[450px] 2xl:w-[25vw] xl:w-[30vw] text-center">
          <span className="text-4xl font-semibold ">Forgot your password?</span>
          <div className="mt-1 w-[100%]">
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
                sethelperText("");
                setError(false);
              }}
              value={Email}
              helperText={helperText}
              error={error}
              className=""
              sx={{
                "& .MuiInputBase-root": {
                  color: "#000",
                },
                "& .MuiFormLabel-root": {
                  color: "#000",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#1c1733",
                },
                ".MuiInputBase-input": {
                  background: "#fff",
                },
                ".MuiTextField-root": {
                  background: "#FFFFFF",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000",
                },
                "&:before, &:after": {
                  borderRadius: "50px",
                },
                // boxShadow: 10
              }}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <EmailIcon/>
              //     </InputAdornment>
              //   ),
              // }}
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
              id="myfilled-name"
              label="Enter you email"
              variant="outlined"
              color="grey"
              fullWidth
            />
          </div>
          <button
            disabled={Loading}
            className="btn-grad font-semibold"
            onClick={displayemail}
          >
            Send password reset email
          </button>
          <Link to="/login" className="self-start">
            back
          </Link>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Password reset mail sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
