// // src/pages/Auth.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// /**
//  * Auth.jsx
//  * Props:
//  *  - onAuthSuccess(user) optional callback called after successful login (receives user object)
//  *
//  * Notes:
//  *  - Backend endpoints:
//  *     POST  /api/auth/login        { email, password, remember }
//  *     POST  /api/auth/register     { email, password, phone, address }
//  *     GET   /api/profile           (returns { user })
//  *  - Axios is configured here to send cookies (HttpOnly tokens).
//  */

// axios.defaults.withCredentials = true; // send cookies
// const API_BASE = process.env.REACT_APP_API_URL || '';

// const styles = {
//   page: {
//     minHeight: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background:
//       'linear-gradient(180deg, #0f172a 0%, #071033 60%), radial-gradient(ellipse at top right, rgba(34,197,94,0.06), transparent 20%)',
//     fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
//     padding: '32px'
//   },
//   card: {
//     width: '920px',
//     maxWidth: '96%',
//     display: 'flex',
//     borderRadius: '12px',
//     overflow: 'hidden',
//     boxShadow: '0 10px 30px rgba(2,6,23,0.6)',
//     background: 'linear-gradient(180deg,#021226 0%, #071033 100%)'
//   },
//   left: {
//     flex: '1 1 380px',
//     padding: '32px',
//     color: '#e6f0ff',
//     background:
//       'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px'
//   },
//   right: {
//     flex: '1 1 420px',
//     padding: '28px',
//     background: 'linear-gradient(180deg,#081428 0%, #041020 100%)',
//     color: '#dbeafe',
//   },
//   brand: {
//     display: 'flex',
//     gap: '12px',
//     alignItems: 'center',
//     fontWeight: 700,
//     fontSize: '18px'
//   },
//   headline: {
//     fontSize: '22px',
//     fontWeight: 700,
//     marginTop: '8px',
//     lineHeight: 1.1
//   },
//   sub: {
//     color: '#9fb0d9',
//     fontSize: '14px'
//   },
//   tabs: {
//     display: 'flex',
//     gap: '8px',
//     marginBottom: '18px',
//     flexWrap: 'wrap'
//   },
//   tabBtn: (active) => ({
//     padding: '8px 14px',
//     borderRadius: '10px',
//     cursor: 'pointer',
//     border: 'none',
//     background: active ? 'linear-gradient(90deg,#06b6d4,#3b82f6)' : 'transparent',
//     color: active ? '#00101a' : '#bcd7ff',
//     fontWeight: 600,
//     boxShadow: active ? '0 6px 18px rgba(59,130,246,0.18)' : 'none'
//   }),
//   formRow: { display: 'flex', gap: '12px', marginBottom: '12px' },
//   input: {
//     width: '100%',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     border: '1px solid rgba(255,255,255,0.06)',
//     background: 'rgba(255,255,255,0.02)',
//     color: '#e6f0ff',
//     outline: 'none',
//     fontSize: '14px'
//   },
//   textarea: {
//     width: '100%',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     border: '1px solid rgba(255,255,255,0.06)',
//     background: 'rgba(255,255,255,0.02)',
//     color: '#e6f0ff',
//     outline: 'none',
//     fontSize: '14px',
//     minHeight: '72px'
//   },
//   primaryBtn: {
//     padding: '11px 14px',
//     borderRadius: '10px',
//     border: 'none',
//     cursor: 'pointer',
//     background: 'linear-gradient(90deg,#06b6d4,#3b82f6)',
//     color: '#00101a',
//     fontWeight: 700,
//     width: '100%'
//   },
//   ghostBtn: {
//     padding: '10px 12px',
//     borderRadius: '10px',
//     border: '1px solid rgba(255,255,255,0.06)',
//     background: 'transparent',
//     color: '#bcd7ff',
//     fontWeight: 600,
//     cursor: 'pointer'
//   },
//   smallMuted: {
//     color: '#9fb0d9',
//     fontSize: '13px'
//   },
//   errorBox: {
//     marginTop: '12px',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     background: 'rgba(255,68,68,0.08)',
//     color: '#ffb4b4',
//     border: '1px solid rgba(255,68,68,0.12)',
//     fontSize: '13px'
//   },
//   successBox: {
//     marginTop: '12px',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     background: 'rgba(34,197,94,0.06)',
//     color: '#bdf7d1',
//     border: '1px solid rgba(34,197,94,0.12)',
//     fontSize: '13px'
//   }
// };

// export default function Auth({ onAuthSuccess = () => {} }) {
//   const [tab, setTab] = useState('login'); // 'login' | 'signup'
//   // login state
//   const [loginEmail, setLoginEmail] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
//   const [remember, setRemember] = useState(false);

