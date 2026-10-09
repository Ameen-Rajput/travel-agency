const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    default: 'Experience an amazing journey to this beautiful destination.'
  },
  duration: {
    type: String,
    default: '7 Days / 6 Nights'
  },
  included: [{
    type: String
  }],
  hotels: [{
    name: String,
    rating: Number,
    type: String
  }],
  restaurants: [{
    type: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    activities: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tour', tourSchema);
