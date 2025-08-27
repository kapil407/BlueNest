import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import {config} from 'dotenv'
config();
const uploadCloudinary= async (filepath)=>{
        cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.COUDINARY_api_SECRET
});
try {
    const uploadtResult=await cloudinary.uploader.upload(filepath);
    fs.unlinkSync(filepath);
    return uploadtResult.secure_url;

} catch (error) {
    fs.unlinkSync(filepath);
    return resizeBy.status(400).json({message:"cloudinary error"});
}

}

export default uploadCloudinary ;