import React from "react";
import CreatePost from "./CreatePost";
import Tweets from "./Tweets";
import { useSelector } from "react-redux";


const Feed = () => {
  const { tweet } = useSelector((store) => store?.tweet);
  const theme = useSelector((store) => store.theme.theme);
  const isLight = theme == "light";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[680px] flex-col">
      <div
        className={`sticky top-0 z-20 border-b px-4 py-4 backdrop-blur-xl ${
          isLight
            ? "border-slate-200 bg-white/85"
            : "border-slate-800 bg-slate-950/85"
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
        <CreatePost />

        {tweet?.map((tweet) => (
          <Tweets key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
