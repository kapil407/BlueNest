import React, { useEffect } from "react";
import LeftSideBar from "./LeftSideBar.jsx";
import RightSideBar from "./RightSideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useOtherUsers from "../hooks/useOtherUsers.js";
import useGetTweets from "../hooks/useGetTweets.js";
import ThemeToggle from "./Theme.jsx";
const Home = () => {
  const navigate = useNavigate();
  const { user, otherUsers } = useSelector((store) => store.user);

  useOtherUsers();
  useGetTweets();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-between  w-[95%] mx-auto relative ">
        <ThemeToggle />
        <LeftSideBar />
        <Outlet />
        <RightSideBar otherUsers={otherUsers} />
        {/* pass the otherUsers as props */}
      </div>
    </>
  );
};

export default Home;
