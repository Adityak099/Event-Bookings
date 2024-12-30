import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET, // Cloudinary API secret
});

export const uploadToCloudinary = async (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) {
        console.error("Cloudinary Upload Error:", error.message); // Log the error for debugging
        reject(new Error("Failed to upload file to Cloudinary"));
      } else {
        resolve(result); // Resolve the promise with the result
      }
    });
  });
};

// const uploadToCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) {
//       return null;
//     }
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     //file has been uploaded successfully.
//     console.log("File is uploaded on cloudinary", response.url);
//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath); //removes the locally saved temp files as the upload operation got failed
//     return null;
//   }
// };
// export { uploadToCloudinary };

// console.log({
//   cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//   apiKey: process.env.CLOUDINARY_API_KEY,
//   apiSecret: process.env.CLOUDINARY_API_KEY_SECRET,
// });
