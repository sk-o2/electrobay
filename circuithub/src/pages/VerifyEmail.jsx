// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ loading: true, success: false, message: "" });

  useEffect(() => {
    const status = searchParams.get("status");
    const reason = searchParams.get("reason");
    const token = searchParams.get("token");
    const uid = searchParams.get("uid");

    // Case A: backend already verified and redirected here -> status present
    if (status) {tzz
      if (status === "success") {
        setState({ loading: false, success: true, message: "Email verified successfully! Redirecting to login..." });
        setTimeout(() => navigate("/auth"), 1600);
      } else {
        const msgMap = {
          invalid: "Invalid verification link.",
          notfound: "No verification token found (maybe already verified).",
          invalid_token: "Verification token is invalid.",
          expired: "Verification token expired. Request a new verification email.",
          server: "Verification failed (server error)."
        };
        setState({ loading: false, success: false, message: msgMap[reason] || "Verification failed." });
      }
      return;
    }

    // Case B: frontend must POST token/uid to backend
    if (token && uid) {
      (async () => {
        try {
          setState({ loading: true, success: false, message: "Verifying..." });
          const res = await api.post("/api/auth/verify-email", { token, uid }, { withCredentials: true });
          if (res.data?.success) {
            setState({ loading: false, success: true, message: "Verified! Redirecting to login..." });
            setTimeout(() => navigate("/auth"), 1600);
          } else {
            setState({ loading: false, success: false, message: res.data?.message || "Verification failed." });
          }
        } catch (err) {
          const msg = err?.response?.data?.error || err?.response?.data?.message || "Verification failed.";
          setState({ loading: false, success: false, message: msg });
        }
      })();
      return;
    }

    // Nothing useful in URL
    setState({ loading: false, success: false, message: "No verification data found in the link." });
  }, [searchParams, navigate]);

  if (state.loading) return <div style={{ padding: 24 }}>Please wait…</div>;

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "40px auto", textAlign: "center" }}>
      <h2 style={{ color: state.success ? "#16a34a" : "#dc2626" }}>
        {state.success ? "Email verified ✅" : "Verification"}
      </h2>
      <p>{state.message}</p>

      {!state.success && (
        <div style={{ marginTop: 16 }}>
          <p>If this link doesn't work, try requesting a new verification email from your account or re-register.</p>
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => navigate("/auth")}
              style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ddd", cursor: "pointer" }}
            >
              Back to login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
