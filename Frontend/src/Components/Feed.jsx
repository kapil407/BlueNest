import React from "react";
import CreatePost from "./CreatePost";
import Tweets from "./Tweets";
import { useSelector } from "react-redux";
import { CgLayoutGrid } from "react-icons/cg";

const Feed = () => {
  const { tweet } = useSelector((store) => store?.tweet);

  return (
    <>
      <div className="w-[65%] ml-6 flex mt-1 border border-gray-300 flex-col">
        <CreatePost />

        {tweet?.map((tweet) => (
          <Tweets key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </>
  );
};

export default Feed;
