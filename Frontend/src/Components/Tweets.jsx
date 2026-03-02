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
import GetComment from "./ShowComments.jsx";
import { formatMessageTime } from "../Utils/setTime.js";

import { isAction } from "@reduxjs/toolkit";

import { getBookMarksIds } from "../redux/userSlice.js";

import useBookmarks from "../hooks/useBookmarks.js";
import { useEffect } from "react";
import { setComment } from "../redux/commentSlice.js";

const Tweets = ({ tweet }) => {
  const [showComment, setShowComment] = useState(false);
  const [addComment, setAddComment] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [commentLength, setCommentLength] = useState(0);

  const { profile, bookmarksIds } = useSelector((store) => store.user);
  const { refresh } = useSelector((store) => store.tweet);

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

  const HandleGetComment = (id) => {
    setSelectedId(id);
    setShowComment(!showComment);
  };
  //   useEffect(()=>{

  //  },[])
  const openBox = () => {
    setShowComment(!showComment);
  };

  useEffect(() => {
    const fetchCommentLength = async () => {
      const res = await axios.get(`${TWEET_API_END_POINT}/${tweet?._id}`, {
        withCredentials: true,
      });
      console.log("res->>lenght,res", res?.data?.comments?.length);
      setCommentLength(res?.data?.comments?.length);
    };
    fetchCommentLength();
  }, [tweet?._id, refresh]);
  const handleCommentSubmit = async (id) => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/add/${id}`,
        { addComment },
        {
          withCredentials: true,
        },
      );
      console.log("res->>", res?.data?.comment?.text);
      if (!res?.data?.comment?.text) {
        toast.success("Write something");
        return;
      }
      toast.success("Comment add successfully");
      dispatch(getRefresh());
      setAddComment("");
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };
  return (
    <>
      <div className="border-b border-gray-200 w-[]">
        <div className="w-full">
          <div className="flex flex-col">
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

                <div className=" w-[90%] flex justify-center items-center ml-12 ">
                  <div>
                    <p className="mb-2  mt-3  font-semibold  rounded ">
                      {tweet?.description}
                    </p>

                    {tweet?.image?.url && (
                      <img
                        src={tweet?.image?.url}
                        alt="image"
                        className="rounded object-cover w-186 h-110"
                      />
                    )}

                    {tweet?.video?.url && (
                      <video
                        src={tweet?.video?.url}
                        controls
                        preload="metadata"
                        className="rounded object-cover w-186 h-110"
                        playsInline
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between p-8">
              <div className="flex   p-2 rounded-full  cursor-pointer">
                <FaRegComment
                  onClick={() => HandleGetComment(tweet._id)}
                  size={23}
                  className=" text-gray-600 hover:text-green-600"
                />
                <p className="ml-2">{commentLength}</p>
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
            {showComment && selectedId === tweet._id && (
              <GetComment id={selectedId} />
            )}
            {showComment && (
              <div className=" pb-4 mt-2 px-2">
                <textarea
                  value={addComment}
                  placeholder="Write a comment..."
                  onChange={(e) => setAddComment(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => handleCommentSubmit(tweet._id)}
                  className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600"
                >
                  Comment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweets;
