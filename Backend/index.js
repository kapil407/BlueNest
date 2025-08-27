import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/Database.js";

import userRoutes from "./routes/AuthRoute.js";
import tweetRoutes from "./routes/TweetRoute.js";
import MessageRouter from "./routes/MessageRoute.js";
import { initSocket } from "./utils/socket.js";
import OtpRouter from './routes/OtpRout.js'


import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 4660;

const server = http.createServer(app);


app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));



// Routes
app.use("/", userRoutes);
app.use("/", tweetRoutes);
app.use("/", MessageRouter);
app.use('/',OtpRouter);


initSocket(server);

// DB connection + Server start
connectDB()
  .then(() => {
    console.log(" Database connected successfully");
    server.listen(PORT, () => {
      console.log("Server is listening at port " + PORT);
    });
  })
  .catch((err) => {
    console.error(" connection error: " + err.message);
  });


