

import { GoogleGenAI } from '@google/genai';
import upload from '../Middleware/multer.js'
import Tweet from '../models/Tweets.js';
import fs from 'fs'; // Node.js ka inbuilt file system module

import dotenv from 'dotenv'
dotenv.config();
export const generatePost = async (req, res) => {
 

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper function: Disk se file read karke Gemini format me badalna
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: fs.readFileSync(path).toString("base64"), // Seedha file path se read karega
            mimeType
        },
    };
}


    try {
        const { prompt } = req.body;
        if(!prompt?.trim()?.length){
          return res.status(400).json({message:"Give somtthing in prompt"});
        }
        let contentArray = [];

        // 1. Agar user ne image upload ki hai, toh disk se usko uthao
        if (req.file) {
            // req.file.path me './public/images/filename.jpg' milega
            const imageContent = fileToGenerativePart(req.file.path, req.file.mimetype);
            contentArray.push(imageContent);
        }
        console.log("backend",prompt,req?.file);

        // 2. User ka text prompt array me daalo
        contentArray.push(prompt || "Is par ek short post create karo.");

        // 3. Gemini Chat initialize karein ekdum simple prompt ke sath
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "Create a catchy post based on the provided image or text. The entire post MUST be under 20 words maximum."
            }
        });

        // 4. Gemini ko data bhejein
        const response = await chat.sendMessage({ 
            message: contentArray 
        });

        const generatedPostText = response.text;

        

        // 6. Response bhejein
        res.json({
            success: true,
            postText: generatedPostText,
            
        });

    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Post create karne me dikkat aayi." });
    }
};

export default generatePost;