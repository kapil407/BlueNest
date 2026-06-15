import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice.js";
import { FaEdit } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader.js";
import {
  followingUpdate,
  getMyProfile,
  getOtherUsers,
  getUser,
  resetProfile,
} from "../redux/userSlice.js";
import {useNavigate} from "react-router-dom";


function Profile() {
  const [loading, setLoading] = useState(false);
  const theme = useSelector((store) => store.theme.theme);
  const { id } = useParams();
    
        useGetProfile(id);
    
  
  const { tweet } = useSelector((store) => store?.tweet);

  const dispatch = useDispatch();

  const { profile, otherUsers, user } = useSelector((store) => store.user);

  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  if(!user) {
    navigate("/login");
  }

  const changeBackgroundImage = async () => {
    try {
      const formdata = new FormData();

      if (image) {
        formdata.append("image", image);
      }
      setLoading(true);
      const res = await axios.patch(
        `${USER_API_END_POINT}/changeBackCover`,
        formdata,
        {
          
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(getMyProfile(res.data.updated));
        setimage(null);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const followAndUnfollowHandler = async () => {
    if (user?.following?.includes(id?.toString())) {
      // unfollow logic
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/unfollow/${id}`,
          {},
          {
            
            withCredentials: true,
          },
        );
        dispatch(getRefresh(id));

        dispatch(followingUpdate(id));

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
          },
        );
        dispatch(getRefresh(id));
        dispatch(followingUpdate(id));

        if (res?.data?.success) {
          toast.success(res?.data?.message);
        }

        // console.log("follow res->", res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[760px]">
      <div
        className={`min-h-screen border-x ${
          theme == "light"
            ? "border-slate-200 bg-white"
            : "border-slate-800 bg-slate-950"
        }`}
      >
        <div>
          <div
            className={`sticky top-0 z-20 flex items-center border-b px-4 py-3 backdrop-blur-xl ${
              theme == "light"
                ? "border-slate-200 bg-white/85"
                : "border-slate-800 bg-slate-950/85"
            }`}
          >
            <Link
              to="/"
              onClick={() => dispatch(resetProfile())}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-sky-500/10"
            >
              <IoMdArrowRoundBack
                size={24}
                className={theme == "light" ? "text-slate-700" : "text-slate-200"}
              />
            </Link>
            <div className="ml-3 flex flex-col">
              <h1 className="text-lg font-black">{profile?.firstName}</h1>
              <p className={theme == "light" ? "text-sm text-slate-500" : "text-sm text-slate-400"}>
                {tweet?.length} post
              </p>
            </div>
          </div>

          <div className="relative">
            {!profile?.backGroundImage?.url ? (
              <img
                className="h-64 w-full object-cover"
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZGV8ZW58MHx8MHx8fDA%3D"
                alt="Banner"
              />
            ) : (
              <img
                src={`${profile?.backGroundImage?.url}?v=${profile?.updatedAt}`}
                alt="backcoverImage"
                className="h-64 w-full object-cover"
              />
            )}
            {profile?._id === user?._id && (
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <input
                  id="backCover"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setimage(e.target.files[0])}
                />
                <label htmlFor="backCover">
                  <FaImage className="size-11 cursor-pointer rounded-full bg-white/90 p-2.5 text-blue-600 shadow-lg" />
                </label>
                <button
                  onClick={changeBackgroundImage}
                  disabled={!image || loading}
                  className={`h-10 rounded-full px-4 font-bold shadow-lg
                  ${
                    !image || loading
                      ? "bg-gray-400 cursor-not-allowed text-black"
                      : "bg-green-400 cursor-pointer text-white "
                  }
                `}
                >
                  {loading ? (
                    <>
                      <ClipLoader size={18} />
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            )}
            <div className="absolute -bottom-14 left-5 cursor-pointer rounded-full border-4 border-white bg-white shadow-xl">
              {!profile?.profilePic?.url ? (
                <Avatar
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                  size="112"
                  round={true}
                />
              ) : (
                <img
                  src={profile?.profilePic?.url}
                  alt="profileimage"
                  className="h-28 w-28 rounded-full object-cover"
                />
              )}
            </div>
          </div>

         <div className="flex justify-between px-5 pt-16">
          

         <div> 
          
            {profile?._id === user?._id?(
              <>
            <div>
               <h1 className="font-bold  text-xl">{profile?.firstName}</h1>
            <p className="text-sm text-gray-600">{profile?.userName}</p>
            </div>
              </>

            ):(
              <>
              <div>
               <h1 className="font-bold text-xl">{profile?.firstName}</h1>
            <p className="text-sm text-gray-600">{profile?.userName}</p>
            </div>
              </>
            )

            }
           
         
          <div className={`${theme=="dark"?"text-sm text-slate-400 bg-slate-950/85":"bg-white"}`}>
            <div className="my-5">
              <p>{profile?.bio}</p>
            </div>
            <div className="flex">
              <button className="cursor-pointer   text-gray-700 font-semibold">
               
                {profile?.following?.length} Following
              </button>

              <button className="cursor-pointer   text-gray-700 font-semibold ml-2">
                {profile?.followers?.length} Followers
              </button>
            </div>
          </div>
         </div>
          <div className="text-right">
            {profile?._id === user?._id ? (
              <>
                <Link to={"/EditeProfile"}>
                  <button className="bg-blue-500 text-white px-9 py-2 mr-2 rounded-3xl cursor-pointer">
                    Edit Profile
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={followAndUnfollowHandler}
                  className={` px-4 py-2 mr-2 rounded-3xl  cursor-pointer ${theme == "light" ? "bg-black text-white" : "bg-gray-400 text-black"}`}
                >
                  {user?.following?.includes(id.toString())
                    ? "following"
                    : "follow"}
                </button>
                {/* message btn*/}
                {user?.following.includes(id?.toString()) && (
                  <Link to={`/Message/${id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl cursor-pointer mr-2">
                      Message
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
