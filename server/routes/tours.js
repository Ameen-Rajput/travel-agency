const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const authMiddleware = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get all tours (public)
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find({ active: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      tours
    });
  } catch (error) {
    console.error('Get tours error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tours'
    });
  }
});

// Get single tour by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }
    res.json({
      success: true,
      tour
    });
  } catch (error) {
    console.error('Get tour error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tour'
    });
  }
});

// Create tour (protected)
router.post('/',
  authMiddleware,
  [
    body('country').trim().notEmpty().withMessage('Country is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('image').trim().isURL().withMessage('Valid image URL is required')
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

      const tour = new Tour(req.body);
      await tour.save();

      res.status(201).json({
        success: true,
        message: 'Tour created successfully',
        tour
      });
    } catch (error) {
      console.error('Create tour error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating tour'
      });
    }
  }
);

// Update tour (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      message: 'Tour updated successfully',
      tour
    });
  } catch (error) {
    console.error('Update tour error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating tour'
    });
  }
});

// Delete tour (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error) {
    console.error('Delete tour error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting tour'
    });
  }
});

module.exports = router;
