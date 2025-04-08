import React from "react";
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { PiBookmarkSimple } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSideBar=()=>{
  const {user}=useSelector(store=>store.user); // user is loggedInUser
  
    return( 
    <>
  <div className="w-[20%] ">
    <div className="hover:bg-gray-200 hover:cursor-pointer rounded-full w-14 h-14 flex items-center justify-center transition delay-75 ease-in ">
        <img  className=" object-cover w-7 h-7 " src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="twitter-logo"/>
    </div>  
    <div className="flex flex-col justify-between">
        <Link to="/" className="flex items-center justify-between font-bold text-2xl w-32  mt-2 p-2 hover:bg-gray-200 hover:cursor-pointer rounded-full transition delay-75 ease-in">
        <IoMdHome size={30}/>
        <h1>Home</h1>
        </Link>
        <div className="flex items-center justify-between font-bold text-2xl w-36   mt-2 p-2 hover:bg-gray-200 hover:cursor-pointer rounded-full transition delay-75 ease-in">
        <IoSearch size={30}/>
        <h1>Explore</h1>
        </div>
        <div className="flex items-center justify-between font-bold text-2xl w-49  mt-2 p-2 hover:bg-gray-200 hover:cursor-pointer rounded-full transition delay-75 ease-in">
        <MdOutlineNotificationsNone size={30}/>
        <h1>Notification</h1>
        </div>
        {/*  this redirect to loggedIn User */}
        <Link to={`/profile/${user?._id}`} className="flex items-center justify-between font-bold text-2xl w-34  mt-2 p-2 hover:bg-gray-200 hover:cursor-pointer rounded-full transition delay-75 ease-in">
        <CgProfile size={30}/>
        <h1>Profile</h1>
        </Link>
        <div className="flex items-center justify-between font-bold text-2xl w-47  mt-2 p-2 hover:bg-gray-200 hover:cursor-pointer rounded-full transition delay-75 ease-in">
        <PiBookmarkSimple size={30}/>
        <h1>Bookmarks</h1>
        </div>
        <Link to="/Logout" className="flex items-center justify-between font-bold text-2xl w-36  mt-2 p-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
        <IoMdLogOut/>
        <h1>Logout</h1>
        </Link>
        <button className="font-bold text-lg bg-[#1D9BF0] text-white rounded-full mt-2 p-1.5 hover:cursor-pointer hover:bg-blue-400 transition delay-75 ease-in">Post</button>
    </div>
  </div>
    </>
)}
export default LeftSideBar