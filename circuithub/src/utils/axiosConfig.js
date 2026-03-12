// import axios from 'axios';

// // Create axios instance with base URL
// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// const api = api.create({
//   baseURL: API_BASE,
//   withCredentials: true
// });

// // Request interceptor - Add token to every request
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - Handle 401 errors (unauthorized)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       localStorage.removeItem('token');
//       localStorage.removeItem('userId');
//       window.location.href = '/'; // Redirect to home/login
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
