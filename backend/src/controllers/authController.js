import User from "../models/User.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register controller
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, bio } = req.body;
    // console.log("Register request body:", req.body); // Log request body

    const userExists = await User.findOne({ email });
    // console.log("User exists:", userExists); // Log if user exists

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed password:", hashedPassword); // Log hashed password

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone, // Save phone
      bio, // Save bio
    });

    await newUser.save();
    console.log("New user saved:", newUser); // Log new user

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error); // Log the error stack for debugging
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.cookie("token", token, { httpOnly: true }).status(200).json({
      message: "Login successful",
      token,
      // user: {
      //   name: user.name,
      //   email: user.email,
      //   phone: user.phone,
      //   bio: user.bio,
      // },
    });
  } catch (error) {
    console.error("Login Error:", error); // Log the error stack for debugging
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

//Logout controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error); // Log the error stack for debugging
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
