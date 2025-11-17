// // src/pages/Auth.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// // ensure cookies are sent for all requests
// axios.defaults.withCredentials = true;

// const API_BASE = import.meta.env.VITE_API_URL || '';

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
//     <div className="auth-page">
//       <style>{`
//         :root{
//           --bg1: #0f172a; --bg2:#071033; --card-bg1:#021226; --card-bg2:#071033; --panel-bg1:#081428; --panel-bg2:#041020; --accent1:#06b6d4; --accent2:#3b82f6; --muted:#9fb0d9; --text:#e6f0ff;
//         }
//         *{box-sizing:border-box}
//         .auth-page{
//           min-height:100vh;
//           display:flex;
//           align-items:center;
//           justify-content:center;
//           background: linear-gradient(180deg,var(--bg1) 0%, var(--bg2) 60%), radial-gradient(ellipse at top right, rgba(34,197,94,0.06), transparent 20%);
//           font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
//           padding:24px;
//         }
//         .auth-card{
//           width:920px;
//           max-width:96%;
//           display:flex;
//           border-radius:12px;
//           overflow:hidden;
//           box-shadow:0 10px 30px rgba(2,6,23,0.6);
//           background: linear-gradient(180deg,var(--card-bg1) 0%, var(--card-bg2) 100%);
//         }
//         .panel-left{
//           flex:1 1 380px;
//           padding:32px;
//           color:var(--text);
//           background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
//           display:flex;
//           flex-direction:column;
//           gap:16px;
//         }
//         .panel-right{
//           flex:1 1 420px;
//           padding:28px;
//           background: linear-gradient(180deg,var(--panel-bg1) 0%, var(--panel-bg2) 100%);
//           color:#dbeafe;
//         }
//         .brand{display:flex;gap:12px;align-items:center;font-weight:700;font-size:18px}
//         .headline{font-size:22px;font-weight:700;margin-top:8px;line-height:1.1;color:var(--text)}
//         .sub{color:var(--muted);font-size:14px}
//         .tabs{display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap}
//         .tab-btn{padding:8px 14px;border-radius:10px;cursor:pointer;border:none;font-weight:600;background:transparent;color:#bcd7ff}
//         .tab-btn.active{background:linear-gradient(90deg,var(--accent1),var(--accent2));color:#00101a;box-shadow:0 6px 18px rgba(59,130,246,0.18)}
//         .form-row{display:flex;gap:12px;margin-bottom:12px;flex-wrap:wrap}
//         .input{width:100%;padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);color:var(--text);outline:none;font-size:14px}
//         .primary-btn{padding:11px 14px;border-radius:10px;border:none;cursor:pointer;background:linear-gradient(90deg,var(--accent1),var(--accent2));color:#00101a;font-weight:700;width:100%}
//         .ghost-btn{padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#bcd7ff;font-weight:600;cursor:pointer}
//         .small-muted{color:var(--muted);font-size:13px}
//         .error-box{margin-top:12px;padding:10px 12px;border-radius:8px;background:rgba(255,68,68,0.08);color:#ffb4b4;border:1px solid rgba(255,68,68,0.12);font-size:13px}
//         .success-box{margin-top:12px;padding:10px 12px;border-radius:8px;background:rgba(34,197,94,0.06);color:#bdf7d1;border:1px solid rgba(34,197,94,0.12);font-size:13px}

//         /* Responsive rules */
//         @media (max-width: 920px){
//           .auth-card{width:100%;}
//         }
//         @media (max-width: 900px){
//           .auth-card{flex-direction:column}
//           .panel-left{padding:20px}
//           .panel-right{padding:20px}
//         }
//         /* make form fields stack more naturally on small screens */
//         @media (max-width: 640px){
//           .panel-left{order:2}
//           .panel-right{order:1}
//           .form-row{flex-direction:column}
//           .brand .emoji{font-size:20px}
//           .headline{font-size:20px}
//         }
//         /* very small screens - hide the left marketing panel to prioritise form */
//         @media (max-width: 480px){
//           .panel-left{display:none}
//           .panel-right{flex:1 1 auto;border-radius:12px}
//           .auth-card{border-radius:12px}
//         }
//       `}</style>

