// Description: This file contains the main configuration for the express app. It sets up the middleware, routes, and starts the server.
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const app = express();

// Middleware configurations
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "28kb" }));
app.use(express.urlencoded({ extended: true, limit: "28kb" }));
app.use(cookieParser());

// Routes Import
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profileRoutes.js";

//Routes Declaration.
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Event Booking API");
});

export default app; // Ensure this default export
