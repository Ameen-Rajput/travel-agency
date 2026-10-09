import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toursAPI, bookingsAPI } from '../utils/api';
import { toast } from 'react-toastify';
import './TourDetail.css';

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tour, setTour] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadTour = async () => {
      try {
        // Try API first
        const response = await toursAPI.getById(id);
        if (response.data.success) {
          const foundTour = response.data.tour;
          setTour({
            ...foundTour,
            fullDescription: foundTour.fullDescription || foundTour.description || 'Experience an amazing journey to this beautiful destination.',
            duration: foundTour.duration || '7 Days / 6 Nights',
            included: foundTour.included?.length ? foundTour.included : [
              'Round-trip flights',
              'Hotel accommodation',
              'Daily breakfast',
              'Professional tour guide',
              'All transportation',
              'Entry to major attractions',
              'Travel insurance'
            ],
            hotels: foundTour.hotels?.length ? foundTour.hotels : [
              { name: `${foundTour.country} Grand Hotel`, rating: 5, type: 'Luxury' },
              { name: `${foundTour.country} Resort`, rating: 4, type: 'Premium' }
            ],
            restaurants: foundTour.restaurants?.length ? foundTour.restaurants : [
              'Local Traditional Restaurant',
              'Fine Dining Experience',
              'Street Food Tour',
              'Rooftop Dining'
            ],
            itinerary: foundTour.itinerary?.length ? foundTour.itinerary : [
              { day: 1, title: 'Arrival', activities: 'Airport pickup, hotel check-in, welcome dinner' },
              { day: 2, title: 'City Tour', activities: 'Explore main attractions and local culture' },
              { day: 3, title: 'Adventure Day', activities: 'Exciting activities and experiences' },
              { day: 4, title: 'Cultural Experience', activities: 'Visit museums and historic sites' },
              { day: 5, title: 'Nature & Scenery', activities: 'Beautiful landscapes and photo opportunities' },
              { day: 6, title: 'Free Day', activities: 'Shopping and leisure time' },
              { day: 7, title: 'Departure', activities: 'Breakfast, airport transfer, departure' }
            ]
          });
        }
      } catch (error) {
        console.error('Error loading tour:', error);
        // Fallback to localStorage
        const savedTours = JSON.parse(localStorage.getItem('tours') || '[]');
        const foundTour = savedTours.find(t => t.id === id || t._id === id);

        if (foundTour) {
          setTour({
            ...foundTour,
            fullDescription: foundTour.description || 'Experience an amazing journey to this beautiful destination.',
            duration: '7 Days / 6 Nights',
            included: [
              'Round-trip flights',
              'Hotel accommodation',
              'Daily breakfast',
              'Professional tour guide',
              'All transportation',
              'Entry to major attractions',
              'Travel insurance'
            ],
            hotels: [
              { name: `${foundTour.country} Grand Hotel`, rating: 5, type: 'Luxury' },
              { name: `${foundTour.country} Resort`, rating: 4, type: 'Premium' }
            ],
            restaurants: [
              'Local Traditional Restaurant',
              'Fine Dining Experience',
              'Street Food Tour',
              'Rooftop Dining'
            ],
            itinerary: [
              { day: 1, title: 'Arrival', activities: 'Airport pickup, hotel check-in, welcome dinner' },
              { day: 2, title: 'City Tour', activities: 'Explore main attractions and local culture' },
              { day: 3, title: 'Adventure Day', activities: 'Exciting activities and experiences' },
              { day: 4, title: 'Cultural Experience', activities: 'Visit museums and historic sites' },
              { day: 5, title: 'Nature & Scenery', activities: 'Beautiful landscapes and photo opportunities' },
              { day: 6, title: 'Free Day', activities: 'Shopping and leisure time' },
              { day: 7, title: 'Departure', activities: 'Breakfast, airport transfer, departure' }
            ]
          });
        }
      }
    };

    loadTour();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!tour) return;

    try {
      // Create booking object
      const bookingData = {
        customerName: userName,
        phoneNumber: phoneNumber,
        tour: tour._id || tour.id,
        tourName: tour.country,
        startDate: startDate,
        endDate: endDate,
        guests: parseInt(guests),
        amount: tour.price * guests,
        email: ''  // Add email field if needed
      };

      // Try API first
      try {
        const response = await bookingsAPI.create(bookingData);
        if (response.data.success) {
          toast.success(`🎉 Booking confirmed for ${tour.country}! We'll contact you shortly.`);
        }
      } catch (apiError) {
        // Fallback to localStorage
        const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const booking = {
          ...bookingData,
          id: Date.now(),
          status: 'Confirmed',
          bookingDate: new Date().toISOString()
        };
        existingBookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(existingBookings));
        toast.success(`🎉 Booking confirmed for ${tour.country}! We'll contact you shortly.`);
      }

      // Reset form
      setUserName('');
      setPhoneNumber('');
      setStartDate('');
      setEndDate('');
      setGuests(1);
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
      console.error('Booking error:', error);
    }
  };

  if (!tour) {
    return (
      <div className="tour-detail">
        <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading tour details...</h2>
          <button className="back-button" onClick={() => navigate('/')}>← Back to Tours</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tour-detail">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Tours</button>

      <div className="tour-hero">
        <img
          src={tour.country === 'Iceland' ? '/download.webp' : tour.image}
          alt={tour.country}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = '/hero.jpg';
          }}
        />
        <div className="tour-hero-overlay">
          <h1>{tour.country}</h1>
          <p>{tour.description}</p>
        </div>
      </div>

      <div className="container">
        <div className="tour-detail-content">
          <div className="tour-main-info">
            <section className="tour-section">
              <h2>About This Tour</h2>
              <p>{tour.fullDescription}</p>
              <div className="tour-duration">
                <strong>Duration:</strong> {tour.duration}
              </div>
            </section>

            <section className="tour-section">
              <h2>What's Included</h2>
              <ul className="included-list">
                {tour.included.map((item, index) => (
                  <li key={index}>✓ {item}</li>
                ))}
              </ul>
            </section>

            <section className="tour-section">
              <h2>Accommodation</h2>
              <div className="hotels-grid">
                {tour.hotels.map((hotel, index) => (
                  <div key={index} className="hotel-card">
                    <h3>{hotel.name}</h3>
                    <div className="hotel-rating">{'⭐'.repeat(hotel.rating)}</div>
                    <p>{hotel.type}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="tour-section">
              <h2>Dining Options</h2>
              <div className="restaurants-list">
                {tour.restaurants.map((restaurant, index) => (
                  <div key={index} className="restaurant-item">
                    🍽️ {restaurant}
                  </div>
                ))}
              </div>
            </section>

            <section className="tour-section">
              <h2>Day-by-Day Itinerary</h2>
              <div className="itinerary">
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="itinerary-day">
                    <div className="day-number">Day {day.day}</div>
                    <div className="day-content">
                      <h3>{day.title}</h3>
                      <p>{day.activities}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="tour-sidebar">
            <div className="booking-card">
              <div className="tour-price-large">
                ${tour.price}
                <span>/person</span>
              </div>

              {guests > 1 && (
                <div className="total-price-display">
                  <strong>Total for {guests} guests:</strong> ${tour.price * guests}
                </div>
              )}

              <form onSubmit={handleBooking} className="booking-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    min={startDate}
                  />
                </div>

                <div className="form-group">
                  <label>Number of Guests</label>
                  <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div className="booking-note">
                  <p>✓ Free cancellation up to 24 hours before</p>
                  <p>✓ Instant confirmation</p>
                  <p>✓ Best price guarantee</p>
                </div>

                <button type="submit" className="book-now-btn">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
