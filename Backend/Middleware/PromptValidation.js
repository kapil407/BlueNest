import User from "../models/User.js";

const GeminiPromptValidation = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ message: "Prompt required" });
    }

    if (prompt.length > 200) {
      return res.status(400).json({ message: "Prompt too long" });
    }

    const bannedWords = ["hack", "kill", "bomb"];

    if (bannedWords.some(word =>
      prompt.toLowerCase().includes(word)
    )) {
      return res.status(400).json({
        message: "Inappropriate content",
      });
    }

    const user = await User.findById(req.user._id);

    const today = new Date().toDateString();

    if (user.aiUsageDate?.toDateString() !== today) {
      user.aiUsageToday = 0;
      user.aiUsageDate = new Date();
    }

    if (user.aiUsageToday >= 5) {
      return res.status(403).json({
        message: "Daily AI limit reached",
      });
    }

    
    next();

  } catch (error) {
    return res.status(500).json({ message: "Validation error" });
  }
};

export default GeminiPromptValidation;