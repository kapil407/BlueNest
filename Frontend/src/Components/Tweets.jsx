import React, { useState } from "react";
import Avatar from "react-avatar";
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

import { getBookMarksIds } from "../redux/userSlice.js";

import useBookmarks from "../hooks/useBookmarks.js";
import { useEffect } from "react";
import { setComment } from "../redux/commentSlice.js";

const Tweets = ({ tweet }) => {
  const [showComment, setShowComment] = useState(false);
  const [addComment, setAddComment] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [commentLength, setCommentLength] = useState(0);

  const { bookmarksIds } = useSelector((store) => store.user);
  const { refresh } = useSelector((store) => store.tweet);
  const theme = useSelector((store) => store.theme.theme);
  const isLight = theme == "light";

  const isBookmarked = bookmarksIds?.some(
    (id) => id.toString() === tweet?._id?.toString(),
  );
  const { handleBookmark } = useBookmarks();

  const firstUser =
    Array.isArray(tweet.userDetails) && tweet.userDetails.length > 0
      ? tweet.userDetails[0]
      : null;

  const { user } = useSelector((store) => store.user);

  const image = firstUser?.profilePic;

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
      const res = await axios.get(`${TWEET_API_END_POINT}/comments/${tweet?._id}`, {
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
        `${TWEET_API_END_POINT}/comments/add/${id}`,
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
    <article
      className={`border-b px-4 py-5 transition ${
        isLight
          ? "border-slate-200 hover:bg-slate-50"
          : "border-slate-800 hover:bg-slate-900/55"
      }`}
    >
      <div className="flex gap-3">
        <Link to={`profile/${tweet?.userId}`} className="shrink-0">
          {!image?.url ? (
            <Avatar
              className="cursor-pointer"
              src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
              size="48"
              round={true}
            />
          ) : (
            <img
              src={image?.url}
              alt="photo"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-sky-500/20"
            />
          )}
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h1 className="font-black">{firstUser?.firstName || "BlueNest User"}</h1>
            <p className={`text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              @{firstUser?.userName || "user"} · {formatMessageTime(tweet.createdAt)}
            </p>
          </div>

          {tweet?.description && (
            <p className="mt-2 whitespace-pre-wrap text-[15px] leading-6">
              {tweet?.description}
            </p>
          )}

          {tweet?.image?.url && (
            <img
              src={tweet?.image?.url}
              alt="post"
              className="mt-3 max-h-[520px] w-full rounded-3xl border border-slate-200 object-cover dark:border-slate-800"
            />
          )}

          {tweet?.video?.url && (
            <video
              src={tweet?.video?.url}
              controls
              preload="metadata"
              className="mt-3 max-h-[520px] w-full rounded-3xl border border-slate-200 object-cover dark:border-slate-800"
              playsInline
            />
          )}

          <div className="mt-3 flex  items-center justify-between">
            <button
              type="button"
              onClick={() => HandleGetComment(tweet._id)}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm transition hover:bg-emerald-500/10 hover:text-emerald-500 ${
                isLight ? "text-slate-500" : "text-slate-400"
              }`}
            >
              <FaRegComment size={18} />
              <span>{commentLength}</span>
            </button>

            <button
              type="button"
              onClick={() => likeDisLikeHandler(tweet?._id)}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm transition hover:bg-pink-500/10 hover:text-pink-500 ${
                isLiked
                  ? "text-pink-600"
                  : isLight
                    ? "text-slate-500"
                    : "text-slate-400"
              }`}
            >
              <BiLike size={20} />
              <span>{tweet.likes.length}</span>
            </button>

            {user?._id !== tweet.userId ? (
              <button
                type="button"
                onClick={() => handleBookmark(tweet?._id)}
                className={`rounded-full px-3 py-2 transition hover:bg-yellow-500/10 hover:text-yellow-500 ${
                  isBookmarked
                    ? "text-yellow-500"
                    : isLight
                      ? "text-slate-500"
                      : "text-slate-400"
                }`}
              >
                <PiBookmarkSimpleBold size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => DeleteTweetHandler(tweet?._id)}
                className={`rounded-full px-3 py-2 transition hover:bg-red-500/10 hover:text-red-500 ${
                  isLight ? "text-slate-500" : "text-slate-400"
                }`}
              >
                <MdOutlineDelete size={21} />
              </button>
            )}
          </div>

          {showComment && selectedId === tweet._id && <GetComment id={selectedId} />}
          {showComment && (
            <div className="mt-3">
              <textarea
                value={addComment}
                placeholder="Write a comment..."
                onChange={(e) => setAddComment(e.target.value)}
                className={`w-full resize-none rounded-2xl border p-3 outline-none transition focus:ring-4 focus:ring-sky-500/20 ${
                  isLight
                    ? "border-slate-200 bg-white text-slate-950"
                    : "border-slate-800 bg-slate-900 text-slate-100"
                }`}
              />
              <button
                onClick={() => handleCommentSubmit(tweet._id)}
                className="mt-2 cursor-pointer rounded-full bg-[#1D9BF0] px-5 py-2 font-bold text-white hover:bg-sky-500"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Tweets;
