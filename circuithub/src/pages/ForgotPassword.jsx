// // src/pages/ForgotPassword.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_URL || "";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");
//     setLoading(true);

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Please enter a valid email address.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${API_BASE}/api/auth/forgot-password`,
//         { email },
//         { withCredentials: true }
//       );
//       setMessage(res.data.message || "Check your email for reset instructions.");
//       setEmail("");
//       // Optionally, navigate to another page or keep here for user to check email
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Failed to send reset link. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ ...styles.page, justifyContent: "center" }}>
//       <div style={{ ...styles.card, maxWidth: 400 }}>
//         <h2>Forgot Password</h2>

//         {message && <div style={styles.successBox}>{message}</div>}
//         {error && <div style={styles.errorBox}>{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             style={styles.input}
//             type="email"
//             placeholder="Enter your registered email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="submit" style={styles.primaryBtn} disabled={loading}>
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>

//         <button
//           type="button"
//           style={{ ...styles.ghostBtn, marginTop: 8 }}
//           onClick={() => navigate("/login")}
//         >
//           Back to Login
//         </button>
//       </div>
//     </div>
//   );
// }

// // Reuse styles from your Auth.jsx for consistency (copy/paste or import from a shared file)
// const styles = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     background:
//       "linear-gradient(180deg, #0f172a 0%, #071033 60%), radial-gradient(ellipse at top right, rgba(34,197,94,0.06), transparent 20%)",
//     fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
//     padding: "32px",
//   },
//   card: {
//     padding: "32px",
//     borderRadius: "12px",
//     background: "linear-gradient(180deg,#021226 0%, #071033 100%)",
//     boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
//     color: "#e6f0ff",
//   },
//   input: {
//     width: "100%",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     border: "1px solid rgba(255,255,255,0.06)",
//     background: "rgba(255,255,255,0.02)",
//     color: "#e6f0ff",
//     outline: "none",
//     fontSize: "14px",
//     marginBottom: "12px",
//   },
//   primaryBtn: {
//     width: "100%",
//     padding: "11px 14px",
//     borderRadius: "10px",
//     border: "none",
//     cursor: "pointer",
//     background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
//     color: "#00101a",
//     fontWeight: 700,
//   },
//   ghostBtn: {
//     width: "100%",
//     padding: "10px 12px",
//     borderRadius: "10px",
//     border: "1px solid rgba(255,255,255,0.06)",
//     background: "transparent",
//     color: "#bcd7ff",
//     fontWeight: 600,
//     cursor: "pointer",
//   },
//   errorBox: {
//     padding: "10px 12px",
//     borderRadius: "8px",
//     background: "rgba(255,68,68,0.08)",
//     color: "#ffb4b4",
//     border: "1px solid rgba(255,68,68,0.12)",
//     fontSize: "13px",
//     marginBottom: "12px",
//   },
//   successBox: {
//     padding: "10px 12px",
//     borderRadius: "8px",
//     background: "rgba(34,197,94,0.06)",
//     color: "#bdf7d1",
//     border: "1px solid rgba(34,197,94,0.12)",
//     fontSize: "13px",
//     marginBottom: "12px",
//   },
// };








// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "";

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
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900">ElectroBay</span>
          </div>

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
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

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

// ============= MAIN COMPONENT =============

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
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send reset link. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <Card className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-2 text-slate-900">Forgot Password?</h2>
              <p className="text-slate-600">
                No worries! Enter your email and we'll send you reset instructions.
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-600">{message}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-slate-900">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
