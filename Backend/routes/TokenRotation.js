import express from "express";
import GenerateAccessToken from '../TokenRotation/GenerateAccessToken.js';
const Tokenrouter = express.Router();
Tokenrouter.post("/generateNewAccessToken",GenerateAccessToken);
export default Tokenrouter;