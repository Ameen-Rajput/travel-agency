import { Link } from 'react-router-dom';
import './FinalCTA.css';

const FinalCTA = () => {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="cta-content">
          <h2>Discover your next perfect desert escape</h2>
          <p>Plan your trip in minutes</p>
          <Link to="/contact" className="btn-primary btn-large">Plan Your Trip</Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
