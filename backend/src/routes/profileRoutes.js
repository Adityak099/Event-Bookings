// profileRoutes.js
import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Profile Routes
router.get('/', authMiddleware, getProfile);     // Get user profile
router.put('/', authMiddleware, updateProfile);  // Update user profile

export default router;
