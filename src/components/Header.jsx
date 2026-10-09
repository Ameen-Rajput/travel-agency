import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>Marwa Travel</Link>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <a href="/#tours" onClick={closeMenu}>Tours</a>
            <a href="/#about" onClick={closeMenu}>About</a>
            <a href="/#blog" onClick={closeMenu}>Blog</a>
            <a href="/#gallery" onClick={closeMenu}>Gallery</a>
            <Link to="/admin/login" className="admin-link">Admin</Link>
          </nav>

          <Link to="/contact" className="btn-primary" onClick={closeMenu}>Contact</Link>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
