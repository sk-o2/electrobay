


// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
// import axios from "axios";

// const AuthContext = createContext(null);

// // Hook for consumers
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Axios default to include cookies for all requests
//   axios.defaults.withCredentials = true;

//   const fetchCurrentUser = useCallback(async () => {
//     setLoading(true);
//     try {
//       // Adjust base URL via VITE_API_URL if needed
//       const base = import.meta.env.VITE_API_URL || "";
//       const res = await axios.get(`${base}/api/profile`);
//       setUser(res.data.user || null);
//     } catch (err) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCurrentUser();
//   }, [fetchCurrentUser]);

//   const login = async ({ email, password, remember = false }) => {
//     const base = import.meta.env.VITE_API_URL || "";
//     await axios.post(
//       `${base}/api/auth/login`,
//       { email, password, remember },
//       { withCredentials: true }
//     );
//     // populate user after login (server sets cookies)
//     await fetchCurrentUser();
//   };

//   const logout = async () => {
//     const base = import.meta.env.VITE_API_URL || "";
//     try {
//       await axios.post(`${base}/api/auth/logout`, {}, { withCredentials: true });
//     } catch (err) {
//       // ignore errors, still clear client state
//     } finally {
//       setUser(null);
//     }
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     reload: fetchCurrentUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
























// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";



/**
 * AuthContext for Vite app
 * - Requires VITE_API_URL in your .env (e.g. VITE_API_URL=http://localhost:5000)
 * - Backend should expose: GET /api/profile, POST /api/auth/login, POST /api/auth/logout
 *
 * This context uses cookie-based auth (axios sends HttpOnly cookies because withCredentials=true).
 */

// create context
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// create a small axios instance so baseURL and withCredentials are centralized
const API_BASE = import.meta.env.VITE_API_URL || "";
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // ensures cookies are sent
  headers: { "Content-Type": "application/json" },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // user object from backend or null
  const [loading, setLoading] = useState(true); // true while we check session

  // fetch current user from backend (cookie-based session)
  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/profile");
      setUser(res.data?.user ?? null);
      return res.data?.user ?? null;
    } catch (err) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // check session on mount
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // login: returns the user on success, throws on failure
  const login = async ({ email, password, remember = false } = {}) => {
    try {
      await api.post("/api/auth/login", { email, password, remember });
      const u = await fetchCurrentUser(); // repopulate user from server
      return u;
    } catch (err) {
      // bubble up error so UI can show it
      // axios error message may be in err.response.data
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      const e = new Error(message);
      e._raw = err;
      throw e;
    }
  };

  // logout: attempt server logout, then clear client user state
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      // ignore server error but still clear client-side auth
      console.warn("Logout error (ignored):", err?.response?.data ?? err.message);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    reload: fetchCurrentUser,
    api, // expose api instance so other components can import from context if desired
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
