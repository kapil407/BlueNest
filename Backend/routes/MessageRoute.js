import express from "express"
import isAuthentication from '../Middleware/Authentication.js'
import { sendMessage } from "../Controller/MessageController.js";

const router=express.Router();

router.post('/sendMessage/:id',isAuthentication,sendMessage);

 export default router;