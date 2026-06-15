import express from "express";
const GeminiRouter = express.Router();
import upload from "../Middleware/multer.js";
import generatePost from '../Controller/GeminiController.js'
import isAuthentication from "../Middleware/Authentication.js";
// import aiLimiter from "../Middleware/PromptRateLimit.js";
// import GeminiPromptValidation from "../Middleware/PromptValidation.js";
GeminiRouter.post('/api/simple-image-post', upload.single('media'),
  generatePost,
);
export default GeminiRouter;
