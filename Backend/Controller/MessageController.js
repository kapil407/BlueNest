import mongoose from "mongoose";
import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Message.js";
import { io, userSocketMap } from "../utils/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }
    if (!message || !receiverId || !senderId) {
      return res.status(400).json({ error: "Missing fields" });
    }

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messageId.push(newMessage._id);
    }

    await gotConversation.save();

    return res.status(201).json({ newMessage });
  } catch (error) {
    return res.status(500).json({ error: "Error while sending message" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.userId;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messageId");

    if (!conversation) {
      return res.status(200).json({ conversation: { messageId: [] } });
    }

    return res.status(200).json({ message: "receivedMessage", conversation });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
