import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";
import { setMessage } from "../redux/messageSlice";
import useGetMessages from "../hooks/usegetmessage";
import { useRef } from "react";

import useSocket from "../hooks/useSocket.js";
import { FormateMessageTime } from "../Utils/setTime.js";


export const Message = () => {
  useGetMessages();
  const socket = useSocket();


  const messagesEndRef = useRef(null);
  const [Message, setmessage] = useState("");

  const dispatch = useDispatch();
  const { targetUserId } = useParams();
  const { user , otherUsers } = useSelector((store) => store?.user);
  const { message } = useSelector((store) => store.message);

  let targetUser;
  otherUsers?.forEach(element => {
    if(element._id==targetUser);
      targetUser=element;
      
  });
  
    
  const userId = user?._id;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const sendmessages = async () => {
    if (!Message.trim()) return;

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/sendMessage/${targetUserId}`,
        { message: Message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log("res->", res.data.newMessage);
      dispatch(setMessage( [...message, res?.data?.newMessage]));
    
      if (socket) {
        socket.emit("sendMessage", {
          senderId: userId,
          receiverId: targetUserId,
          message: res?.data?.newMessage?.message, 
        });
      }

      setmessage(""); 
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (data) => {
      console.log(" New message received:", data);

      if (data?.message && data?.senderId) {
        dispatch(
          setMessage([
            ...message,
            {
              senderId: data.senderId,
              receiverId: data.receiverId,
              message: data.message,
            },
          ])
        );
      }
    });

    return () => socket.off("receiveMessage");
  }, [socket, message]);

  let array = [];

  if (Array.isArray(message)) {
    array = message;
  } else if (message && typeof message === "object") {
    array = Object.values(message);
  }
  
  return (
    <div className="w-[40%] mt-1 border-l border-r border-gray-300 rounded h-screen fixed mx-75">
      {/* Header */}
      <div className="border p-3 rounded flex  items-center bg-gray-200 border-gray-400">
       <Link to='/' > <IoMdArrowRoundBack  size={22} className="cursor-pointer" /></Link>
          <img src={targetUser?.profilePic} alt="" className="w-14 h-14 rounded-full ml-2 object-cover" />
        <h1 className="ml-5 text-xl font-semibold">{targetUser?.firstName} {targetUser?.lastName}</h1>
      </div>

      {/* Chat Messages */}
      <div className="ml-4 mr-4 mt-2 mb-2 h-[75%] overflow-auto custom-scrollbar">
        {array &&
          array?.map((msg, idx) =>{
           
          return (
              <div
                key={idx}
                className={`my-1 ${
                  msg?.senderId === userId ? "text-right" : "text-left"
                }`}
              >
               <div className="text-center inline-block max-w-[70%] mr-4 mt-4 bg-gray-200 px-3 py-1 rounded-xl break-words whitespace-pre-wrap overflow-hidden l">
                 <div>
                  {msg?.message}
                 
                </div>
                 <span className="text-[10px] font-sm">{FormateMessageTime(msg.createdAt)}</span>
               </div>
              </div>
          );
         }) }
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Box */}
      <div className="border rounded border-gray-400 h-[10%] p-2 items-center bg-gray-200 text-center flex justify-between">

       
        <input
          type="text"
          value={Message}
          onChange={(e) => setmessage(e.target.value)}
          placeholder="Write the message"
          className="outline-none w-[70%]"
         
        />
        <button onClick={()=> sendmessages()} className="mr-2 border border-gray-400 p-1 w-18 h-12 rounded   bg-gray-200 hover:bg-gray-300 cursor-pointer">send</button>
      </div>
    </div>
  );
};
