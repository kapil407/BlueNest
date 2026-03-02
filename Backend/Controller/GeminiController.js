import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GeneratePostText = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
     model: "gemini-2.0-flash",
      contents: `Generate a short social media post under 150 words.
      Topic: ${prompt}`,
    });

    const text = response.text;

    const user = req.user;
    user.aiUsageToday = (user.aiUsageToday || 0) + 1;
    await user.save();

    return res.status(200).json({
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