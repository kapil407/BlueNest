import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice.js";
import {
  followingUpdate,
  getMyProfile,
  getOtherUsers,
  getUser,
} from "../redux/userSlice.js";
import { Navigate } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  useGetProfile(id);

  const dispatch = useDispatch();

  const { profile, otherUsers, user } = useSelector((store) => store.user);
  console.log("profile->",profile);
  console.log("user->",user);

  const followAndUnfollowHandler = async () => {
    if (user?.following?.includes(id?.toString())) {
      // unfollow logic
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/unfollow/${id}`,
          {},
          {
            withCredentials: true,
          }
        );

        dispatch(followingUpdate(id));
        dispatch(getRefresh(id));

        // console.log("unfollow res->",res);
        if (res?.data?.success) {
          toast.success(res?.data?.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      //follow logic
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/follow/${id}`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log(dispatch(followingUpdate(id)));
        console.log(dispatch(getRefresh(id)));

        if (res?.data?.success) {
          toast.success(res?.data?.message);
        }

        console.log("follow res->",res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="w-[50%] border-l border-r border-gray-200 fixed left-[22%]">
        <div className="border-b border-gray-200">
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
                  <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-3xl cursor-pointer">
                    Edit Profile
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={followAndUnfollowHandler}
                  className="bg-black text-white px-4 py-2 mr-2 rounded-3xl  cursor-pointer"
                >
                  {user?.following?.includes(id.toString())
                    ? "following"
                    : "follow"}
                </button>
                {/* message btn*/}
                {user?.following.includes(id?.toString()) && (
                  <Link to={`/Message/${id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl cursor-pointer">
                      Message
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="m-4">
            <h1 className="font-bold text-xl">{profile?.firstName}</h1>
            <p className="text-sm text-gray-600">{profile?.userName}</p>
          </div>
          <div>
            <div className="m-6 ">
              <p>{profile?.bio}</p>
            </div>
            <div className="flex ml-4 py-2 ">
              <button className="cursor-pointer   text-gray-700 font-semibold">
                {" "}
                {profile?.following.length} Following
              </button>

              <button className="cursor-pointer   text-gray-700 font-semibold ml-2">
                {profile?.followers.length} Followers
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
