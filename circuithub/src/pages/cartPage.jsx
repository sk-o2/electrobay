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



















// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { Search, User, Trash2, Plus, Minus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api"; // centralized axios instance
import { useAuth } from "../context/AuthContext"; // add this


export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); // array of { product, quantity, ... }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, loading: authLoading } = useAuth();

  // Fetch cart (server uses cookie to infer user)
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/cart", { headers: { "Cache-Control": "no-store" } });
      // backend returns { cart, count }
      const payload = res.data ?? {};
      const cart = payload.cart ?? { items: [] };
      // items use "product" per new schema (populated)
      setCartItems(Array.isArray(cart.items) ? cart.items : []);
    } catch (err) {
      console.error("Error fetching cart:", err, err?.response?.data);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        // not authenticated — send to login/auth
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Calculate totals (product object may be under item.product)
  const totalPrice = cartItems.reduce((sum, item) => {
    const p = item.product || item.productId || {};
    const price = typeof p.price === "number" ? p.price : parseFloat(p.price) || 0;
    return sum + (price * (item.quantity || 0));
  }, 0);
  const discount = totalPrice * 0.1;
  const finalTotal = totalPrice - discount;

  // const handlePlaceOrder = () => {
  //   // checkout requires auth; backend will guard again
  //   navigate("/checkout");
  // };
  // Handle Place Order button click
 // inside your component, near other hooks

const handlePlaceOrder = () => {
  // If auth status still being fetched, do nothing (or show spinner)
  // if (authLoading) return;

  if (!user) {
    // not logged in — redirect to auth and request redirect back to checkout after login
    navigate("/user", { state: { from: "/checkout" } });
    return;
  }

  // logged in — proceed
  navigate("/checkout");
};





  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <Link to="/" className="text-2xl font-bold text-[#2D7D9A]">
          CircuitHub
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center bg-[#F1F5F9] rounded-full px-3 py-2 w-1/3">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6 relative">
          <button className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
            <Search size={22} />
          </button>
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)}>
              <User size={22} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  My Profile
                </Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                  My Orders
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search Bar for Mobile */}
      {searchOpen && (
        <div className="md:hidden flex items-center bg-[#F1F5F9] px-3 py-2 border-t">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      )}

      {/* Cart Section */}
      <section className="flex flex-col md:flex-row justify-between p-6 sm:p-10 gap-8 flex-grow">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">My Cart</h2>

          {loading ? (
            <p className="text-gray-500">Loading cart…</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const prod = item.product || item.productId || {};
                return (
                  <div
                    key={prod._id || (item._id ?? Math.random())}
                    className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => { e.target.src = `https://via.placeholder.com/80x80?text=${encodeURIComponent(prod.name || 'Product')}`; }}
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-[#1E293B]">
                          {prod.name}
                        </h3>
                        <p className="text-[#2D7D9A] font-medium">${(prod.price ?? 0).toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleUpdateQuantity(prod._id, (item.quantity || 1) - 1)}
                            className="bg-gray-200 p-1 rounded"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(prod._id, (item.quantity || 1) + 1)}
                            className="bg-gray-200 p-1 rounded"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(prod._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-6">
              <button
                onClick={handlePlaceOrder}
                className="bg-[#2D7D9A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3BA8C8] transition"
              >
                Place Order
              </button>
            </div>
          )}
        </div>

        {/* Price Details */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Price Details</h2>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Price ({cartItems.length} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Discount</span>
              <span className="text-green-600">- ${discount.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-[#1E293B]">
              <span>Total Amount</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <p className="text-green-600 text-sm mt-2">
              You save ${discount.toFixed(2)} on this order 🎉
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6">
        <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
