// backend/routes/grokRoutes.js
// const express = require('express');
import axios from 'axios';
// const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

const XAI_API_KEY = process.env.GROK_API_KEY;
const XAI_BASE_URL = "https://api.x.ai/v1";

// POST /api/grok/generate-post  → post caption/content generate karega
// router.post('/generate-post',;
const GrokController = async (req, res) => {
  const { prompt, model = "grok-4" } = req.body;

  try {
    const response = await axios.post(
      `${XAI_BASE_URL}/chat/completions`,
      {
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a savage, engaging Indian social media post writer. Hindi-English mix, funny, attitude wala, emojis aur trending hashtags daalo. Instagram/Twitter ke liye short aur punchy posts banao.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.8, // 0.7-1.0 ke beech creative ke liye acha
        max_tokens: 300,
        top_p: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${XAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const generatedText = response.data.choices[0].message.content.trim();
    res.json({ success: true, post: generatedText });
  } catch (error) {
    console.error("Grok API Error:", error?.response?.data || error.message);

    let errorMsg = "Grok se baat nahi ho rahi";
    if (error.response?.status === 401) errorMsg = "Invalid API key";
    if (error.response?.status === 429)
      errorMsg = "Rate limit cross ho gaya, thodi der baad try karo";

    res.status(500).json({ success: false, error: errorMsg });
  }
};

export default GrokController;
