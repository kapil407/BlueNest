import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant.js";
import { getRefresh } from "../redux/tweetSlice.js";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import Tweets from "./Tweets.jsx";

const Bookmarks = () => {
 
  const [loading, setLoading] = useState(false);
  const { bookmarksIds } = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme.theme);
  const isLight = theme == "light";

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
           
          },
        );

        dispatch(getRefresh());
        setBookmarkedTweets(res?.data?.tweets || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarkedTweets();
  }, [bookmarksIds, dispatch]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col">
      <div
        className={`sticky top-0 z-20 border-b px-4 py-4 backdrop-blur-xl ${
          isLight
            ? "border-slate-200 bg-white/85"
            : "border-slate-800 bg-slate-950/85"
        }`}
      >
        <h1 className="text-2xl font-black">Saved</h1>
        <p className={`text-sm ${isLight ? "text-slate-500" : "text-slate-400"}`}>
          Posts you bookmarked
        </p>
      </div>

      <div
        className={`min-h-screen border-x ${
          isLight ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-950"
        }`}
      >
        {loading ? (
          <div className="flex h-72 items-center justify-center gap-3 font-bold">
            <ClipLoader size={18} color="#1D9BF0" />
            Loading...
          </div>
        ) : bookmarkedTweets?.length == 0 ? (
          <div className="flex h-72 items-center justify-center px-6 text-center">
            <div
              className={`rounded-3xl border px-8 py-6 ${
                isLight
                  ? "border-slate-200 bg-slate-50 text-slate-600"
                  : "border-slate-800 bg-slate-900 text-slate-300"
              }`}
            >
              <h2 className="text-xl font-black">No bookmarks yet</h2>
              <p className="mt-2 text-sm">Save posts and they will appear here.</p>
            </div>
          </div>
        ) : (
          bookmarkedTweets?.map((tweet) => (
            <Tweets key={tweet?._id} tweet={tweet} />
          ))
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
