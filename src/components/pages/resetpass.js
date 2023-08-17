import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/CircularProgress";

import { CircularProgress } from "@mui/material";
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
  const [Disabled, setDisabled] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [time, setTime] = useState(30);
  function resetpassemail(e) {
    setEmail(e.target.value);
    sethelperText("");
    setError(false);
  }
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
    setDisabled(true);
    setLoading(true);
    sendPasswordResetEmail(auth, Email)
      .then(() => {
        sethelperText("   ");
        setOpen(true);
        sleep(2000).then(() => {
          setDisabled(false);
        });
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
        setDisabled(false);

        // ..
      });
    setLoading(false);
  }

  return (
    <div>
      <div className="flex justify-center h-[100vh] bg-white bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/33/Microsoft_login_screen.svg')] items-center">
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
              }}
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
            disabled={Disabled}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Loading}
        close={Loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