//   // signup state
//   const [suEmail, setSuEmail] = useState('');
//   const [suPassword, setSuPassword] = useState('');
//   const [suConfirm, setSuConfirm] = useState('');
//   const [suPhone, setSuPhone] = useState('');
//   const [suAddress, setSuAddress] = useState({
//     line1: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     country: ''
//   });

//   // UI state
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');

//   // simple validators
//   const isEmail = (v) => /\S+@\S+\.\S+/.test(v);

//   // Login handler
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMsg('');
//     if (!isEmail(loginEmail)) return setError('Enter a valid email address.');
//     if (!loginPassword || loginPassword.length < 6) return setError('Enter your password (min 6 chars).');

//     setLoading(true);
//     try {
//       await axios.post(
//         `${API_BASE}/api/auth/login`,
//         { email: loginEmail, password: loginPassword, remember },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       // fetch profile
//       const me = await axios.get(`${API_BASE}/api/profile`);
//       const user = me.data?.user || null;
//       setSuccessMsg('Logged in successfully — redirecting...');
//       setTimeout(() => {
//         onAuthSuccess(user);
//       }, 500);
//     } catch (err) {
//       console.error(err);
//       const msg =
//         err?.response?.data?.error ||
//         err?.response?.data?.message ||
//         (err?.response?.status === 401 ? 'Invalid credentials' : 'Login failed. Try again.');
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Signup handler
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMsg('');
//     if (!isEmail(suEmail)) return setError('Enter a valid email address.');
//     if (!suPassword || suPassword.length < 6) return setError('Password must be at least 6 characters.');
//     if (suPassword !== suConfirm) return setError('Passwords do not match.');

//     setLoading(true);
//     try {
//       const addressPayload = {
//         line1: suAddress.line1,
//         city: suAddress.city,
//         state: suAddress.state,
//         postalCode: suAddress.postalCode,
//         country: suAddress.country
//       };
//       await axios.post(
//         `${API_BASE}/api/auth/register`,
//         { email: suEmail, password: suPassword, phone: suPhone, address: addressPayload },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       setSuccessMsg('Account created. Check your email for a verification link.');
//       // Clear signup fields (keep UX clean)
//       setSuEmail('');
//       setSuPassword('');
//       setSuConfirm('');
//       setSuPhone('');
//       setSuAddress({ line1: '', city: '', state: '', postalCode: '', country: '' });
//       // Optionally switch to login tab
//       setTab('login');
//     } catch (err) {
//       console.error(err);
//       const msg = err?.response?.data?.error || 'Signup failed. Try again.';
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // small helper for address inputs
//   const addrChange = (field, value) => setSuAddress((s) => ({ ...s, [field]: value }));

//   return (
//     <div style={styles.page}>
//       <div style={styles.card} role="main" aria-label="Authentication">
//         <div style={styles.left}>
//           <div style={styles.brand}>
//             <div style={{ fontSize: 22 }}>⚡</div>
//             <div>
//               <div style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>VoltCart</div>
//               <div style={{ fontSize: 12, color: '#9fb0d9' }}>Electronics marketplace</div>
//             </div>
//           </div>

//           <div style={styles.headline}>Welcome — power up your purchase</div>
//           <div style={styles.sub}>
//             Fast checkout, secure accounts. Sign up to save addresses, track orders and access exclusive deals on gadgets.
//           </div>

//           <div style={{ marginTop: 24 }}>
//             <div style={styles.smallMuted}>Why create an account?</div>
//             <ul style={{ color: '#bcd7ff', marginTop: 8, lineHeight: 1.6 }}>
//               <li>Save multiple shipping addresses</li>
//               <li>View order history & easy returns</li>
//               <li>Faster checkout & exclusive offers</li>
//             </ul>
//           </div>

//           <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div style={{ color: '#9fb0d9', fontSize: 13 }}>Secure · Fast · Trusted</div>
//             <div style={{ display: 'flex', gap: 8 }}>
//               <button style={styles.ghostBtn} type="button" onClick={() => window.open('https://example.com/pricing', '_blank')}>Why VoltCart?</button>
//               <button style={styles.ghostBtn} type="button" onClick={() => window.open('https://example.com/support', '_blank')}>Support</button>
//             </div>
//           </div>
//         </div>

//         <div style={styles.right}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div style={{ fontWeight: 700, color: '#e6f0ff' }}>{tab === 'login' ? 'Sign in' : 'Create account'}</div>
//             <div style={styles.smallMuted}>Welcome back — let's get you signed in</div>
//           </div>

//           <div style={styles.tabs}>
//             <button style={styles.tabBtn(tab === 'login')} onClick={() => { setTab('login'); setError(''); setSuccessMsg(''); }}>
//               Login
//             </button>
//             <button style={styles.tabBtn(tab === 'signup')} onClick={() => { setTab('signup'); setError(''); setSuccessMsg(''); }}>
//               Sign up
//             </button>
//           </div>

