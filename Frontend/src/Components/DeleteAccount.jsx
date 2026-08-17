import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import store from "../redux/store";
import { Link } from "react-router-dom";
import { getUser } from "../redux/userSlice";
import {toast} from 'react-hot-toast'
import { getMyTweets } from "../redux/tweetSlice";

const DeleteAccountComponent = () => {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.theme.theme);
  const isLight = theme == "light";

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`${USER_API_END_POINT}/delete-account`, {
        withCredentials: true,
      });
      console.log("delete res", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(getUser(null));
        dispatch(getMyTweets(null));
        navigate("/login");
      }
    } catch (error) {
      console.log("error in delete accouunt api  call", error);
    }
  };
  return (
    <>
      <div className="  fixed w-full  lg:w-[72%] h-full insite-0 z-50 backdrop-blur-sm  ">
        <Link to="/setting">
          <FaLongArrowAltLeft className="ml-4 mt-4 cursor-pointer" size={25} />
        </Link>

        <div className="flex flex-col items-center justify-center h-full">
          <img src="/danger.png" alt="danger" className="w-30 h-30" />
          <h1
            className={`lg:mb-10 lg:text-xl  ml-6  font-black px-2 py-1 lg:px-4 lg:py-2 rounded-xl  lg:mx-4
                ${isLight ? "text-black" : "text-wehite"}
                `}
          >
            Are you sure you want to permanently delete your account? <br /> All
            your data will be permanently deleted, and this action cannot be
            undone.{" "}
          </h1>

          <div className="h-[30%] mt-4">
            <button
              onClick={deleteHandler}
              className="border border-slate-400 lg:py-2 px-2 py-1 hover:bg-red-600 lg:px-6 cursor-pointer bg-red-500 rounded-xl"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteAccountComponent;
