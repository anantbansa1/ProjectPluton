import React, { useRef } from "react";
import { TextField } from "@mui/material";
import { useState,useEffect } from "react";
import { signIn, useAuth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
// import Lottie from 'lottie-web';
import animationData from './loginanimation.json';

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPass] = useState("");
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  // const animObj = useRef(null);

  const [Loading, setLoading] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();

  const animation = useRef(null);

  // useEffect(()=>{
  //   const instance = Lottie.loadAnimation({
  //     container: animation.current,
  //     renderer: 'svg',
  //     loop: true,
  //     autoplay: true,
  //     animationData: require('./loginanimation.json')
  //   })
  //   return () => instance.destroy();
  // }, []);

  async function handleLogin() {
    setLoading(true);
    try {
      await signIn(Email, Password);
      console.log(user?.email);
      redirectIn();
    } catch {
      // alert("errorrrrrrrrrrrrrrrrrrrrrr");
      setPass("");
      setEmail("");
      setError(true);
      setHelperText("Invalid Email ID or Password");
      // passRef.current.setHelperText("Wrong Password")
      // passRef.current.setLabel("Error");
    }
    setLoading(false);
  }

  function redirectIn() {
    // console.log("hello");
    if (user) {
      console.log("hello2");
      navigate("/");
    }
  }

  function handlePass(e) {
    setPass(e.target.value);
    setHelperText("");
    setError(false);
  }

  return (
    <div className="  ">
      {redirectIn()}
      <div className="flex justify-center h-[100vh] bg-white bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/33/Microsoft_login_screen.svg')] items-center">
        
        {/* <div className="flex flex-row w-[60vw] h-[100vh] ">

           <div className="animation " ref={animation}></div> 
        </div> */}
        <div className="flex flex-col bg-white rounded-3xl shadow-2xl shadow-slate-300 p-6 items-center space-y-10 justify-start h-fit pt-16 pb-10 px-10 max-[450px]:w-[100%] max-[450px]:h-[100%] w-[450px] xl:w-[25vw] ">
          <span className="text-4xl font-semibold">Login</span>
          <div className="mt-1 w-[100%]">
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
                setHelperText("");
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
                '&:before, &:after': {
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
                }
              }}
              id="myfilled-name"
              label="Email"
              variant="outlined"
              color="grey"
              fullWidth
            />
          </div>
          <div className="mt-1 w-[100%]">
            <TextField
              onChange={(e) => {
                setPass(e.target.value);
                setHelperText("");
                setError(false);
              }}
              type="password"
              value={Password}
              helperText={helperText}
              error={error}
              sx={{
                "& .MuiInputBase-root": {
                  color: "#000",
                },
                "& .MuiFormLabel-root": {
                  color: "#000",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#000",
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
              }}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <HttpsIcon/>
              //     </InputAdornment>
              //   ),
              // }}
              InputProps={{
                style: {
                  borderRadius: "50px",
                }
              }}
              id="myfilled-name"
              label="Password"
              variant="outlined"
              color="grey"
              fullWidth
            />
          </div>
          {/* <div> */}
          {/* <Button
            variant="contained"
            sx={{
              backgroundColor: "#111",
              height: '50px',
              color: "white",
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
            fullWidth
          >
            Sign In
          </Button> */}
          
          <button className="btn-grad font-semibold" onClick={handleLogin}>Sign In</button>
          <Link
            to="/getemail"
            className="self-end text-[#232323] "
          >
            Forgot Password?
          </Link>
          {/* </div> */}
        </div>
      </div>

      {/* <div className="sm:bg-[#a7c7e7] sm:h-[100vh] lg:flex lg:justify-between overflow-hidden max-[640px]: bg-[#232323] max-[640px]: h-[500vh]">
        <div className="bg-[#232323] h-[100vh] z-0 scale-150 w-[39%] rotate-[-10deg]"></div>
        <div className=" max-[1024px]:absolute top-[10%] left-[20%] px-4 items-end bg-white max-[1024px]:w-[40vw] max-[640px]:w-[60vw] lg:w-[28vw] lg:flex-col my-auto mx-auto lg:mr-[8vw] rounded-[10px] shadow-md shadow-black z-2  lg:flex">
          <div className="mx-auto my-16 text-center font-bold text-3xl">
            Sign in
          </div>
          <div className="mt-1 w-[100%]">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email ID"

              
              variant="outlined"
              value={Email}
              helperText={helperText}
              error={error}
              onChange={(e) => {
                setEmail(e.target.value);
                setHelperText("");
                setError(false);
              }}
            />
          </div>
          <div className="mt-6 w-[100%]">
            <TextField
              helperText={helperText}
              type="password"
              fullWidth
              error={error}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={Password}
              onChange={handlePass}
            />
          </div>

          <button
            onClick={handleLogin}
            className="bg-[#232323] p-3 mt-10 w-[100%] mx-auto text-white "
          >
            Sign in
          </button>
          <Link to="/getemail" className="p-2 pt-4 mt- w-auto  text-[#232323] hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div> */}
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
export default Login;