//           {error && <div style={styles.errorBox}>{error}</div>}
//           {successMsg && <div style={styles.successBox}>{successMsg}</div>}

//           {tab === 'login' ? (
//             <form onSubmit={handleLogin} style={{ marginTop: 12 }}>
//               <div style={styles.formRow}>
//                 <input
//                   style={styles.input}
//                   placeholder="Email"
//                   value={loginEmail}
//                   onChange={(e) => setLoginEmail(e.target.value)}
//                   type="email"
//                   required
//                 />
//               </div>
//               <div style={styles.formRow}>
//                 <input
//                   style={styles.input}
//                   placeholder="Password"
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                   type="password"
//                   required
//                 />
//               </div>

//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
//                 <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                   <input
//                     type="checkbox"
//                     checked={remember}
//                     onChange={(e) => setRemember(e.target.checked)}
//                     style={{ accentColor: '#06b6d4' }}
//                   />
//                   <span style={{ color: '#bcd7ff' }}>Remember me</span>
//                 </label>
//                 <button
//                   type="button"
//                   style={{ background: 'transparent', color: '#93c5fd', border: 'none', cursor: 'pointer', fontSize: 13 }}
//                   onClick={() => alert('Forgot password flow: go to /forgot — or implement modal to POST /api/auth/forgot-password')}
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               <div style={{ marginBottom: 12 }}>
//                 <button type="submit" style={styles.primaryBtn} disabled={loading}>
//                   {loading ? 'Signing in…' : 'Sign in'}
//                 </button>
//               </div>

//               <div style={{ textAlign: 'center', color: '#9fb0d9', fontSize: 13 }}>
//                 Or sign in with
//                 <span style={{ marginLeft: 8 }}>
//                   <button type="button" style={{ ...styles.ghostBtn, marginLeft: 8 }}>Google</button>
//                   <button type="button" style={{ ...styles.ghostBtn, marginLeft: 8 }}>Apple</button>
//                 </span>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleSignup} style={{ marginTop: 12 }}>
//               <div style={styles.formRow}>
//                 <input
//                   style={styles.input}
//                   placeholder="Email"
//                   value={suEmail}
//                   onChange={(e) => setSuEmail(e.target.value)}
//                   type="email"
//                   required
//                 />
//               </div>
//               <div style={styles.formRow}>
//                 <input
//                   style={styles.input}
//                   placeholder="Password (min 6 chars)"
//                   value={suPassword}
//                   onChange={(e) => setSuPassword(e.target.value)}
//                   type="password"
//                   required
//                 />
//                 <input
//                   style={styles.input}
//                   placeholder="Confirm password"
//                   value={suConfirm}
//                   onChange={(e) => setSuConfirm(e.target.value)}
//                   type="password"
//                   required
//                 />
//               </div>

//               <div style={styles.formRow}>
//                 <input
//                   style={styles.input}
//                   placeholder="Phone (optional)"
//                   value={suPhone}
//                   onChange={(e) => setSuPhone(e.target.value)}
//                   type="tel"
//                 />
//               </div>

//               <div style={{ marginBottom: 8, color: '#9fb0d9', fontSize: 13 }}>Shipping address (optional)</div>
//               <div style={styles.formRow}>
//                 <input
//                   style={styles.input}
//                   placeholder="Address line 1"
//                   value={suAddress.line1}
//                   onChange={(e) => addrChange('line1', e.target.value)}
//                   type="text"
//                 />
//               </div>
//               <div style={styles.formRow}>
//                 <input
//                   style={{ ...styles.input, flex: 2 }}
//                   placeholder="City"
//                   value={suAddress.city}
//                   onChange={(e) => addrChange('city', e.target.value)}
//                 />
//                 <input
//                   style={{ ...styles.input, flex: 1 }}
//                   placeholder="State"
//                   value={suAddress.state}
//                   onChange={(e) => addrChange('state', e.target.value)}
//                 />
//               </div>
//               <div style={styles.formRow}>
//                 <input
//                   style={{ ...styles.input, flex: 1 }}
//                   placeholder="Postal code"
//                   value={suAddress.postalCode}
//                   onChange={(e) => addrChange('postalCode', e.target.value)}
//                 />
//                 <input
//                   style={{ ...styles.input, flex: 1 }}
//                   placeholder="Country"
//                   value={suAddress.country}
//                   onChange={(e) => addrChange('country', e.target.value)}
//                 />
//               </div>

//               <div style={{ marginBottom: 12 }}>
//                 <button type="submit" style={styles.primaryBtn} disabled={loading}>
//                   {loading ? 'Creating account…' : 'Create account'}
//                 </button>
//               </div>

