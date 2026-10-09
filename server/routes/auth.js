const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { body, validationResult } = require('express-validator');

// Admin Login
router.post('/login',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { username, password } = req.body;

      // Find admin
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Verify password
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, username: admin.username, role: admin.role },
        process.env.JWT_SECRET || 'marwa-travel-jwt-secret-2026-secure-key-random',
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during login'
      });
    }
  }
);

// Create initial admin (only for setup - remove in production)
router.post('/setup', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }

    // Create admin
    const admin = new Admin({
      username: 'admin',
      password: 'Admin@123Secure',
      email: 'admin@marwatravel.com'
    });

    await admin.save();

    res.json({
      success: true,
      message: 'Admin created successfully'
    });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during setup'
    });
  }
});

module.exports = router;
