import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      bio,
      sex,
      fatherName,
      motherName,
      loginNo,
      contactNo,
      dob,
      communicationSkills,
      location,
      complexion,
      height,
      formalWear,
      preferredColor,
      termsAccepted,
    } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      bio,
      sex,
      fatherName,
      motherName,
      loginNo,
      contactNo,
      dob,
      communicationSkills,
      location,
      complexion,
      height,
      formalWear,
      preferredColor,
      termsAccepted,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Login Controller
// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Both email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user.password exists
    if (!user.password) {
      return res.status(500).json({ message: "Password not set for this user" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "defaultsecret", // Fallback for missing secret
      {
        expiresIn: "10d",
      }
    );

    // Send response with token and optional user details
    res.cookie("token", token, { httpOnly: true, secure: true }).status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message || error); // Log the error for debugging
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


// Logout Controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
