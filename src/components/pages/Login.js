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
      <div className="flex justify-center h-[100vh] bg-[#1c1733] items-center">
        <div className="flex flex-col  h backdrop-blur-2xl bg-white bg-opacity-5 rounded-3xl shadow-2xl max-[450px]:bg-[#1c1733] max-[450px]:backdrop-blur-0 max-[450px]:rounded-none shadow-black p-6 items-center space-y-10 justify-start h-fit pt-16 pb-10 px-10 max-[450px]:w-[100%] max-[450px]:h-[100%] w-[450px] xl:w-[25vw] ">
          <span className="text-4xl font-semibold text-[#ece9e9]">Login</span>
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
                  color: "#ece9e9",
                },
                "& .MuiFormLabel-root": {
                  color: "#ece9e9",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#ece9e9",
                },
                ".MuiInputBase-input": {
                  background: "#130f22",
                  borderRadius: "10px",
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0px 1000px #130f22 inset",
                    WebkitTextFillColor: "#ece9e9",
                  },
                },
                ".MuiTextField-root": {
                  background: "#130f22",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  // borderColor: "#fff",
                },
                "&:before, &:after": {
                  borderRadius: "10px",
                },
              }}
              InputProps={{
                style: {
                  borderRadius: "10px",
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
                  color: "#ece9e9",
                },
                "& .MuiFormLabel-root": {
                  color: "#ece9e9",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#ece9e9",
                },
                ".MuiInputBase-input": {
                  background: "#130f22",
                  borderRadius: "10px",
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0px 1000px #130f22 inset",
                    WebkitTextFillColor: "#ece9e9",
                  },
                },
                ".MuiTextField-root": {
                  background: "#130f22",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  // borderColor: "#fff",
                },
                "&:before, &:after": {
                  borderRadius: "10px",
                },
              }}
              InputProps={{
                style: {
                  borderRadius: "10px",
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
          <Link to="/getemail" className="self-end text-[#ece9e9] ">
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
