import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TWEET_API_END_POINT } from "../Utils/constant";
import { useEffect, useState } from "react";
import { formatMessageTime } from "../Utils/setTime.js";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
// import { getRefresh } from "../redux/tweetSlice";
const GetComment = ({ id }) => {
  const { theme } = useSelector((store) => store.theme);
  const { refresh } = useSelector((store) => store.tweet);
  const [user, setUser] = useState();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("id->>>", id);
        const res = await axios.get(`${TWEET_API_END_POINT}/${id}`, {
          withCredentials: true,
        });
        console.log("res->>> get Comment", res.data.user);
        setComment(res?.data.comments);

        setUser(res?.data?.user);
      } catch (error) {
        console.log("error in get Comment gandler", error);
      }
    };
    if (id) fetchComments();
  }, [id, refresh]);
  let CommentContent = [];

  if (Array.isArray(comment)) {
    CommentContent = comment;
  }
  if (!CommentContent.length) {
    return <></>;
  }

  return (
    <div
      className={` inline h-35 flex ml-2 overflow-auto  mt-1 rounded mr-2 p-2 ${theme == "light" ? "" : "text-gray-400 "}`}
    >
      {CommentContent &&
        CommentContent?.map((ele) => (
          <div key={ele._id} className="break-words ">
            <div className=" rounded whitespace-pre-wrap inline-block max-w-[75%] my-4 flex flex-col">
              <div className="flex">
                <img
                  src={user?.profilePic?.url}
                  alt=""
                  className="object-cover h-10 w-10 rounded-full"
                />
                <h1 className="mx-2 font-bold">{user.firstName}</h1>
                <h3> {formatMessageTime(ele.createdAt)}</h3>
              </div>
              <div className="flex justify-evenly flex-col">
                <h1 className=" px-2 ml-10">{ele.text}</h1>
                <div className="flex justify-between ">
                  <MdOutlineDeleteOutline
                    className="ml-4 cursor-pointer"
                    size={20}
                  />
                  <AiOutlineLike size={20} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GetComment;
