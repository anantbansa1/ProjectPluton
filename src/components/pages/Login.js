import React, { useRef } from "react";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { signIn, useAuth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPass] = useState("");
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function handleLogin() {
    setLoading(true);
    try {
      await signIn(Email, Password);
      console.log(user?.email);
      navigate("/home");
    } catch {
      setPass("");
      setEmail("");
      setError(true);
      setHelperText("Invalid Email ID or Password");
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    sleep(1000).then(() => {
      console.log("hello1");
      if (user) {
        console.log("hello2");
        setLoading(false);
        navigate("/home");
      }
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="  ">
      <div className="flex justify-center h-[100vh] bg-white bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/33/Microsoft_login_screen.svg')] items-center">
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
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
              id="myfilled-name"
              label="Password"
              variant="outlined"
              color="grey"
              fullWidth
            />
          </div>
          <button className="btn-grad font-semibold" onClick={handleLogin}>
            Sign In
          </button>
          <Link to="/getemail" className="self-end text-[#232323] ">
            Forgot Password?
          </Link>
        </div>
      </div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(20px)",
        }}
        open={Loading}
        close={Loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Login;
