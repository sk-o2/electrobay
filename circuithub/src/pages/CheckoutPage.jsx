
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














import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Use your AuthContext
import api from "../utils/api"; // Axios instance configured with withCredentials: true

const CheckoutPage = () => {
  const { user, loading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
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

  // When user selects a saved address (stringified), parse it back to object as needed
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
      // If new address entered, parse it or send as string (modify as you prefer)
      try {
        deliveryAddress = JSON.parse(newAddress);
      } catch {
        deliveryAddress = newAddress; // fallback if not JSON
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
    }
  };

  const handlePayment = () => setShowPaymentPopup(true);
  const confirmPayment = () => {
    setShowPaymentPopup(false);
    handlePlaceOrder();
  };
  const cancelPayment = () => setShowPaymentPopup(false);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Navbar */}
      <nav className="bg-[#F1F5F9] shadow-md py-4 px-6 flex justify-between items-center">
        <div
          className="text-xl font-bold text-[#2D7D9A] cursor-pointer"
          onClick={() => navigate("/")}
        >
          CircuitHub
        </div>
        <div>
          <button
            onClick={() => navigate("/cart")}
            className="bg-[#3BA8C8] text-white px-4 py-2 rounded-lg hover:bg-[#2D7D9A]"
          >
            Back to Cart
          </button>
        </div>
      </nav>

      {/* Checkout Section */}
      <div className="flex flex-col md:flex-row justify-between px-6 py-10 gap-6">
        {/* Left - Address & Payment */}
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0]">
          <h2 className="text-2xl font-semibold text-[#2D7D9A] mb-6">
            Checkout Details
          </h2>

          {/* Address Dropdown */}
          <div className="mb-6">
            <label className="block text-[#1E293B] font-medium mb-2">
              Delivery Address
            </label>
            <select
              value={selectedAddress}
              onChange={handleAddressChange}
              className="w-full p-3 border rounded-lg text-[#1E293B]"
            >
              <option value="">Select Saved Address</option>
              {user?.address && (
                <option value={JSON.stringify(user.address)}>
                  {formatAddress(user.address)}
                </option>
              )}
            </select>
          </div>

          {/* New Address */}
          <div className="mb-6">
            <label className="block text-[#1E293B] font-medium mb-2">
              New Address (Optional)
            </label>
            <textarea
              rows="3"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new delivery address as JSON..."
              className="w-full p-3 border rounded-lg text-[#1E293B] resize-none"
            ></textarea>
          </div>

          {/* Payment Button */}
          <div className="mb-6">
            <label className="block text-[#1E293B] font-medium mb-2">
              Payment Method
            </label>
            <button
              onClick={handlePayment}
              className="w-full bg-[#F9A826] text-[#1E293B] py-3 rounded-lg hover:bg-[#3BA8C8] hover:text-white transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-6 border border-[#E2E8F0]">
          <h2 className="text-2xl font-semibold text-[#2D7D9A] mb-6">
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-[#64748B]">No items in your cart.</p>
          ) : (
            <>
              <ul className="divide-y divide-[#E2E8F0] mb-6">
                {cartItems.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between py-3 text-[#1E293B]"
                  >
                    <span>{item.product.name}</span>
                    <span>${item.product.price}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between text-lg font-semibold text-[#1E293B] mb-4">
                <span>Total:</span>
                <span>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-[#3BA8C8] text-white py-3 rounded-lg hover:bg-[#2D7D9A] transition"
              >
                Place Order
              </button>
            </>
          )}
        </div>
      </div>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-xl font-semibold text-[#1E293B] mb-4">
              Confirm Payment
            </h3>
            <p className="text-[#64748B] mb-6">
              Proceed with your selected payment method?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmPayment}
                className="bg-[#3BA8C8] text-white px-4 py-2 rounded-lg hover:bg-[#2D7D9A]"
              >
                Confirm
              </button>
              <button
                onClick={cancelPayment}
                className="bg-gray-300 text-[#1E293B] px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CheckoutPage;
