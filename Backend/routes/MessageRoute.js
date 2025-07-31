import express from "express"
import isAuthentication from '../Middleware/Authentication.js'
import { getMessage, sendMessage } from "../Controller/MessageController.js";



const router=express.Router();

router.post('/sendMessage/:id', isAuthentication,sendMessage);
router.get('/getMessage/:id',isAuthentication,getMessage);

 export default router;