//       <div className="auth-card" role="main" aria-label="Authentication">
//         <div className="panel-left">
//           <div className="brand">
//             <div className="emoji" style={{ fontSize: 22 }}>⚡</div>
//             <div>
//               <div style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>VoltCart</div>
//               <div style={{ fontSize: 12, color: "var(--muted)" }}>Electronics marketplace</div>
//             </div>
//           </div>

//           <div className="headline">Welcome — power up your purchase</div>
//           <div className="sub">
//             Fast checkout, secure accounts. Sign up to save addresses, track orders and access exclusive deals on gadgets.
//           </div>

//           <div style={{ marginTop: 24 }}>
//             <div className="small-muted">Why create an account?</div>
//             <ul style={{ color: "#bcd7ff", marginTop: 8, lineHeight: 1.6 }}>
//               <li>Save multiple shipping addresses</li>
//               <li>View order history & easy returns</li>
//               <li>Faster checkout & exclusive offers</li>
//             </ul>
//           </div>

//           <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <div className="small-muted">Secure · Fast · Trusted</div>
//             <div style={{ display: "flex", gap: 8 }}>
//               <button className="ghost-btn" type="button" onClick={() => window.open("https://example.com/pricing", "_blank")}>
//                 Why VoltCart?
//               </button>
//               <button className="ghost-btn" type="button" onClick={() => window.open("https://example.com/support", "_blank")}>
//                 Support
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="panel-right">
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <div style={{ fontWeight: 700, color: "var(--text)" }}>{tab === "login" ? "Sign in" : "Create account"}</div>
//             <div className="small-muted">Welcome back — let's get you signed in</div>
//           </div>

//           <div className="tabs">
//             <button
//               className={`tab-btn ${tab === "login" ? "active" : ""}`}
//               onClick={() => {
//                 setTab("login");
//                 setError("");
//                 setSuccessMsg("");
//               }}
//             >
//               Login
//             </button>
//             <button
//               className={`tab-btn ${tab === "signup" ? "active" : ""}`}
//               onClick={() => {
//                 setTab("signup");
//                 setError("");
//                 setSuccessMsg("");
//               }}
//             >
//               Sign up
//             </button>
//           </div>

//           {error && <div className="error-box">{error}</div>}
//           {successMsg && <div className="success-box">{successMsg}</div>}

//           {tab === "login" ? (
//             <form onSubmit={handleLogin} style={{ marginTop: 12 }}>
//               <div className="form-row">
//                 <input className="input" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} type="email" required />
//               </div>
//               <div className="form-row">
//                 <input className="input" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="password" required />
//               </div>

//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap:12, flexWrap:'wrap' }}>
//                 <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: "var(--accent1)" }} />
//                   <span style={{ color: "#bcd7ff" }}>Remember me</span>
//                 </label>
//                 <button type="button" style={{ background: "transparent", color: "#93c5fd", border: "none", cursor: "pointer", fontSize: 13 }} onClick={() => navigate("/forgot-password")}>
//                   Forgot password?
//                 </button>
//               </div>

//               <div style={{ marginBottom: 12 }}>
//                 <button type="submit" className="primary-btn" disabled={loading}>
//                   {loading ? "Signing in…" : "Sign in"}
//                 </button>
//               </div>

//               <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
//                 Or sign in with
//                 <span style={{ marginLeft: 8 }}>
//                   <button type="button" className="ghost-btn" style={{ marginLeft: 8 }}>
//                     Google
//                   </button>
//                   <button type="button" className="ghost-btn" style={{ marginLeft: 8 }}>
//                     Apple
//                   </button>
//                 </span>
//               </div>
//             </form>
//           ) : (
//             <form onSubmit={handleSignup} style={{ marginTop: 12 }}>
//               <div className="form-row">
//                 <input className="input" placeholder="Email" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} type="email" required />
//               </div>
//               <div className="form-row">
//                 <input className="input" placeholder="Password (min 6 chars)" value={suPassword} onChange={(e) => setSuPassword(e.target.value)} type="password" required />
//                 <input className="input" placeholder="Confirm password" value={suConfirm} onChange={(e) => setSuConfirm(e.target.value)} type="password" required />
//               </div>

