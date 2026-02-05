// import axios from "axios";

// axios.defaults.withCredentials = true;

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const url = error.config?.url || "";

//     // ❗ DO NOT redirect for auth endpoints
//     const isAuthRoute =
//       url.includes("/auth/login") ||
//       url.includes("/auth/register") ||
//       url.includes("/auth/signup") ||
//       url.includes("/auth/verify-email");

//     if (status === 401 && !isAuthRoute) {
//       console.warn("Unauthorized - redirecting to login");
//       window.location.href = "/auth";
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/signup");

    if (status === 401 && !isAuthRoute) {
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default api;
