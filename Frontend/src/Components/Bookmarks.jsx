import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import useBookmarks from '../hooks/useBookmarks.js'

export const Bookmarks = () => {
  
 
  const {handleBookmark}=useBookmarks();

  const { bookmarksIds } = useSelector((store) => store.user);


  console.log("kapil-> ", bookmarksIds);
 

  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  useEffect(() => {
    console.log(bookmarksIds?.length);
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
      {bookmarkedTweets.map((tweets) => {
        return (
          <>
            <div
              key={tweets?._id}
              className="border border-gray-300 w-[100%] mt-2  rounded p-2 flex flex-col"
            >
              <div className="flex ">
                <Link to={`/profile/${tweets?.userId}`}>
                 
                  <Avatar
                  className="m-1 cursor-pointer"
                    src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                    size="50"
                    round={true}
                  />
                </Link>
                <div className="flex flex-col">
                  <div className="ml-2 flex">
                    <h1 className="font-bold">
                      {tweets?.userDetails[0]?.firstName}
                    </h1>
                    <p className="ml-2">@{tweets?.userDetails[0]?.userName}</p>
                  </div>
                  <div>
                    <h1 className="ml-6 mt-2">{tweets?.description}</h1>
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
                <div onClick={()=>handleBookmark(tweets?._id)} className="flex hover:bg-yellow-200 p-2 rounded-full cursor-pointer">
                  <PiBookmarkSimpleBold size={25}/>
                
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
