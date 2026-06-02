import React, { useEffect, useState, lazy } from "react";
const LeftSideBar = lazy(() => import("./LeftSideBar.jsx"));
const RightSideBar = lazy(() => import("./RightSideBar.jsx"));
const LeftSideRemmi = lazy(() => import("../RimmiEffect_UI/LeftSideRemmi.jsx"));
const RightSideRemmi = lazy(() => import("../RimmiEffect_UI/RightSideRemmi.jsx"));
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useOtherUsers from "../hooks/useOtherUsers.js";
import useGetTweets from "../hooks/useGetTweets.js";
import ThemeToggle from "./Theme.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const { user, otherUsers } = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme.theme);
  if(!user){
    navigate("/login");
  }

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
    <div
      className={`h-screen w-full overflow-hidden ${
        theme == "light"
          ? "bg-slate-100 text-slate-950"
          : "bg-slate-950 text-slate-100"
      }`}
    >
      <div className="mx-auto grid h-full w-full max-w-[1540px] grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[minmax(260px,1fr)_760px_minmax(260px,1fr)]">
        <aside
          className={`hidden h-screen border-r px-3 py-4 lg:block ${
            theme == "light"
              ? "border-slate-200 bg-white/80"
              : "border-slate-800 bg-slate-950/90"
          }`}
        >
          {loading ? <LeftSideRemmi /> : <LeftSideBar />}
        </aside>

        <main className="h-screen min-w-0 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>

        <aside
          className={`hidden h-screen border-l py-4 pl-8 pr-4 xl:block ${
            theme == "light"
              ? "border-slate-200 bg-white/60"
              : "border-slate-800 bg-slate-950/70"
          }`}
        >
          {loading ? <RightSideRemmi /> : <RightSideBar otherUsers={otherUsers} />}
        </aside>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Home;
