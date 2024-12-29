
import User from '../models/User.js'; // Ensure this path is correct
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong', error });
//   }
// };



// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.cookie('token', token, { httpOnly: true }).status(200).json({
//       message: 'Login successful',
//       token,
//     });
//   } catch (error) {
//     console.error('Error during login:', error); // Log the error for debugging
//     res.status(500).json({ message: 'Something went wrong', error });
//   }
// };
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, bio } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,  // Save phone
      bio,    // Save bio
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Registration Error:", error);  // Log the error stack for debugging
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true }).status(200).json({
      message: 'Login successful',
      token,
      // user: {
      //   name: user.name,
      //   email: user.email,
      //   phone: user.phone,
      //   bio: user.bio,
      // },
    });
  } catch (error) {
    console.error("Login Error:", error);  // Log the error stack for debugging
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
