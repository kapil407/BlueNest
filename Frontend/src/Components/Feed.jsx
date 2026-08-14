import React, { useState } from "react";
import CreatePost from "./CreatePost";
import Tweets from "./Tweets";
import { useDispatch, useSelector } from "react-redux";
import { getIsActive } from "../redux/tweetSlice.js";
import { IoReorderThreeSharp } from "react-icons/io5";
import LeftSideBar from "./LeftSideBar.jsx";
import RightSideBar from "./RightSideBar.jsx";
import Typewriter from "./TypeWriter.jsx";

const Feed = () => {
  const { tweet, isActive } = useSelector((store) => store?.tweet);
  const { otherUsers } = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme.theme);
  const isLight = theme == "light";
  const dispatch = useDispatch();
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const leftHambergerHandler = () => {
    if (isRightOpen) setIsRightOpen(false);
    setIsLeftOpen((prev) => !prev);
  };
  const rightHambergerHandler = () => {
    if (isLeftOpen) setIsLeftOpen(false);
    setIsRightOpen((prev) => !prev);
  };

  return (
    <div className="mx-auto flex   w-full flex-col">
      <div
        className={`border-b px-4 py-4 ${
          isLight
            ? "border-slate-200 bg-white"
            : "border-slate-800 bg-slate-950"
        }`}
      >
        <div className="flex justify-between">
          <div className="flex gap-2">
            <IoReorderThreeSharp
              onClick={leftHambergerHandler}
              size={30}
              className=" mt-0.5 cursor-pointer lg:hidden"
            />
            <LeftSideBar
              className={`
    fixed top-0 left-0 z-50 lg:hidden
    h-full w-[60%] lg:w-50 px-4 py-4 shadow-2xl
    transition-transform duration-400 ease-in-out
    ${isLight ? "bg-white" : "bg-slate-950"}
    ${isLeftOpen ? "translate-x-0 border-r  " : "-translate-x-full"}
  `}
              onClose={() => setIsLeftOpen(false)}
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-black">Home</h1>
              <p
                className={`text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}
              >
              <Typewriter word="Fresh posts from your circle" className="text-sm"/>
              </p>
            </div>
          </div>
          <div>
            {/* {right hamberger } */}
            <IoReorderThreeSharp
              onClick={rightHambergerHandler}
              size={30}
              className=" mt-0.5 cursor-pointer lg:hidden"
            />
            <RightSideBar
              otherUsers={otherUsers}
              className={`
    fixed top-0 right-0 z-50 lg:hidden
    h-full  px-8 py-4 shadow-2xl
    transition-transform duration-300 ease-in-out
    ${isLight ? "bg-white" : "bg-slate-950"}
    ${isRightOpen ? "translate-x-0 border-l" : "translate-x-full"}
  `}
              onClose={() => setIsRightOpen(false)}
            />
          </div>
        </div>
      </div>

      <div
        className={`border-x ${
          isLight
            ? "border-slate-200 bg-white"
            : "border-slate-800 bg-slate-950"
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
