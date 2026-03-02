import express from "express";
const router=express.Router();
import GeneratePostText from "../Controller/GeminiController";
import isAuthentication from "../Middleware/Authentication";
import aiLimiter from "../Middleware/PromptRateLimit";
import GeminiPromptValidation from "../Middleware/PromptValidation";
router.post("/generate-post",isAuthentication,aiLimiter,GeminiPromptValidation, GeneratePostText);
export default router ;