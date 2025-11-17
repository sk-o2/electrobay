// // src/components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { AuthContext } from "../context/AuthContext";

// export default function ProtectedRoute({ children, roles = [] }) {
//   const { user, loading } = useAuth();
//   if (loading) return <div>Loading...</div>;
//   if (!user) return <Navigate to="/login" replace />;
//   if (roles.length && !roles.includes(user.role)) return <Navigate to="/" replace />;
//   return children;
// }


// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (roles.length && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
