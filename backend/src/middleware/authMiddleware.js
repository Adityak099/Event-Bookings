// authMiddleware.js
import jwt from "jsonwebtoken";
import { secret } from "../config/jwtConfig.js";
import User from "../models/User.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : req.cookies.token;
  // console.log("Token found in request headers or cookies:", token); // Debugging line

  if (!token) {
    console.log("Token not found in request headers or cookies"); // Debugging line
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secret, async (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ error: "Forbidden" });
    }

    const foundUser = await User.findById(user.id);
    req.user = foundUser; // Attach the full user object to the request
    next();
  });
};

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     console.log("Token not found in request headers");
//     return res.status(401).json({ error: "Unauthorized" });
//   }b

//   jwt.verify(token, secret, async (err, user) => {
//     if (err) {
//       console.log("Token verification failed:", err);

//       return res.status(403).json({ error: "Forbidden" });
//     }

//     const foundUser = await User.findById(user.id); // You may want to fetch the full user
//     req.user = foundUser; // Attach the full user object to the request
//     next();
//   });
// };

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     console.log("Token not found in request headers",req.headers); // Debugging line
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   jwt.verify(token, secret, async (err, user) => {
//     if (err) {
//       console.log("Token verification failed:", err); // Debugging line
//       return res.status(403).json({ error: "Forbidden" });
//     }

//     const foundUser = await User.findById(user.id); // You may want to fetch the full user
//     if (!foundUser) {
//       console.log("User not found in the database"); // Debugging line
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     req.user = foundUser; // Attach the full user object to the request
//     next();
//   });
// };

export default authMiddleware;
