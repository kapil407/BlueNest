// src/hooks/useSocket.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const useSocket = () => {
  const { user } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io("http://localhost:4660", {   // socket initilization 
      query: { userId: user._id },
      withCredentials: true,
    });

    setSocket(newSocket); // Set after init

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error(" Socket connection error:", err.message);
    });

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, [user]);

  return socket;
};

export default useSocket;
