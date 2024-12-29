// profileController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { secret } from '../config/jwtConfig.js';
import validator from 'validator';  

// Fetch user profile
export const getProfile = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.id;

    // Find user by userId (decoded from JWT token)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio
    });
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden' });
  }
};


// Update user profile
export const updateProfile = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name, email, phone, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (bio && bio.length > 500) {
    return res.status(400).json({ error: 'Bio exceeds maximum length of 500 characters' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.id;

    // Find user and update their profile
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, bio },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', profile: user });
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden' });
  }
};