//               <div className="form-row">
//                 <input className="input" placeholder="Phone (optional)" value={suPhone} onChange={(e) => setSuPhone(e.target.value)} type="tel" />
//               </div>

//               <div style={{ marginBottom: 8, color: "var(--muted)", fontSize: 13 }}>Shipping address (optional)</div>
//               <div className="form-row">
//                 <input className="input" placeholder="Address line 1" value={suAddress.line1} onChange={(e) => addrChange("line1", e.target.value)} type="text" />
//               </div>
//               <div className="form-row">
//                 <input className="input" placeholder="City" value={suAddress.city} onChange={(e) => addrChange("city", e.target.value)} />
//                 <input className="input" placeholder="State" value={suAddress.state} onChange={(e) => addrChange("state", e.target.value)} />
//               </div>
//               <div className="form-row">
//                 <input className="input" placeholder="Postal code" value={suAddress.postalCode} onChange={(e) => addrChange("postalCode", e.target.value)} />
//                 <input className="input" placeholder="Country" value={suAddress.country} onChange={(e) => addrChange("country", e.target.value)} />
//               </div>

//               <div style={{ marginBottom: 12 }}>
//                 <button type="submit" className="primary-btn" disabled={loading}>
//                   {loading ? "Creating account…" : "Create account"}
//                 </button>
//               </div>

