// COUDINARY_api_SECRET;

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_api_SECRET,
});

/*  (image OR video) */
const uploadCloudinary = async (filepath, type = "image") => {
  try {
    // console.log("Uploading file:", filepath);
    // console.log("Type:", type);
    const normalizedPath = filepath.replace(/\\/g, "/");
    const result = await cloudinary.uploader.upload(normalizedPath, {
      resource_type: type, // "image" | "video"
      folder: type === "video" ? "tweets/videos" : "tweets/images",
    });

    fs.unlinkSync(filepath);

    return {
      url: result.secure_url,
      publicId: result.public_id,
      duration: result.duration, // only for video
      format: result.format,
    };
  } catch (error) {
    //  cleanup even on failure
    console.error(" REAL CLOUDINARY ERROR:", error);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    throw new Error("Cloudinary upload failed");
  }
};

export default uploadCloudinary;
