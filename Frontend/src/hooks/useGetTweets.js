import { useEffect } from "react";
import { TWEET_API_END_POINT } from "../Utils/constant.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMyTweets } from "../redux/tweetSlice.js";
import { getRefresh } from "../redux/tweetSlice.js";

const useGetTweets = () => {
  const { refresh, isActive } = useSelector((store) => store?.tweet);
  const { user } = useSelector((store) => store.user);
  const { tweet } = useSelector((store) => store.tweet);

  const dispatch = useDispatch();
  const fetchTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/allTweets`, {
        withCredentials: true,
      });

      dispatch(getMyTweets(res?.data?.alltweet));
    } catch (error) {
      console.error(error);
    }
  };
  const followingTweetHandler = async () => {
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followTweets/${user?._id}`,
        {
          withCredentials: true,
        }
      );

      dispatch(getMyTweets(res?.data?.allTweets));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (isActive) {
      fetchTweets();
    } else {
      followingTweetHandler();
    }
  }, [refresh, isActive]);
};
export default useGetTweets;
