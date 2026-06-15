import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../Utils/constant";
import { setMessage } from "../redux/messageSlice";
import useGetMessages from "../hooks/usegetmessage";
import { useRef } from "react";

import useSocket from "../hooks/useSocket.js";
import { formatMessageTime } from "../Utils/setTime.js";
import store from "../redux/store.js";
import { getRefresh } from "../redux/tweetSlice.js";


const Message = () => {
  
  const theme = useSelector((store) => store.theme.theme);
  const {refresh}=useSelector(store=>store.tweet);
  useGetMessages();
  const socket = useSocket();

  const messagesEndRef = useRef(null);
  const [Message, setmessage] = useState("");

  const dispatch = useDispatch();
  const { targetUserId } = useParams();
  const { user, otherUsers } = useSelector((store) => store?.user);
  const { message } = useSelector((store) => store.message);

  let targetUser;
  otherUsers?.forEach((element) => {
    if (element._id == targetUserId) targetUser = element;
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
          
          withCredentials: true,
        },
      );

      // console.log("res->", res.data.newMessage);
      dispatch(setMessage([...message, res?.data?.newMessage]));
      dispatch(getRefresh());

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
              createdAt: new Date(),
            },
          ]),
        );
      }
    });

    return () => socket.off("receiveMessage");
  }, [socket, message,refresh]);

  let array = [];

  if (Array.isArray(message)) {
    array = message;
  } else if (message && typeof message === "object") {
    array = Object.values(message);
  }

  return (
    <div className="fixed inset-y-0 left-1/2 z-10 flex w-full max-w-3xl -translate-x-1/2 flex-col border-x border-gray-200 bg-white shadow-xl sm:w-[78%] lg:w-[55%]">
      {/* Header */}
      <div
        className={`flex items-center gap-3 border-b px-4 py-3 ${theme == "light" ? "border-gray-200 bg-white text-gray-950" : "border-gray-700 bg-black text-white"}`}
      >
        <Link
          to="/"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition ${theme == "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"}`}
        >
          {" "}
          <IoMdArrowRoundBack size={22} className="cursor-pointer" />
        </Link>
        <img
          src={targetUser?.profilePic?.url}
          alt=""
          className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200"
        />
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold">
            {targetUser?.firstName} {targetUser?.lastName}
          </h1>
          <p
            className={`text-sm ${theme == "light" ? "text-gray-500" : "text-gray-400"}`}
          >
            Messages
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className={`custom-scrollbar flex-1 overflow-auto px-4 py-5 ${theme == "light" ? "bg-gray-50" : "bg-gray-950"}`}
      >
        {array &&
          array?.map((msg, idx) => {
            return (
              <div
                key={idx}
                className={`mb-3 flex ${
                  msg?.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2 text-left shadow-sm ${
                    msg?.senderId === userId
                      ? "rounded-br-md bg-blue-600 text-white"
                      : theme == "light"
                        ? "rounded-bl-md bg-white text-gray-950 ring-1 ring-gray-200"
                        : "rounded-bl-md bg-gray-800 text-white"
                  }`}
                >
                  <div className="break-words whitespace-pre-wrap text-sm leading-relaxed">
                    {msg?.message}
                  </div>
                  <span
                    className={`mt-1 block text-right text-[10px] ${
                      msg?.senderId === userId
                        ? "text-blue-100"
                        : theme == "light"
                          ? "text-gray-500"
                          : "text-gray-400"
                    }`}
                  >
                    {formatMessageTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Box */}
      <div
        className={`flex items-center gap-3 border-t px-4 py-3 ${theme == "light" ? "border-gray-200 bg-white" : "border-gray-700 bg-black"}`}
      >
        <input
          type="text"
          value={Message}
          onChange={(e) => setmessage(e.target.value)}
          placeholder="Write the message"
          className={`h-12 flex-1 rounded-full border px-5 outline-none transition focus:ring-2 focus:ring-blue-500 ${theme == "light" ? "border-gray-200 bg-gray-50 text-gray-950 placeholder:text-gray-400" : "border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"}`}
        />
        <button
          type="button"
          onClick={() => sendmessages()}
          className="h-12 min-w-24 rounded-full bg-blue-600 px-5 font-medium text-white transition hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Message;
