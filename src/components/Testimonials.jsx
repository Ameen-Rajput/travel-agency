import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Amir',
      tour: 'Desert Sky',
      date: 'March 2025',
      rating: 5,
      text: 'The peace, the stars, and the passionate guides made this unforgettable. Highly recommend!'
    },
    {
      id: 2,
      name: 'Noura A.',
      tour: 'Sunset Ride',
      date: 'February 2025',
      rating: 5,
      text: 'Absolutely stunning experience. The sunset over the dunes was magical.'
    },
    {
      id: 3,
      name: 'Lina H.',
      tour: 'Desert Journey',
      date: 'January 2025',
      rating: 5,
      text: 'Professional guides, beautiful locations, and perfect organization. Will come back!'
    },
    {
      id: 4,
      name: 'Sarah T.',
      tour: 'Desert Sky',
      date: 'March 2025',
      rating: 5,
      text: 'An experience that truly connects you with nature. The guides were knowledgeable and friendly.'
    },
    {
      id: 5,
      name: 'Omar & Layla',
      tour: 'Hike Trail',
      date: 'February 2025',
      rating: 5,
      text: 'Perfect for couples! The trail was scenic and the pace was just right.'
    },
    {
      id: 6,
      name: 'Daniel K.',
      tour: 'Evening Safari',
      date: 'April 2025',
      rating: 5,
      text: 'Best desert tour I have ever experienced. Everything was perfect from start to finish.'
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <h2>What travelers say about our tours</h2>
        </div>

        <div className="rating-display">
          <div className="rating-stars">★★★★★</div>
          <div>
            <div className="rating-text">4.9/5</div>
            <div className="rating-count">Based on 280+ verified reviews</div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>56+</h3>
            <p>Guided tours delivered</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>Safe routes with certified guides</p>
          </div>
          <div className="stat-card">
            <h3>5+</h3>
            <p>Years desert experience</p>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-author">{testimonial.name}</div>
                <div className="testimonial-stars">{'★'.repeat(testimonial.rating)}</div>
              </div>
              <div className="testimonial-tour">{testimonial.tour}</div>
              <div className="testimonial-date">{testimonial.date}</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