//               <div style={{ color: '#9fb0d9', fontSize: 13 }}>
//                 By creating an account you agree to our <button type="button" style={{ border: 'none', background: 'transparent', color: '#93c5fd', cursor: 'pointer' }}>Terms</button>.
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



















// // src/pages/Auth.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// /**
//  * Auth.jsx
//  * - Uses centralized login from AuthContext
//  * - Signup posts to /api/auth/register
//  */

// // ensure cookies are sent for all requests
// axios.defaults.withCredentials = true;

// const API_BASE = import.meta.env.VITE_API_URL || '';

// const styles = {
//   /* (same styles as your file — omitted here for brevity in this view) */
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background:
//       "linear-gradient(180deg, #0f172a 0%, #071033 60%), radial-gradient(ellipse at top right, rgba(34,197,94,0.06), transparent 20%)",
//     fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
//     padding: "32px",
//   },
//   card: {
//     width: "920px",
//     maxWidth: "96%",
//     display: "flex",
//     borderRadius: "12px",
//     overflow: "hidden",
//     boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
//     background: "linear-gradient(180deg,#021226 0%, #071033 100%)",
//   },
//   left: {
//     flex: "1 1 380px",
//     padding: "32px",
//     color: "#e6f0ff",
//     background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
//   },
//   right: {
//     flex: "1 1 420px",
//     padding: "28px",
//     background: "linear-gradient(180deg,#081428 0%, #041020 100%)",
//     color: "#dbeafe",
//   },
//   brand: { display: "flex", gap: "12px", alignItems: "center", fontWeight: 700, fontSize: "18px" },
//   headline: { fontSize: "22px", fontWeight: 700, marginTop: "8px", lineHeight: 1.1 },
//   sub: { color: "#9fb0d9", fontSize: "14px" },
//   tabs: { display: "flex", gap: "8px", marginBottom: "18px", flexWrap: "wrap" },
//   tabBtn: (active) => ({
//     padding: "8px 14px",
//     borderRadius: "10px",
//     cursor: "pointer",
//     border: "none",
//     background: active ? "linear-gradient(90deg,#06b6d4,#3b82f6)" : "transparent",
//     color: active ? "#00101a" : "#bcd7ff",
//     fontWeight: 600,
//     boxShadow: active ? "0 6px 18px rgba(59,130,246,0.18)" : "none",
//   }),
//   formRow: { display: "flex", gap: "12px", marginBottom: "12px" },
//   input: {
//     width: "100%",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     border: "1px solid rgba(255,255,255,0.06)",
//     background: "rgba(255,255,255,0.02)",
//     color: "#e6f0ff",
//     outline: "none",
//     fontSize: "14px",
//   },
//   primaryBtn: {
//     padding: "11px 14px",
//     borderRadius: "10px",
//     border: "none",
//     cursor: "pointer",
//     background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
//     color: "#00101a",
//     fontWeight: 700,
//     width: "100%",
//   },
//   ghostBtn: {
//     padding: "10px 12px",
//     borderRadius: "10px",
//     border: "1px solid rgba(255,255,255,0.06)",
//     background: "transparent",
//     color: "#bcd7ff",
//     fontWeight: 600,
//     cursor: "pointer",
//   },
//   smallMuted: { color: "#9fb0d9", fontSize: "13px" },
//   errorBox: {
//     marginTop: "12px",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     background: "rgba(255,68,68,0.08)",
//     color: "#ffb4b4",
//     border: "1px solid rgba(255,68,68,0.12)",
//     fontSize: "13px",
//   },
//   successBox: {
//     marginTop: "12px",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     background: "rgba(34,197,94,0.06)",
//     color: "#bdf7d1",
//     border: "1px solid rgba(34,197,94,0.12)",
//     fontSize: "13px",
//   },
// };

// export default function Auth({ onAuthSuccess = () => {} }) {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [tab, setTab] = useState("login"); // 'login' | 'signup'
//   // login state
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [remember, setRemember] = useState(false);

//   // signup state
//   const [suEmail, setSuEmail] = useState("");
//   const [suPassword, setSuPassword] = useState("");
//   const [suConfirm, setSuConfirm] = useState("");
//   const [suPhone, setSuPhone] = useState("");
//   const [suAddress, setSuAddress] = useState({
//     line1: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//   });

//   // UI state
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   // simple validators
//   const isEmail = (v) => /\S+@\S+\.\S+/.test(v);

//   // Login handler
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMsg("");
//     if (!isEmail(loginEmail)) return setError("Enter a valid email address.");
//     if (!loginPassword || loginPassword.length < 6) return setError("Enter your password (min 6 chars).");

