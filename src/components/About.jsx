import React from 'react';
import './About.css';

const About = () => {
  const badges = [
    { icon: '⏰', title: '5+ Years', subtitle: 'Experience' },
    { icon: '🏜️', title: 'Local', subtitle: 'Experts' },
    { icon: '✓', title: 'Certified', subtitle: 'Desert Tours' },
    { icon: '🌍', title: 'Multi', subtitle: 'Languages' },
    { icon: '🛡️', title: 'Safe', subtitle: 'Routes' }
  ];

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-left">
            <h2>Meet Your Desert Guides</h2>
            <div className="founder-quote">
              <p>
                "We believe in small groups for private, safe, and unforgettable experiences.
                Every journey is crafted with care to connect you deeply with the desert's beauty."
              </p>
              <div className="founder-name">— Amir Al-Qatifi, Founder</div>
            </div>
            <img src="/travel.jfif" alt="Travel" className="travel-image" />
          </div>

          <div className="about-right">
            <img src="/guide.jpg" alt="Desert Guide" className="about-image" />
            <div className="trust-badges">
              {badges.map((badge, index) => (
                <div key={index} className="badge">
                  <h3>{badge.title}</h3>
                  <p>{badge.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
