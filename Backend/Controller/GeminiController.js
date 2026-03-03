// backend/Controller/grokController.js
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();

const XAI_API_KEY = process.env.GROK_API_KEY;
const XAI_BASE_URL = 'https://api.x.ai/v1';

const GeminiController = async (req, res) => {
  const { prompt, model = 'grok-4' } = req.body;

  if (!prompt?.trim()) {
    return res.status(400).json({ success: false, error: 'Prompt required' });
  }

  try {
    const response = await axios.post(
      `${XAI_BASE_URL}/chat/completions`,
      {
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are a savage, engaging Indian social media post writer. Hindi-English mix, funny, attitude wala, emojis aur trending hashtags daalo. Instagram/Twitter ke liye short aur punchy posts banao.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 300,
        top_p: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${XAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedText = response.data.choices[0].message.content.trim();
    return res.json({ success: true, post: generatedText });
  } catch (error) {
    console.error('Grok API Error:', error?.response?.data || error.message);

    let errorMsg = 'Something went wrong with Grok';
    if (error?.response?.status === 401) errorMsg = 'Invalid API key';
    if (error?.response?.status === 429) errorMsg = 'Rate limit exceeded';

    return res.status(500).json({ success: false, error: errorMsg });
  }
};

export default GeminiController;