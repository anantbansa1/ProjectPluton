import React from "react";
import Lottie from "lottie-web";
import { useRef, useEffect } from "react";

function Pagenotfound() {
  const container = useRef(null);

  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../Images/cat404.json"),
    });
    return () => instance.destroy();
  }, []);
  return (
    <>
      <div className=" md:ml-[22vw] flex flex-col h-[100vh] space-y-5 max-md:w-[78%] text-[#d7d9db]  ml-[18vw]  ">
        <div className="text-3xl my-auto">
          {" "}
          <div className="container h-[50vh]  " ref={container}></div>
          <div className="text-center my-10 max-sm:my-0 max-sm:text-lg"> Oops! The page you are trying to acces doesn't exist. </div>
        </div>
      </div>
    </>
  );
}

export default Pagenotfound;
