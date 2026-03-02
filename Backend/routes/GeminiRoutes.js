import express from "express";
const router = express.Router();
import GeneratePostText from '../Controller/GeminiController.js'
import isAuthentication from "../Middleware/Authentication.js";
import aiLimiter from "../Middleware/PromptRateLimit.js";
import GeminiPromptValidation from "../Middleware/PromptValidation.js";
router.post(
  "/generate-post",
  isAuthentication,
  aiLimiter,
  GeminiPromptValidation,
  GeneratePostText,
);
export default router;
