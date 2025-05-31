// lib/config/uploadOnCloudinary.js
import cloudinary from "./cloudinaryConfig.js";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "pizzahut_images",
        });

        // Remove the locally saved file after successful upload
        fs.unlinkSync(localFilePath);
        // console.log(localFilePath);
        // console.log(response)

        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // Remove the locally saved file if the upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export default uploadOnCloudinary;