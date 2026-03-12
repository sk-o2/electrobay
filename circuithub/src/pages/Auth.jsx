// src/pages/Auth.jsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, Mail, Lock, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import electro from "../assets/electro.png";

// ensure cookies are sent for all requests
api.defaults.withCredentials = true;

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
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
              {/* <img src={cart} alt="Cart Logo" className="ml-5 mb-3 h-10 w-10" /> */}
            </div>
            {/* <span className="text-slate-900">ElectroBay</span> */}
            <img src={electro} alt="ElectroBay Logo" className="h-8 w-auto ml-2" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/")} className="text-slate-700 hover:text-slate-900 transition">Home</button>
            <button onClick={() => navigate("/products")} className="text-slate-700 hover:text-slate-900 transition">Products</button>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-slate-700 hover:text-slate-900" onClick={() => navigate("/auth")}>
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <button onClick={() => navigate("/")} className="text-slate-700 hover:text-slate-900 transition text-left">Home</button>
              <button onClick={() => navigate("/products")} className="text-slate-700 hover:text-slate-900 transition text-left">Products</button>
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
              {/* <span>ElectroBay</span> */}
              <img src={electro} alt="ElectroBay Logo" className="h-8 w-auto" />
            </div>
            <p className="text-white/70">Your trusted partner for all electronics and development needs.</p>
          </div>

          <div>
            <h4 className="mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/70 hover:text-white transition">Home</a></li>
              <li><a href="/products" className="text-white/70 hover:text-white transition">Products</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white">Contact</h4>
            <p className="text-white/70">electrobay.here@gmail.com</p>
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
  const [suName, setSuName] = useState("");
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
      try {
        const me = await api.get(`${API_BASE}/api/profile`, { withCredentials: true });
        onAuthSuccess(me.data?.user || null);
      } catch (_) {}
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

    if (!suName) return setError("Enter your full name.");
    if (!isEmail(suEmail)) return setError("Enter a valid email address.");
    if (!suPhone || suPhone.length < 10) return setError("Enter a valid phone number.");
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
      await api.post(
        `${API_BASE}/api/auth/register`,
        {
          name: suName,
          email: suEmail,
          password: suPassword,
          phone: suPhone,
          address: addressPayload,
        },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      setSuccessMsg("Account created. Check your email for a verification link.");
      setSuName("");
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

  const addrChange = (field, value) => setSuAddress((s) => ({ ...s, [field]: value }));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-5xl">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left Panel */}
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-8 md:p-12 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <ShoppingCart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    {/* <div className="text-xl">ElectroBay</div> */}
                    <img src={electro} alt="ElectroBay Logo" className="h-8 w-auto" />
                    <div className="text-sm text-white/80">Electronics Marketplace</div>
                  </div>
                </div>
                <h2 className="mb-4 text-white">Welcome Back</h2>
                <p className="text-white/90 mb-8">
                  Fast checkout, secure accounts. Sign up to save addresses, track orders and access exclusive deals on electronics.
                </p>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-white/80" /><span>Save multiple shipping addresses</span></li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-white/80" /><span>View order history & easy returns</span></li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-white/80" /><span>Faster checkout & exclusive offers</span></li>
                </ul>
              </div>

              {/* Right Panel - Forms */}
              <div className="p-8 md:p-12">
                <div className="mb-6">
                  <h2 className="mb-2 text-slate-900">{tab === "login" ? "Sign In" : "Create Account"}</h2>
                  <p className="text-slate-600">{tab === "login" ? "Welcome back! Please enter your details." : "Join ElectroBay to start shopping"}</p>
                </div>

                <div className="flex gap-2 mb-6">
                  <Button variant={tab === "login" ? "gradient" : "outline"} onClick={() => { setTab("login"); setError(""); setSuccessMsg(""); }} className="flex-1">Login</Button>
                  <Button variant={tab === "signup" ? "gradient" : "outline"} onClick={() => { setTab("signup"); setError(""); setSuccessMsg(""); }} className="flex-1">Sign Up</Button>
                </div>

                {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2"><AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" /><p className="text-sm text-red-600">{error}</p></div>}
                {successMsg && <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><p className="text-sm text-green-600">{successMsg}</p></div>}

                {/* Forms */}
                {tab === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Input id="login-email" type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} icon={Mail} required />
                    <Input id="login-password" type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} icon={Lock} required />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                        <span className="text-sm text-slate-600">Remember me</span>
                      </label>
                      <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm text-blue-600 hover:text-blue-700 transition">Forgot password?</button>
                    </div>
                    <Button type="submit" variant="gradient" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
                  </form>
                ) : (
                  <form onSubmit={handleSignup} className="space-y-4">
                    <Input id="signup-name" type="text" placeholder="Full Name" value={suName} onChange={(e) => setSuName(e.target.value)} icon={User} required />
                    <Input id="signup-email" type="email" placeholder="Email" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} icon={Mail} required />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input id="signup-password" type="password" placeholder="Password" value={suPassword} onChange={(e) => setSuPassword(e.target.value)} icon={Lock} required />
                      <Input id="signup-confirm" type="password" placeholder="Confirm Password" value={suConfirm} onChange={(e) => setSuConfirm(e.target.value)} icon={Lock} required />
                    </div>
                    <Input id="signup-phone" type="tel" placeholder="Phone" value={suPhone} onChange={(e) => setSuPhone(e.target.value)} icon={Phone} />
                    <div className="pt-2">
                      <div className="mb-3 text-slate-700">Shipping Address</div>
                      <Input placeholder="Address line 1" value={suAddress.line1} onChange={(e) => setSuAddress({ ...suAddress, line1: e.target.value })} icon={MapPin} />
                      <div className="grid md:grid-cols-2 gap-3">
                        <Input placeholder="City" value={suAddress.city} onChange={(e) => setSuAddress({ ...suAddress, city: e.target.value })} />
                        <Input placeholder="State" value={suAddress.state} onChange={(e) => setSuAddress({ ...suAddress, state: e.target.value })} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <Input placeholder="Postal code" value={suAddress.postalCode} onChange={(e) => setSuAddress({ ...suAddress, postalCode: e.target.value })} />
                        <Input placeholder="Country" value={suAddress.country} onChange={(e) => setSuAddress({ ...suAddress, country: e.target.value })} />
                      </div>
                    </div>
                    <Button type="submit" variant="gradient" className="w-full" disabled={loading}>{loading ? "Creating account..." : "Create Account"}</Button>
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
