import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TWEET_API_END_POINT } from "../Utils/constant";
import { useEffect, useState } from "react";
import { formatMessageTime } from "../Utils/setTime.js";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { getRefresh } from "../redux/tweetSlice.js";
import { toast } from "react-hot-toast";

// import { getRefresh } from "../redux/tweetSlice";
const GetComment = ({ id }) => {
  
  const { theme } = useSelector((store) => store.theme);
  const { refresh } = useSelector((store) => store.tweet);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("id->>>", id);
        const res = await axios.get(`${TWEET_API_END_POINT}/comments/${id}`, {
          
          withCredentials: true,
        });
        setComment(res?.data.comments);
      } catch (error) {
        console.log("error in get Comment gandler", error);
      }
    };
    if (id) fetchComments();
  }, [id, refresh]);

  const deleteCommentHandler = async (commentId) => {
    try {
      const res = await axios.delete(
        `${TWEET_API_END_POINT}/comments/deleteComment/${commentId}`,
        {
          withCredentials: true,
        },
      );

      toast.success(res?.data?.message);
      dispatch(getRefresh());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Comment delete failed");
    }
  };
  let CommentContent = [];

  if (Array.isArray(comment)) {
    CommentContent = comment;
  }
  // if (!CommentContent.length) {
  //   return <></>;
  // }
  console.log("comment ",CommentContent);
  
  
  const  LikeOrDisLikeHandler=async (commentID)=>{
    const res=await axios.post(`${TWEET_API_END_POINT}/comments/${commentID}`,{},{
      withCredentials:true,
    })
    console.log("res->>>>.",res);
  
    dispatch(getRefresh());
  }

  return (
    <div
      className={` inline h-35 flex ml-2 overflow-auto  mt-1 rounded mr-2 p-2 ${theme == "light" ? "" : "text-gray-400 "}`}
    >
      {CommentContent &&
        CommentContent?.map((ele) => {
          const commentUser = ele?.user;
          const canDelete =
            user?._id?.toString() === commentUser?._id?.toString();

          return (
            <div key={ele._id} className="break-words ">
              <div className=" rounded whitespace-pre-wrap inline-block max-w-[75%] my-4 flex flex-col">
                <div className="flex">
                  <img
                    src={commentUser?.profilePic?.url}
                    alt=""
                    className="object-cover h-10 w-10 rounded-full"
                  />
                  <h1 className="mx-2 font-bold">
                    {commentUser?.firstName || commentUser?.userName || "User"}
                  </h1>
                  <h3> {formatMessageTime(ele.createdAt)}</h3>
                </div>
                <div className="flex justify-evenly flex-col">
                  <h1 className=" px-2 ml-10">{ele.text}</h1>
                  <div className="flex justify-between ">
                    {canDelete && (
                      <MdOutlineDeleteOutline
                        onClick={() => deleteCommentHandler(ele._id)}
                        className="ml-4 cursor-pointer hover:text-red-600"
                        size={20}
                      />
                    )}
                   <div  className={`cursor-pointer flex gap-2 hover:text-pink-400 ${ele?.likes?.includes(ele.user?._id)?"text-red-600 object-cover":""}`}>
                     <AiOutlineLike size={20} onClick={()=>LikeOrDisLikeHandler(ele?._id)} className="cursor-pointer " />
                     <h1>{ele?.likes?.length}</h1>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default GetComment;
