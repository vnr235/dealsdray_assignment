const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/User');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) => {

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'MYKEY', { expiresIn: '1h' });

    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      name: user.name  
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, username, phone, password } = req.body;

    // Server-side validation
    if (!name || !email || !username || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate email or username
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email or Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const newAdmin = new Admin({
      name,
      email,
      username,
      phone,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
  } catch (err) {
    console.error('Error registering admin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/userinfo', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id); 

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ name: admin.name });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
