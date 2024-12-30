import express from "express";
import { register, login, logout } from "../controllers/authController.js"; //Is trh se import "curly braces wala{ } " tab krege jab hum default export na kr rhe ho.
import {
  uploadGovtID,
  uploadSelfPhotos,
} from "../controllers/upload.Controller.js";
import { upload } from "../middleware/multerMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

//Logout Route
router.get("/logout", logout);

// Upload Route for govt_Id
router.post(
  "/upload/govt_Id",
  authMiddleware,
  upload.fields([
    { name: "govt_Id_front", maxCount: 1 },
    { name: "govt_Id_back", maxCount: 1 },
  ]),
  uploadGovtID
);

// Upload Route for self_Image
router.post(
  "/upload/self_photos",
  authMiddleware,
  upload.array("self_photos", 5),
  uploadSelfPhotos
);

router.get("/test-auth", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({ message: "User authenticated successfully", user: req.user });
});

// router.route("/upload/self_Image").post(
//   upload.fields([
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//     { name: "image3", maxCount: 1 },
//     { name: "image4", maxCount: 1 },
//     { name: "image5", maxCount: 1 },
//   ]),
//   uploadSelfPhotos
// );

// router.post('/register', (req, res) => {
//     console.log('Register route hit');
//     res.send({ message: 'Route working' });
//   });

// router.post('/login', (req, res) => {
//     console.log('login route hit');
//     res.send({ message: 'Route working' });
//   });

// Upload Route for govt_Id

// Upload Route for self_photos
// router.post(
//   "/upload/self_photos",
//   upload.array("self_photos", 5),
//   uploadSelfPhotos
// );

export default router;
