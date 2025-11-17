import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.Cloudnery_Cloud_Name,
    api_key: process.env.Cloudnery_API_Key,
    api_secret: process.env.Cloudnery_API_Secrate
});

const UploadImage = async (file) => {
    try {
        const ImageResult = await cloudinary.uploader.upload(file);
        
        return ImageResult.secure_url;

    } catch (error) {
        console.error('Cloudinary upload error:', error.message);
        return null;

    } finally {
        // Remove file safely
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    }
};

export default UploadImage;
