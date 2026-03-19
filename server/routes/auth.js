const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const emailExists = await Admin.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: 'This email is already registered. Please login instead.' });

    const usernameExists = await Admin.findOne({ username });
    if (usernameExists)
      return res.status(400).json({ message: 'Username already taken. Please choose another.' });

    const admin = new Admin({ username, email, password });
    await admin.save();

    const token = signToken(admin._id);
    res.status(201).json({
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: err.message || 'Server error during signup' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: 'No account found with this email' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: 'Incorrect password' });

    const token = signToken(admin._id);
    res.json({
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message || 'Server error during login' });
  }
});

// Verify token
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

module.exports = router;
