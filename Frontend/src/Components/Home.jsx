import React, { useEffect, lazy, Suspense } from "react";
const LeftSideBar = lazy(() => import("./LeftSideBar.jsx"));
const RightSideBar = lazy(() => import("./RightSideBar.jsx"));
const LeftSideRemmi=lazy(()=> import('../RimmiEffect_UI/LeftSideRemmi.jsx'));
const RightSideRemmi=lazy(()=>import('../RimmiEffect_UI/RightSideRemmi.jsx'));
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
  <div className="flex justify-between w-[96%] mx-auto relative">
    <ThemeToggle />

    <Suspense fallback={<div className="w-60">
      <LeftSideRemmi/>
    </div>}>
      <LeftSideBar />
    </Suspense>

    <Outlet />

    <Suspense fallback={<div className="w-60">
      <RightSideRemmi/>
    </div>}>
      <RightSideBar otherUsers={otherUsers} />
    </Suspense>
  </div>
);
};

export default Home;
