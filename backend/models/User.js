const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName : String,
  lastName : String,
  gender : String,
  email: { type: String, unique: true },
  Age : Number,
  education : String,
  skills: String,
  password: String,
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpire: Date
});

module.exports = mongoose.model('User', userSchema);
