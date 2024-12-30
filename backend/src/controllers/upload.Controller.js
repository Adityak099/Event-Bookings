import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import User from "../models/User.js";
import fs from "fs";

// Handling upload of govt-IDs
export const uploadGovtID = asyncHandler(async (req, res) => {
  try {
    // Ensure paths are correctly extracted from the array
    const frontFile = req.files?.govt_Id_front?.[0];
    const backFile = req.files?.govt_Id_back?.[0];

    if (!frontFile?.path || !backFile?.path) {
      throw new ApiError(400, "Both sides of government ID must be uploaded");
    }

    const frontUploadResponse = await uploadToCloudinary(frontFile.path);
    const backUploadResponse = await uploadToCloudinary(backFile.path);

    if (!frontUploadResponse.url || !backUploadResponse.url) {
      throw new ApiError(400, "Error while uploading government ID files");
    }

    // Delete files from local directory
    fs.unlink(frontFile.path, (err) => {
      if (err) console.error(`Failed to delete ${frontFile.path}:`, err);
    });
    fs.unlink(backFile.path, (err) => {
      if (err) console.error(`Failed to delete ${backFile.path}:`, err);
    });

    // Update user with uploaded URLs
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          govtIdUrls: [frontUploadResponse.url, backUploadResponse.url],
        },
      },
      { new: true }
    ).select("-password");

    if (!user) {
      throw new ApiError(500, "Failed to update user government ID");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Government ID uploaded successfully"));
  } catch (error) {
    console.error("Error in uploadGovtID:", error); // Log the error for debugging
    throw new ApiError(500, "An error occurred while uploading government ID");
  }
});

// Handling upload of self photos
export const uploadSelfPhotos = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length !== 5) {
    throw new ApiError(400, "Exactly 5 self photos must be uploaded");
  }

  const uploadResponses = await Promise.all(
    req.files.map((file) => uploadToCloudinary(file.path))
  );

  if (uploadResponses.some((response) => !response.url)) {
    throw new ApiError(400, "Error while uploading self photos");
  }

  // Delete files from local directory
  req.files.forEach((file) => {
    fs.unlink(file.path, (err) => {
      if (err) console.error(`Failed to delete ${file.path}:`, err);
    });
  });

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        selfPhotosUrls: uploadResponses.map((response) => response.url),
      },
    },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(500, "Failed to update user self photos");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Self photos uploaded successfully"));
});
