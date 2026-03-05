import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GeneratePostController = async (req, res) => {
  try {
    // User frontend se prompt bhejega (e.g., "Write a post about my MCA exams")
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Write an engaging social media post about: ${prompt}`,
      config: {
        // Yeh instruction AI ki personality set karega
        systemInstruction: "You are an expert social media manager. Create engaging, short, and catchy posts. Always respond in pure JSON format with two keys: 'content' (the main text of the post) and 'hashtags' (an array of relevant strings).",
        // Yeh API ko majboor karega ki response sirf JSON format mein aaye
        responseMimeType: "application/json",
      }
    });

    // API ne JSON string return ki hai, usko JS object mein convert karo
    const postData = JSON.parse(response.text);

    return res.status(200).json({
      success: true,
      data: {
        content: postData.content,
        hashtags: postData.hashtags
      }
    });

  } catch (error) {
    console.error("POST GENERATION ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate post",
      error: error.message
    });
  }
};

export default GeneratePostController;