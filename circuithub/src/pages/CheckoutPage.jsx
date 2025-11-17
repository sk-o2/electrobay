
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CheckoutPage = () => {
//   const [user, setUser] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [newAddress, setNewAddress] = useState("");
//   const [showPaymentPopup, setShowPaymentPopup] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Check login + fetch user + cart data
//   const fetchCheckoutData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!user) {
//         navigate("/auth");
//         return;
//       }

//       // Fetch user details
//       const userRes = await axios.get("http://localhost:5000/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(userRes.data);
//       setSelectedAddress(userRes.data.address || "");

//       // Fetch cart items
//       const cartRes = await axios.get("http://localhost:5000/api/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(cartRes.data);
//     } catch (error) {
//       console.error("Checkout fetch failed:", error);
//       navigate("/auth");
//     }
//   };

//   useEffect(() => {
//     fetchCheckoutData();
//   }, []);

//   // ✅ Place order
//   const handlePlaceOrder = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return navigate("/auth");

//       const deliveryAddress = newAddress || selectedAddress;
//       if (!deliveryAddress) {
//         alert("Please select or enter a delivery address");
//         return;
//       }

//       const res = await axios.post(
//         "http://localhost:5000/api/orders",
//         {
//           items: cartItems,
//           address: deliveryAddress,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.status === 201) {
//         alert("Order placed successfully!");
//         navigate("/orders");
//       }
//     } catch (err) {
//       console.error("Order error:", err);
//       alert("Failed to place order");
//     }
//   };

//   // ✅ Payment popup simulation
//   const handlePayment = () => {
//     setShowPaymentPopup(true);
//   };

//   const confirmPayment = () => {
//     setShowPaymentPopup(false);
//     handlePlaceOrder();
//   };

//   const cancelPayment = () => {
//     setShowPaymentPopup(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
//       {/* Navbar */}
//       <nav className="bg-[#F1F5F9] shadow-md py-4 px-6 flex justify-between items-center">
//         <div
//           className="text-xl font-bold text-[#2D7D9A] cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           CircuitHub
//         </div>
//         <div>
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-[#3BA8C8] text-white px-4 py-2 rounded-lg hover:bg-[#2D7D9A]"
//           >
//             Back to Cart
//           </button>
//         </div>
//       </nav>

//       {/* Checkout Section */}
//       <div className="flex flex-col md:flex-row justify-between px-6 py-10 gap-6">
//         {/* Left - Address & Payment */}
//         <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0]">
//           <h2 className="text-2xl font-semibold text-[#2D7D9A] mb-6">
//             Checkout Details
//           </h2>

//           {/* Address Dropdown */}
//           <div className="mb-6">
//             <label className="block text-[#1E293B] font-medium mb-2">
//               Delivery Address
//             </label>
//             <select
//               value={selectedAddress}
//               onChange={(e) => setSelectedAddress(e.target.value)}
//               className="w-full p-3 border rounded-lg text-[#1E293B]"
//             >
//               <option value="">Select Saved Address</option>
//               {user?.address && <option value={user.address}>{user.address}</option>}
//             </select>
//           </div>

//           {/* New Address */}
//           <div className="mb-6">
//             <label className="block text-[#1E293B] font-medium mb-2">
//               New Address (Optional)
//             </label>
//             <textarea
//               rows="3"
//               value={newAddress}
//               onChange={(e) => setNewAddress(e.target.value)}
//               placeholder="Enter new delivery address..."
//               className="w-full p-3 border rounded-lg text-[#1E293B] resize-none"
//             ></textarea>
//           </div>

//           {/* Payment Dropdown */}
//           <div className="mb-6">
//             <label className="block text-[#1E293B] font-medium mb-2">
//               Payment Method
//             </label>
//             <button
//               onClick={handlePayment}
//               className="w-full bg-[#F9A826] text-[#1E293B] py-3 rounded-lg hover:bg-[#3BA8C8] hover:text-white transition"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </div>

//         {/* Right - Order Summary */}
//         <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0]">
//           <h2 className="text-2xl font-semibold text-[#2D7D9A] mb-6">
//             Order Summary
//           </h2>

//           {cartItems.length === 0 ? (
//             <p className="text-[#64748B]">No items in your cart.</p>
//           ) : (
//             <>
//               <ul className="divide-y divide-[#E2E8F0] mb-6">
//                 {cartItems.map((item) => (
//                   <li
//                     key={item._id}
//                     className="flex justify-between py-3 text-[#1E293B]"
//                   >
//                     <span>{item.product.name}</span>
//                     <span>${item.product.price}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex justify-between text-lg font-semibold text-[#1E293B] mb-4">
//                 <span>Total:</span>
//                 <span>
//                   $
//                   {cartItems
//                     .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
//                     .toFixed(2)}
//                 </span>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 className="w-full bg-[#3BA8C8] text-white py-3 rounded-lg hover:bg-[#2D7D9A] transition"
//               >
//                 Place Order
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Payment Popup */}
//       {showPaymentPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
//             <h3 className="text-xl font-semibold text-[#1E293B] mb-4">
//               Confirm Payment
//             </h3>
//             <p className="text-[#64748B] mb-6">
//               Proceed with your selected payment method?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={confirmPayment}
//                 className="bg-[#3BA8C8] text-white px-4 py-2 rounded-lg hover:bg-[#2D7D9A]"
//               >
//                 Confirm
//               </button>
//               <button
//                 onClick={cancelPayment}
//                 className="bg-gray-300 text-[#1E293B] px-4 py-2 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6 mt-10">
//         <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default CheckoutPage;


















// // src/pages/CheckoutPage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Use your AuthContext
// import api from "../utils/api"; // Axios instance configured with withCredentials: true

// const CheckoutPage = () => {
//   const { user, loading } = useAuth(); // Get auth user and loading flag
//   const [cartItems, setCartItems] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [newAddress, setNewAddress] = useState("");
//   const [showPaymentPopup, setShowPaymentPopup] = useState(false);
//   const navigate = useNavigate();

//   // Fetch cart items when user is authenticated and loading completes
//   useEffect(() => {
//     if (loading) return; // Wait until auth loading completes
//     if (!user) {
//       navigate("/auth", { replace: true });
//       return;
//     }

//     const fetchCartItems = async () => {
//       try {
//         const res = await api.get("/api/cart");
//         setCartItems(res.data.cart?.items || []);
//       } catch (error) {
//         console.error("Failed to load cart items", error);
//         setCartItems([]);
//       }
//     };

//     fetchCartItems();
//     setSelectedAddress(user.address || "");
//   }, [user, loading, navigate]);

//   // Place order handler - uses cookie-based auth, no manual token passing
//   const handlePlaceOrder = async () => {
//     if (!user) {
//       navigate("/auth", { replace: true });
//       return;
//     }

//     const deliveryAddress = newAddress || selectedAddress;
//     if (!deliveryAddress) {
//       alert("Please select or enter a delivery address");
//       return;
//     }

//     try {
//       const res = await api.post("/api/orders", {
//         items: cartItems,
//         address: deliveryAddress,
//       });

//       if (res.status === 201) {
//         alert("Order placed successfully!");
//         navigate("/orders");
//       }
//     } catch (error) {
//       console.error("Failed to place order:", error);
//       alert("Failed to place order");
//     }
//   };

//   // Payment popup handlers (if needed)
//   const handlePayment = () => setShowPaymentPopup(true);
//   const confirmPayment = () => {
//     setShowPaymentPopup(false);
//     handlePlaceOrder();
//   };
//   const cancelPayment = () => setShowPaymentPopup(false);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
//       {/* Navbar */}
//       <nav className="bg-[#F1F5F9] shadow-md py-4 px-6 flex justify-between items-center">
//         <div
//           className="text-xl font-bold text-[#2D7D9A] cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           CircuitHub
//         </div>
//         <div>
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-[#3BA8C8] text-white px-4 py-2 rounded-lg hover:bg-[#2D7D9A]"
//           >
//             Back to Cart
//           </button>
//         </div>
//       </nav>

//       {/* Checkout Section */}
//       <div className="flex flex-col md:flex-row justify-between px-6 py-10 gap-6">
//         {/* Left - Address & Payment */}
//         <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0]">
//           <h2 className="text-2xl font-semibold text-[#2D7D9A] mb-6">
//             Checkout Details
//           </h2>

//           {/* Address Dropdown */}
//           <div className="mb-6">
//             <label className="block text-[#1E293B] font-medium mb-2">
//               Delivery Address
//             </label>
//             <select
//               value={selectedAddress}
//               onChange={(e) => setSelectedAddress(e.target.value)}
//               className="w-full p-3 border rounded-lg text-[#1E293B]"
//             >
//               <option value="">Select Saved Address</option>
//               {user?.address && <option value={user.address}>{user.address}</option>}
//             </select>
//           </div>

//           {/* New Address */}
//           <div className="mb-6">
//             <label className="block text-[#1E293B] font-medium mb-2">
//               New Address (Optional)
//             </label>
//             <textarea
//               rows="3"
//               value={newAddress}
//               onChange={(e) => setNewAddress(e.target.value)}
//               placeholder="Enter new delivery address..."
//               className="w-full p-3 border rounded-lg text-[#1E293B] resize-none"
//             ></textarea>
//           </div>

//           {/* Payment Button */}
//           <div className="mb-6">
//             <label className="block text-[#1E293B] font-medium mb-2">
//               Payment Method
//             </label>
//             <button
//               onClick={handlePayment}
//               className="w-full bg-[#F9A826] text-[#1E293B] py-3 rounded-lg hover:bg-[#3BA8C8] hover:text-white transition"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </div>

//         {/* Right - Order Summary */}
//         <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0]">
//           <h2 className="text-2xl font-semibold text-[#2D7D9A] mb-6">Order Summary</h2>

//           {cartItems.length === 0 ? (
//             <p className="text-[#64748B]">No items in your cart.</p>
//           ) : (
//             <>
//               <ul className="divide-y divide-[#E2E8F0] mb-6">
//                 {cartItems.map((item) => (
//                   <li
//                     key={item._id}
//                     className="flex justify-between py-3 text-[#1E293B]"
//                   >
//                     <span>{item.product.name}</span>
//                     <span>${item.product.price}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex justify-between text-lg font-semibold text-[#1E293B] mb-4">
//                 <span>Total:</span>
//                 <span>
//                   $
//                   {cartItems
//                     .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
//                     .toFixed(2)}
//                 </span>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 className="w-full bg-[#3BA8C8] text-white py-3 rounded-lg hover:bg-[#2D7D9A] transition"
//               >
//                 Place Order
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Payment Popup */}
//       {showPaymentPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
//             <h3 className="text-xl font-semibold text-[#1E293B] mb-4">
//               Confirm Payment
//             </h3>
//             <p className="text-[#64748B] mb-6">
//               Proceed with your selected payment method?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={confirmPayment}
//                 className="bg-[#3BA8C8] text-white px-4 py-2 rounded-lg hover:bg-[#2D7D9A]"
//               >
//                 Confirm
//               </button>
//               <button
//                 onClick={cancelPayment}
//                 className="bg-gray-300 text-[#1E293B] px-4 py-2 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6 mt-10">
//         <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default CheckoutPage;














// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Use your AuthContext
// import api from "../utils/api"; // Axios instance configured with withCredentials: true

// const CheckoutPage = () => {
//   const { user, loading } = useAuth();
//   const [cartItems, setCartItems] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [newAddress, setNewAddress] = useState("");
//   const [showPaymentPopup, setShowPaymentPopup] = useState(false);
//   const navigate = useNavigate();

//   // Helper to format address object for display
//   const formatAddress = (addr) => {
//     if (!addr) return "";
//     return `${addr.line1}, ${addr.city}, ${addr.state}, ${addr.postalCode}, ${addr.country}`;
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (!user) {
//       navigate("/auth", { replace: true });
//       return;
//     }

//     const fetchCartItems = async () => {
//       try {
//         const res = await api.get("/api/cart");
//         setCartItems(res.data.cart?.items || []);
//       } catch (error) {
//         console.error("Failed to load cart items", error);
//         setCartItems([]);
//       }
//     };

//     fetchCartItems();

//     // Initialize selectedAddress with stringified user address
//     if (user.address) {
//       setSelectedAddress(JSON.stringify(user.address));
//     } else {
//       setSelectedAddress("");
//     }
//   }, [user, loading, navigate]);

//   // When user selects a saved address (stringified), parse it back to object as needed
//   const handleAddressChange = (e) => {
//     setSelectedAddress(e.target.value);
//   };

//   const handlePlaceOrder = async () => {
//     if (!user) {
//       navigate("/auth", { replace: true });
//       return;
//     }

//     let deliveryAddress;
//     if (newAddress.trim()) {
//       // If new address entered, parse it or send as string (modify as you prefer)
//       try {
//         deliveryAddress = JSON.parse(newAddress);
//       } catch {
//         deliveryAddress = newAddress; // fallback if not JSON
//       }
//     } else if (selectedAddress) {
//       try {
//         deliveryAddress = JSON.parse(selectedAddress);
//       } catch {
//         deliveryAddress = selectedAddress;
//       }
//     } else {
//       alert("Please select or enter a delivery address");
//       return;
//     }

//     try {
//       const res = await api.post("/api/orders", {
//         items: cartItems,
//         address: deliveryAddress,
//       });

//       if (res.status === 201) {
//         alert("Order placed successfully!");
//         navigate("/orders");
//       }
//     } catch (error) {
//       console.error("Failed to place order:", error);
//       alert("Failed to place order");
//     }
//   };

//   const handlePayment = () => setShowPaymentPopup(true);
//   const confirmPayment = () => {
//     setShowPaymentPopup(false);
//     handlePlaceOrder();
//   };
//   const cancelPayment = () => setShowPaymentPopup(false);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
//       {/* Navbar */}
//       <nav className="bg-[#F1F5F9] shadow-md py-4 px-6 flex justify-between items-center">
//         <div
//           className="text-xl font-bold text-[#2D7D9A] cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           CircuitHub
//         </div>
//         <div>
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-[#3BA8C8] text-white px-4 py-2 rounded-lg hover:bg-[#2D7D9A]"
//           >
//             Back to Cart
//           </button>
//         </div>
//       </nav>

//       {/* Checkout Section */}
//       <div className="flex flex-col md:flex-row justify-between px-6 py-10 gap-6">
//         {/* Left - Address & Payment */}
//         <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0]">
//           <h2 className="text-2xl font-semibold text-[#2D7D9A] mb-6">
//             Checkout Details
//           </h2>

//           {/* Address Dropdown */}
//           <div className="mb-6">
//             <label className="block text-[#1E293B] font-medium mb-2">
//               Delivery Address
//             </label>
//             <select
//               value={selectedAddress}
//               onChange={handleAddressChange}
//               className="w-full p-3 border rounded-lg text-[#1E293B]"
//             >
//               <option value="">Select Saved Address</option>
//               {user?.address && (
//                 <option value={JSON.stringify(user.address)}>
//                   {formatAddress(user.address)}
//                 </option>
//               )}
//             </select>
//           </div>

//           {/* New Address */}
//           <div className="mb-6">
//             <label className="block text-[#1E293B] font-medium mb-2">
//               New Address (Optional)
//             </label>
//             <textarea
//               rows="3"
//               value={newAddress}
//               onChange={(e) => setNewAddress(e.target.value)}
//               placeholder="Enter new delivery address as JSON..."
//               className="w-full p-3 border rounded-lg text-[#1E293B] resize-none"
//             ></textarea>
//           </div>

//           {/* Payment Button */}
//           <div className="mb-6">
//             <label className="block text-[#1E293B] font-medium mb-2">
//               Payment Method
//             </label>
//             <button
//               onClick={handlePayment}
//               className="w-full bg-[#F9A826] text-[#1E293B] py-3 rounded-lg hover:bg-[#3BA8C8] hover:text-white transition"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </div>

//         {/* Right - Order Summary */}
//         <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0]">
//           <h2 className="text-2xl font-semibold text-[#2D7D9A] mb-6">
//             Order Summary
//           </h2>

//           {cartItems.length === 0 ? (
//             <p className="text-[#64748B]">No items in your cart.</p>
//           ) : (
//             <>
//               <ul className="divide-y divide-[#E2E8F0] mb-6">
//                 {cartItems.map((item) => (
//                   <li
//                     key={item._id}
//                     className="flex justify-between py-3 text-[#1E293B]"
//                   >
//                     <span>{item.product.name}</span>
//                     <span>${item.product.price}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex justify-between text-lg font-semibold text-[#1E293B] mb-4">
//                 <span>Total:</span>
//                 <span>
//                   $
//                   {cartItems
//                     .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
//                     .toFixed(2)}
//                 </span>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 className="w-full bg-[#3BA8C8] text-white py-3 rounded-lg hover:bg-[#2D7D9A] transition"
//               >
//                 Place Order
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Payment Popup */}
//       {showPaymentPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
//             <h3 className="text-xl font-semibold text-[#1E293B] mb-4">
//               Confirm Payment
//             </h3>
//             <p className="text-[#64748B] mb-6">
//               Proceed with your selected payment method?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={confirmPayment}
//                 className="bg-[#3BA8C8] text-white px-4 py-2 rounded-lg hover:bg-[#2D7D9A]"
//               >
//                 Confirm
//               </button>
//               <button
//                 onClick={cancelPayment}
//                 className="bg-gray-300 text-[#1E293B] px-4 py-2 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6 mt-10">
//         <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default CheckoutPage;








import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  Home, 
  Package, 
  Truck,
  Lock,
  X
} from "lucide-react";

const CheckoutPage = () => {
  const { user, loading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);
  const navigate = useNavigate();

  // Helper to format address object for display
  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.line1}, ${addr.city}, ${addr.state}, ${addr.postalCode}, ${addr.country}`;
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }

    const fetchCartItems = async () => {
      try {
        const res = await api.get("/api/cart");
        setCartItems(res.data.cart?.items || []);
      } catch (error) {
        console.error("Failed to load cart items", error);
        setCartItems([]);
      }
    };

    fetchCartItems();

    // Initialize selectedAddress with stringified user address
    if (user.address) {
      setSelectedAddress(JSON.stringify(user.address));
    } else {
      setSelectedAddress("");
    }
  }, [user, loading, navigate]);

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }

    let deliveryAddress;
    if (newAddress.trim()) {
      try {
        deliveryAddress = JSON.parse(newAddress);
      } catch {
        deliveryAddress = newAddress;
      }
    } else if (selectedAddress) {
      try {
        deliveryAddress = JSON.parse(selectedAddress);
      } catch {
        deliveryAddress = selectedAddress;
      }
    } else {
      alert("Please select or enter a delivery address");
      return;
    }

    try {
      setProcessingOrder(true);
      const res = await api.post("/api/orders", {
        items: cartItems,
        address: deliveryAddress,
      });

      if (res.status === 201) {
        alert("Order placed successfully!");
        navigate("/orders");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order");
    } finally {
      setProcessingOrder(false);
    }
  };

  const handlePayment = () => {
    if (!selectedAddress && !newAddress.trim()) {
      alert("Please select or enter a delivery address");
      return;
    }
    setShowPaymentPopup(true);
  };

  const confirmPayment = () => {
    setShowPaymentPopup(false);
    handlePlaceOrder();
  };

  const cancelPayment = () => setShowPaymentPopup(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = 0; // Free shipping
  const discount = totalAmount * 0.1; // 10% discount
  const finalTotal = totalAmount - discount + shippingCost;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
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

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="hidden sm:flex items-center gap-2 text-slate-700 hover:text-slate-900 transition"
              >
                <Home size={18} />
                <span>Home</span>
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Back to Cart</span>
                <span className="sm:hidden">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow mt-16 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Checkout</h1>
            <p className="text-slate-600">Complete your order securely</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Checkout Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Delivery Address</h2>
                </div>

                {/* Saved Address Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Saved Address
                  </label>
                  <select
                    value={selectedAddress}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
                  >
                    <option value="">Choose an address</option>
                    {user?.address && (
                      <option value={JSON.stringify(user.address)}>
                        {formatAddress(user.address)}
                      </option>
                    )}
                  </select>
                </div>

                {/* New Address */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Or Enter New Address
                  </label>
                  <textarea
                    rows="4"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder='{"line1": "123 Main St", "city": "City", "state": "State", "postalCode": "12345", "country": "Country"}'
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 resize-none font-mono text-sm"
                  ></textarea>
                  <p className="text-xs text-slate-500 mt-2">
                    Enter address in JSON format or select from saved addresses above
                  </p>
                </div>
              </div>

              {/* Delivery Method Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Delivery Method</h2>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        checked 
                        readOnly
                        className="w-4 h-4 text-blue-600" 
                      />
                      <div>
                        <p className="font-medium text-slate-900">Standard Delivery</p>
                        <p className="text-sm text-slate-600">3-5 business days</p>
                      </div>
                    </div>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        checked 
                        readOnly
                        className="w-4 h-4 text-blue-600" 
                      />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">Cash on Delivery</p>
                        <p className="text-sm text-slate-600">Pay when you receive your order</p>
                      </div>
                      <Lock className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Order Summary (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No items in cart</p>
                    <button
                      onClick={() => navigate("/products")}
                      className="mt-4 px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="max-h-64 overflow-y-auto mb-6 space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex gap-3 pb-3 border-b border-slate-200 last:border-0"
                        >
                          <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="max-h-full object-contain p-1"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/64x64?text=${encodeURIComponent(item.product.name || 'Product')}`;
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-slate-900 line-clamp-2">
                              {item.product.name}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                              <span className="text-sm font-semibold text-slate-900">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-medium">${totalAmount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span className="font-medium">- ${discount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span className="font-medium text-green-600">FREE</span>
                      </div>

                      <div className="border-t border-slate-200 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-slate-900">Total</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${finalTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                      onClick={handlePayment}
                      disabled={processingOrder}
                      className="w-full py-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingOrder ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle size={20} />
                          <span>Place Order</span>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center mt-4">
                      By placing this order, you agree to our terms and conditions
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">Confirm Order</h3>
                <button
                  onClick={cancelPayment}
                  className="p-1 hover:bg-white/20 rounded-lg transition"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-white/90">Review your order details</p>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Payment Method</p>
                    <p className="font-semibold text-slate-900">Cash on Delivery</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Order Total</p>
                    <p className="font-semibold text-slate-900">${finalTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-700 text-center">
                  Your order will be confirmed and processed immediately
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={cancelPayment}
                  className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  disabled={processingOrder}
                  className="flex-1 py-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                  {processingOrder ? "Processing..." : "Confirm & Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <button onClick={() => navigate("/")} className="text-white/70 hover:text-white transition">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/products")} className="text-white/70 hover:text-white transition">
                    Products
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/cart")} className="text-white/70 hover:text-white transition">
                    Cart
                  </button>
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
                    Secure Checkout
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition">
                    Shipping Policy
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
};

export default CheckoutPage;
