const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const authMiddleware = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get all bookings (protected - admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('tour', 'country price')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings'
    });
  }
});

// Create booking (public)
router.post('/',
  [
    body('customerName').trim().notEmpty().withMessage('Customer name is required'),
    body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
    body('tour').notEmpty().withMessage('Tour is required'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required'),
    body('guests').isInt({ min: 1 }).withMessage('Valid number of guests is required')
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

      // Calculate amount
      const amount = tour.price * req.body.guests;

      const booking = new Booking({
        ...req.body,
        tourName: tour.country,
        amount
      });

      await booking.save();

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        booking
      });
    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating booking'
      });
    }
  }
);

// Update booking status (protected)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated',
      booking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking'
    });
  }
});

// Delete booking (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting booking'
    });
  }
});

module.exports = router;
