import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const auth = getAuth();

export default function Resetpass(props) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [Email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [helperText, sethelperText] = useState("");
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
  function displayemail(e) {
    // console.log(Email);
    sendPasswordResetEmail(auth, Email)
      .then(() => {
        // Password reset email sent!
        sethelperText("   ");
        setOpen(true);

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

        // ..
      });
  }

  return (
    <div>
      <div className="bg-[#232323] items-center justify-center flex h-[100vh] font-bold">
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
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Password reset mail sent successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
