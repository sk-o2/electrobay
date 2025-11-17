import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const query = useQuery();
  const token = query.get("token");  // Extract reset token from query string
  const uid = query.get("uid");      // Extract user id from query string (you must include uid in email link)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !uid) {
      setError("Invalid or missing reset token or user id.");
    }
  }, [token, uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token || !uid) {
      setError("Reset token or user id is missing.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/reset-password/${token}`, // token in URL path
        {
          token,
          uid,
          newPassword: password,      // Backend expects newPassword, uid, token in body
        },
        { withCredentials: true }
      );

      setSuccessMsg(res.data.message || "Password has been reset.");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/auth"), 5000); // Redirect to login after success
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to reset password. The link may be expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg, #0f172a 0%, #071033 60%), radial-gradient(ellipse at top right, rgba(34,197,94,0.06), transparent 20%)",
        fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        padding: "32px"
      }}>
      <div style={{
          padding: "32px",
          borderRadius: "12px",
          background: "linear-gradient(180deg,#021226 0%, #071033 100%)",
          boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
          color: "#e6f0ff",
          maxWidth: 400,
          width: "100%"
        }}>
        <h2>Reset Password</h2>

        {error && (
          <div style={{
            marginTop: "12px",
            padding: "10px 12px",
            borderRadius: "8px",
            background: "rgba(255,68,68,0.08)",
            color: "#ffb4b4",
            border: "1px solid rgba(255,68,68,0.12)",
            fontSize: "13px"
          }}>{error}</div>
        )}
        {successMsg && (
          <div style={{
            marginTop: "12px",
            padding: "10px 12px",
            borderRadius: "8px",
            background: "rgba(34,197,94,0.06)",
            color: "#bdf7d1",
            border: "1px solid rgba(34,197,94,0.12)",
            fontSize: "13px"
          }}>{successMsg}</div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <input
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              color: "#e6f0ff",
              outline: "none",
              fontSize: "14px",
              marginBottom: "12px"
            }}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <input
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              color: "#e6f0ff",
              outline: "none",
              fontSize: "14px",
              marginBottom: "12px"
            }}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
              color: "#00101a",
              fontWeight: 700
            }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <button
          type="button"
          style={{
            width: "100%",
            padding: "10px 12px",
            marginTop: 8,
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "transparent",
            color: "#bcd7ff",
            fontWeight: 600,
            cursor: "pointer"
          }}
          onClick={() => navigate("/auth")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}











