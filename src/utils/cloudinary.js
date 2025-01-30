import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key:  process.env.CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });
    // Upload image to cloudinary
    const uploadOncludinary=async (localFileParth)=>{
        try {
            if(!localFileParth) return null
            //uploadfile cloudinary
            const uploadResponse = await cloudinary.uploader.upload(localFileParth,{
                resource_type: 'auto'
            })
            //file has been uploaded successfully
            console.log("file is uploaded on cloudinary",uploadResponse.url);
            return uploadResponse
        } catch (error) {
            fs.unlinkSync(localFileParth)//remove the localy save tempari file as the upload operation failed
            return null
        }
        
    }
export default uploadOncludinary;