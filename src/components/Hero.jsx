import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faTemperatureArrowDown, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="hero-badge">ADVENTURE AWAITS</span>

          <div className="hero-main">
            <div className="hero-left">
              <h1 className="hero-title">Explore the Best Natural Places</h1>
              <a href="#tours" className="hero-cta-btn">Book Your Adventure</a>
              <div className="hero-features-wrapper">
                <div className="hero-icons">
                  <div className="hero-icon">
                    <FontAwesomeIcon icon={faMountain} />
                  </div>
                  <div className="hero-icon">
                    <FontAwesomeIcon icon={faCamera} />
                  </div>
                  <div className="hero-icon">
                    <FontAwesomeIcon icon={faTemperatureArrowDown} />
                  </div>
                  <div className="hero-icon">
                    <FontAwesomeIcon icon={faLocationCrosshairs} />
                  </div>
                </div>
                <p className="hero-features">
                  20+ Scenic<br />
                  Spots Included
                </p>
              </div>
            </div>
            <div className="hero-right">
              <p className="hero-subtitle">
                We organize scenic tours, photo stops, and guided routes to the most beautiful natural spots,
                with clear schedules, and simple booking.
              </p>
              <div className="hero-features-boxes">
                <div className="hero-feature-box">Private Trips</div>
                <div className="hero-feature-box">Transport Included</div>
                <div className="hero-feature-box">Custom Route</div>
              </div>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Happy Travelers</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Destinations</p>
            </div>
            <div className="stat-item">
              <h3>4.9★</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