//               <div style={{ color: "var(--muted)", fontSize: 13 }}>
//                 By creating an account you agree to our{' '}
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
import { ShoppingCart, User, Menu, Mail, Lock, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";

// ensure cookies are sent for all requests
axios.defaults.withCredentials = true;

const API_BASE = import.meta.env.VITE_API_URL || '';

// ============= UI COMPONENTS =============

function Button({ children, variant = "default", size = "default", className = "", onClick, type = "button", disabled = false }) {
  const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-lg",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-700",
    ghost: "hover:bg-slate-100 text-slate-700",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

function Input({ id, type = "text", placeholder, value, onChange, required, className = "", icon: Icon }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${Icon ? 'pl-10' : ''} ${className}`}
      />
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// ============= NAVBAR COMPONENT =============

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900">ElectroBay</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate("/")}
              className="text-slate-700 hover:text-slate-900 transition"
            >
              Home
            </button>
            <button 
              onClick={() => navigate("/products")}
              className="text-slate-700 hover:text-slate-900 transition"
            >
              Products
            </button>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-700 hover:text-slate-900"
                onClick={() => navigate("/auth")}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => navigate("/")}
                className="text-slate-700 hover:text-slate-900 transition text-left"
              >
                Home
              </button>
              <button 
                onClick={() => navigate("/products")}
                className="text-slate-700 hover:text-slate-900 transition text-left"
              >
                Products
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ============= FOOTER COMPONENT =============

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span>ElectroBay</span>
            </div>
            <p className="text-white/70">
              Your trusted partner for all electronics and development needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-white/70 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-white/70 hover:text-white transition">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-white">Contact</h4>
            <p className="text-white/70">support@ElectroBay.com</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/70">
          <p>&copy; 2025 ElectroBay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ============= MAIN AUTH COMPONENT =============

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Auth Section */}
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-5xl">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left Panel - Info */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 md:p-12 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <ShoppingCart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xl">ElectroBay</div>
                    <div className="text-sm text-white/80">Electronics Marketplace</div>
                  </div>
                </div>

                <h2 className="mb-4 text-white">Welcome Back</h2>
                <p className="text-white/90 mb-8">
                  Fast checkout, secure accounts. Sign up to save addresses, track orders and access exclusive deals on electronics.
                </p>

                <div className="space-y-4">
                  <div className="text-sm text-white/80">Why create an account?</div>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-white/80" />
                      <span>Save multiple shipping addresses</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-white/80" />
                      <span>View order history & easy returns</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-white/80" />
                      <span>Faster checkout & exclusive offers</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 pt-8 border-t border-white/20">
                  <div className="text-sm text-white/70">Secure · Fast · Trusted</div>
                </div>
              </div>

              {/* Right Panel - Form */}
              <div className="p-8 md:p-12">
                <div className="mb-6">
                  <h2 className="mb-2 text-slate-900">
                    {tab === "login" ? "Sign In" : "Create Account"}
                  </h2>
                  <p className="text-slate-600">
                    {tab === "login" 
                      ? "Welcome back! Please enter your details." 
                      : "Join ElectroBay to start shopping"}
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  <Button
                    variant={tab === "login" ? "gradient" : "outline"}
                    onClick={() => {
                      setTab("login");
                      setError("");
                      setSuccessMsg("");
                    }}
                    className="flex-1"
                  >
                    Login
                  </Button>
                  <Button
                    variant={tab === "signup" ? "gradient" : "outline"}
                    onClick={() => {
                      setTab("signup");
                      setError("");
                      setSuccessMsg("");
                    }}
                    className="flex-1"
                  >
                    Sign Up
                  </Button>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                {successMsg && (
                  <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-600">{successMsg}</p>
                  </div>
                )}

                {/* Login Form */}
                {tab === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="block mb-2 text-slate-900">
                        Email
                      </label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        icon={Mail}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="login-password" className="block mb-2 text-slate-900">
                        Password
                      </label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        icon={Lock}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-600">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="text-sm text-blue-600 hover:text-blue-700 transition"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>

                    <div className="text-center">
                      <div className="text-sm text-slate-500 mb-3">Or continue with</div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" type="button">
                          Google
                        </Button>
                        <Button variant="outline" className="flex-1" type="button">
                          Apple
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* Signup Form */
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <label htmlFor="signup-email" className="block mb-2 text-slate-900">
                        Email
                      </label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={suEmail}
                        onChange={(e) => setSuEmail(e.target.value)}
                        icon={Mail}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="signup-password" className="block mb-2 text-slate-900">
                          Password
                        </label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Min 6 characters"
                          value={suPassword}
                          onChange={(e) => setSuPassword(e.target.value)}
                          icon={Lock}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="signup-confirm" className="block mb-2 text-slate-900">
                          Confirm Password
                        </label>
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="Confirm password"
                          value={suConfirm}
                          onChange={(e) => setSuConfirm(e.target.value)}
                          icon={Lock}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="signup-phone" className="block mb-2 text-slate-900">
                        Phone <span className="text-slate-400">(optional)</span>
                      </label>
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={suPhone}
                        onChange={(e) => setSuPhone(e.target.value)}
                        icon={Phone}
                      />
                    </div>

                    <div className="pt-2">
                      <div className="mb-3 text-slate-700">
                        Shipping Address <span className="text-slate-400">(optional)</span>
                      </div>
                      
                      <div className="space-y-3">
                        <Input
                          placeholder="Address line 1"
                          value={suAddress.line1}
                          onChange={(e) => addrChange("line1", e.target.value)}
                          icon={MapPin}
                        />
                        
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            placeholder="City"
                            value={suAddress.city}
                            onChange={(e) => addrChange("city", e.target.value)}
                          />
                          <Input
                            placeholder="State"
                            value={suAddress.state}
                            onChange={(e) => addrChange("state", e.target.value)}
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            placeholder="Postal code"
                            value={suAddress.postalCode}
                            onChange={(e) => addrChange("postalCode", e.target.value)}
                          />
                          <Input
                            placeholder="Country"
                            value={suAddress.country}
                            onChange={(e) => addrChange("country", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className="text-sm text-slate-500 text-center">
                      By creating an account you agree to our{' '}
                      <button
                        type="button"
                        onClick={() => window.open("/terms", "_blank")}
                        className="text-blue-600 hover:text-blue-700 transition"
                      >
                        Terms of Service
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
