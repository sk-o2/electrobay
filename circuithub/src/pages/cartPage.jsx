// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Search, User, Trash2, Plus, Minus } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   // Get userId and token from localStorage
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   // Fetch Cart
//   const fetchCart = async () => {
//     if (!userId) return;
//     try {
//       const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart(res.data.items || []);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // Update item quantity
//   const handleUpdateQuantity = async (productId, quantity) => {
//     if (quantity < 1) return;
//     try {
//       await axios.put(
//         `http://localhost:5000/api/cart/update`,
//         { userId, productId, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart();
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//     }
//   };

//   // Remove item
//   const handleRemove = async (productId) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/cart/remove/${userId}/${productId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart();
//     } catch (err) {
//       console.error("Error removing item:", err);
//     }
//   };

//   // Calculate totals
//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.productId.price * item.quantity,
//     0
//   );
//   const discount = totalPrice * 0.1;
//   const finalTotal = totalPrice - discount;

//   // Handle Place Order button click
//   const handlePlaceOrder = () => {
//     if (!token) {
//       navigate("/login"); // redirect if not logged in
//     } else {
//       navigate("/checkout"); // go to checkout page if logged in
//     }
//   };

//   return (
//     <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
//         <Link to="/" className="text-2xl font-bold text-[#2D7D9A]">
//           ElectroMart
//         </Link>

//         {/* Search Bar (Desktop) */}
//         <div className="hidden md:flex items-center bg-[#F1F5F9] rounded-full px-3 py-2 w-1/3">
//           <Search size={18} className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="bg-transparent outline-none text-sm w-full"
//           />
//         </div>

//         {/* Right Side Icons */}
//         <div className="flex items-center gap-6 relative">
//           <button className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
//             <Search size={22} />
//           </button>
//           <div className="relative">
//             <button onClick={() => setShowDropdown(!showDropdown)}>
//               <User size={22} />
//             </button>
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
//                 <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
//                   My Profile
//                 </Link>
//                 <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
//                   My Orders
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Search Bar for Mobile */}
//       {searchOpen && (
//         <div className="md:hidden flex items-center bg-[#F1F5F9] px-3 py-2 border-t">
//           <Search size={18} className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="bg-transparent outline-none text-sm w-full"
//           />
//         </div>
//       )}

//       {/* Cart Section */}
//       <section className="flex flex-col md:flex-row justify-between p-6 sm:p-10 gap-8 flex-grow">
//         <div className="md:w-2/3">
//           <h2 className="text-2xl font-bold text-[#1E293B] mb-6">My Cart</h2>

//           {cart.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty.</p>
//           ) : (
//             <div className="space-y-4">
//               {cart.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
//                 >
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={item.productId.image}
//                       alt={item.productId.name}
//                       className="w-20 h-20 object-cover rounded-lg"
//                     />
//                     <div>
//                       <h3 className="text-lg font-semibold text-[#1E293B]">
//                         {item.productId.name}
//                       </h3>
//                       <p className="text-[#2D7D9A] font-medium">
//                         ${item.productId.price}
//                       </p>
//                       <div className="flex items-center gap-2 mt-2">
//                         <button
//                           onClick={() =>
//                             handleUpdateQuantity(item.productId._id, item.quantity - 1)
//                           }
//                           className="bg-gray-200 p-1 rounded"
//                         >
//                           <Minus size={14} />
//                         </button>
//                         <span className="text-sm font-medium w-6 text-center">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() =>
//                             handleUpdateQuantity(item.productId._id, item.quantity + 1)
//                           }
//                           className="bg-gray-200 p-1 rounded"
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleRemove(item.productId._id)}
//                     className="text-red-500 hover:text-red-600"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {cart.length > 0 && (
//             <div className="mt-6">
//               <button
//                 onClick={handlePlaceOrder}
//                 className="bg-[#2D7D9A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3BA8C8] transition"
//               >
//                 Place Order
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Price Details */}
//         <div className="md:w-1/3">
//           <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Price Details</h2>
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3">
//             <div className="flex justify-between text-gray-700">
//               <span>Price ({cart.length} items)</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span>Discount</span>
//               <span className="text-green-600">- ${discount.toFixed(2)}</span>
//             </div>
//             <hr />
//             <div className="flex justify-between font-semibold text-[#1E293B]">
//               <span>Total Amount</span>
//               <span>${finalTotal.toFixed(2)}</span>
//             </div>
//             <p className="text-green-600 text-sm mt-2">
//               You save ${discount.toFixed(2)} on this order 🎉
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6">
//         <p>© {new Date().getFullYear()} ElectroMart. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default CartPage;



















