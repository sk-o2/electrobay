// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      setMessage(res.data.message || "Check your email for reset instructions.");
      setEmail("");
      // Optionally, navigate to another page or keep here for user to check email
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send reset link. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ ...styles.page, justifyContent: "center" }}>
      <div style={{ ...styles.card, maxWidth: 400 }}>
        <h2>Forgot Password</h2>

        {message && <div style={styles.successBox}>{message}</div>}
        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" style={styles.primaryBtn} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <button
          type="button"
          style={{ ...styles.ghostBtn, marginTop: 8 }}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

// Reuse styles from your Auth.jsx for consistency (copy/paste or import from a shared file)
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    background:
      "linear-gradient(180deg, #0f172a 0%, #071033 60%), radial-gradient(ellipse at top right, rgba(34,197,94,0.06), transparent 20%)",
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    padding: "32px",
  },
  card: {
    padding: "32px",
    borderRadius: "12px",
    background: "linear-gradient(180deg,#021226 0%, #071033 100%)",
    boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
    color: "#e6f0ff",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    color: "#e6f0ff",
    outline: "none",
    fontSize: "14px",
    marginBottom: "12px",
  },
  primaryBtn: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
    color: "#00101a",
    fontWeight: 700,
  },
  ghostBtn: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "transparent",
    color: "#bcd7ff",
    fontWeight: 600,
    cursor: "pointer",
  },
  errorBox: {
    padding: "10px 12px",
    borderRadius: "8px",
    background: "rgba(255,68,68,0.08)",
    color: "#ffb4b4",
    border: "1px solid rgba(255,68,68,0.12)",
    fontSize: "13px",
    marginBottom: "12px",
  },
  successBox: {
    padding: "10px 12px",
    borderRadius: "8px",
    background: "rgba(34,197,94,0.06)",
    color: "#bdf7d1",
    border: "1px solid rgba(34,197,94,0.12)",
    fontSize: "13px",
    marginBottom: "12px",
  },
};