//     setLoading(true);
//     try {
//       await login({ email: loginEmail, password: loginPassword, remember });
//       setSuccessMsg("Logged in successfully — redirecting...");
//       // optional callback
//       try {
//         const me = await axios.get(`${API_BASE}/api/profile`, { withCredentials: true });
//         onAuthSuccess(me.data?.user || null);
//       } catch (_) {
//         // ignore if profile fetch fails here; AuthContext already fetched user
//       }
//       setTimeout(() => navigate("/products"), 500);
//     } catch (err) {
//       console.error(err);
//       const msg =
//         err?.response?.data?.error ||
//         err?.response?.data?.message ||
//         (err?.response?.status === 401 ? "Invalid credentials" : "Login failed. Try again.");
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Signup handler
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMsg("");
//     if (!isEmail(suEmail)) return setError("Enter a valid email address.");
//     if (!suPassword || suPassword.length < 6) return setError("Password must be at least 6 characters.");
//     if (suPassword !== suConfirm) return setError("Passwords do not match.");

//     setLoading(true);
//     try {
//       const addressPayload = {
//         line1: suAddress.line1,
//         city: suAddress.city,
//         state: suAddress.state,
//         postalCode: suAddress.postalCode,
//         country: suAddress.country,
//       };
//       await axios.post(
//         `${API_BASE}/api/auth/register`,
//         { email: suEmail, password: suPassword, phone: suPhone, address: addressPayload },
//         { headers: { "Content-Type": "application/json" }, withCredentials: true }
//       );
//       setSuccessMsg("Account created. Check your email for a verification link.");
//       // Clear signup fields (keep UX clean)
//       setSuEmail("");
//       setSuPassword("");
//       setSuConfirm("");
//       setSuPhone("");
//       setSuAddress({ line1: "", city: "", state: "", postalCode: "", country: "" });
//       setTab("login");
//     } catch (err) {
//       console.error(err);
//       const msg = err?.response?.data?.error || "Signup failed. Try again.";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // small helper for address inputs
//   const addrChange = (field, value) => setSuAddress((s) => ({ ...s, [field]: value }));

//   return (
//     <div style={styles.page}>
//       <div style={styles.card} role="main" aria-label="Authentication">
//         <div style={styles.left}>
//           <div style={styles.brand}>
//             <div style={{ fontSize: 22 }}>⚡</div>
//             <div>
//               <div style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>VoltCart</div>
//               <div style={{ fontSize: 12, color: "#9fb0d9" }}>Electronics marketplace</div>
//             </div>
//           </div>

//           <div style={styles.headline}>Welcome — power up your purchase</div>
//           <div style={styles.sub}>
//             Fast checkout, secure accounts. Sign up to save addresses, track orders and access exclusive deals on gadgets.
//           </div>

//           <div style={{ marginTop: 24 }}>
//             <div style={styles.smallMuted}>Why create an account?</div>
//             <ul style={{ color: "#bcd7ff", marginTop: 8, lineHeight: 1.6 }}>
//               <li>Save multiple shipping addresses</li>
//               <li>View order history & easy returns</li>
//               <li>Faster checkout & exclusive offers</li>
//             </ul>
//           </div>

//           <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <div style={{ color: "#9fb0d9", fontSize: 13 }}>Secure · Fast · Trusted</div>
//             <div style={{ display: "flex", gap: 8 }}>
//               <button style={styles.ghostBtn} type="button" onClick={() => window.open("https://example.com/pricing", "_blank")}>
//                 Why VoltCart?
//               </button>
//               <button style={styles.ghostBtn} type="button" onClick={() => window.open("https://example.com/support", "_blank")}>
//                 Support
//               </button>
//             </div>
//           </div>
//         </div>

//         <div style={styles.right}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <div style={{ fontWeight: 700, color: "#e6f0ff" }}>{tab === "login" ? "Sign in" : "Create account"}</div>
//             <div style={styles.smallMuted}>Welcome back — let's get you signed in</div>
//           </div>

//           <div style={styles.tabs}>
//             <button
//               style={styles.tabBtn(tab === "login")}
//               onClick={() => {
//                 setTab("login");
//                 setError("");
//                 setSuccessMsg("");
//               }}
//             >
//               Login
//             </button>
//             <button
//               style={styles.tabBtn(tab === "signup")}
//               onClick={() => {
//                 setTab("signup");
//                 setError("");
//                 setSuccessMsg("");
//               }}
//             >
//               Sign up
//             </button>
//           </div>

//           {error && <div style={styles.errorBox}>{error}</div>}
//           {successMsg && <div style={styles.successBox}>{successMsg}</div>}

