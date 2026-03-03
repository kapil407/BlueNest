import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';

// Simple controller for post creation
const GeminiController = async (req, res) => {
  const { prompt } = req.body;

  // Check if prompt exists
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ 
      success: false, 
      error: 'Kuch likho to sahi! Prompt toh do.' 
    });
  }

  try {
    console.log(' Post create kar raha hu for:', prompt);

    // Make API call to DeepSeek
    const response = await axios.post(
      `${DEEPSEEK_BASE_URL}/chat/completions`,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `Tu ek masta** Indian social media post writer hai. 
            Hindi-English mix (Hinglish) mein likhna. 
            Funny, attitude wala, aur engaging post bana.
            Emojis aur trending hashtags bhi daalna.
            Instagram ya Twitter ke liye short aur punchy post bana.`
          },
          { 
            role: 'user', 
            content: `Is topic pe ek post bana: ${prompt}` 
          }
        ],
        temperature: 0.8,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000
      }
    );

    // Get the generated post
    const generatedPost = response.data.choices[0].message.content.trim();

    // Return the post
    return res.json({
      success: true,
      post: generatedPost,
      prompt: prompt,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('DeepSeek Error:', error.message);

    // Simple error messages
    let errorMsg = 'Kuch gadbad hui, phir se try kar';
    
    if (error.response?.status === 401) {
      errorMsg = 'API key sahi nahi hai';
    } else if (error.response?.status === 429) {
      errorMsg = 'Thoda ruk ke try kar, limit khatam';
    } else if (error.code === 'ECONNABORTED') {
      errorMsg = 'Time ho gaya, dheere dheere type kar';
    }

    return res.status(500).json({
      success: false,
      error: errorMsg
    });
  }
};

export default GeminiController;