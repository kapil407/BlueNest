import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import useBookmarks from "../hooks/useBookmarks.js";

export const Bookmarks = () => {
  const { handleBookmark } = useBookmarks();

  const { bookmarksIds, otherUsers } = useSelector((store) => store.user);

  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);

  useEffect(() => {
    if (bookmarksIds?.length > 0) {
      const fetchBookmarkedTweets = async () => {
        try {
          const res = await axios.post(
            `${USER_API_END_POINT}/getbookmarkedtweets`,
            { ids: bookmarksIds },
            {
              withCredentials: true,
              headers: {
                "content-type": "application/json",
              },
            }
          );

          console.log("res-> ", res?.data?.tweets);
          setBookmarkedTweets(res?.data?.tweets);
        } catch (error) {
          console.log(error);
        }
      };
      fetchBookmarkedTweets();
    }
  }, [bookmarksIds]);

  return (
    <div className="w-[55%] mt-2 ">
      {bookmarksIds?.length == 0 ? (
        <div className="h-screen flex justify-center items-center">
          <div
            className="mb-15 w-[50%] h-[15%] font-bold text-lg rounded bg-green-100  border border-gray-400 text-center flex justify-center items-center"
            style={{
              boxShadow: "4px 8px 57px 3px rgba(83,241,238,0.72)",
              WebkitBoxShadow: "4px 8px 57px 3px rgba(83,241,238,0.72)",
              MozBoxShadow: "4px 8px 57px 3px rgba(83,241,238,0.72)",
            }}
          >
            No bookmarks
          </div>
        </div>
      ) : (
        <>
          {bookmarkedTweets.map((tweets) => {
            return (
              <>
                <div
                  key={tweets?._id}
                  className="border border-gray-300 w-[90%] mt-2   rounded p-2 flex flex-col"
                  style={{
                    boxShadow: "-1px -1px 5px -1px rgba(0,0,0,0.75)",
                    WebkitBoxShadow: "-1px -1px 5px -1px rgba(0,0,0,0.75)",
                    MozBoxShadow: "-1px -1px 5px -1px rgba(0,0,0,0.75)",
                  }}
                >
                  <div className="flex ">
                    <div>
                      {!tweets.userDetails[0].profilePic ? (
                        <Avatar
                          className="m-1 cursor-pointer"
                          src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                          size="50"
                          round={true}
                        />
                      ) : (
                        <img
                          src={tweets.userDetails[0].profilePic}
                          className="w-15 h-15 object-cover rounded-full"
                          alt=""
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="ml-2 flex">
                        <h1 className="font-bold">
                          {tweets?.userDetails[0]?.firstName}
                        </h1>
                        <p className="ml-2">
                          @{tweets?.userDetails[0]?.userName}
                        </p>
                      </div>
                      <div>
                        {!tweets?.image ? (
                          <h1 className="ml-6 mt-2">{tweets?.description}</h1>
                        ) : (
                          <>
                            <h1 className="ml-6 mt-2">{tweets?.description}</h1>
                            <img
                              src={tweets?.image}
                              alt="image"
                              className="mt-6 ml-4 object-cover rounded w-120 h-120"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 mb-2 flex justify-around">
                    <div className="flex  hover:bg-green-200 p-2 rounded-full cursor-pointer">
                      <FaRegComment size={23} />
                      <p className="ml-2">0</p>
                    </div>
                    <div className="flex hover:bg-pink-200 p-2 rounded-full cursor-pointer">
                      <BiLike size={25} />

                      <p className="ml-2">{`${tweets.likes.length}`}</p>
                    </div>
                    <div
                      onClick={() => handleBookmark(tweets?._id)}
                      className="flex hover:bg-yellow-200 p-2 rounded-full cursor-pointer"
                    >
                      <PiBookmarkSimpleBold size={25} />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};
