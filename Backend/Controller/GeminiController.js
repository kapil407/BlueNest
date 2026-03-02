import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const GeneratePostText = async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });
    const result = await model.generateContent(
      `Generate a short social media post. Keep it under 150 words.\nTopic: ${prompt}`,
    );

    const response = await result.response;
    const text = response.text();
    const user=req.user;
    user.aiUsageToday += 1;
    await user.save();

    res.status(200).json({
      success: true,
      text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};

export default GeneratePostText;
