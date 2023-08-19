import React from "react";
import Lottie from "lottie-web";
import { useRef, useEffect } from "react";

function AccessDenied() {
  const container = useRef(null);

  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../Images/403.json"),
    });
    return () => instance.destroy();
  }, []);
  return (
    <>
      <div className=" md:ml-[22vw] flex flex-col h-[100vh] space-y-5 max-md:w-[78%] text-[#d7d9db]  ml-[18vw]  ">
        <div className="text-xl my-auto">
          {" "}
          <div className="container h-[80vh] max-sm:h-[50vh] " ref={container}></div>
          <div className="text-center w-[60vw] mb-10 mx-auto max-md:w-[70vw] max-sm:w-[80vw] max-sm:text-base max-[380px]:text-sm "> Access denied!<br></br>
            You are not authorized to view this page.<br />
            Please check your credentials and try again. <br/>
            If you think this is a mistake, please contact the administrator. </div>
        </div>
      </div>
    </>
  );
}

export default AccessDenied;
