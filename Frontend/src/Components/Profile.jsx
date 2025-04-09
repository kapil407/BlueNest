import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Avatar from "react-avatar";
import  useGetProfile  from "../hooks/useGetProfile.js";
import { useSelector } from "react-redux";


function Profile() {

  const {id}=useParams();
  useGetProfile(id);
    const {user}=useSelector(store=>store.user);
  const {profile ,otherUsers}=useSelector(store=>store.user);

        
  
  return (
    <>
      <div className="w-[50%] border-l border-r border-gray-200 ">
        <div>
          <div className="flex my-2 ml-2">
            <Link to="/" className="flex items-center  ">
              <IoMdArrowRoundBack
                size={28}
                className="rounded-full hover:bg-gray-200 "
              />
            </Link>
            <div className="flex flex-col ml-4">
              <h1 className="font-bold text-lg ">{profile?.firstName}</h1>
              <p className="text-gray-600">10 Post</p>
            </div>
          </div>

          <img
            className="h-52 w-full"
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZGV8ZW58MHx8MHx8fDA%3D"
            alt="Banner"
          />
          <div className=" cursor-pointer absolute border-4 border-black top-56 translate-x-2/10 rounded-full">
            <Avatar
              src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
              size="102"
              round={true}
            />
          </div>
          <div className="text-right my-4">
          {profile?._id === user?._id ? (
         <>
          <Link to={"/EditeProfile"}>
          <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-3xl cursor-pointer">Edit Profile</button>
          </Link>
         </>

         ) : (
         <button className="bg-black text-white px-4 py-2 mr-2 rounded-3xl  cursor-pointer">Follow</button>
            )}
          </div>
          <div className="m-4">
            <h1 className="font-bold text-xl">{profile?.firstName}</h1>
            <p className="text-sm text-gray-600">{profile?.userName}</p>
          </div>
          <div className="m-4">
            <p>Dream as if you'll live forever. Live as if you'll die today.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
