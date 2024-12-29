// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['customer', 'employee'], default: 'customer' },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
// export default User;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'employee'], default: 'customer' },
  phone: { type: String },    // Added phone
  bio: { type: String },      // Added bio
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
