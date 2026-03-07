import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();
export const generatePost = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://api.moonshot.ai/v1/chat/completions",
      {
        model: "moonshot-v1-8k",
        messages: [
          {
            role: "user",
            content: `Write a short social media post about: ${prompt}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.KIMI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiPost = response.data.choices[0].message.content;

    res.status(200).json({
      success: true,
      post: aiPost
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI post generation failed"
    });
  }
};
export default generatePost;