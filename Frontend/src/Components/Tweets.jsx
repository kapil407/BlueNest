import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaDiaspora, FaImage } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TWEET_API_END_POINT } from "../Utils/constant";
import { getRefresh } from "../redux/tweetSlice";
import { toast } from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import { USER_API_END_POINT } from "../Utils/constant";
import { formatMessageTime } from "../Utils/setTime.js";

import { isAction } from "@reduxjs/toolkit";

import { getBookMarksIds } from "../redux/userSlice.js";

import useBookmarks from "../hooks/useBookmarks.js";

const Tweets = ({ tweet }) => {
  const { profile, bookmarksIds } = useSelector((store) => store.user);

  const isBookmarked = bookmarksIds?.some(
    (id) => id.toString() === tweet?._id?.toString(),
  );
  console.log("image and video", tweet?.image?.url);

  const { handleBookmark } = useBookmarks();
  const { userDetails } = tweet;

  const firstUser =
    Array.isArray(tweet.userDetails) && tweet.userDetails.length > 0
      ? tweet.userDetails[0]
      : null;

  const { user } = useSelector((store) => store.user);

  const image = tweet.userDetails[0].profilePic;

  const dispatch = useDispatch();

  const likeDisLikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/tweetLikeOrDisLike/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        },
      );
      dispatch(getRefresh());

      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isLiked = tweet?.likes?.includes(user?._id);

  const DeleteTweetHandler = async (tweetId) => {
    try {
      const res = await axios.delete(
        `${TWEET_API_END_POINT}/deleteTweet/${tweetId}`,
        {
          withCredentials: true,
        },
      );
      dispatch(getRefresh());
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="border-b border-gray-200">
        <div className="w-full">
          <div>
            <div className="ml-1 flex  items-center">
              <div className="">
                <div className="flex ml-6">
                  <Link to={`profile/${tweet?.userId}`} className="m-1  ">
                    {!image?.url ? (
                      <Avatar
                        className="m-1 cursor-pointer"
                        src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                        size="50"
                        round={true}
                      />
                    ) : (
                      <img
                        src={image?.url}
                        alt="photo"
                        className="w-13 h-13 rounded-full border-2 object-cover border-gray-400 "
                      />
                    )}
                  </Link>
                  <div className="flex ml-2 mb-4 items-center ">
                    <h1 className="font-bold text-lg ml-1">
                      {firstUser?.firstName}
                    </h1>
                    <p className="ml-1">
                      @{firstUser?.userName}{" "}
                      {formatMessageTime(tweet.createdAt)}
                    </p>
                  </div>
                </div>

                <div className=" w-[100%] flex justify-center items-center ml-6 ">
                  <div>
                    <p className="mb-2  mt-3  font-semibold  rounded ">
                      {tweet?.description}
                    </p>

                    {!tweet?.image?.url ? (
                      <video
                        src={tweet?.video?.url}
                        controls
                        preload="metadata"
                        className={
                          tweet?.description
                            ? " rounded object-cover w-251 h-140 "
                            : " rounded object-cover w-251 h-140 mt-12"
                        }
                        playsInline
                      />
                    ) : (
                      <>
                        <img
                          src={tweet?.image?.url}
                          alt="image"
                          className={
                            tweet?.description
                              ? " rounded object-cover w-251 h-140 "
                              : " rounded object-cover w-251 h-140 mt-12"
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between p-8">
              <div className="flex   p-2 rounded-full cursor-pointer">
                <FaRegComment
                  size={23}
                  className=" text-gray-600 hover:text-green-600"
                />
                <p className="ml-2">0</p>
              </div>
              <div className="flex  p-2 rounded-full cursor-pointer">
                <Link
                  onClick={() => likeDisLikeHandler(tweet?._id)}
                  className="flex"
                >
                  <BiLike
                    size={25}
                    className={
                      isLiked
                        ? "flex text-pink-600"
                        : "flex text-gray-600 hover:text-pink-600"
                    }
                  />
                  <p className="ml-2">{`${tweet.likes.length}`}</p>
                </Link>
              </div>
              <div>
                {user?._id !== tweet.userId ? (
                  <>
                    <Link
                      onClick={() => handleBookmark(tweet?._id)}
                      className="flex   p-2 rounded-full  cursor-pointer"
                    >
                      <PiBookmarkSimpleBold
                        size={25}
                        className={
                          isBookmarked
                            ? "text-yellow-500"
                            : "text-gray-600 hover:text-yellow-600"
                        }
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      onClick={() => DeleteTweetHandler(tweet?._id)}
                      className=" flex items-center   rounded-3xl p-2"
                    >
                      <MdOutlineDelete
                        size={25}
                        className=" text-gray-600 hover:text-red-600"
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweets;