//           {tab === "login" ? (
//             <form onSubmit={handleLogin} style={{ marginTop: 12 }}>
//               <div style={styles.formRow}>
//                 <input style={styles.input} placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} type="email" required />
//               </div>
//               <div style={styles.formRow}>
//                 <input style={styles.input} placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" required />
//               </div>

//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//                 <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: "#06b6d4" }} />
//                   <span style={{ color: "#bcd7ff" }}>Remember me</span>
//                 </label>
//                 <button type="button" style={{ background: "transparent", color: "#93c5fd", border: "none", cursor: "pointer", fontSize: 13 }} onClick={() => navigate("/forgot-password")}>
//                   Forgot password?
//                 </button>
//               </div>

//               <div style={{ marginBottom: 12 }}>
//                 <button type="submit" style={styles.primaryBtn} disabled={loading}>
//                   {loading ? "Signing in…" : "Sign in"}
//                 </button>
//               </div>

//               <div style={{ textAlign: "center", color: "#9fb0d9", fontSize: 13 }}>
//                 Or sign in with
//                 <span style={{ marginLeft: 8 }}>
//                   <button type="button" style={{ ...styles.ghostBtn, marginLeft: 8 }}>
//                     Google
//                   </button>
//                   <button type="button" style={{ ...styles.ghostBtn, marginLeft: 8 }}>
//                     Apple
//                   </button>
//                 </span>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleSignup} style={{ marginTop: 12 }}>
//               <div style={styles.formRow}>
//                 <input style={styles.input} placeholder="Email" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} type="email" required />
//               </div>
//               <div style={styles.formRow}>
//                 <input style={styles.input} placeholder="Password (min 6 chars)" value={suPassword} onChange={(e) => setSuPassword(e.target.value)} type="password" required />
//                 <input style={styles.input} placeholder="Confirm password" value={suConfirm} onChange={(e) => setSuConfirm(e.target.value)} type="password" required />
//               </div>

//               <div style={styles.formRow}>
//                 <input style={styles.input} placeholder="Phone (optional)" value={suPhone} onChange={(e) => setSuPhone(e.target.value)} type="tel" />
//               </div>

//               <div style={{ marginBottom: 8, color: "#9fb0d9", fontSize: 13 }}>Shipping address (optional)</div>
//               <div style={styles.formRow}>
//                 <input style={styles.input} placeholder="Address line 1" value={suAddress.line1} onChange={(e) => addrChange("line1", e.target.value)} type="text" />
//               </div>
//               <div style={styles.formRow}>
//                 <input style={{ ...styles.input, flex: 2 }} placeholder="City" value={suAddress.city} onChange={(e) => addrChange("city", e.target.value)} />
//                 <input style={{ ...styles.input, flex: 1 }} placeholder="State" value={suAddress.state} onChange={(e) => addrChange("state", e.target.value)} />
//               </div>
//               <div style={styles.formRow}>
//                 <input style={{ ...styles.input, flex: 1 }} placeholder="Postal code" value={suAddress.postalCode} onChange={(e) => addrChange("postalCode", e.target.value)} />
//                 <input style={{ ...styles.input, flex: 1 }} placeholder="Country" value={suAddress.country} onChange={(e) => addrChange("country", e.target.value)} />
//               </div>

//               <div style={{ marginBottom: 12 }}>
//                 <button type="submit" style={styles.primaryBtn} disabled={loading}>
//                   {loading ? "Creating account…" : "Create account"}
//                 </button>
//               </div>

//               <div style={{ color: "#9fb0d9", fontSize: 13 }}>
//                 By creating an account you agree to our{" "}
//                 <button type="button" style={{ border: "none", background: "transparent", color: "#93c5fd", cursor: "pointer" }}>
//                   Terms
//                 </button>
//                 .
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }









