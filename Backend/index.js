import express from "express";
const PORT = 4660;
import { connectDB } from "./config/Database.js";
import sendMessageRouter from './routes/MessageRoute.js'

import {
  signUpRouter,
  loginRouter,
  logOutRouter,
  editProfileRouter,
  bookmarksRouter,
  getProfileRouter,
  getOthersProfileRouter,
  FollowingRouter,
  unFollowRouter,
} from "./routes/AuthRoute.js";
import {
  likeOrDisLikeRouter,
  deleteTweetRouter,
  followTweetsRouter,
  allTweetsRouter,
  tweetRouter
} from "./routes/TweetRoute.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { initializSocket } from "./utils/socket.js";

const app = express();

// middleware
// app.use(express.urlencoded({
//         extended: true
// }));//   form data ko handle karta hai, especially jab data HTML form ke through aata hai (jaise application/x-www-form-urlencoded format mein).

app.use(express.json()); // extract the json data from req and convert into the js object and add to the req.body
app.use(cookieParser()); // extract the cookie from the request and add it to the req.body
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

app.use("/", signUpRouter);
app.use("/", loginRouter);
app.use("/", logOutRouter);
app.use("/", tweetRouter);
app.use("/", deleteTweetRouter);
app.use("/", likeOrDisLikeRouter);
app.use("/", editProfileRouter);
app.use("/", bookmarksRouter);
app.use("/", getProfileRouter);
app.use("/", getOthersProfileRouter);
app.use("/", FollowingRouter);
app.use("/", unFollowRouter);
app.use("/", allTweetsRouter);
app.use("/", followTweetsRouter);


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
