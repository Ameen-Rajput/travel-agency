import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toursAPI } from '../utils/api';
import { ToursGridSkeleton } from './LoadingSkeletons';
import { defaultTours } from '../utils/defaultTours';
import './Tours.css';

const Tours = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTours = async () => {
    try {
      const response = await toursAPI.getAll();
      if (response.data.success) {
        setTours(response.data.tours);
      }
    } catch (error) {
      console.error('Error loading tours:', error);
      // Fallback to localStorage if API fails
      let savedTours = JSON.parse(localStorage.getItem('tours') || '[]');
      if (savedTours.length === 0) {
        savedTours = defaultTours;
        localStorage.setItem('tours', JSON.stringify(savedTours));
      }
      setTours(savedTours);
    } finally {
      setLoading(false);
    }
  };

  // Load tours from API
  useEffect(() => {
    loadTours();
  }, []);

  const handleTourClick = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  return (
    <section className="tours" id="tours">
      <div className="container">
        <div className="tours-header">
          <h2>Explore Amazing Destinations</h2>
        </div>

        {loading ? (
          <ToursGridSkeleton count={6} />
        ) : tours.length === 0 ? (
          <div className="no-tours">
            <p>No tours available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="tours-grid">
            {tours.map(tour => (
              <div key={tour._id || tour.id} className="tour-card" onClick={() => handleTourClick(tour._id || tour.id)}>
                <div className="tour-image">
                  <img
                    src={tour.country === 'Iceland' ? '/download.webp' : tour.image}
                    alt={tour.country}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = '/hero.jpg';
                    }}
                  />
                </div>
                <div className="tour-content">
                  <h3>{tour.country}</h3>
                  <p className="tour-description">{tour.description}</p>
                  <div className="tour-price">
                    ${tour.price}<span>/person</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tours;
