import { useState } from "react";
import React, { useEffect } from "react";
import "react-image-crop/dist/ReactCrop.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { collection, where, query } from "@firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../firebase";
import { getDocs, getDoc } from "firebase/firestore";

function ClubProfile(props) {
  const [etype, setetype] = useState("success");
  const [message, setmessage] = useState("Successfully Added!");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const clubName = useParams().clubID;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const names = ["Anant", "Deepanshu", "Samrath", "Madhav", "Duke"];
  const [final_array, setfinal_array] = useState([]);
  const [menuState, setMenuState] = useState([]);
  const [points_state, setpoints_state] = useState([]);
  const [member_id, setmembers] = useState();
  const [points, setpoints] = useState();
  const user = useAuth();
  const [member_name, setmember_name] = useState();
  const [member_points, setmember_points] = useState([]);
  const [member_role, setmember_role] = useState();
  const [club_id, setclub_id] = useState();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  async function checkClub() {
    if (user) {
      const email = user.email;
      try {
        const currentclub = await getDocs(
          query(collection(db, "clubs"), where("name", "==", clubName))
        );
        if (!currentclub) {
          navigate("/pagenotfound");
          return;
        }
        const currentuser = await getDocs(
          query(collection(db, "user"), where("email", "==", email))
        );
        currentuser.forEach(async (u) => {
          if (!u.data().isadmin) {
            const id = u.id;
            const getuser = await getDoc(
              doc(db, "user", id, "clubs", clubName)
            );
            if (getuser) {
              if (getuser.data()) {
                const role = getuser.data().role;

                if (role !== "admin") {
                  navigate("/pagenotfound");
                }
              } else {
                navigate("/pagenotfound");
              }
            } else {
              navigate("/pagenotfound");
            }
          }
        });
      } catch (error) {}
    }
  }

  useEffect(() => {
    checkClub();
  }, [user]);

  async function fetch_data() {
    const q = query(collection(db, "clubs"), where("name", "==", clubName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      querySnapshot.forEach(async (doc) => {
        const docdata = doc.id;
        setclub_id(docdata);
      });
    }
  }

  useEffect(() => {
    fetch_data();
  }, [club_id]);

  useEffect(() => {
    const collectionref = collection(db, `clubs/${club_id}/Members`);
    let array = [];
    getDocs(collectionref).then((d) => {
      if (d) {
        d.forEach((dd) => {
          array.push(dd.id);
        });
      }
      setmembers(array);
    });
  }, [club_id]);

  useEffect(() => {
    const collectionref2 = collection(db, `user`);
    let array = [];
    getDocs(collectionref2).then((d) => {
      if (d) {
        member_id?.forEach((dd) => {
          d.forEach((search) => {
            if (search.id === dd) {
              array.push(search.data().name);
            }
          });
        });
      }
      setmember_name(array);
    });
  }, [member_id]);

  useEffect(() => {
    let memberpoints = [];
    for (let i = 0; i < member_name?.length; i++) {
      memberpoints.push(0);
    }
    setmember_points(memberpoints);
  }, [member_name]);

  useEffect(() => {
    let array = [];
    member_id?.forEach((member) => {
      const docRef = doc(db, `user/${member}/clubs/${clubName}`);
      getDoc(docRef).then((d) => {
        array.push(d.data().role);
      });
    });
    setmember_role(array);
  }, [member_id]);

  useEffect(() => {
    if (member_role && member_id && member_name && member_points) {
      let finalarray = [];
      for (let i = 0; i < member_points?.length; i++) {
        let obj = {
          roll_no: member_id[i],
          name: member_name[i],
          points: member_points[i],
          role: member_role[i],
        };
        finalarray.push(obj);
      }
      setfinal_array(finalarray);
    }
  }, [member_role, member_name, member_points, member_id]);

  useEffect(() => {
    setMenuState(final_array.map(() => ({ anchorEl: null, open: false })));
    setpoints_state(final_array.map(() => 0));
  }, [final_array]);

  useEffect(() => {
    const collectionref5 = collection(db, `clubs`);
    getDocs(collectionref5).then((d) => {
      if (d) {
        d.forEach((dd) => {
          if (dd.id === club_id) {
            setpoints(dd.data().points);
          }
        });
      }
    });
  }, [member_name]);

  const handlePromote = async (id, role) => {
    if (role === "member") {
      const docref = doc(db, `user/${id}/clubs/${clubName}`);
      const payload = { role: "core" };
      await updateDoc(docref, payload);
      const docref9 = doc(db, `user/${id}/badges/${clubName}`);
      const payload2 = { type: "core" };
      await setDoc(docref9, payload2);
    } else if (role === "core") {
      for (let i = 0; i < final_array?.length; i++) {
        if (final_array[i].role === "admin") {
          const docref = doc(
            db,
            `user/${final_array[i].roll_no}/clubs/${clubName}`
          );
          const payload = { role: "core" };
          await updateDoc(docref, payload);
          const docref9 = doc(
            db,
            `user/${final_array[i].roll_no}/badges/${clubName}`
          );
          const payload2 = { type: "core" };
          await setDoc(docref9, payload2);
        }
      }
      const docref = doc(db, `user/${id}/clubs/${clubName}`);
      const payload = { role: "admin" };
      await updateDoc(docref, payload);
      const docref9 = doc(db, `user/${id}/badges/${clubName}`);
      const payload2 = { type: "core" };
      await setDoc(docref9, payload2);
    }
    navigate(0);
  };

  const handleDemote = async (id, role) => {
    if (role === "core") {
      const docref = doc(db, `user/${id}/clubs/${clubName}`);
      const payload = { role: "member" };
      await updateDoc(docref, payload);
      const docref9 = doc(db, `user/${id}/badges/${clubName}`);
      const payload2 = { type: "none" };
      await setDoc(docref9, payload2);
      handleBadges(0, id, "member");
    } else if (role === "admin") {
      const docref = doc(db, `user/${id}/clubs/${clubName}`);
      const payload = { role: "core" };
      await updateDoc(docref, payload);
      const docref9 = doc(db, `user/${id}/badges/${clubName}`);
      const payload2 = { type: "core" };
      await setDoc(docref9, payload2);
    }
    navigate(0);
  };

  const handleRemove = async (id) => {
    const docref = doc(db, `user/${id}/clubs/${clubName}`);
    await deleteDoc(docref);
    const docref2 = doc(db, `clubs/${club_id}/Members/${id}`);
    await deleteDoc(docref2);
    navigate(0);
  };

  const handlepoints = (event, index) => {
    const newPointState = [...points_state];
    newPointState[index] = event.target.value;
    setpoints_state(newPointState);
  };

  const handleClubPoints = async (newpoints, id) => {
    let a = points - newpoints;
    if (a >= 0) {
      const docref3 = doc(db, `clubs/${club_id}`);
      const payload = { points: a };
      await updateDoc(docref3, payload);
      const docref4 = doc(db, `user/${id}/clubs/${clubName}`);
      const temp = await getDoc(docref4);
      let b = parseInt(temp.data().points) + parseInt(newpoints);
      const payload2 = { points: b };
      await updateDoc(docref4, payload2);
      setOpenAlert(true);
      setmessage("Points added successfully");
      setetype("success");
    } else {
      setOpenAlert(true);
      setmessage("Insufficient Points");
      setetype("error");
    }
  };

  const handleBadges = async (newpoints, id, role) => {
    if (role !== "core") {
      const docref5 = doc(db, `user/${id}/clubs/${clubName}`);
      const temp = await getDoc(docref5);
      const a = temp.data().points;
      const finalPoints = parseInt(newpoints) + parseInt(a);
      const docref6 = doc(db, `clubs/${club_id}`);
      const temp2 = await getDoc(docref6);
      let bronze_range = temp2.data().bronze;
      let silver_range = temp2.data().silver;
      let gold_range = temp2.data().gold;
      const docref7 = doc(db, `user/${id}/badges/${clubName}`);
      if (finalPoints >= gold_range) {
        const payload = { type: "gold" };
        await setDoc(docref7, payload);
      } else if (finalPoints < gold_range && finalPoints >= silver_range) {
        const payload = { type: "silver" };
        await setDoc(docref7, payload);
      } else if (finalPoints < silver_range && finalPoints >= bronze_range) {
        const payload = { type: "bronze" };
        await setDoc(docref7, payload);
      } else {
        const payload = { type: "none" };
        await setDoc(docref7, payload);
      }
    }
  };

  const handleoption = (event, index) => {
    const newMenuState = [...menuState];
    newMenuState[index] = { anchorEl: event.currentTarget, open: true };
    setMenuState(newMenuState);
  };

  const handleClose = (index) => {
    const newMenuState = [...menuState];
    newMenuState[index] = { anchorEl: null, open: false };
    setMenuState(newMenuState);
  };

  return (
    <div className="">
      <div className=" md:ml-[22vw]  ml-[18vw] my-[2vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl py-8 px-4 shadow-black">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:space-y-8">
          <div className="max-sm:col-start-3 max-sm:col-span-3 row-start-6 col-start-2  row-span-1 col-span-2">
            <div className="text-[2.25rem]  max-lg:text-2xl text-center max-sm:text-lg text-white font-semibold mix-blend-difference">
              {" "}
              {clubName}{" "}
            </div>
          </div>
          <div className="flex">
            <div className="row-start-6 max-sm:col-start-3 max-sm:col-span-1  max-sm:justify-self-center max-sm:row-start-[9]  mx-5 col-start-5 row-span-1 col-span-1 text-center ">
              <button
                className={`px-4 py-2 max-sm:mt-2  max-sm:w-[25vw] max-[900px]:w-[15vw] lg:text-lg text-xs text-center  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full  text-white`}
              >
                {points} points left
              </button>
            </div>
            <div className="row-start-6 max-sm:col-start-5 max-sm:col-span-1 max-sm:justify-self-center max-sm:row-start-[9] col-start-6 row-span-1 mx-5 col-span-1 text-center text-white">
              <button className="pr-4 pl-4 max-sm:mt-2 max-sm:w-[30vw] max-[900px]:w-[15vw] lg:text-lg text-xs  bg-opacity-10 hover:bg-opacity-20 bg-white rounded-full py-2 text-white text-center">
                {final_array?.length} members
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-3xl my-10 text-slate-100  md:ml-[22vw]  ml-[18vw] mr-[2vw] bg-[#130f22b6] shadow-xl rounded-2xl max-sm:px-0 py-8 px-4 shadow-black">
        <div className="flex justify-between">
          <div>Members</div>
          <div className="max-sm:hidden"></div>
        </div>
        <div className="grid grid-cols-[35%_55%_10%] max-sm:grid-cols-[35%_35%_30%] gap-y-4  bg-[#130f22]  items-stretch max-sm:px-0 p-4 rounded-lg max-sm:text-base text-lg my-10">
          <div className="row-start-1 bg-[#090811] p-4 col-start-1">Name</div>
          <div className="row-start-1 bg-[#090811] p-4 col-start-2">
            Assign Points
          </div>
          <div className="row-start-1 bg-[#090811] p-4 col-start-3 text-[#130f22b6]">
            <button className="cursor-default">
              <MoreVert />
            </button>
          </div>
          {final_array?.map((d, index) => {
            if (menuState.length)
              return (
                <React.Fragment key={index}>
                  <div className={`row-start-${index + 2}   p-4 col-start-1`}>
                    {d.name}{" "}
                    <span className="text-[#ffec3d]">
                      <i>({d.role})</i>
                    </span>
                  </div>
                  <div
                    onChange={(event) => {
                      handlepoints(event, index);
                    }}
                    className={`row-start-${index + 2}  p-4 col-start-2`}
                  >
                    {" "}
                    {d.role === "member" && (
                      <>
                        <TextField
                          label="Points"
                          variant="outlined"
                          color="grey"
                          value={points_state[index]}
                          sx={{
                            "& input::placeholder": {
                              fontSize: {
                                xs: "0.75rem",
                                sm: "0.875rem",
                                md: "1rem",
                              },
                            },
                            "& .MuiInputBase-root": { color: "#DFE2E8" },
                            "& .MuiFormLabel-root": { color: "#AEB1B5" },
                            "& .MuiFormLabel-root.Mui-focused": {
                              color: "#AEB1B5",
                            },
                            ".MuiInputBase-input": {
                              background: "transparent",
                              "&:-webkit-autofill": {
                                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                                WebkitTextFillColor: "#AEBAB5",
                              },
                            },
                            ".MuiTextField-root": { background: "transparent" },
                          }}
                          InputProps={{ style: { backgroundColor: "inherit" } }}
                        />
                        <Button
                          onClick={() => {
                            if (points_state[index]) {
                              let array = [...points_state];
                              array[index] = 0;
                              handleClubPoints(points_state[index], d.roll_no);
                              handleBadges(
                                points_state[index],
                                d.roll_no,
                                d.role
                              );
                              setpoints(points - points_state[index]);
                              setpoints_state(array);
                            } else {
                              setOpenAlert(true);
                              setmessage("Points field can't be empty");
                              setetype("error");
                            }
                          }}
                          variant="contained"
                          color="primary"
                          sx={{
                            background: "#15803d",
                            color: "white",
                            margin: {
                              xs: "10px",
                              md: "0px",
                            },
                            marginLeft: {
                              md: "5px",
                            },
                            background: "#090811",
                            borderColor: "#090811",
                            "&:hover": {
                              background: "#090811",
                              borderColor: "#090811",
                              color: "white",
                            },
                            fontSize: {
                              xs: "0.7rem",
                              sm: "0.86rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Assign{" "}
                        </Button>
                      </>
                    )}
                    {d.role !== "member" && (
                      <div className="text-[#AEB1B5] px-2">NA</div>
                    )}
                  </div>
                  <div className={`row-start-${index + 2}  p-4 col-start-3`}>
                    {" "}
                    {d.role !== "admin" && (
                      <Button
                        aria-controls={
                          menuState[index].open ? "basic-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={
                          menuState[index].open ? "true" : undefined
                        }
                        sx={{ color: "#fff", borderRadius: 50 }}
                        onClick={(event) => {
                          handleoption(event, index);
                        }}
                      >
                        <MoreVert />
                      </Button>
                    )}
                    <Menu
                      id="basic-menu"
                      anchorEl={menuState[index].anchorEl}
                      sx={{
                        "& .MuiPaper-root": {
                          bgcolor: "#130f22",
                          color: "#fff",
                          margin: 2,
                        },
                      }}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      open={menuState[index].open}
                      onClose={() => handleClose(index)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {d.role !== "admin" && (
                        <MenuItem
                          sx={{ padding: 2 }}
                          onClick={() => {
                            handleClose(index);
                            {
                              handlePromote(d.roll_no, d.role);
                            }
                          }}
                        >
                          Promote
                        </MenuItem>
                      )}
                      {d.role !== "member" && (
                        <MenuItem
                          sx={{ padding: 2 }}
                          onClick={() => {
                            handleClose(index);
                            {
                              handleDemote(d.roll_no, d.role);
                            }
                          }}
                        >
                          {/* {d.role === "core" ? "Demote" : "Promote"} */}
                          Demote
                        </MenuItem>
                      )}
                      {d.role !== "admin" && (
                        <MenuItem
                          sx={{ padding: 2, color: "#b91c1c" }}
                          onClick={() => {
                            handleClose(index);
                            handleRemove(d.roll_no);
                          }}
                        >
                          Remove
                        </MenuItem>
                      )}
                    </Menu>{" "}
                  </div>
                </React.Fragment>
              );
          })}
          <div className="sm:hidden "></div>
        </div>
        <div></div>
      </div>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={etype}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ClubProfile;
