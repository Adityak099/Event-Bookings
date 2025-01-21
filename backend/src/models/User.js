import mongoose from "mongoose";

// const arrayLimitGovId = (val) => {
//   return val.length <= 2;
// };
// const arrayLimitSelfPhotos = (val) => {
//   return val.length <= 5;
// };

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: [true, "Password is required."] },
//     role: { type: String, enum: ["customer", "employee"], default: "customer" },
//     phone: { type: String }, // Added phone
//     bio: { type: String }, // Added bio
//     govtIdUrls: {
//       type: [String], // Array of Cloudinary URLs for government ID
//       validate: [arrayLimitGovId, "{PATH} exceeds the limit of 2"], // Limit to 2 URLs
//     },
//     selfPhotosUrls: {
//       type: [String],
//       validate: [arrayLimitSelfPhotos, "{PATH} exceeds the limit of 5"], // Array of Cloudinary URLs
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// export default User;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Full Name
    sex: { type: String, enum: ["male", "female", "other"], required: true }, // Gender
    fatherName: { type: String }, // Father's Name
    motherName: { type: String }, // Mother's Name
    email: { type: String, required: true, unique: true }, // Email Address
    password: { type: String, required: [true, "Password is required."] },
    
    loginNo: { type: String }, // Login Number
    contactNo: { type: String }, // Contact Number
    dob: { type: Date }, // Date of Birth
    communicationSkills: {
      type: [String],
      enum: ["Hindi", "English", "Other"],
      default: [],
    }, // Communication skills
    location: {
      state: { type: String },
      city: { type: String },
      nearby: { type: String }, // Nearby
    }, // Location details
    complexion: { type: String }, // Complexion
    height: { type: String }, // Height (without shoes/heels)
    formalWear: { type: Boolean, default: true }, // Formals: Yes/No
    preferredColor: { type: String }, // Select Color
    termsAccepted: { type: Boolean, required: true, default: false }, // Terms and Conditions
    govtIdUrls: {
      type: [String],
      validate: [arrayLimitGovId, "{PATH} exceeds the limit of 2"], // Limit to 2 URLs
    },
    selfPhotosUrls: {
      type: [String],
      validate: [arrayLimitSelfPhotos, "{PATH} exceeds the limit of 5"], // Limit to 5 URLs
    },
  },
  { timestamps: true }
);

// Validation functions
function arrayLimitGovId(val) {
  return val.length <= 2;
}
function arrayLimitSelfPhotos(val) {
  return val.length <= 5;
}

const User = mongoose.model("User", userSchema);
export default User;


