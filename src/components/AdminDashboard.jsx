import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultTours } from '../utils/defaultTours';
import './AdminDashboard.css';

const getStoredDashboardData = () => {
  let savedTours = JSON.parse(localStorage.getItem('tours') || '[]');
  if (savedTours.length === 0) {
    savedTours = defaultTours;
    localStorage.setItem('tours', JSON.stringify(savedTours));
  }

  return {
    tours: savedTours,
    bookings: JSON.parse(localStorage.getItem('bookings') || '[]'),
    reviews: JSON.parse(localStorage.getItem('reviews') || '[]')
  };
};

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData] = useState(getStoredDashboardData);
  const [tours, setTours] = useState(dashboardData.tours);
  const [bookings, setBookings] = useState(dashboardData.bookings);
  const [reviews, setReviews] = useState(dashboardData.reviews);
  const [formData, setFormData] = useState({
    country: '',
    description: '',
    price: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      const updatedTours = tours.map(tour =>
        tour.id === editingId ? { ...formData, id: editingId } : tour
      );
      setTours(updatedTours);
      localStorage.setItem('tours', JSON.stringify(updatedTours));
      setEditingId(null);
    } else {
      const newTour = {
        ...formData,
        id: Date.now().toString(),
        price: parseFloat(formData.price)
      };
      const updatedTours = [...tours, newTour];
      setTours(updatedTours);
      localStorage.setItem('tours', JSON.stringify(updatedTours));
    }

    setFormData({ country: '', description: '', price: '', image: '' });
  };

  const handleEdit = (tour) => {
    setFormData({
      country: tour.country,
      description: tour.description,
      price: tour.price.toString(),
      image: tour.image
    });
    setEditingId(tour.id);
    setActiveTab('tours');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      const updatedTours = tours.filter(tour => tour.id !== id);
      setTours(updatedTours);
      localStorage.setItem('tours', JSON.stringify(updatedTours));
    }
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const updatedBookings = bookings.filter(booking => booking.id !== id);
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updatedReviews = reviews.filter(review => review.id !== id);
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    onLogout();
    navigate('/admin/login');
  };

  // Calculate statistics
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
  const totalGuests = bookings.reduce((sum, booking) => sum + (booking.guests || 0), 0);
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Get today's bookings
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.bookingDate).toISOString().split('T')[0];
    return bookingDate === today;
  });

  const monthlyTravelData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index), 1);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const guests = bookings
      .filter(booking => {
        const travelDate = new Date(booking.startDate || booking.bookingDate);
        return travelDate.getMonth() === date.getMonth() && travelDate.getFullYear() === year;
      })
      .reduce((sum, booking) => sum + (Number(booking.guests) || 0), 0);

    return { month, guests };
  });

  const chartMax = Math.max(...monthlyTravelData.map(item => item.guests), 1);
  const metricValues = [totalBookings, totalRevenue, totalGuests, Number(averageRating) || 0];
  const metricTotal = metricValues.reduce((sum, value) => sum + value, 0) || 1;
  const metricShareData = [
    { label: 'Bookings', value: totalBookings, color: 'bookings' },
    { label: 'Revenue', value: totalRevenue, color: 'revenue' },
    { label: 'Guests', value: totalGuests, color: 'guests' },
    { label: 'Average rating', value: Number(averageRating) || 0, color: 'rating' }
  ].map(metric => ({
    ...metric,
    percentage: Math.round((metric.value / metricTotal) * 100)
  }));

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="brand-mark">M</span><span>Marwa Travel</span></div>
        <p className="sidebar-label">Workspace</p>
        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          {[
            ['overview', 'Overview'],
            ['bookings', 'Bookings'],
            ['reviews', 'Reviews'],
            ['tours', 'Tours']
          ].map(([tab, label]) => (
            <button
              key={tab}
              className={`sidebar-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="sidebar-index">{String(['overview', 'bookings', 'reviews', 'tours'].indexOf(tab) + 1).padStart(2, '0')}</span>
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-label">Signed in as</span>
          <strong>Administrator</strong>
          <button onClick={handleLogout} className="sidebar-logout">Log out</button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Marwa Travel / Operations</p>
            <h1>Hello, Admin</h1>
            <p className="dashboard-subtitle">A clear view of your travel business today.</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">Log out</button>
        </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-kicker">01</div>
          <div className="stat-details">
            <h3>{totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-kicker">02</div>
          <div className="stat-details">
            <h3>${totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-kicker">03</div>
          <div className="stat-details">
            <h3>{totalGuests}</h3>
            <p>Total Guests</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-kicker">04</div>
          <div className="stat-details">
            <h3>{averageRating}</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
        <button
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
        <button
          className={`tab-btn ${activeTab === 'tours' ? 'active' : ''}`}
          onClick={() => setActiveTab('tours')}
        >
          Tours
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Today's Activity</h3>
                <div className="today-stats">
                  <div className="today-stat-item">
                    <span className="today-number">{todayBookings.length}</span>
                    <span className="today-label">New Bookings Today</span>
                  </div>
                  <div className="today-stat-item">
                    <span className="today-number">
                      {todayBookings.reduce((sum, b) => sum + (b.guests || 0), 0)}
                    </span>
                    <span className="today-label">Guests Today</span>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3>Recent Activity</h3>
                <div className="recent-activity">
                  {bookings.slice(-5).reverse().map(booking => (
                    <div key={booking.id} className="activity-item">
                      <div className="activity-icon">Booking</div>
                      <div className="activity-details">
                        <p className="activity-title">{booking.customerName} booked {booking.tour}</p>
                        <p className="activity-meta">{booking.guests} guests • ${booking.amount}</p>
                      </div>
                      <div className="activity-date">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && <p className="no-data">No bookings yet</p>}
                </div>
              </div>
            </div>
            <section className="travel-chart" aria-labelledby="travel-chart-title">
              <div className="chart-header">
                <div>
                  <p className="eyebrow">Travel activity</p>
                  <h3 id="travel-chart-title">Guests travelled by month</h3>
                </div>
                <span className="chart-period">Last 6 months</span>
              </div>
              <div className="chart-area">
                {monthlyTravelData.map(item => (
                  <div className="chart-column" key={item.month}>
                    <span className="chart-value">{item.guests}</span>
                    <div className="chart-track">
                      <div className="chart-bar" style={{ height: `${(item.guests / chartMax) * 100}%` }} />
                    </div>
                    <span className="chart-month">{item.month}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="metric-share" aria-labelledby="metric-share-title">
              <div className="chart-header">
                <div>
                  <p className="eyebrow">Performance mix</p>
                  <h3 id="metric-share-title">Dashboard metric share</h3>
                </div>
                <span className="chart-period">All-time snapshot</span>
              </div>
              <div className="metric-share-list">
                {metricShareData.map(metric => (
                  <div className="metric-share-row" key={metric.label}>
                    <div className="metric-share-label">
                      <span className={`metric-dot ${metric.color}`} />
                      <span>{metric.label}</span>
                      <strong>{metric.percentage}%</strong>
                    </div>
                    <div className="metric-share-track">
                      <div className={`metric-share-fill ${metric.color}`} style={{ width: `${metric.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Daily Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <div className="section-header">
              <h2>Daily Client Bookings</h2>
              <p className="section-subtitle">{bookings.length} total bookings</p>
            </div>
            <div className="bookings-table-wrapper">
              {bookings.length > 0 ? (
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Phone</th>
                      <th>Tour</th>
                      <th>Guests</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Amount</th>
                      <th>Booked On</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id}>
                        <td className="client-name">{booking.customerName}</td>
                        <td>{booking.phoneNumber}</td>
                        <td className="tour-name">{booking.tour}</td>
                        <td className="guests-count">{booking.guests}</td>
                        <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                        <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                        <td className="amount">${booking.amount}</td>
                        <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                        <td><span className="status-badge">{booking.status}</span></td>
                        <td>
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="btn-delete-small"
                            title="Delete booking"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-data-card">
                  <p>No bookings yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <div className="section-header">
              <h2>Customer Reviews & Feedback</h2>
              <p className="section-subtitle">{reviews.length} total reviews</p>
            </div>
            <div className="reviews-grid">
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div>
                        <h4>{review.customerName}</h4>
                        <p className="review-tour">{review.tour}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="btn-delete-icon"
                        title="Delete review"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="review-rating">
                      Rating <span className="rating-number">{review.rating}/5</span>
                    </div>
                    <p className="review-text">{review.comment}</p>
                    <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <div className="no-data-card">
                  <p>No reviews yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tours Management Tab */}
        {activeTab === 'tours' && (
          <div className="tours-management">
            <div className="management-grid">
              <div className="form-section">
                    <h2>{editingId ? 'Edit tour' : 'Add new tour'}</h2>
                <form onSubmit={handleSubmit} className="tour-form">
                  <div className="form-group">
                    <label>Country/Destination</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                      placeholder="e.g. Dubai, Maldives, Paris"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows="4"
                      placeholder="Describe the tour experience..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Price (per person)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      min="0"
                      step="0.01"
                      placeholder="299"
                    />
                  </div>

                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {editingId ? 'Update Tour' : 'Add Tour'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setFormData({ country: '', description: '', price: '', image: '' });
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="tours-list-section">
                <h2>Existing tours ({tours.length})</h2>
                <div className="tours-list">
                  {tours.map(tour => (
                    <div key={tour.id} className="tour-item">
                      <img src={tour.image} alt={tour.country} />
                      <div className="tour-info">
                        <h3>{tour.country}</h3>
                        <p>{tour.description}</p>
                        <div className="tour-price">${tour.price}/person</div>
                      </div>
                      <div className="tour-actions">
                        <button onClick={() => handleEdit(tour)} className="btn-edit">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(tour.id)} className="btn-delete">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {tours.length === 0 && (
                    <p className="no-tours">No tours added yet. Add your first tour above!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