// // src/pages/CartPage.jsx
// import React, { useEffect, useState } from "react";
// import { Search, User, Trash2, Plus, Minus } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../utils/api"; // centralized axios instance
// import { useAuth } from "../context/AuthContext"; // add this


// export default function CartPage() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]); // array of { product, quantity, ... }
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const { user, loading: authLoading } = useAuth();

//   // Fetch cart (server uses cookie to infer user)
//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await api.get("/api/cart", { headers: { "Cache-Control": "no-store" } });
//       // backend returns { cart, count }
//       const payload = res.data ?? {};
//       const cart = payload.cart ?? { items: [] };
//       // items use "product" per new schema (populated)
//       setCartItems(Array.isArray(cart.items) ? cart.items : []);
//     } catch (err) {
//       console.error("Error fetching cart:", err, err?.response?.data);
//       const status = err?.response?.status;
//       if (status === 401 || status === 403) {
//         // not authenticated — send to login/auth
//         navigate("/auth");
//         return;
//       }
//       setError("Failed to load cart. Try again.");
//       setCartItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Update item quantity
//   const handleUpdateQuantity = async (productId, quantity) => {
//     if (quantity < 1) return;
//     try {
//       await api.put("/api/cart/update", { productId, quantity });
//       await fetchCart();
//     } catch (err) {
//       console.error("Error updating quantity:", err, err?.response?.data);
//       const status = err?.response?.status;
//       if (status === 401 || status === 403) {
//         navigate("/auth");
//         return;
//       }
//       setError("Failed to update quantity.");
//     }
//   };

//   // Remove item
//   const handleRemove = async (productId) => {
//     if (!window.confirm("Remove this item from cart?")) return;
//     try {
//       await api.delete(`/api/cart/remove/${productId}`);
//       await fetchCart();
//     } catch (err) {
//       console.error("Error removing item:", err, err?.response?.data);
//       const status = err?.response?.status;
//       if (status === 401 || status === 403) {
//         navigate("/auth");
//         return;
//       }
//       setError("Failed to remove item.");
//     }
//   };

//   // Calculate totals (product object may be under item.product)
//   const totalPrice = cartItems.reduce((sum, item) => {
//     const p = item.product || item.productId || {};
//     const price = typeof p.price === "number" ? p.price : parseFloat(p.price) || 0;
//     return sum + (price * (item.quantity || 0));
//   }, 0);
//   const discount = totalPrice * 0.1;
//   const finalTotal = totalPrice - discount;

//   // const handlePlaceOrder = () => {
//   //   // checkout requires auth; backend will guard again
//   //   navigate("/checkout");
//   // };
//   // Handle Place Order button click
//  // inside your component, near other hooks

// const handlePlaceOrder = () => {
//   // If auth status still being fetched, do nothing (or show spinner)
//   // if (authLoading) return;

//   if (!user) {
//     // not logged in — redirect to auth and request redirect back to checkout after login
//     navigate("/user", { state: { from: "/checkout" } });
//     return;
//   }

//   // logged in — proceed
//   navigate("/checkout");
// };





//   return (
//     <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
//         <Link to="/" className="text-2xl font-bold text-[#2D7D9A]">
//           CircuitHub
//         </Link>

//         {/* Search Bar (Desktop) */}
//         <div className="hidden md:flex items-center bg-[#F1F5F9] rounded-full px-3 py-2 w-1/3">
//           <Search size={18} className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="bg-transparent outline-none text-sm w-full"
//           />
//         </div>

//         {/* Right Side Icons */}
//         <div className="flex items-center gap-6 relative">
//           <button className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
//             <Search size={22} />
//           </button>
//           <div className="relative">
//             <button onClick={() => setShowDropdown(!showDropdown)}>
//               <User size={22} />
//             </button>
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
//                 <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
//                   My Profile
//                 </Link>
//                 <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
//                   My Orders
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Search Bar for Mobile */}
//       {searchOpen && (
//         <div className="md:hidden flex items-center bg-[#F1F5F9] px-3 py-2 border-t">
//           <Search size={18} className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="bg-transparent outline-none text-sm w-full"
//           />
//         </div>
//       )}

