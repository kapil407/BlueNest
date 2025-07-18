import express from "express";
const PORT = 4660;
import { connectDB } from "./config/Database.js";
import sendMessageRouter from './routes/MessageRoute.js'

import userRoutes from './routes/AuthRoute.js';
import tweetRoutes from './routes/TweetRoute.js'

import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { initializSocket } from "./utils/socket.js";

const app = express();
app.use(express.json()); // extract the json data from req and convert into the js object and add to the req.body
app.use(cookieParser()); // extract the cookie from the request and add it to the req.cookies
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption)); //This applies the CORS settings globally to all incoming requests.

app.use("/", userRoutes);

app.use("/", tweetRoutes);



app.use("/api/message",sendMessageRouter);

const httpServer = http.createServer(app); // wrap the express application by HTTP  server for using socket.io

initializSocket(httpServer);

connectDB()
  .then(() => {
    console.log("database is connectes sucessfully");
    httpServer.listen(PORT, () => {
      console.log("sever is listening at port " + PORT);
    });
  })
  .catch((err) => {
    console.error("error" + err.message);
  });
