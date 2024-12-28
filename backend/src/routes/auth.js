import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Register Route
router.post('/register', register);
// router.post('/register', (req, res) => {
//     console.log('Register route hit');
//     res.send({ message: 'Route working' });
//   });
  
// Login Route
router.post('/login', login);
// router.post('/login', (req, res) => {
//     console.log('login route hit');
//     res.send({ message: 'Route working' });
//   });

export default router;