// src/pages/Auth.jsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ensure cookies are sent for all requests
axios.defaults.withCredentials = true;

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function Auth({ onAuthSuccess = () => {} }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState("login"); // 'login' | 'signup'
  // login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // signup state
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suAddress, setSuAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // simple validators
  const isEmail = (v) => /\S+@\S+\.\S+/.test(v);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!isEmail(loginEmail)) return setError("Enter a valid email address.");
    if (!loginPassword || loginPassword.length < 6) return setError("Enter your password (min 6 chars).");

    setLoading(true);
    try {
      await login({ email: loginEmail, password: loginPassword, remember });
      setSuccessMsg("Logged in successfully — redirecting...");
      // optional callback
      try {
        const me = await axios.get(`${API_BASE}/api/profile`, { withCredentials: true });
        onAuthSuccess(me.data?.user || null);
      } catch (_) {
        // ignore if profile fetch fails here; AuthContext already fetched user
      }
      setTimeout(() => navigate("/products"), 500);
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        (err?.response?.status === 401 ? "Invalid credentials" : "Login failed. Try again.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!isEmail(suEmail)) return setError("Enter a valid email address.");
    if (!suPassword || suPassword.length < 6) return setError("Password must be at least 6 characters.");
    if (suPassword !== suConfirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      const addressPayload = {
        line1: suAddress.line1,
        city: suAddress.city,
        state: suAddress.state,
        postalCode: suAddress.postalCode,
        country: suAddress.country,
      };
      await axios.post(
        `${API_BASE}/api/auth/register`,
        { email: suEmail, password: suPassword, phone: suPhone, address: addressPayload },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      setSuccessMsg("Account created. Check your email for a verification link.");
      // Clear signup fields (keep UX clean)
      setSuEmail("");
      setSuPassword("");
      setSuConfirm("");
      setSuPhone("");
      setSuAddress({ line1: "", city: "", state: "", postalCode: "", country: "" });
      setTab("login");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.error || "Signup failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // small helper for address inputs
  const addrChange = (field, value) => setSuAddress((s) => ({ ...s, [field]: value }));

  return (
    <div className="auth-page">
      <style>{`
        :root{
          --bg1: #0f172a; --bg2:#071033; --card-bg1:#021226; --card-bg2:#071033; --panel-bg1:#081428; --panel-bg2:#041020; --accent1:#06b6d4; --accent2:#3b82f6; --muted:#9fb0d9; --text:#e6f0ff;
        }
        *{box-sizing:border-box}
        .auth-page{
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background: linear-gradient(180deg,var(--bg1) 0%, var(--bg2) 60%), radial-gradient(ellipse at top right, rgba(34,197,94,0.06), transparent 20%);
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          padding:24px;
        }
        .auth-card{
          width:920px;
          max-width:96%;
          display:flex;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 10px 30px rgba(2,6,23,0.6);
          background: linear-gradient(180deg,var(--card-bg1) 0%, var(--card-bg2) 100%);
        }
        .panel-left{
          flex:1 1 380px;
          padding:32px;
          color:var(--text);
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          display:flex;
          flex-direction:column;
          gap:16px;
        }
        .panel-right{
          flex:1 1 420px;
          padding:28px;
          background: linear-gradient(180deg,var(--panel-bg1) 0%, var(--panel-bg2) 100%);
          color:#dbeafe;
        }
        .brand{display:flex;gap:12px;align-items:center;font-weight:700;font-size:18px}
        .headline{font-size:22px;font-weight:700;margin-top:8px;line-height:1.1;color:var(--text)}
        .sub{color:var(--muted);font-size:14px}
        .tabs{display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap}
        .tab-btn{padding:8px 14px;border-radius:10px;cursor:pointer;border:none;font-weight:600;background:transparent;color:#bcd7ff}
        .tab-btn.active{background:linear-gradient(90deg,var(--accent1),var(--accent2));color:#00101a;box-shadow:0 6px 18px rgba(59,130,246,0.18)}
        .form-row{display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap}
        .input{width:100%;padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);color:var(--text);outline:none;font-size:14px}
        .primary-btn{padding:11px 14px;border-radius:10px;border:none;cursor:pointer;background:linear-gradient(90deg,var(--accent1),var(--accent2));color:#00101a;font-weight:700;width:100%}
        .ghost-btn{padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#bcd7ff;font-weight:600;cursor:pointer}
        .small-muted{color:var(--muted);font-size:13px}
        .error-box{margin-top:12px;padding:10px 12px;border-radius:8px;background:rgba(255,68,68,0.08);color:#ffb4b4;border:1px solid rgba(255,68,68,0.12);font-size:13px}
        .success-box{margin-top:12px;padding:10px 12px;border-radius:8px;background:rgba(34,197,94,0.06);color:#bdf7d1;border:1px solid rgba(34,197,94,0.12);font-size:13px}

        /* Responsive rules */
        @media (max-width: 920px){
          .auth-card{width:100%;}
        }
        @media (max-width: 900px){
          .auth-card{flex-direction:column}
          .panel-left{padding:20px}
          .panel-right{padding:20px}
        }
        /* make form fields stack more naturally on small screens */
        @media (max-width: 640px){
          .panel-left{order:2}
          .panel-right{order:1}
          .form-row{flex-direction:column}
          .brand .emoji{font-size:20px}
          .headline{font-size:20px}
        }
        /* very small screens - hide the left marketing panel to prioritise form */
        @media (max-width: 480px){
          .panel-left{display:none}
          .panel-right{flex:1 1 auto;border-radius:12px}
          .auth-card{border-radius:12px}
        }
      `}</style>

      <div className="auth-card" role="main" aria-label="Authentication">
        <div className="panel-left">
          <div className="brand">
            <div className="emoji" style={{ fontSize: 22 }}>⚡</div>
            <div>
              <div style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>VoltCart</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Electronics marketplace</div>
            </div>
          </div>

          <div className="headline">Welcome — power up your purchase</div>
          <div className="sub">
            Fast checkout, secure accounts. Sign up to save addresses, track orders and access exclusive deals on gadgets.
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="small-muted">Why create an account?</div>
            <ul style={{ color: "#bcd7ff", marginTop: 8, lineHeight: 1.6 }}>
              <li>Save multiple shipping addresses</li>
              <li>View order history & easy returns</li>
              <li>Faster checkout & exclusive offers</li>
            </ul>
          </div>

          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="small-muted">Secure · Fast · Trusted</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="ghost-btn" type="button" onClick={() => window.open("https://example.com/pricing", "_blank")}>
                Why VoltCart?
              </button>
              <button className="ghost-btn" type="button" onClick={() => window.open("https://example.com/support", "_blank")}>
                Support
              </button>
            </div>
          </div>
        </div>

        <div className="panel-right">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 700, color: "var(--text)" }}>{tab === "login" ? "Sign in" : "Create account"}</div>
            <div className="small-muted">Welcome back — let's get you signed in</div>
          </div>

          <div className="tabs">
            <button
              className={`tab-btn ${tab === "login" ? "active" : ""}`}
              onClick={() => {
                setTab("login");
                setError("");
                setSuccessMsg("");
              }}
            >
              Login
            </button>
            <button
              className={`tab-btn ${tab === "signup" ? "active" : ""}`}
              onClick={() => {
                setTab("signup");
                setError("");
                setSuccessMsg("");
              }}
            >
              Sign up
            </button>
          </div>

          {error && <div className="error-box">{error}</div>}
          {successMsg && <div className="success-box">{successMsg}</div>}

          {tab === "login" ? (
            <form onSubmit={handleLogin} style={{ marginTop: 12 }}>
              <div className="form-row">
                <input className="input" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} type="email" required />
              </div>
              <div className="form-row">
                <input className="input" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" required />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap:12, flexWrap:'wrap' }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: "var(--accent1)" }} />
                  <span style={{ color: "#bcd7ff" }}>Remember me</span>
                </label>
                <button type="button" style={{ background: "transparent", color: "#93c5fd", border: "none", cursor: "pointer", fontSize: 13 }} onClick={() => navigate("/forgot-password")}>
                  Forgot password?
                </button>
              </div>

              <div style={{ marginBottom: 12 }}>
                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </div>

              <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                Or sign in with
                <span style={{ marginLeft: 8 }}>
                  <button type="button" className="ghost-btn" style={{ marginLeft: 8 }}>
                    Google
                  </button>
                  <button type="button" className="ghost-btn" style={{ marginLeft: 8 }}>
                    Apple
                  </button>
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} style={{ marginTop: 12 }}>
              <div className="form-row">
                <input className="input" placeholder="Email" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} type="email" required />
              </div>
              <div className="form-row">
                <input className="input" placeholder="Password (min 6 chars)" value={suPassword} onChange={(e) => setSuPassword(e.target.value)} type="password" required />
                <input className="input" placeholder="Confirm password" value={suConfirm} onChange={(e) => setSuConfirm(e.target.value)} type="password" required />
              </div>

              <div className="form-row">
                <input className="input" placeholder="Phone (optional)" value={suPhone} onChange={(e) => setSuPhone(e.target.value)} type="tel" />
              </div>

              <div style={{ marginBottom: 8, color: "var(--muted)", fontSize: 13 }}>Shipping address (optional)</div>
              <div className="form-row">
                <input className="input" placeholder="Address line 1" value={suAddress.line1} onChange={(e) => addrChange("line1", e.target.value)} type="text" />
              </div>
              <div className="form-row">
                <input className="input" placeholder="City" value={suAddress.city} onChange={(e) => addrChange("city", e.target.value)} />
                <input className="input" placeholder="State" value={suAddress.state} onChange={(e) => addrChange("state", e.target.value)} />
              </div>
              <div className="form-row">
                <input className="input" placeholder="Postal code" value={suAddress.postalCode} onChange={(e) => addrChange("postalCode", e.target.value)} />
                <input className="input" placeholder="Country" value={suAddress.country} onChange={(e) => addrChange("country", e.target.value)} />
              </div>

              <div style={{ marginBottom: 12 }}>
                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? "Creating account…" : "Create account"}
                </button>
              </div>

              <div style={{ color: "var(--muted)", fontSize: 13 }}>
                By creating an account you agree to our{' '}
                <button type="button" style={{ border: "none", background: "transparent", color: "#93c5fd", cursor: "pointer" }}>
                  Terms
                </button>
                .
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
