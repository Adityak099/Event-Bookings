import mongoose from "mongoose";

const arrayLimitGovId = (val) => {
  return val.length <= 2;
};
const arrayLimitSelfPhotos = (val) => {
  return val.length <= 5;
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: [true, "Password is required."] },
    role: { type: String, enum: ["customer", "employee"], default: "customer" },
    phone: { type: String }, // Added phone
    bio: { type: String }, // Added bio
    govtIdUrls: {
      type: [String], // Array of Cloudinary URLs for government ID
      validate: [arrayLimitGovId, "{PATH} exceeds the limit of 2"], // Limit to 2 URLs
    },
    selfPhotosUrls: {
      type: [String],
      validate: [arrayLimitSelfPhotos, "{PATH} exceeds the limit of 5"], // Array of Cloudinary URLs
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
