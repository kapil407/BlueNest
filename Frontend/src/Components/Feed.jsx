import React from "react";
import CreatePost from "./CreatePost";
import Tweets from "./Tweets";
import { useSelector } from "react-redux";


const Feed = () => {
  const { tweet } = useSelector((store) => store?.tweet);

  return (
    <>
      <div className="w-[55%] ml-2 flex  border border-gray-300 flex-col">
        <CreatePost />

        {tweet?.map((tweet) => (
          <Tweets key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </>
  );
};

export default Feed;
