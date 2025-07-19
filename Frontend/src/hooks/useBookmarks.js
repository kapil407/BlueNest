import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { getBookMarksIds } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


 const useBookmarks=()=>{
    const dispatch=useDispatch();
    
    const handleBookmark = async (tweetId) =>{
    try {
      const res = await axios.patch(
        `${USER_API_END_POINT}/bookmarkstweet/${tweetId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Bookmark Updated", res);
      toast.success(res?.data?.message);
      dispatch(getRefresh()); 
      dispatch(getBookMarksIds(res?.data?.updatedUserData?.bookmarks));
    
    } catch (error) {
      console.log("Bookmark Error", error);
    }
  };
   return { handleBookmark };  
}
export default useBookmarks;
