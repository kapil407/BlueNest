import { Server } from "socket.io";

export let io;
export const userSocketMap = {}; // userId => socketId

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(" User connected: ", userId);

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    // io.emit("getOnlineUser", Object.keys(userSocketMap));

    // Listen for sendMessage
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const receiverSocketId = userSocketMap[receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", {
          senderId,
          receiverId,
          message,
          createdAt: new Date(),
        });
      }
    });

    //  Disconnect cleanup
    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    });
  });
};
