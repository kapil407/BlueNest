import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdHome, IoMdLogOut } from "react-icons/io";
import { PiBookmarkSimple } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { toast } from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice.js";
import { getMyTweets } from "../redux/tweetSlice.js";

const LeftSideBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme.theme);

  const isLight = theme == "light";
  const navItems = [
    { label: "Home", icon: IoMdHome, to: "/" },
    { label: "Profile", icon: CgProfile, to: `/profile/${user?._id}` },
    { label: "Saved", icon: PiBookmarkSimple, to: `/bookmarks/${user?._id}` },
  ];

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      });

      dispatch(getMyTweets(null));
      dispatch(getUser(null));
      dispatch(getMyProfile(null));
      dispatch(getOtherUsers(null));

      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <div className="flex h-full ml-8 flex-col justify-between">
      <div>
        <Link
          to="/"
          className="mb-8 flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-sky-500/10"
        >
          <img
            className="h-12 w-12 rounded-2xl object-cover shadow-md"
            src={isLight ? "/logo.png" : "/logo_Dark.png"}
            alt="BlueNest logo"
          />
          <div>
            <h1 className="text-xl font-black">BlueNest</h1>
            <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Social space
            </p>
          </div>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3 w-[50%] text-lg font-bold transition ${
                  active
                    ? "bg-[#1D9BF0] text-white shadow-lg shadow-sky-500/20"
                    : isLight
                      ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon size={26} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={`rounded-3xl border p-3 ${
          isLight
            ? "border-slate-200 bg-slate-50"
            : "border-slate-800 bg-slate-900/70"
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1D9BF0] text-sm font-black text-white">
            {user?.firstName?.charAt(0) || "B"}
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-bold">{user?.firstName || "BlueNest"}</h2>
            <p className={`truncate text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              @{user?.userName || "user"}
            </p>
          </div>
        </div>

        <button
          onClick={logoutHandler}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-bold transition ${
            isLight
              ? "bg-slate-900 text-white hover:bg-slate-700"
              : "bg-white text-slate-950 hover:bg-slate-200"
          }`}
        >
          <IoMdLogOut size={22} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
