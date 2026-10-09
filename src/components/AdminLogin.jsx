import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { toast } from 'react-toastify';
import './AdminLogin.css';

function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try API first
      const response = await authAPI.login(credentials);

      if (response.data.success) {
        // Store token and admin info
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));

        toast.success('Login successful!');
        onLogin();
        navigate('/admin/dashboard');
      }
    } catch (err) {
      // Fallback to localStorage mode (for development without MongoDB)
      console.log('API login failed, using localStorage fallback');

      if (credentials.username === 'admin' && credentials.password === 'Admin@123Secure') {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminInfo', JSON.stringify({
          username: 'admin',
          email: 'admin@marwatravel.com'
        }));

        toast.success('Login successful! (Development mode)');
        onLogin();
        navigate('/admin/dashboard');
      } else {
        const errorMsg = 'Invalid credentials';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
