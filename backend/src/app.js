import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();


// default middlewares configurations
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "28kb" }));
app.use(express.urlencoded({ extended: true, limit: "28kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Event Booking API");
});


export default app;
