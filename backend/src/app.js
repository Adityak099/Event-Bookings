// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import router from "./routes/auth.js";
// import router1 from "./routes/profileRoutes.js";
// const app = express();


// // default middlewares configurations
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
// app.use(express.json({ limit: "28kb" }));
// app.use(express.urlencoded({ extended: true, limit: "28kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// app.use('/api/auth', router);
// app.use('/api/profile', router1);
// // Routes
// app.get("/", (req, res) => {
//   res.send("Welcome to the Event Booking API");
// });
// src/app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profileRoutes.js';

const app = express();


// Middleware configurations
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '28kb' }));
app.use(express.urlencoded({ extended: true, limit: '28kb' }));
app.use(cookieParser());




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Event Booking API');
});

export default app;  // Ensure this default export



