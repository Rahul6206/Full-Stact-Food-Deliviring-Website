import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const UploadImage = async (file) => {
    cloudinary.config({
        cloud_name: process.env.Cloudnery_Cloud_Name,
        api_key: process.env.Cloudnery_Key,
        api_secret: process.env.Cloudnery_API_Secrate
    });
    try {
        const ImageResult = await cloudinary.uploader.upload(file);
        fs.unlinkSync(file);
        return ImageResult.secure_url;
    } catch (error) {
        fs.unlinkSync(file);
        console.log('File Uplode error in Cloudinary' + error.message);
        
    }
}
export default UploadImage;