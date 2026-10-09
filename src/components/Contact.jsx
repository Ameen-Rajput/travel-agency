import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contactAPI, reviewsAPI } from '../utils/api';
import { defaultTours } from '../utils/defaultTours';
import './Contact.css';

const initialContact = { name: '', email: '', phone: '', message: '' };
const initialReview = { customerName: '', email: '', tour: '', rating: '5', comment: '' };

const Contact = () => {
  const [contactForm, setContactForm] = useState(initialContact);
  const [reviewForm, setReviewForm] = useState(initialReview);
  const [contactStatus, setContactStatus] = useState('');
  const [reviewStatus, setReviewStatus] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tours = JSON.parse(localStorage.getItem('tours') || 'null') || defaultTours;

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus('Sending your message...');
    try {
      const response = await contactAPI.create(contactForm);
      if (!response.data.success) throw new Error('Contact request failed');
      setContactStatus('Thanks. We will get back to you shortly.');
    } catch {
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({ ...contactForm, id: Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      setContactStatus('Message saved. We will get back to you shortly.');
    }
    setContactForm(initialContact);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setReviewStatus('Submitting your review...');
    const selectedTour = tours.find(tour => String(tour.id) === reviewForm.tour);
    const payload = { ...reviewForm, rating: Number(reviewForm.rating), tourName: selectedTour?.country || 'Travel experience' };

    try {
      const response = await reviewsAPI.create(payload);
      if (!response.data.success) throw new Error('Review request failed');
      setReviewStatus('Thank you. Your review has been submitted.');
    } catch {
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      reviews.push({ ...payload, id: `${payload.customerName}-${reviews.length}`, date: new Date().toISOString() });
      localStorage.setItem('reviews', JSON.stringify(reviews));
      setReviewStatus('Thank you. Your review has been saved.');
    }
    setReviewForm(initialReview);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container contact-hero-inner">
          <p className="contact-eyebrow">Marwa Travel / Contact</p>
          <h1>Let&apos;s plan something worth remembering.</h1>
          <p>Tell us where you want to go, or share how your last journey felt.</p>
        </div>
      </section>

      <section className="contact-content container">
        <div className="contact-details">
          <p className="contact-eyebrow">Reach our team</p>
          <h2>We&apos;re here to help with the details.</h2>
          <p className="contact-intro">Ask about a private itinerary, group travel, dates, or anything else you need before setting off.</p>
          <div className="contact-detail-list">
            <a href="tel:+923001234567"><span>Phone</span>+92 300 1234567</a>
            <a href="mailto:info@marwa.com"><span>Email</span>info@marwa.com</a>
            <a href="https://instagram.com/marwatravel" target="_blank" rel="noreferrer"><span>Instagram</span>@marwatravel</a>
            <div><span>Hours</span>Mon - Sat / 09:00 - 18:00</div>
          </div>
          <Link to="/" className="contact-back">Back to exploring tours</Link>
        </div>

        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div className="form-heading"><p className="contact-eyebrow">01 / Send a message</p><h2>How can we help?</h2></div>
          <label>Name<input required value={contactForm.name} onChange={event => setContactForm({ ...contactForm, name: event.target.value })} placeholder="Your full name" /></label>
          <div className="form-row"><label>Email<input required type="email" value={contactForm.email} onChange={event => setContactForm({ ...contactForm, email: event.target.value })} placeholder="you@example.com" /></label><label>Phone<input value={contactForm.phone} onChange={event => setContactForm({ ...contactForm, phone: event.target.value })} placeholder="Your number" /></label></div>
          <label>Message<textarea required rows="5" value={contactForm.message} onChange={event => setContactForm({ ...contactForm, message: event.target.value })} placeholder="Tell us about your plans..." /></label>
          <button type="submit" className="contact-submit">Send message</button>
          {contactStatus && <p className="form-status" role="status">{contactStatus}</p>}
        </form>
      </section>

      <section className="review-section">
        <div className="container review-layout">
          <div><p className="contact-eyebrow">02 / Your experience</p><h2>Leave a review.</h2><p>Thoughtful feedback helps future travelers choose their next adventure.</p></div>
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <div className="form-row"><label>Name<input required value={reviewForm.customerName} onChange={event => setReviewForm({ ...reviewForm, customerName: event.target.value })} placeholder="Your name" /></label><label>Email<input type="email" value={reviewForm.email} onChange={event => setReviewForm({ ...reviewForm, email: event.target.value })} placeholder="Optional" /></label></div>
            <div className="form-row"><label>Tour<select required value={reviewForm.tour} onChange={event => setReviewForm({ ...reviewForm, tour: event.target.value })}><option value="">Choose a tour</option>{tours.map(tour => <option key={tour.id} value={tour.id}>{tour.country}</option>)}</select></label><label>Rating<select value={reviewForm.rating} onChange={event => setReviewForm({ ...reviewForm, rating: event.target.value })}><option value="5">5 / 5</option><option value="4">4 / 5</option><option value="3">3 / 5</option><option value="2">2 / 5</option><option value="1">1 / 5</option></select></label></div>
            <label>Review<textarea required rows="4" value={reviewForm.comment} onChange={event => setReviewForm({ ...reviewForm, comment: event.target.value })} placeholder="What stood out about your trip?" /></label>
            <button type="submit" className="review-submit">Submit review</button>
            {reviewStatus && <p className="form-status" role="status">{reviewStatus}</p>}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
