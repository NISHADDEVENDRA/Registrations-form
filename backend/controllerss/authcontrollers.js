const User = require('../models/User');
const nodemailer = require('nodemailer');

const tempUsers = new Map(); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'devendranishad981@gmail.com',
    pass: 'oqrvlfqzwsmxrknq'
  }
});


exports.register = async (req, res) => {
  const { firstName, lastName, gender, email, Age, education, skills, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    tempUsers.set(email, {
      firstName,
      lastName,
      gender,
      email,
      Age,
      education,
      skills,
      password,
      otp,
      otpExpire: Date.now() + 300000 
    });

    await transporter.sendMail({
      from: 'devendranishad981@gmail.com',
      to: email,
      subject: 'Email Verification OTP',
      text: `Hii ${firstName} Thank you for registering. Have a great Time,  Your OTP is => ${otp}. Don't share it with anyone.`
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const tempUser = tempUsers.get(email);

  if (!tempUser)
    return res.status(400).json({ message: 'No OTP request found for this email' });

  if (tempUser.otp !== otp)
    return res.status(400).json({ message: 'Incorrect OTP' });

  if (Date.now() > tempUser.otpExpire)
    return res.status(400).json({ message: 'OTP expired' });

  try {
    const user = new User({
      firstName: tempUser.firstName,
      lastName: tempUser.lastName,
      gender: tempUser.gender,
      email: tempUser.email,
      Age: tempUser.Age,
      education: tempUser.education,
      skills: tempUser.skills,
      password: tempUser.password,
      isVerified: true
    });

    await user.save();
    tempUsers.delete(email); 

    res.status(200).json({ message: 'Email verified and registration complete' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
