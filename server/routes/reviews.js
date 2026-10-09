const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Tour = require('../models/Tour');
const authMiddleware = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get all approved reviews (public)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true })
      .populate('tour', 'country')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews'
    });
  }
});

// Get all reviews (protected - admin only)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('tour', 'country')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews'
    });
  }
});

// Create review (public)
router.post('/',
  [
    body('customerName').trim().notEmpty().withMessage('Name is required'),
    body('tour').notEmpty().withMessage('Tour is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required')
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

      // Verify tour exists
      const tour = await Tour.findById(req.body.tour);
      if (!tour) {
        return res.status(404).json({
          success: false,
          message: 'Tour not found'
        });
      }

      const review = new Review({
        ...req.body,
        tourName: tour.country
      });

      await review.save();

      res.status(201).json({
        success: true,
        message: 'Review submitted successfully',
        review
      });
    } catch (error) {
      console.error('Create review error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating review'
      });
    }
  }
);

// Delete review (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting review'
    });
  }
});

module.exports = router;
