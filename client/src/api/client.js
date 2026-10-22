import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Authorization header if token is in localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('namah_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle unauthenticated responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on an admin route, clear token
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('namah_admin_token');
        localStorage.removeItem('namah_admin_user');
        window.location.href = '/admin/login?sessionExpired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
