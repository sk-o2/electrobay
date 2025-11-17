// // src/pages/VerifyEmail.jsx
// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function VerifyEmail() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState({ loading: true, success: false, message: "" });

//   useEffect(() => {
//     const token = searchParams.get("token");
//     const uid = searchParams.get("uid");

//     if (!token || !uid) {
//       setStatus({ loading: false, success: false, message: "Invalid verification link." });
//       return;
//     }

//     const verify = async () => {
//       try {
//         const res = await axios.post("/api/auth/verify-email", { token, uid }, { withCredentials: true });
//         if (res?.data?.success) {
//           setStatus({ loading: false, success: true, message: "Email verified! Redirecting to login..." });
//           setTimeout(() => navigate("/login"), 1500);
//         } else {
//           setStatus({ loading: false, success: false, message: res?.data?.message || "Verification failed." });
//         }
//       } catch (err) {
//         const msg = err?.response?.data?.error || err?.response?.data?.message || "Verification failed.";
//         setStatus({ loading: false, success: false, message: msg });
//       }
//     };

//     verify();
//   }, [searchParams, navigate]);

//   if (status.loading) return <div style={{ padding: 24 }}>Verifying your email…</div>;

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>{status.success ? "Verified ✅" : "Verification failed"}</h2>
//       <p>{status.message}</p>
//       {!status.success && (
//         <div>
//           <p>If the link expired, request a new verification from your profile or try signing up again.</p>
//         </div>
//       )}
//     </div>
//   );
// }
























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
    if (status) {
      if (status === "success") {
        setState({ loading: false, success: true, message: "Email verified successfully! Redirecting to login..." });
        setTimeout(() => navigate("/login"), 1600);
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
          const res = await axios.post("/api/auth/verify-email", { token, uid }, { withCredentials: true });
          if (res.data?.success) {
            setState({ loading: false, success: true, message: "Verified! Redirecting to login..." });
            setTimeout(() => navigate("/login"), 1600);
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
              onClick={() => navigate("/login")}
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
