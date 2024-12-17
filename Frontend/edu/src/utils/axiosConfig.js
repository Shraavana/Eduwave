import axios from 'axios';

// Base URL configuration
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

// Request Interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor (optional, for handling global error responses)
axios.interceptors.response.use(
  response => response,
  error => {
    // Handle common error scenarios
    if (error.response && error.response.status === 401) {
      // Unauthorized - typically means token is invalid
      // You might want to logout the user or refresh the token
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;