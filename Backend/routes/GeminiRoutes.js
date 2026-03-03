import express from "express";
const router = express.Router();
import GrokController from '../Controller/GeminiController.js'
import isAuthentication from "../Middleware/Authentication.js";
// import aiLimiter from "../Middleware/PromptRateLimit.js";
import GeminiPromptValidation from "../Middleware/PromptValidation.js";
router.post(
  "/generate-post",
  isAuthentication,

  GeminiPromptValidation,
  GrokController,
);
export default router;
