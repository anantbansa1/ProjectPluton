import React, { useEffect, useState } from "react";
import Row from "./Row";
import "@fontsource/press-start-2p";
import rank1 from "../Images/rank1.png";
import rank2 from "../Images/rank2.png";
import { Link } from "react-router-dom";
import rank3 from "../Images/rank3.png";
import rank4 from "../Images/rank4.png";
import rank5 from "../Images/rank5.png";
import rank6 from "../Images/rank6.png";
import rank7 from "../Images/rank7.png";
import rank8 from "../Images/rank8.png";
import rank9 from "../Images/rank9.png";
import rank10 from "../Images/rank10.png";
import rank11 from "../Images/rank11.png";
import rank12 from "../Images/rank12.png";
import rank13 from "../Images/rank13.png";
import rank14 from "../Images/rank14.png";
import rank15 from "../Images/rank15.png";
import rank16 from "../Images/rank16.png";
import rank17 from "../Images/rank17.png";
import rank18 from "../Images/rank18.png";
import rank19 from "../Images/rank19.png";
import rank20 from "../Images/rank20.png";
import rank20p from "../Images/rank20p.png";
import { db, useAuth } from "../../firebase";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});
export default function Leaderboard(props) {
  const [users, setusers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [images, setImages] = useState([
    rank4,
    rank5,
    rank6,
    rank7,
    rank8,
    rank9,
    rank10,
    rank11,
    rank12,
    rank13,
    rank14,
    rank15,
    rank16,
    rank17,
    rank18,
    rank19,
    rank20,
    rank20p,
  ]);
  const current_user = useAuth();

  useEffect(() => {
    setLoading(true);
    getuserdata()
      .then(() => {
        setuserdata();
      })
      .then(() => {
        setLoading(false);
      });
  }, [current_user]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    setLoading(true);
    sleep(500).then(() => {
      setLoading(false);
    });
  }, [current_user]);

  const getuserdata = async () => {
    var userlist = [];
    const snapshot = await getDocs(collection(db, "user"));
    snapshot.forEach((doc) => {
      let userdata = doc.data();

      userdata.id = doc.id;
      userlist.push(userdata);
    });
    userlist = userlist.filter(
      (item) => item !== undefined && item.isadmin !== true
    );
    setusers(userlist);
    userlist.sort((a, b) => {
      if (a.points < b.points) {
        return 1;
      }
      if (a.points > b.points) {
        return -1;
      }
      return 0;
    });
    userlist.forEach((userobj, index) => {
      userobj.rank = index + 1;
    });
  };
  const setrank = async (userobj) => {
    const docref = doc(db, "user", userobj.id);
    await updateDoc(docref, {
      rank: userobj.rank,
    });
  };
  const setuserdata = () => {
    for (const userobj of users) {
      setrank(userobj);
    }
  };

  return (
    <div>
      <div className=" max-md:ml-[15vw] ml-[20vw] text-white">
        <div className="font-press-start text-center max-md:text-2xl max-sm:text-xl my-10 text-5xl text-[#FFC700] ">
          Leaderboard
        </div>

        <div className="flex max-md:flex-col max-md:space-y-5  max-md:mx-0 max-xl:text-base items-end  mt-5 mb-10 w-[80vw] md:w-[78vw] space-x-2   ">
          <Link
            className="w-[33%] max-md:w-[100%] max-md:order-2 max-md:h-[200px] h-[250px] grid grid-rows-[repeat(5,minmax(40px,auto))] grid-cols-[2fr_1fr_2fr]"
            to={`/user/${users[1]?.email}`}
          >
            <div className="flex flex-col shadow-[#39495f] bg-[#130f22] max-md:h-[180px] h-[230px] shadow-md rounded-lg row-start-2 col-start-1 row-span-4 col-span-3"></div>

            <img
              src={rank2}
              className="row-start-1 row-span-2 mx-auto col-start-1 col-span-3 h-[80px]"
              alt=""
            />
            <div className="row-start-3 pr-8 col-span-3 items-center space-x-2 col-start-1 self-center justify-self-center flex ">
              <img
                src={users[1]?.profileimage}
                className=" w-[30px] h-[30px] rounded-full border-white"
                alt=""
              />
              <span className="text-lg max-md:text-sm font-semibold text-[#fee101] ">
                {users[1]?.name}
              </span>
            </div>
            <div className="self-center text-slate-200 font-semibold row-start-4 col-start-3  max-md:text-sm justify-self-end pr-4">
              {" "}
              RollNo
            </div>
            <div className=" self-center row-start-5 col-start-3 text-[#fee101] justify-self-end max-md:text-sm  pr-4">
              {users[1]?.id}
            </div>
            <div className="px-4 self-center text-slate-200 font-semibold row-start-4  max-md:text-sm col-start-1">
              {" "}
              Points
            </div>
            <div className=" px-4 self-center row-start-5 col-start-1  max-md:text-sm text-[#fee101]">
              {users[1]?.points}
            </div>
          </Link>
          <Link
            className="w-[33%]  max-md:w-[100%] max-md:order-1 max-md:h-[200px] h-[300px] grid grid-rows-[repeat(5,minmax(40px,auto))] grid-cols-[2fr_1fr_2fr]"
            to={`/user/${users[0]?.email}`}
          >
            <div className="flex flex-col shadow-[#39495f] bg-[#130f22] max-md:h-[180px] h-[280px] shadow-md rounded-lg row-start-2 col-start-1 row-span-4 col-span-3"></div>
            <img
              src={rank1}
              className="row-start-1 row-span-2 mx-auto  col-start-1 col-span-3 h-[80px]"
              alt=""
            />
            <div className="row-start-3 pr-8 col-span-3 items-center space-x-2 col-start-1 self-center justify-self-center flex ">
              <img
                src={users[0]?.profileimage}
                className=" w-[30px] h-[30px] rounded-full border-white"
                alt=""
              />
              <span className="text-lg  text-[#fee101] font-bold text-transparent bg-clip-text  bg-gradient-to-r from-red-400 max-md:text-sm   to-yellow-500">
                {users[0]?.name}
              </span>
            </div>

            <div className="self-center text-slate-200 font-semibold row-start-4 col-start-3 max-md:text-sm justify-self-end pr-4">
              {" "}
              RollNo
            </div>
            <div className=" self-center row-start-5 col-start-3 font-bold text-transparent max-md:text-sm bg-clip-text  bg-gradient-to-r from-red-400  to-yellow-500 text-[#fee101] justify-self-end pr-4">
              {users[0]?.id}
            </div>
            <div className="px-4 self-center text-slate-200 font-semibold max-md:text-sm row-start-4 col-start-1">
              {" "}
              Points
            </div>
            <div className=" px-4 self-center row-start-5 font-bold text-transparent max-md:text-sm bg-clip-text  bg-gradient-to-r from-red-400  to-yellow-500 col-start-1 text-[#fee101]">
              {users[0]?.points}
            </div>
          </Link>
          <Link
            className="w-[33%]  max-md:w-[100%] max-md:order-3 max-md:h-[200px] h-[250px] grid grid-rows-[repeat(5,minmax(40px,auto))] grid-cols-[2fr_1fr_2fr]"
            to={`/user/${users[2]?.email}`}
          >
            <div className="flex flex-col shadow-[#39495f] bg-[#130f22] max-md:h-[180px] h-[230px] shadow-md rounded-lg row-start-2 col-start-1 row-span-4 col-span-3"></div>
            <img
              src={rank3}
              className="row-start-1 row-span-2 mx-auto col-start-1 col-span-3 h-[80px]"
              alt=""
            />
            <div className="row-start-3 pr-8 col-span-3 items-center space-x-2 col-start-1 self-center justify-self-center flex ">
              <img
                src={users[2]?.profileimage}
                className=" w-[30px] h-[30px] rounded-full border-white"
                alt=""
              />
              <span
                className="text-lg font-semibold text-[#fee101] max-md:text-sm  "
                to={`/user/${users[2]?.email}`}
              >
                {users[2]?.name}
              </span>
            </div>
            <div className="self-center text-slate-200 font-semibold max-md:text-sm row-start-4 col-start-3 justify-self-end pr-4">
              {" "}
              RollNo
            </div>
            <div className=" self-center row-start-5 col-start-3 max-md:text-sm text-[#fee101] justify-self-end pr-4">
              {users[2]?.id}
            </div>
            <div className="px-4 self-center text-slate-200 max-md:text-sm font-semibold row-start-4 col-start-1">
              {" "}
              Points
            </div>
            <div className=" px-4 self-center row-start-5 max-md:text-sm col-start-1 text-[#fee101]">
              {users[2]?.points}
            </div>
          </Link>
        </div>
        <div className="w-[82vw] md:w-[78vw] pl-2 max-sm:p-0">
          <div className="bg-[#0b0914] py-6 max-sm:text-xs max-sm:gap-1  rounded-lg max-sm:p-0 grid  grid-cols-[10%_10%_35%_22.5%_22.5%]  max-md:text-base text-xl max-sm:mr-0  text-white">
            <div className="font-semibold text-center ">Medal</div>
            <div className="font-semibold text-[#FFF] text-center">Rank</div>
            <div className="font-semibold text-[#FFF]">Name</div>
            <div className="font-semibold text-center text-[#FFF]">
              Roll No.
            </div>
            <div className="font-semibold text-center text-[#FFF]">Points</div>
          </div>
          <div className="">
            {users.slice(3, 20).map((userobj, index) => (
              <Link to={`/user/${userobj?.email}`}>
                <Row
                  rank={images[index]}
                  rankno={userobj?.rank}
                  name={userobj?.name}
                  rollno={userobj?.id}
                  points={userobj?.points}
                ></Row>
              </Link>
            ))}
            {users.slice(20).map((userobj, index) => (
              <Link to={`/user/${userobj?.email}`}>
                <Row
                  rank={images[17]}
                  rankno={userobj?.rank}
                  name={userobj?.name}
                  rollno={userobj?.id}
                  points={userobj?.points}
                ></Row>
              </Link>
            ))}
          </div>
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
