import express from "express"
import isAuthentication from '../Middleware/Authentication.js'
import { sendMessage } from "../Controller/MessageController.js";

const sendMessageRouter=express.Router();

sendMessageRouter.post('/sendMessage/:id',isAuthentication,sendMessage);

 export default sendMessageRouter;