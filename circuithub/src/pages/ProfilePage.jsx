// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Search, ShoppingCart, User, Edit, LogOut, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const [user, setUser] = useState({});
//   const [orders, setOrders] = useState([]);
//   const [activeTab, setActiveTab] = useState("account");
//   const [isEditing, setIsEditing] = useState(false);
//   const [logoutConfirm, setLogoutConfirm] = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState(false);
//   const [deleteInput, setDeleteInput] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUser();
//     fetchOrders();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5000/api/user/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put("http://localhost:5000/api/user/update", user, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsEditing(false);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const handleDeleteAccount = async () => {
//     if (deleteInput !== `delete_${user.name}`) return alert("Text does not match!");
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete("http://localhost:5000/api/user/delete", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       localStorage.removeItem("token");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete account");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
//       {/* Navbar */}
//       <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#F1F5F9] shadow-md">
//         <div
//           className="font-bold text-xl text-[#2D7D9A] cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           CircuitHub
//         </div>
//         <div className="flex-1 mx-4 hidden md:flex items-center bg-white rounded-full px-4 py-2 border border-[#E2E8F0]">
//           <Search className="text-[#64748B] mr-2" size={18} />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="bg-transparent outline-none w-full text-[#1E293B]"
//           />
//         </div>
//         <div className="flex items-center space-x-4">
//           <ShoppingCart
//             size={26}
//             className="text-[#2D7D9A] cursor-pointer"
//             onClick={() => navigate("/cart")}
//           />
//           <User
//             size={26}
//             className="text-[#2D7D9A] cursor-pointer"
//             onClick={() => navigate("/profile")}
//           />
//         </div>
//       </nav>

//       {/* Profile Layout */}
//       <div className="flex flex-col md:flex-row flex-grow">
//         {/* Left Sidebar */}
//         <aside className="w-full md:w-1/4 bg-white p-6 border-r border-[#E2E8F0]">
//           <div className="flex items-center space-x-3 mb-8">
//             <div className="w-14 h-14 rounded-full bg-[#3BA8C8] text-white flex items-center justify-center text-xl font-bold">
//               {user.name?.charAt(0).toUpperCase() || "U"}
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-[#1E293B]">{user.name}</h2>
//               <p className="text-sm text-[#64748B]">{user.email}</p>
//             </div>
//           </div>
//           <ul className="space-y-4">
//             <li
//               className={`cursor-pointer font-medium ${
//                 activeTab === "account" ? "text-[#2D7D9A]" : "text-[#475569]"
//               }`}
//               onClick={() => setActiveTab("account")}
//             >
//               Account Settings
//             </li>
//             <li
//               className={`cursor-pointer font-medium ${
//                 activeTab === "orders" ? "text-[#2D7D9A]" : "text-[#475569]"
//               }`}
//               onClick={() => setActiveTab("orders")}
//             >
//               My Orders
//             </li>
//           </ul>
//         </aside>

//         {/* Right Content */}
//         <main className="flex-1 p-6 bg-[#F8FAFC]">
//           {activeTab === "account" ? (
//             <div className="max-w-lg">
//               <h2 className="text-2xl font-semibold mb-6 text-[#2D7D9A]">
//                 Account Information
//               </h2>

//               {["name", "phone", "email", "address"].map((field) => (
//                 <div className="mb-4" key={field}>
//                   <label className="block text-[#475569] font-medium capitalize mb-1">
//                     {field}
//                   </label>
//                   <input
//                     type="text"
//                     value={user[field] || ""}
//                     disabled={!isEditing}
//                     onChange={(e) => setUser({ ...user, [field]: e.target.value })}
//                     className={`w-full px-4 py-2 border rounded-lg ${
//                       isEditing ? "bg-white" : "bg-gray-100"
//                     }`}
//                   />
//                 </div>
//               ))}

//               <div className="flex items-center space-x-3 mt-6">
//                 {!isEditing ? (
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="flex items-center px-5 py-2 bg-[#2D7D9A] text-white rounded-lg"
//                   >
//                     <Edit size={18} className="mr-2" /> Edit
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleUpdate}
//                     className="flex items-center px-5 py-2 bg-[#22C55E] text-white rounded-lg"
//                   >
//                     Save
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setLogoutConfirm(true)}
//                   className="flex items-center px-5 py-2 bg-[#F9A826] text-white rounded-lg"
//                 >
//                   <LogOut size={18} className="mr-2" /> Logout
//                 </button>
//                 <button
//                   onClick={() => setDeleteConfirm(true)}
//                   className="flex items-center px-5 py-2 bg-[#EF4444] text-white rounded-lg"
//                 >
//                   <Trash2 size={18} className="mr-2" /> Delete Account
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-2xl font-semibold mb-6 text-[#2D7D9A]">
//                 My Orders
//               </h2>
//               {orders.length === 0 ? (
//                 <p className="text-[#475569]">No orders found.</p>
//               ) : (
//                 <div className="grid gap-4">
//                   {orders.map((order) => (
//                     <div
//                       key={order._id}
//                       className="bg-white p-4 rounded-lg shadow border"
//                     >
//                       <p className="text-[#1E293B] font-semibold">
//                         Order #{order._id}
//                       </p>
//                       <p className="text-[#475569] text-sm">
//                         Status:{" "}
//                         <span
//                           className={`${
//                             order.status === "Delivered"
//                               ? "text-[#22C55E]"
//                               : "text-[#F9A826]"
//                           } font-medium`}
//                         >
//                           {order.status}
//                         </span>
//                       </p>
//                       <p className="text-[#64748B] text-sm">
//                         Items: {order.items?.length || 0}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Logout Modal */}
//       {logoutConfirm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-80">
//             <h3 className="text-lg font-semibold mb-3">Confirm Logout</h3>
//             <p className="text-sm mb-5 text-[#475569]">
//               Are you sure you want to logout?
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded-lg"
//                 onClick={() => setLogoutConfirm(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-[#F9A826] text-white rounded-lg"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Modal */}
//       {deleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-96">
//             <h3 className="text-lg font-semibold mb-3">Delete Account</h3>
//             <p className="text-sm text-[#475569] mb-3">
//               Type <span className="font-bold text-[#EF4444]">delete_{user.name}</span> to confirm.
//             </p>
//             <input
//               type="text"
//               value={deleteInput}
//               onChange={(e) => setDeleteInput(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg mb-4"
//               placeholder="Type here..."
//             />
//             <div className="flex justify-end space-x-3">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded-lg"
//                 onClick={() => setDeleteConfirm(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-[#EF4444] text-white rounded-lg"
//                 onClick={handleDeleteAccount}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6 mt-10">
//         <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
//         <p className="text-sm mt-1">Built with ❤️ by Your Team</p>
//       </footer>
//     </div>
//   );
// };

// export default ProfilePage;










// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ShoppingCart, User, Menu, Edit, LogOut, Trash2, Package, CheckCircle, AlertCircle, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // ============= UI COMPONENTS =============

// function Button({ children, variant = "default", size = "default", className = "", onClick, type = "button", disabled = false }) {
//   const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
//   const variants = {
//     default: "bg-slate-900 text-white hover:bg-slate-800",
//     gradient: "bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-lg",
//     outline: "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-700",
//     ghost: "hover:bg-slate-100 text-slate-700",
//     warning: "bg-yellow-500 text-white hover:bg-yellow-600",
//     danger: "bg-red-600 text-white hover:bg-red-700",
//     success: "bg-green-600 text-white hover:bg-green-700",
//   };
  
//   const sizes = {
//     default: "h-10 px-4 py-2",
//     sm: "h-9 px-3",
//     icon: "h-10 w-10",
//   };
  
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// function Input({ id, type = "text", placeholder, value, onChange, disabled, className = "" }) {
//   return (
//     <input
//       id={id}
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       disabled={disabled}
//       className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 ${className}`}
//     />
//   );
// }

// function Card({ children, className = "" }) {
//   return (
//     <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
//       {children}
//     </div>
//   );
// }

// // ============= NAVBAR COMPONENT =============

// function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div 
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <ShoppingCart className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-slate-900">ElectroBay</span>
//           </div>

//           <div className="hidden md:flex items-center gap-8">
//             <button 
//               onClick={() => navigate("/")}
//               className="text-slate-700 hover:text-slate-900 transition"
//             >
//               Home
//             </button>
//             <button 
//               onClick={() => navigate("/products")}
//               className="text-slate-700 hover:text-slate-900 transition"
//             >
//               Products
//             </button>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => navigate("/cart")}
//                 className="relative p-2 hover:bg-white/50 rounded-lg transition"
//               >
//                 <ShoppingCart size={24} className="text-slate-900" />
//               </button>
//               <button 
//                 onClick={() => navigate("/profile")}
//                 className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition"
//               >
//                 <User className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden text-slate-900"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-slate-200">
//             <div className="flex flex-col space-y-4">
//               <button 
//                 onClick={() => navigate("/")}
//                 className="text-slate-700 hover:text-slate-900 transition text-left"
//               >
//                 Home
//               </button>
//               <button 
//                 onClick={() => navigate("/products")}
//                 className="text-slate-700 hover:text-slate-900 transition text-left"
//               >
//                 Products
//               </button>
//               <button 
//                 onClick={() => navigate("/cart")}
//                 className="text-slate-700 hover:text-slate-900 transition text-left"
//               >
//                 Cart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// // ============= FOOTER COMPONENT =============

// function Footer() {
//   return (
//     <footer className="bg-slate-900 text-white py-12 mt-20">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <ShoppingCart className="w-6 h-6 text-white" />
//               </div>
//               <span>ElectroBay</span>
//             </div>
//             <p className="text-white/70">
//               Your trusted partner for all electronics and development needs.
//             </p>
//           </div>

//           <div>
//             <h4 className="mb-4 text-white">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a href="/" className="text-white/70 hover:text-white transition">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="/products" className="text-white/70 hover:text-white transition">
//                   Products
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Support
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="mb-4 text-white">Contact</h4>
//             <p className="text-white/70">support@ElectroBay.com</p>
//           </div>
//         </div>

//         <div className="border-t border-white/10 pt-8 text-center text-white/70">
//           <p>&copy; 2025 ElectroBay. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ============= MODAL COMPONENT =============

// function Modal({ isOpen, onClose, children, title }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <Card className="w-full max-w-md p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-slate-900">{title}</h3>
//           <button
//             onClick={onClose}
//             className="text-slate-400 hover:text-slate-600 transition"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         {children}
//       </Card>
//     </div>
//   );
// }

// // ============= MAIN COMPONENT =============

// const ProfilePage = () => {
//   const [user, setUser] = useState({});
//   const [orders, setOrders] = useState([]);
//   const [activeTab, setActiveTab] = useState("account");
//   const [isEditing, setIsEditing] = useState(false);
//   const [logoutConfirm, setLogoutConfirm] = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState(false);
//   const [deleteInput, setDeleteInput] = useState("");
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUser();
//     fetchOrders();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5000/api/user/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load user profile");
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put("http://localhost:5000/api/user/update", user, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsEditing(false);
//       setSuccessMsg("Profile updated successfully!");
//       setTimeout(() => setSuccessMsg(""), 3000);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const handleDeleteAccount = async () => {
//     if (deleteInput !== `delete_${user.name}`) {
//       setError("Text does not match!");
//       return;
//     }
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete("http://localhost:5000/api/user/delete", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       localStorage.removeItem("token");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete account");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-slate-50">
//       <Navbar />

//       {/* Main Content */}
//       <div className="flex-grow mt-16">
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid md:grid-cols-12 gap-6">
//             {/* Sidebar */}
//             <aside className="md:col-span-3">
//               <Card className="p-6">
//                 {/* User Avatar */}
//                 <div className="flex flex-col items-center mb-6">
//                   <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-2xl mb-3">
//                     {user.name?.charAt(0).toUpperCase() || "U"}
//                   </div>
//                   <h3 className="text-slate-900 text-center">{user.name}</h3>
//                   <p className="text-slate-600 text-sm text-center">{user.email}</p>
//                 </div>

//                 {/* Navigation */}
//                 <nav className="space-y-2">
//                   <button
//                     onClick={() => setActiveTab("account")}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
//                       activeTab === "account"
//                         ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
//                         : "text-slate-700 hover:bg-slate-100"
//                     }`}
//                   >
//                     <User className="w-5 h-5" />
//                     <span>Account Settings</span>
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("orders")}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
//                       activeTab === "orders"
//                         ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
//                         : "text-slate-700 hover:bg-slate-100"
//                     }`}
//                   >
//                     <Package className="w-5 h-5" />
//                     <span>My Orders</span>
//                   </button>
//                 </nav>
//               </Card>
//             </aside>

//             {/* Main Content */}
//             <main className="md:col-span-9">
//               <Card className="p-8">
//                 {/* Success/Error Messages */}
//                 {error && (
//                   <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
//                     <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//                     <p className="text-sm text-red-600">{error}</p>
//                   </div>
//                 )}
//                 {successMsg && (
//                   <div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 flex items-start gap-2">
//                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                     <p className="text-sm text-green-600">{successMsg}</p>
//                   </div>
//                 )}

//                 {/* Account Settings Tab */}
//                 {activeTab === "account" && (
//                   <div>
//                     <h2 className="mb-6 text-slate-900">Account Information</h2>

//                     <div className="space-y-4 max-w-2xl">
//                       {["name", "phone", "email", "address"].map((field) => (
//                         <div key={field}>
//                           <label className="block mb-2 text-slate-900 capitalize">
//                             {field}
//                           </label>
//                           <Input
//                             type="text"
//                             value={user[field] || ""}
//                             disabled={!isEditing}
//                             onChange={(e) => setUser({ ...user, [field]: e.target.value })}
//                           />
//                         </div>
//                       ))}
//                     </div>

//                     <div className="flex flex-wrap items-center gap-3 mt-8">
//                       {!isEditing ? (
//                         <Button
//                           onClick={() => setIsEditing(true)}
//                           variant="gradient"
//                         >
//                           <Edit size={18} className="mr-2" /> Edit Profile
//                         </Button>
//                       ) : (
//                         <>
//                           <Button
//                             onClick={handleUpdate}
//                             variant="success"
//                           >
//                             Save Changes
//                           </Button>
//                           <Button
//                             onClick={() => setIsEditing(false)}
//                             variant="outline"
//                           >
//                             Cancel
//                           </Button>
//                         </>
//                       )}
//                       <Button
//                         onClick={() => setLogoutConfirm(true)}
//                         variant="warning"
//                       >
//                         <LogOut size={18} className="mr-2" /> Logout
//                       </Button>
//                       <Button
//                         onClick={() => setDeleteConfirm(true)}
//                         variant="danger"
//                       >
//                         <Trash2 size={18} className="mr-2" /> Delete Account
//                       </Button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Orders Tab */}
//                 {activeTab === "orders" && (
//                   <div>
//                     <h2 className="mb-6 text-slate-900">My Orders</h2>
//                     {orders.length === 0 ? (
//                       <div className="text-center py-12">
//                         <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                         <p className="text-slate-600">No orders found.</p>
//                         <Button
//                           onClick={() => navigate("/products")}
//                           variant="gradient"
//                           className="mt-4"
//                         >
//                           Start Shopping
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="grid gap-4">
//                         {orders.map((order) => (
//                           <Card key={order._id} className="p-6 hover:shadow-lg transition-shadow">
//                             <div className="flex items-start justify-between mb-4">
//                               <div>
//                                 <h3 className="text-slate-900 mb-1">
//                                   Order #{order._id}
//                                 </h3>
//                                 <p className="text-slate-600 text-sm">
//                                   {order.items?.length || 0} item(s)
//                                 </p>
//                               </div>
//                               <span
//                                 className={`px-3 py-1 rounded-full text-sm ${
//                                   order.status === "Delivered"
//                                     ? "bg-green-100 text-green-700"
//                                     : order.status === "Shipped"
//                                     ? "bg-blue-100 text-blue-700"
//                                     : "bg-yellow-100 text-yellow-700"
//                                 }`}
//                               >
//                                 {order.status || "Pending"}
//                               </span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <p className="text-slate-500 text-sm">
//                                 {new Date(order.createdAt).toLocaleDateString()}
//                               </p>
//                               <Button variant="outline" size="sm">
//                                 View Details
//                               </Button>
//                             </div>
//                           </Card>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </Card>
//             </main>
//           </div>
//         </div>
//       </div>

//       {/* Logout Confirmation Modal */}
//       <Modal
//         isOpen={logoutConfirm}
//         onClose={() => setLogoutConfirm(false)}
//         title="Confirm Logout"
//       >
//         <p className="text-slate-600 mb-6">
//           Are you sure you want to logout?
//         </p>
//         <div className="flex justify-end gap-3">
//           <Button variant="outline" onClick={() => setLogoutConfirm(false)}>
//             Cancel
//           </Button>
//           <Button variant="warning" onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>
//       </Modal>

//       {/* Delete Account Confirmation Modal */}
//       <Modal
//         isOpen={deleteConfirm}
//         onClose={() => {
//           setDeleteConfirm(false);
//           setDeleteInput("");
//         }}
//         title="Delete Account"
//       >
//         <div className="space-y-4">
//           <p className="text-slate-600">
//             This action cannot be undone. Type{" "}
//             <span className="font-mono bg-slate-100 px-2 py-1 rounded text-red-600">
//               delete_{user.name}
//             </span>{" "}
//             to confirm.
//           </p>
//           <Input
//             type="text"
//             value={deleteInput}
//             onChange={(e) => setDeleteInput(e.target.value)}
//             placeholder="Type here..."
//           />
//           <div className="flex justify-end gap-3">
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setDeleteConfirm(false);
//                 setDeleteInput("");
//               }}
//             >
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDeleteAccount}>
//               Delete Account
//             </Button>
//           </div>
//         </div>
//       </Modal>

//       <Footer />
//     </div>
//   );
// };

// export default ProfilePage;














// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ShoppingCart,
  User,
  Menu,
  Edit,
  LogOut,
  Trash2,
  Package,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ----------------- Small UI building blocks ----------------- */
function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-lg",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-700",
    ghost: "hover:bg-slate-100 text-slate-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };
  const sizes = { default: "h-10 px-4 py-2", sm: "h-9 px-3", icon: "h-10 w-10" };
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

function Input({ id, type = "text", placeholder, value, onChange, disabled, className = "" }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100 ${className}`}
    />
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

/* ----------------- Navbar / Footer (unchanged UI) ----------------- */
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900">ElectroBay</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/")} className="text-slate-700 hover:text-slate-900 transition">
              Home
            </button>
            <button onClick={() => navigate("/products")} className="text-slate-700 hover:text-slate-900 transition">
              Products
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/cart")} className="relative p-2 hover:bg-white/50 rounded-lg transition">
                <ShoppingCart size={24} className="text-slate-900" />
              </button>
              <button onClick={() => navigate("/profile")} className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition">
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <button onClick={() => navigate("/")} className="text-slate-700 hover:text-slate-900 transition text-left">
                Home
              </button>
              <button onClick={() => navigate("/products")} className="text-slate-700 hover:text-slate-900 transition text-left">
                Products
              </button>
              <button onClick={() => navigate("/cart")} className="text-slate-700 hover:text-slate-900 transition text-left">
                Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

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
            <p className="text-white/70">Your trusted partner for all electronics and development needs.</p>
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

/* ----------------- Modal ----------------- */
function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </Card>
    </div>
  );
}

/* ----------------- Profile Page ----------------- */
const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NOTE: use relative URLs + withCredentials so same-origin or proxy works
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/profile", { withCredentials: true });
      const u = res.data?.user ?? res.data;
      setUser(u || {});
    } catch (err) {
      console.error("fetchUser error:", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        // unauthenticated -> redirect to login
        navigate("/auth");
        return;
      }
      setError("Failed to load user profile");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders", { withCredentials: true });
      setOrders(res.data || []);
    } catch (err) {
      console.error("fetchOrders error:", err);
      // don't show a blocking error for orders
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/api/user/update", user, { withCredentials: true });
      setIsEditing(false);
      setSuccessMsg("Profile updated successfully!");
      await fetchUser();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("handleUpdate error:", err);
      setError("Failed to update profile");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.warn("logout error:", err);
    } finally {
      setUser({});
      navigate("/");
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== `delete_${user.name}`) {
      setError("Text does not match!");
      return;
    }
    try {
      await axios.delete("/api/user/delete", { withCredentials: true });
      setUser({});
      navigate("/");
    } catch (err) {
      console.error("handleDeleteAccount error:", err);
      setError("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-grow mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <aside className="md:col-span-3">
              <Card className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-2xl mb-3">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <h3 className="text-slate-900 text-center">{user.name}</h3>
                  <p className="text-slate-600 text-sm text-center">{user.email}</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("account")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeTab === "account"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeTab === "orders"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    <span>My Orders</span>
                  </button>
                </nav>
              </Card>
            </aside>

            {/* Main */}
            <main className="md:col-span-9">
              <Card className="p-8">
                {error && (
                  <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                {successMsg && (
                  <div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-600">{successMsg}</p>
                  </div>
                )}

                {activeTab === "account" && (
                  <div>
                    <h2 className="mb-6 text-slate-900">Account Information</h2>

                    <div className="space-y-4 max-w-2xl">
                      {["name", "phone", "email", "address"].map((field) => (
                        <div key={field}>
                          <label className="block mb-2 text-slate-900 capitalize">{field}</label>
                          <Input
                            type="text"
                            value={user[field] || ""}
                            disabled={!isEditing}
                            onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-8">
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} variant="gradient">
                          <Edit size={18} className="mr-2" /> Edit Profile
                        </Button>
                      ) : (
                        <>
                          <Button onClick={handleUpdate} variant="success">
                            Save Changes
                          </Button>
                          <Button onClick={() => setIsEditing(false)} variant="outline">
                            Cancel
                          </Button>
                        </>
                      )}

                      <Button onClick={() => setLogoutConfirm(true)} variant="warning">
                        <LogOut size={18} className="mr-2" /> Logout
                      </Button>

                      <Button onClick={() => setDeleteConfirm(true)} variant="danger">
                        <Trash2 size={18} className="mr-2" /> Delete Account
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div>
                    <h2 className="mb-6 text-slate-900">My Orders</h2>
                    {(!orders || orders.length === 0) ? (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600">No orders found.</p>
                        <Button onClick={() => navigate("/products")} variant="gradient" className="mt-4">
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {orders.map((order) => (
                          <Card key={order._id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-slate-900 mb-1">Order #{order._id}</h3>
                                <p className="text-slate-600 text-sm">{order.items?.length || 0} item(s)</p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {order.status || "Pending"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-slate-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </main>
          </div>
        </div>
      </div>

      {/* Logout Confirmation */}
      <Modal isOpen={logoutConfirm} onClose={() => setLogoutConfirm(false)} title="Confirm Logout">
        <p className="text-slate-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setLogoutConfirm(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={deleteConfirm}
        onClose={() => {
          setDeleteConfirm(false);
          setDeleteInput("");
        }}
        title="Delete Account"
      >
        <div className="space-y-4">
          <p className="text-slate-600">
            This action cannot be undone. Type{" "}
            <span className="font-mono bg-slate-100 px-2 py-1 rounded text-red-600">delete_{user.name}</span> to confirm.
          </p>
          <Input type="text" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} placeholder="Type here..." />
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteConfirm(false);
                setDeleteInput("");
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default ProfilePage;
