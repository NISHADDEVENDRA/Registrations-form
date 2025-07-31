const express = require('express');
const router = express.Router();
const { register, verifyOTP } = require('../controllerss/authcontrollers.js');

router.post('/register', register);
router.post('/verify', verifyOTP);

module.exports = router;
