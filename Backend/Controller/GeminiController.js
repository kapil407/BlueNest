import { GoogleGenerativeAI } from "@google/generative-ai";
// import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
console.log("api_key", process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const GeneratePostText = async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });
    const result = await model.generateContent(
      `Generate a short social media post. Keep it under 150 words.\nTopic: ${prompt}`,
    );

    const response = await result.response;
    const text = response.text();
    const user = req.user;
    user.aiUsageToday = (user.aiUsageToday || 0) + 1;
    await user.save();

    res.status(200).json({
      success: true,
      text,
    });
  } catch (error) {
    console.error("FULL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default GeneratePostText;
