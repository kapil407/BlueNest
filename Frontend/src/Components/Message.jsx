import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { createSocketConnection } from "../Utils/socket";
import { useParams, Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
// import { Navigate } from "react-router-dom";

export const Message = () => {
  const [sendMessages,setSendMessage]=useState([]);
  const [recievedMessage,setRecievedMessage]=useState([]);
  const [newMessage, setnewMessage] = useState("");
  const { targetUserId } = useParams();
  // console.log("targetUserId->",targetUserId);
  // const navigate=Navigate();
  
  const { user, otherUsers } = useSelector((store) => store?.user);
  const userId = user?._id;
  const followingsId = user?.following;

  const followings = otherUsers?.filter((otherUser) =>
    followingsId?.includes(otherUser?._id)
  );
  // console.log("followingUser",followings)
const targetUser=followings.filter(otherUser=>{
    return targetUserId?.includes(otherUser?._id)
  });
  // console.log("targetUser",targetUser);
  useEffect(() => {
    if (!user) return;
    // as soon this page is load useEffect is mount
    const socket = createSocketConnection();
    // event
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });
    socket.on("recievedMessage", ({ firstName, text ,targetUserId}) => {
     
      if(targetUserId===userId){  // jab target msg recieved karta hai then ye triggerd hoga 
         
          setRecievedMessage((recievedMessage)=>[...recievedMessage,{firstName,text}]);
      }
     else{ 
     setSendMessage((sendMessages) => [...sendMessages, { firstName, text }]);
     }
    });
    return () => {
      socket.disconnect(); // when page is unload ,  socket must be disconnect
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
   
    const socket = createSocketConnection();
    if(newMessage){
      socket.emit("sendMessage", {
        firstName: user?.firstName,
        userId,
        targetUserId,
        text: newMessage,
      });
    }
    
   
    setnewMessage("");
  };
  return (
    <>
      <div className="flex justify-center border  border-gray-200 my-1  w-[55%] h-[95%] fixed left-[20%]">
        {/* { this is left div for users} */}
        <div className="w-[30%] border-r border-gray-300 flex  flex-col break-words whitespace-normal p-1 bg-gray-100 ">
          <p className="font-semibold  my-1">Chat</p>

          <input
            type="text"
            placeholder="Search"
            className="outline-none border-gray-300 rounded border-b p-1 my-1 text-gray-900 border-b-gray-400 bg-gray-100"
          />

          <div className=" overflow-y-scroll h-[95%] hover:custom-scrollbar mx-1 ">
            {followings?.map((followingUser) => {
              return (
                <>
                  <Link
                    to={`/Message/${followingUser?._id}`}
                    key={followingUser?._id}
                    className="flex cursor-pointer rounded items-center  py-1 bg-gray-200 my-1.5 w-[90%] border border-gray-300"
                  >
                    <Avatar
                      className="m-1 cursor-pointer"
                      src="https://tecdn.b-cdn.net/img/new/avatars/2.webp "
                      size="30"
                      round={true}
                    />
                    <h1 className="ml-2">{followingUser?.firstName}</h1>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        {/* { this is message box} */}
        <div className="w-[70%] h-[100%] ">
          <div className="border-b flex items-center p-2 border-gray-200 bg-gray-100 w-[100%]">
           <Link to={'/Message'}>
           <IoMdArrowRoundBack  className="cursor-pointer mr-2 " />
           </Link>
          <Link to={'/profile/:targetUserId'}>
          
          <h1 className="cursor-pointer">{targetUser[0]?.firstName} {targetUser[0]?.lastName}</h1>
          </Link>
          </div>
          {/*chat box*/}
          <div className="w-[100%] flex flex-col justify-between break-words whitespace-normal  h-[94%] ">
            <div className="my-2 overflow-y-scroll custom-scrollbar ">
             {/* user message box*/}
              {
                sendMessages.map((message,index)=>{
                  return <div key={index} className="chat chat-start">
                <div className="chat-header">
                 {message.firstName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">
                {message.text}
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
                })
              }
                {/* target message box*/}
              {
                recievedMessage.map((message,index)=>{
                  return <div key={index} className="chat chat-end">
                <div className="chat-header">
                    {message.firstName}
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
                })
               
              }
            </div>
            <div className="border-t  border-gray-200 p-1.8 bg-gray-200 w-[100%] flex items-center">
            <FaRegImage className="ml-1 cursor-pointer" size={20}/>
              <input
                value={newMessage}
                onChange={(e) => setnewMessage(e.target.value)}
                type="text"
                placeholder="Write here "
                className="outline-none w-[85%] p-2 mr-1.5  ml-2 text-gray-800 rounded "
              />
              <button
                onClick={sendMessage}
                className="border p-2 px-4 cursor-pointer bg-gray-300 text-gray-700 rounded border-gray-100 hover:bg-gray-500 hover:text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
