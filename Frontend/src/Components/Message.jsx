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
  
  
  const { user, otherUsers } = useSelector((store) => store?.user);
  const userId = user?._id;
  const followingsId = user?.following;

  const followings = otherUsers?.filter((otherUser) =>
    followingsId?.includes(otherUser?._id)
  );
  
const targetUser=followings.filter(otherUser=>{
    return targetUserId?.includes(otherUser?._id)
  });
  
  useEffect(() => {
    if (!user) return;
   
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
    <h1>Message</h1>
    </>
  );
};
