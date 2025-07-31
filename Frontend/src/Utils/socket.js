// src/Utils/socket.js
import { io } from "socket.io-client";

let socket = null;

// Function to connect socket with userId
export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:4660", {
      query: { userId },
      withCredentials: true,
    });

    console.log("✅ Socket connected:", socket.id);
  }
};

//  Function to get existing socket instance
export const getSocket = () => {
  return socket;
};
