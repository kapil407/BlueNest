import React from "react";
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { PiBookmarkSimple } from "react-icons/pi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT, TWEET_API_END_POINT } from "../Utils/constant.js";

import { toast } from "react-hot-toast";
import { getMyProfile, getUser, getOtherUsers } from "../redux/userSlice.js";
import { useDispatch } from "react-redux";
import { getMyTweets } from "../redux/tweetSlice.js";
import { Message } from "./Message.jsx";
const LeftSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user); // user is loggedInUser
  const { tweet } = useSelector((store) => store.tweet);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      });
      // console.log("logout->", res);
      dispatch(getMyTweets(null));
      dispatch(getUser(null));
      dispatch(getMyProfile(null));
      dispatch(getOtherUsers(null));
      navigate("/LoginSignup");
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-[12%]">
        <div className="w-[18%] fixed">
          <Link
            to={"/"}
            className="hover:bg-gray-200 hover:cursor-pointer rounded-full w-14 h-14 flex items-center justify-center transition delay-75 ease-in "
          >
            <img
              className=" object-cover w-11 h-11 rounded-full "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2xL9YcC2jKkxlbeGWZhJzL6xfcTphcZs6aZsagG0mol0P540IlaZo1uP_o3KWQchKLQU&usqp=CAU"
              alt="twitter-logo"
            />
          </Link>
          <div className="flex flex-col justify-between">
            <Link
              to="/"
              className="flex items-center justify-between font-bold text-2xl w-32  mt-4 py-2 px-3 hover:bg-gray-200 hover:cursor-pointer rounded-full transition delay-75 ease-in border border-gray-300  "
            >
              <IoMdHome size={30} />
              <h1>Home</h1>
            </Link>

            {/*  this redirect to loggedIn User */}
            <Link
              to={`/profile/${user?._id}`}
              className="flex items-center justify-between font-bold text-2xl w-34  mt-4 py-2 px-3 hover:bg-gray-200 hover:cursor-pointer rounded-full transition delay-75 ease-in border border-gray-300 "
            >
              <CgProfile size={30} />
              <h1>Profile</h1>
            </Link>
            <Link
              to={`/bookmarks/${user?._id}`}
              className="flex items-center justify-between font-bold text-2xl w-47  mt-4 py-2 px-3 hover:bg-gray-200 hover:cursor-pointer rounded-full transition delay-75 ease-in border border-gray-300 "
            >
              <PiBookmarkSimple size={30} />
              <h1>Bookmarks</h1>
            </Link>
            <div
              onClick={logoutHandler}
              className="flex items-center justify-between font-bold text-2xl w-36  mt-4 py-2 px-3 hover:bg-gray-200 hover:cursor-pointer rounded-full border border-gray-300 "
            >
              <IoMdLogOut />
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LeftSideBar;
