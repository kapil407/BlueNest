import mongoose from "mongoose";
import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Message.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const recieverId = req.params.id;
    const { message } = req.body;
    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    let gotConversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recieverId],
      },
    });

    if (!gotConversation){
      gotConversation = await Conversation.create({    
        participants: [senderId, recieverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: message,
    });
  
    if (newMessage) {
      const Id = newMessage._id;

      gotConversation.messageId.push(Id);
    }

    await gotConversation.save();
    return res.status(200).json({ message: "successfull",sucess:true });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


export const recievedMessage= async (res,req)=>{
      try {
            
        
        
      } 
      catch (error) {
        return res.status(401).json({message:error.message});  
      }  
}