//       {/* Cart Section */}
//       <section className="flex flex-col md:flex-row justify-between p-6 sm:p-10 gap-8 flex-grow">
//         <div className="md:w-2/3">
//           <h2 className="text-2xl font-bold text-[#1E293B] mb-6">My Cart</h2>

//           {loading ? (
//             <p className="text-gray-500">Loading cart…</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : cartItems.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty.</p>
//           ) : (
//             <div className="space-y-4">
//               {cartItems.map((item) => {
//                 const prod = item.product || item.productId || {};
//                 return (
//                   <div
//                     key={prod._id || (item._id ?? Math.random())}
//                     className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={prod.image}
//                         alt={prod.name}
//                         className="w-20 h-20 object-cover rounded-lg"
//                         onError={(e) => { e.target.src = `https://via.placeholder.com/80x80?text=${encodeURIComponent(prod.name || 'Product')}`; }}
//                       />
//                       <div>
//                         <h3 className="text-lg font-semibold text-[#1E293B]">
//                           {prod.name}
//                         </h3>
//                         <p className="text-[#2D7D9A] font-medium">${(prod.price ?? 0).toFixed(2)}</p>
//                         <div className="flex items-center gap-2 mt-2">
//                           <button
//                             onClick={() => handleUpdateQuantity(prod._id, (item.quantity || 1) - 1)}
//                             className="bg-gray-200 p-1 rounded"
//                           >
//                             <Minus size={14} />
//                           </button>
//                           <span className="text-sm font-medium w-6 text-center">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => handleUpdateQuantity(prod._id, (item.quantity || 1) + 1)}
//                             className="bg-gray-200 p-1 rounded"
//                           >
//                             <Plus size={14} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleRemove(prod._id)}
//                       className="text-red-500 hover:text-red-600"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {cartItems.length > 0 && (
//             <div className="mt-6">
//               <button
//                 onClick={handlePlaceOrder}
//                 className="bg-[#2D7D9A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3BA8C8] transition"
//               >
//                 Place Order
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Price Details */}
//         <div className="md:w-1/3">
//           <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Price Details</h2>
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3">
//             <div className="flex justify-between text-gray-700">
//               <span>Price ({cartItems.length} items)</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span>Discount</span>
//               <span className="text-green-600">- ${discount.toFixed(2)}</span>
//             </div>
//             <hr />
//             <div className="flex justify-between font-semibold text-[#1E293B]">
//               <span>Total Amount</span>
//               <span>${finalTotal.toFixed(2)}</span>
//             </div>
//             <p className="text-green-600 text-sm mt-2">
//               You save ${discount.toFixed(2)} on this order 🎉
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6">
//         <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }




















// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { Search, User, Trash2, Plus, Minus, ShoppingCart, LogIn, UserPlus, Menu, X, Home, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();

  // Fetch cart
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/cart", { headers: { "Cache-Control": "no-store" } });
      const payload = res.data ?? {};
      const cart = payload.cart ?? { items: [] };
      setCartItems(Array.isArray(cart.items) ? cart.items : []);
    } catch (err) {
      console.error("Error fetching cart:", err, err?.response?.data);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        navigate("/auth");
        return;
      }
      setError("Failed to load cart. Try again.");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update item quantity
  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put("/api/cart/update", { productId, quantity });
      await fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err, err?.response?.data);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        navigate("/auth");
        return;
      }
      setError("Failed to update quantity.");
    }
  };

  // Remove item
  const handleRemove = async (productId) => {
    if (!window.confirm("Remove this item from cart?")) return;
    try {
      await api.delete(`/api/cart/remove/${productId}`);
      await fetchCart();
    } catch (err) {
      console.error("Error removing item:", err, err?.response?.data);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        navigate("/auth");
        return;
      }
      setError("Failed to remove item.");
    }
  };

  // Calculate totals
  const totalPrice = cartItems.reduce((sum, item) => {
    const p = item.product || item.productId || {};
    const price = typeof p.price === "number" ? p.price : parseFloat(p.price) || 0;
    return sum + (price * (item.quantity || 0));
  }, 0);
  const discount = totalPrice * 0.1;
  const finalTotal = totalPrice - discount;

  const handlePlaceOrder = () => {
    if (!user) {
      navigate("/user", { state: { from: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Glassmorphic Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span 
                className="text-slate-900 font-bold cursor-pointer"
                onClick={() => navigate("/")}
              >
                ElectroBay
              </span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="flex-1 mx-4 hidden md:flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200">
              <Search className="text-slate-500 mr-2" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none w-full text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition"
              >
                <Home size={18} />
                <span>Home</span>
              </button>
              
              <button 
                onClick={() => navigate("/products")}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition"
              >
                <Package size={18} />
                <span>Products</span>
              </button>

              {!user ? (
                <>
                  <button 
                    onClick={() => navigate("/auth")} 
                    className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                  <button 
                    onClick={() => navigate("/register")} 
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>
                </>
              ) : (
                <button className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden ml-4 flex items-center gap-3">
              <button onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={22} className="text-slate-900" />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <X size={28} className="text-slate-900" />
                ) : (
                  <Menu size={28} className="text-slate-900" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {searchOpen && (
            <div className="md:hidden py-3 border-t border-white/20">
              <div className="flex items-center bg-white/60 rounded-lg px-3 py-2 border border-slate-200">
                <Search className="text-slate-500 mr-2" size={16} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none w-full text-slate-900 text-sm placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => {
                    navigate("/");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition text-left"
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>
                
                <button 
                  onClick={() => {
                    navigate("/products");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition text-left"
                >
                  <Package size={18} />
                  <span>Products</span>
                </button>

                <div className="flex flex-col gap-3 pt-2 border-t border-white/20">
                  {!user ? (
                    <>
                      <button 
                        onClick={() => navigate("/auth")} 
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </button>
                      <button 
                        onClick={() => navigate("/register")} 
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </button>
                    </>
                  ) : (
                    <button className="flex items-center gap-2 text-slate-700 text-left">
                      <User className="w-4 h-4" />
                      <span>{user.email}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <section className="flex-grow mt-16 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
            <p className="text-slate-600">
              {loading ? "Loading..." : `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in your cart`}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 text-lg">Loading your cart...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button 
                onClick={fetchCart}
                className="px-6 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
              >
                Try Again
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={48} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h3>
              <p className="text-slate-600 mb-6">Add some products to get started!</p>
              <button 
                onClick={() => navigate("/products")}
                className="px-6 py-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const prod = item.product || item.productId || {};
                  const price = typeof prod.price === "number" ? prod.price : parseFloat(prod.price) || 0;
                  const itemTotal = price * (item.quantity || 1);

                  return (
                    <div
                      key={prod._id || (item._id ?? Math.random())}
                      className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div 
                          className="w-full sm:w-32 h-32 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
                          onClick={() => navigate(`/product/${prod._id}`)}
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="max-h-full object-contain p-2 hover:scale-110 transition-transform duration-300"
                            onError={(e) => { 
                              e.target.src = `https://via.placeholder.com/128x128?text=${encodeURIComponent(prod.name || 'Product')}`; 
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 
                                className="text-lg font-semibold text-slate-900 mb-1 cursor-pointer hover:text-blue-600 transition"
                                onClick={() => navigate(`/product/${prod._id}`)}
                              >
                                {prod.name}
                              </h3>
                              {prod.category && (
                                <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                                  {prod.category}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleRemove(prod._id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                              aria-label="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                              <button
                                onClick={() => handleUpdateQuantity(prod._id, (item.quantity || 1) - 1)}
                                className="p-2 hover:bg-white rounded-lg transition"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-medium text-slate-900 min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(prod._id, (item.quantity || 1) + 1)}
                                className="p-2 hover:bg-white rounded-lg transition"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-sm text-slate-500">Unit Price: ${price.toFixed(2)}</div>
                              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ${itemTotal.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Summary - Sticky on Desktop */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 lg:sticky lg:top-24">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span className="font-medium">- ${discount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex justify-between text-lg font-bold text-slate-900">
                        <span>Total</span>
                        <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-700 text-sm font-medium">
                      🎉 You're saving ${discount.toFixed(2)} on this order!
                    </p>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    <span>Proceed to Checkout</span>
                  </button>

                  <button
                    onClick={() => navigate("/products")}
                    className="w-full mt-3 py-3 bg-slate-100 text-slate-900 rounded-lg font-medium hover:bg-slate-200 transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl">ElectroBay</span>
              </div>
              <p className="text-white/70">
                Your trusted partner for all electronics and development needs.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-white/70 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-white/70 hover:text-white transition">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-white/70 hover:text-white transition">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition">
                    Shipping Info
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/70">
            <p>&copy; {new Date().getFullYear()} ElectroBay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
