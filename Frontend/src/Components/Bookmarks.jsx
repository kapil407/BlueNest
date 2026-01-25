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
import { getRefresh } from "../redux/tweetSlice.js";
import { useDispatch } from "react-redux";
import { formatMessageTime } from "../Utils/setTime.js";
import ClipLoader from "react-spinners/ClipLoader";

export const Bookmarks = () => {
  const { handleBookmark } = useBookmarks();
  const [loading, setLoading] = useState(false);

  const { bookmarksIds, otherUsers, user } = useSelector((store) => store.user);
  const { tweet } = useSelector((store) => store.tweet);

  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookmarkedTweets = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${USER_API_END_POINT}/getbookmarkedtweets`,
          {},
          {
            withCredentials: true,
            headers: {
              "content-type": "application/json",
            },
          },
        );

        // console.log("res-> ", res?.data?.tweets);
        dispatch(getRefresh());
        setBookmarkedTweets(res?.data?.tweets);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarkedTweets();
  }, [bookmarksIds]);

  return (
    <div className="w-[65%] mt-2 ml-6 ">
      {bookmarkedTweets?.length == 0 ? (
        <div className="h-screen flex justify-center items-center">
          <div
            className="mb-15 w-[50%] h-[15%] font-bold text-lg rounded border border-gray-400 text-center flex justify-center items-center"
            style={{
              boxShadow: "4px 8px 57px 3px rgba(83,241,238,0.72)",
              WebkitBoxShadow: "4px 8px 57px 3px rgba(83,241,238,0.72)",
              MozBoxShadow: "4px 8px 57px 3px rgba(83,241,238,0.72)",
            }}
          >
            {loading ? (
              <>
                <ClipLoader size={18} className="text-red-600" />
                Loading...
              </>
            ) : (
              "No Bookmarks "
            )}
          </div>
        </div>
      ) : (
        <>
          {bookmarkedTweets.map((tweets) => {
            const isLiked = tweets?.likes?.includes(user?._id);
            const isBookmarks = bookmarksIds.includes(tweets?._id);
            return (
              <>
                <div
                  key={tweets?._id}
                  className="border border-gray-300 w-[100%] mt-2   rounded p-2 flex flex-col"
                  style={{
                    boxShadow: "-1px -1px 5px -1px rgba(0,0,0,0.75)",
                    WebkitBoxShadow: "-1px -1px 5px -1px rgba(0,0,0,0.75)",
                    MozBoxShadow: "-1px -1px 5px -1px rgba(0,0,0,0.75)",
                  }}
                >
                  <div className="flex w-[100%]">
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
                          src={tweets?.userDetails[0]?.profilePic?.url}
                          className="w-15 h-15 object-cover rounded-full"
                          alt=""
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="ml-2 flex mt-3">
                        <h1 className="font-bold ">
                          {tweets?.userDetails[0]?.firstName}
                        </h1>
                        <p className="ml-2 ">
                          @{tweets?.userDetails[0]?.userName}
                        </p>
                        <p className="ml-2">
                          {formatMessageTime(tweets?.createdAt)}
                        </p>
                      </div>
                      <div className="  flex justify-center items-center ">
                        <div>
                          <p className="mb-2  mt-3 font-semibold">
                            {tweets?.description}
                          </p>

                          {!tweets?.image?.url ? (
                            <video
                              src={tweets?.video?.url}
                              controls
                              preload="metadata"
                              className={
                                tweets?.description
                                  ? " rounded object-cover w-228 h-140 "
                                  : " rounded object-cover w-228 h-140 mt-12"
                              }
                              playsInline
                            />
                          ) : (
                            <>
                              <img
                                src={tweets?.image?.url}
                                alt="image"
                                className={
                                  tweets?.description
                                    ? " rounded object-cover w-228 h-140 "
                                    : " rounded object-cover w-228 h-140 mt-12"
                                }
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 mb-2 flex justify-between">
                    <div className="flex   p-2 ml-11 rounded-full cursor-pointer">
                      <FaRegComment
                        size={23}
                        className="text-gray-600 hover:text-green-600"
                      />
                      <p className="ml-2">0</p>
                    </div>
                    <div className="flex  p-2  rounded-full cursor-pointer">
                      <BiLike
                        size={25}
                        className={
                          isLiked
                            ? "text-pink-600"
                            : "text-gray-500 hover:text-pink-600"
                        }
                      />

                      <p className="ml-2">{`${tweets.likes.length}`}</p>
                    </div>
                    <div
                      onClick={() => handleBookmark(tweets?._id)}
                      className="flex  p-2 mr-11 rounded-full cursor-pointer"
                    >
                      <PiBookmarkSimpleBold
                        size={25}
                        className={
                          isBookmarks ? "text-yellow-600" : "text-gray-600"
                        }
                      />
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
