import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Marwa Travel</h3>
            <p>
              Discover your next perfect desert escape. We create meaningful routes that inspire and connect you with nature.
            </p>
            <div className="social-links">
              <a href="#" aria-label="TikTok">📱</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Threads">🧵</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#tours">Tours</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@marwa.com">info@marwa.com</a></li>
              <li><Link to="/contact">Book a Tour</Link></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Marwa Travel. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
