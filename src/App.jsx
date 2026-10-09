import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Tours from './components/Tours';
import VideoSection from './components/VideoSection';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TourDetail from './components/TourDetail';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function HomePage() {
  return (
    <>
      <Hero />
      <Tours />
      <VideoSection />
      <Testimonials />
      <About />
      <Blog />
      <FAQ />
      <FinalCTA />
    </>
  );
}

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    () => localStorage.getItem('adminAuth') === 'true'
  );

  const handleLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
          <Route
            path="/admin/dashboard"
            element={
              isAdminAuthenticated ?
              <AdminDashboard onLogout={handleLogout} /> :
              <Navigate to="/admin/login" />
            }
          />
          <Route path="/*" element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tour/:id" element={<TourDetail />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
