const express = require('express');
const { body, validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');

const router = express.Router();

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('phone').optional().trim(),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const contactMessage = await ContactMessage.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Your message has been received.',
      contactMessage
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({ success: false, message: 'Error saving contact message' });
  }
});

module.exports = router;
