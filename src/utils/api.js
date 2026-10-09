import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  setup: () => api.post('/auth/setup'),
};

// Tours API
export const toursAPI = {
  getAll: () => api.get('/tours'),
  getById: (id) => api.get(`/tours/${id}`),
  create: (tourData) => api.post('/tours', tourData),
  update: (id, tourData) => api.put(`/tours/${id}`, tourData),
  delete: (id) => api.delete(`/tours/${id}`),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  create: (bookingData) => api.post('/bookings', bookingData),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
  delete: (id) => api.delete(`/bookings/${id}`),
};

// Reviews API
export const reviewsAPI = {
  getAll: () => api.get('/reviews'),
  getAllAdmin: () => api.get('/reviews/all'),
  create: (reviewData) => api.post('/reviews', reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// Contact API
export const contactAPI = {
  create: (contactData) => api.post('/contact', contactData),
};

export default api;
