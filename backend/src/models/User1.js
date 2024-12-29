// User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  bio: { type: String, maxlength: 500 }
});

const User1 = mongoose.model('User1', userSchema);

export default User1;
