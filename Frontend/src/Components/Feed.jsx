import React from "react";
import CreatePost from "./CreatePost";
import Tweets from "./Tweets";
import { useDispatch, useSelector } from "react-redux";
import { getIsActive } from "../redux/tweetSlice.js";


const Feed = () => {
  const { tweet, isActive } = useSelector((store) => store?.tweet);
  const theme = useSelector((store) => store.theme.theme);
  const isLight = theme == "light";
  const dispatch = useDispatch();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col">
      <div
        className={`border-b px-4 py-4 ${
          isLight
            ? "border-slate-200 bg-white"
            : "border-slate-800 bg-slate-950"
        }`}
      >
        <h1 className="text-2xl font-black">Home</h1>
        <p className={`text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>
          Fresh posts from your circle
        </p>
      </div>

      <div
        className={`border-x ${
          isLight ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-950"
        }`}
      >
        <div
          className={`sticky top-0 z-30 grid grid-cols-2 border-b backdrop-blur-xl ${
            isLight
              ? "border-slate-200 bg-white/90"
              : "border-slate-800 bg-slate-950/90"
          }`}
        >
          <button
            type="button"
            onClick={() => dispatch(getIsActive(true))}
            className={`group flex cursor-pointer justify-center text-center transition hover:bg-sky-500/10 ${
              isActive
                ? "text-sky-500"
                : isLight
                  ? "text-slate-500"
                  : "text-slate-400"
            }`}
          >
            <span className="relative px-4 py-4 text-base font-black">
              For you
              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1D9BF0]" />
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={() => dispatch(getIsActive(false))}
            className={`group flex cursor-pointer justify-center text-center transition hover:bg-sky-500/10 ${
              !isActive
                ? "text-sky-500"
                : isLight
                  ? "text-slate-500"
                  : "text-slate-400"
            }`}
          >
            <span className="relative px-4 py-4 text-base font-black">
              Following
              {!isActive && (
                <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-[#1D9BF0]" />
              )}
            </span>
          </button>
        </div>

        <CreatePost />

        {tweet?.map((tweet) => (
          <Tweets key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
