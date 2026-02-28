import React, { useEffect,useState, lazy, Suspense } from "react";
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
   const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, otherUsers } = useSelector((store) => store.user);

  useOtherUsers();
  useGetTweets();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 500ms fallback show karega

    return () => clearTimeout(timer);
  }, []);

  return (
  <div className="flex justify-between w-[96%] mx-auto relative">
    <ThemeToggle />

     <div className="flex">
      {loading ? <LeftSideRemmi /> : <LeftSideBar />}
    </div>

    <Outlet />
    <div className="flex">
      {loading ? <RightSideRemmi /> :  <RightSideBar otherUsers={otherUsers} />}
    </div>

    
  </div>
);
};

export default Home;
