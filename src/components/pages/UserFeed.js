import React, { useState, useEffect } from "react";
import Post from "./Post";
import Poll from "./Poll";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GroupsIcon from "@mui/icons-material/Groups";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useAuth } from "../../firebase";
import { db } from "../../firebase";
import { Backdrop, CircularProgress } from "@mui/material";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export default function UserFeed() {
  const user = useAuth();
  const [post, underline] = useState("post");
  const [club, setclub] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [allclubs, setallclubs] = useState([]);
  const [roles, setroles] = useState({});
  const [userid, setuserid] = useState();
  const [Loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const [posts, setposts] = useState([]);
  const [polls, setpolls] = useState([]);
  const [clubimages, setclubimages] = useState([]);
  const [feedCount, setfeedCount] = useState(0);
  const [pollcount, setpollcount] = useState(0);
  const [filterposts, setfilterposts] = useState(posts);
  const [filterpolls, setfilterpolls] = useState(polls);
  const [selected, setSelected] = useState("Filter");
  const [isadmin, setisadmin] = useState(false);
  const [clubstatus, setclubstatus] = useState([]);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    sleep(500).then(() => {
      setLoading(false);
    });
  }, [user]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (s) => {
    if (s === "close") setSelected(selected);
    else if (s === selected) setSelected("Filter");
    else setSelected(s);
    setAnchorEl(null);
  };

  useEffect(() => {
    const tempposts = posts.filter(
      (post) => selected === "Filter" || post.tag === selected
    );
    const temppolls = polls.filter(
      (poll) => selected === "Filter" || poll.tag === selected
    );
    setfilterposts(tempposts);
    setfilterpolls(temppolls);
  }, [posts, polls, selected]);

  useEffect(() => {
    setclubimage();
    fetchroles();
  }, [allclubs]);

  useEffect(() => {
    setfeedCount(0);
    filterposts.map((filterpost) => {
      if (
        isadmin === true ||
        filterpost.visibility === "Public" ||
        roles[filterpost.clubname] === "admin" ||
        roles[filterpost.clubname] === "core" ||
        roles[filterpost.clubname] === "member"
      ) {
        setfeedCount(feedCount + 1);
      }
    });
  }, [filterposts]);

  useEffect(() => {
    setpollcount(0);
    filterpolls.map((filterpoll) => {
      if (
        isadmin === true ||
        filterpoll.visibility === "Public" ||
        roles[filterpoll.clubname] === "admin" ||
        roles[filterpoll.clubname] === "core" ||
        roles[filterpoll.clubname] === "member"
      ) {
        setpollcount(pollcount + 1);
      }
    });
  }, [filterpolls]);

  useEffect(() => {
    if (user) {
      const email = user.email;
      const collref = collection(db, "user");
      const q = query(collref, where("email", "==", email));
      getDocs(q).then((snapshot) => {
        if (snapshot) {
          snapshot.forEach((userData) => {
            if (userData.data()) {
              setuserid(userData.id);
              setisadmin(userData.data().isadmin);
            }
          });
        }
      });
    }
  }, [user]);

  async function fetchpost() {
    const posts = await getDocs(
      query(collection(db, "posts"), orderBy("timestamp", "desc"))
    );
    const postarray = [];
    if (posts) {
      posts.forEach((post) => {
        if (clubstatus[post.data().clubname] === true) {
          let data = post.data();
          data.id = post.id;
          postarray.push(data);
        }
      });
      setposts(postarray);
    }
  }

  async function fetchpolls() {
    const pollDocs = await getDocs(
      query(collection(db, "polls"), orderBy("timestamp", "desc"))
    );
    const pollarray = [];
    if (pollDocs) {
      pollDocs.forEach((poll) => {
        if (clubstatus[poll.data().clubname] === true) {
          let data = poll.data();
          data.id = poll.id;
          pollarray.push(data);
        }
      });
      setpolls(pollarray);
      let temppolls = [];
      Promise.all(
        pollarray.map((poll) => {
          return getDocs(collection(db, "polls", poll.id, "votes"))
            .then((snapshot) => {
              let a = { ...poll };
              a.votes1 = 0;
              a.votes2 = 0;
              a.votes3 = 0;
              a.votes4 = 0;
              snapshot.forEach((p) => {
                const sel = p.data().selected;
                a[`votes${sel}`]++;
              });
              temppolls.push(a);
            })
            .catch((error) => {
              let a = { ...poll };
              a.votes1 = 0;
              a.votes2 = 0;
              a.votes3 = 0;
              a.votes4 = 0;
              temppolls.push(a);
            });
        })
      ).then(() => {
        setpolls(temppolls);
        setfilterpolls(temppolls);
      });
    }
  }

  async function fetchClubs() {
    try {
      const clubs = await getDocs(
        query(collection(db, "clubs"), orderBy("name"))
      );
      if (clubs) {
        let clubnames = [];
        let clubstatus = [];
        clubs.forEach((element) => {
          const cname = element.data().name;
          const status = element.data().active;
          clubstatus[cname] = status;
          if (element.data().active === true || isadmin) {
            clubnames.push(element.data());
          }
        });
        setallclubs(clubnames);
        setclubstatus(clubstatus);
      }
    } catch (error) {}
  }

  async function fetchroles() {
    try {
      const clubs = await getDocs(collection(db, "clubs"));
      if (clubs) {
        let clubroles = [];
        let promises = [];
        clubs.forEach((element) => {
          const docref = doc(db, "user", userid, "clubs", element.data().name);
          promises.push(
            getDoc(docref).then((getrole) => {
              if (getrole) {
                if (getrole.data()) {
                  clubroles[element.data().name] = getrole.data().role;
                } else {
                  clubroles[element.data().name] = "visitor";
                }
              } else {
                clubroles[element.data().name] = "visitor";
              }
            })
          );
        });
        await Promise.all(promises);
        setroles(clubroles);
      }
    } catch (error) {}
  }

  function setclubimage() {
    let clubimage = [];
    allclubs.map((club) => {
      clubimage[club.name] = club.logo;
    });
    setclubimages(clubimage);
  }

  useEffect(() => {
    if (userid) {
      fetchClubs();
    }
  }, [userid]);

  useEffect(() => {
    if (clubstatus) {
      fetchpost();
      fetchpolls();
    }
  }, [clubstatus]);

  return (
    <div>
      <div className="hello">
        <div className=" md:ml-[22vw] ml-[18vw] max-[769px]:mt-[8vh]  my-[2vw] max-[769px]:mr-0 mr-[12vw] max-md:py-0 py-8 px-4  text-white ">
          <div className="flex max-md:text-lg text-3xl items-center justify-between  ">
            {" "}
            <div className=""> </div>
            <div className="flex space-x-[5vw] max-md:space-x-4  ">
              <button
                className={`${
                  post === "post" ? "border-b" : ""
                } border-white py-4  px-8`}
                onClick={(e) => {
                  underline("post");
                }}
              >
                Post
              </button>
              <button
                className={`${
                  post === "poll" ? "border-b" : ""
                } border-white py-4  px-8`}
                onClick={(e) => {
                  underline("poll");
                }}
              >
                Poll
              </button>
            </div>
            <div className="">
              {" "}
              <button
                className="flex justify-center items-center text-xl "
                onClick={handleClick}
              >
                {" "}
                <FilterAltIcon className="lg:scale-[125%]"></FilterAltIcon>
                <div className="ml-3 max-lg:hidden">
                  {(() => {
                    let a =
                      selected.charAt(0).toUpperCase() +
                      selected.slice(1) +
                      "s";
                    return a;
                  })()}
                </div>
                <div className="max-lg:hidden">
                  <KeyboardArrowDownIcon className="ml-3 scale-[150%]"></KeyboardArrowDownIcon>{" "}
                </div>
              </button>
              <div className="">
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => {
                    handleClose("close");
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      bgcolor: "#130f22",
                      color: "#fff",
                      margin: 2,
                    },
                  }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    sx={{
                      padding: 2,
                      bgcolor: selected === "achievement" ? "#000" : "inherit",
                    }}
                    onClick={() => {
                      handleClose("achievement");
                    }}
                  >
                    {" "}
                    <EmojiEventsIcon /> &nbsp;Achievement
                  </MenuItem>
                  <MenuItem
                    sx={{
                      padding: 2,
                      bgcolor: selected === "event" ? "#000" : "inherit",
                    }}
                    onClick={() => handleClose("event")}
                  >
                    <EventAvailableIcon />
                    &nbsp;Events
                  </MenuItem>
                  <MenuItem
                    sx={{
                      padding: 2,
                      bgcolor: selected === "announcement" ? "#000" : "inherit",
                    }}
                    onClick={() => handleClose("announcement")}
                  >
                    <CampaignIcon />
                    &nbsp;Announcements
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>

      {post === "post" && (
        <div className="-ml-[12vw] max-[769px]:m-0">
          {filterposts.map((post) => {
            if (
              isadmin === true ||
              post.visibility === "Public" ||
              roles[post.clubname] === "admin" ||
              roles[post.clubname] === "core" ||
              roles[post.clubname] === "member"
            ) {
              return (
                <Post
                  name={post.clubname}
                  ClubImage={clubimages[post.clubname]}
                  image={post.imageurl}
                  text={post.text}
                  visibility={post.visibility}
                  timestamp={post.timestamp}
                  role={roles[post.clubname]}
                  postid={post.id}
                  isadmin={isadmin}
                ></Post>
              );
            }
          })}
          {feedCount == 0 && (
            <div className="text-slate-300 ml-[15vw] md:ml-[20vw] text-center py-5 text-xl max-sm:text-base">
              Hmm... nothing to show here.
            </div>
          )}
        </div>
      )}

      {post === "poll" && (
        <div className="-ml-[12vw] max-[769px]:m-0">
          {filterpolls.map((poll) => {
            if (
              isadmin === true ||
              poll.visibility === "Public" ||
              roles[poll.clubname] === "admin" ||
              roles[poll.clubname] === "core" ||
              roles[poll.clubname] === "member"
            ) {
              return (
                <Poll
                  name={poll.clubname}
                  ClubImage={clubimages[poll.clubname]}
                  question={poll.text}
                  option1={poll.option1}
                  option2={poll.option2}
                  role={roles[poll.clubname]}
                  option3={poll.option3}
                  option4={poll.option4}
                  timestamp={poll.timestamp}
                  isadmin={isadmin}
                  votes1={poll.votes1}
                  votes2={poll.votes2}
                  votes3={poll.votes3}
                  votes4={poll.votes4}
                  user={userid}
                  pollid={poll.id}
                />
              );
            }
          })}
          {pollcount == 0 && (
            <div className="text-slate-300 ml-[15vw] md:ml-[20vw] text-center py-5 text-xl max-sm:text-base">
              Hmm... nothing to show here.
            </div>
          )}
        </div>
      )}

      <div className="flex max-[769px]:hidden  flex-col fixed h-[100%] w-[12vw] items-center overflow-y-scroll scrollbar-hide top-0 right-0  py-4  shadow-2xl shadow-black space-y-10 bg-white bg-opacity-5 backdrop-blur-2xl ">
        {allclubs?.map((club) => {
          return (
            <Link
              to={`/club/${club.name}`}
              className="h-[7vw] w-[7vw] border-white rounded-full"
            >
              <Tooltip title={club.name}>
                {" "}
                <img
                  src={club.logo}
                  className={`h-[7vw] w-[7vw] cursor-pointer rounded-full  ${
                    clubstatus[club.name] === true ? "" : "grayscale"
                  } `}
                  alt=""
                />
              </Tooltip>
            </Link>
          );
        })}
        {isadmin && (
          <Link
            to="/addclub"
            className="h-[7vw] w-[7vw] border-white rounded-full"
          >
            <Tooltip title="Add New Club">
              {" "}
              <div
                className="flex items-center justify-center h-[7vw] w-[7vw] cursor-pointer  bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-2xl rounded-full  "
                alt=""
              >
                {" "}
                <AddIcon className="text-slate-400 scale-[150%]" />{" "}
              </div>
            </Tooltip>
          </Link>
        )}
      </div>

      <button
        onClick={(e) => {
          setclub(!club);
        }}
        className="min-[769px]:hidden flex items-center  space-x-1 text-white fixed top-3 right-2"
      >
        <div>
          <GroupsIcon></GroupsIcon> Clubs
        </div>
      </button>

      <div
        className={`} min-[769px]:hidden scrollbar-hide duration-300 transition-all  shadow-2xl shadow-black space-y-5 bg-white bg-opacity-5 backdrop-blur-2xl flex flex-col backdrop-filter h-[100vh] w-[25vw] fixed top-10 ${
          club ? "right-1" : "right-[-25vw]"
        } rounded-[10px] overflow-scroll`}
      >
        {allclubs?.map((club) => {
          return (
            <Link
              to={`/club/${club["name"]}`}
              params={club["name"]}
              state={club}
              className=""
            >
              <Tooltip title={club["name"]}>
                {" "}
                <img
                  src={club["logo"]}
                  className="bg-white h-[22vw] w-[22vw] rounded-[50%]  mx-auto "
                  alt=""
                />
              </Tooltip>
            </Link>
          );
        })}
        {isadmin && (
          <Link to="/addclub" className="">
            <Tooltip title="Add New Club">
              {" "}
              <div
                className="flex items-center justify-center h-[22vw] w-[22vw] mx-auto cursor-pointer  bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-2xl rounded-[50%]  "
                alt=""
              >
                {" "}
                <AddIcon className="text-slate-400 scale-[150%]" />{" "}
              </div>
            </Tooltip>
          </Link>
        )}
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
