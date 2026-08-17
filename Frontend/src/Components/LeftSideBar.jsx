import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdHome, IoMdLogOut } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { PiBookmarkSimple } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { toast } from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice.js";
import { getMyTweets } from "../redux/tweetSlice.js";
import { IoMdSettings } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import NotificationComponent from "./Notification.jsx";
import Typewriter from "./TypeWriter.jsx";
import { RiRobot2Line } from "react-icons/ri";

const LeftSideBar = ({ className = "", onClose }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme.theme);
  console.log("user->",user);

  const isLight = theme == "light";
  const navItems = [
    { label: "Home", icon: IoMdHome, to: "/" },
    { label: "Profile", icon: CgProfile, to: `/profile/${user?._id}` },
    { label: "Saved", icon: PiBookmarkSimple, to: `/bookmarks/${user?._id}` },
    { label: "Settings", icon: IoMdSettings, to: `/setting` },
    {label: "Notifications", icon: MdNotificationsActive, to: `/notifications/${user?._id}`},
    {label:"let's chat with AI", icon:RiRobot2Line,to:`/Chat-Bot`}
  ];

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true },
      );

      console.log("logout controller called", USER_API_END_POINT);

      dispatch(getMyTweets(null));
      dispatch(getUser(null));
      dispatch(getMyProfile(null));
      dispatch(getOtherUsers(null));

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const activeIndex = Math.max(
    navItems.findIndex((item) => isActive(item.to)),
    0,
  );

  return (
    <div className={`flex h-full  lg:w-[70%] lg:px-2 lg:py-2 rounded-2xl border bg-slate-900 border-slate-700 flex-col justify-between ${className}
    ${isLight ? "bg-white text-slate-950" : "bg-slate-900 text-white"}`
    }>
      <div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full transition lg:hidden ${
              isLight
                ? "text-slate-700 hover:bg-slate-100"
                : "text-slate-200 hover:bg-slate-900"
            }`}
            aria-label="Close sidebar"
          >
            <IoClose size={24} />
          </button>
        )}

        <Link
          to="/"
          className="mb-8 flex lg:w-full items-center w-[65%] gap-3 rounded-2xl px-2 py-1 lg:py-4 transition hover:bg-sky-500/10"
        >
          <img
            className="w-18 h-18  lg:w-14 lg:h-10 rounded-full object-cover  shadow-md"
            src={isLight ? "/logo.png" : "/logo_Dark.png"}
            alt="BlueNest logo"
          />
          <div className="w-full  h-full">
            <h1 className=" font-black">
              
              <Typewriter word="BlueNest" speedText={500} className="text-xl" />
              </h1>
            <p
              className={`text-xs  mb-2 fixed ${isLight ? "text-slate-500" : "text-slate-400"}`}
            >
              Social space
            </p>
          </div>
        </Link>

        <nav className="relative w-full lg:w-full space-y-2">
          <span
            className="pointer-events-none absolute left-0 top-0 h-14 w-full rounded-2xl bg-[#1D9BF0] shadow-lg shadow-sky-500/20 transition-transform duration-300 ease-out"
            style={{ transform: `translateY(${activeIndex * 4}rem)` }}
          />

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group relative z-10 lg:w-full flex h-14 items-center gap-4 rounded-2xl px-4 text-lg font-bold transition-all duration-300 ease-out hover:translate-x-1 active:scale-[0.98] ${
                  active
                    ? "text-white"
                    : isLight
                      ? "text-slate-700 hover:bg-slate-100/80 hover:text-slate-950"
                      : "text-slate-300 hover:bg-slate-900/80 hover:text-white"
                }`}
              >
                <Icon
                  size={26}
                  className={`transition-transform duration-300 ease-out ${
                    active ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={`rounded-3xl w-full lg:w-full border p-3 ${
          isLight
            ? "border-slate-200 bg-slate-50"
            : "border-slate-700 bg-slate-900/70"
        }`}
      >
        <div className="mb-4  flex  items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1D9BF0] text-sm font-black text-white">
              <Link to={`/profile/${user?._id}`}>
                <img src={user?.profilePic?.url} alt="profileImage" className="rounded-full h-11 object-cover w-12"/>
              </Link>            
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-bold">
              {user?.firstName || "BlueNest"}
            </h2>
            <p
              className={`truncate text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}
            >
              @{user?.userName || "user"}
            </p>
          </div>
        </div>

        <button
          onClick={logoutHandler}
          className={`flex w-full items-center cursor-pointer justify-center gap-2 rounded-2xl px-4 py-2.5 font-bold transition ${
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
