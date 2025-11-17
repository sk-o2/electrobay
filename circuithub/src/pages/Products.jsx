
// // src/pages/ProductPage.jsx
// import React, { useState, useEffect, useRef } from "react";
// import api from "../utils/api";
// import { Search, Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// api.defaults.withCredentials = true;

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showCategories, setShowCategories] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const { user } = useAuth ? useAuth() : { user: null }; // graceful if context missing

//   const categories = [
//     "Microcontrollers",
//     "Sensors",
//     "Modules & Shields",
//     "Actuators & Motors",
//     "Power & Batteries",
//     "Cables & Connectors",
//     "Prototyping & Accessories",
//     "Tools & Equipment",
//   ];

//   // Fetch products from backend (relative path)
//   const fetchProducts = async (category = "", sort = "", search = "") => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
//       if (category) params.append("category", category);
//       if (sort) params.append("sort", sort);
//       if (search) params.append("search", search);

//       const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`;
//       const res = await api.get(url, { headers: { "Cache-Control": "no-store" } });
//       // support both array and { data: [...] } shapes
//       const payload = res.data?.data ?? res.data;
//       setProducts(Array.isArray(payload) ? payload : []);
//       setError(null);
//     } catch (err) {
//       console.error("fetchProducts error:", err);
//       setError("Failed to fetch products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch whenever category, sort, or search changes
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchProducts(selectedCategory, sortOption, searchTerm);
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [selectedCategory, sortOption, searchTerm]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//         setShowFilters(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Add to Cart Function — POST to backend, backend infers user from cookie
//   const handleAddToCart = async (productId) => {
//     try {
//       const res = await api.post("/api/cart/add", { productId, quantity: 1 });
//       // success — you can show a toast or alert; keeping alert to preserve theme
//       alert("Added to cart!");
//     } catch (err) {
//       console.error("handleAddToCart error:", err);
//       // If not authenticated, server should return 401 or 403 — redirect to auth page
//       const status = err?.response?.status;
//       if (status === 401 || status === 403) {
//         // go to auth/login page
//         navigate("/auth");
//         return;
//       }
//       // other errors
//       const msg = err?.response?.data?.error || "Failed to add product to cart.";
//       alert(msg);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-6 py-4 bg-[#F1F5F9] shadow-md relative">
//         {/* Logo */}
//         <div
//           className="font-bold text-xl text-[#2D7D9A] cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           CircuitHub
//         </div>

//         {/* Search bar */}
//         <div className="flex-1 mx-4 hidden sm:flex items-center bg-white rounded-full px-4 py-2 border border-[#E2E8F0]">
//           <Search className="text-[#64748B] mr-2" size={18} />
//           <input
//             type="text"
//             placeholder="Search components..."
//             className="bg-transparent outline-none w-full text-[#1E293B]"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
//           {/* Categories */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 setShowCategories(!showCategories);
//                 setShowFilters(false);
//               }}
//               className="flex items-center font-medium text-[#1E293B] hover:text-[#3BA8C8]"
//             >
//               Categories <ChevronDown size={18} className="ml-1" />
//             </button>
//             {showCategories && (
//               <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E8F0] rounded-lg shadow-md z-10">
//                 <div
//                   onClick={() => {
//                     setSelectedCategory("");
//                     setShowCategories(false);
//                   }}
//                   className={`px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer ${
//                     selectedCategory === "" ? "bg-[#F9A826]/30 font-semibold" : ""
//                   } text-[#1E293B]`}
//                 >
//                   All Products
//                 </div>
//                 {categories.map((cat, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => {
//                       setSelectedCategory(cat);
//                       setShowCategories(false);
//                     }}
//                     className={`px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer ${
//                       selectedCategory === cat ? "bg-[#F9A826]/30 font-semibold" : ""
//                     } text-[#1E293B]`}
//                   >
//                     {cat}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Filters */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 setShowFilters(!showFilters);
//                 setShowCategories(false);
//               }}
//               className="flex items-center font-medium text-[#1E293B] hover:text-[#3BA8C8]"
//             >
//               Filters <ChevronDown size={18} className="ml-1" />
//             </button>
//             {showFilters && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-md z-10">
//                 <div
//                   className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
//                   onClick={() => {
//                     setSortOption("price-asc");
//                     setShowFilters(false);
//                   }}
//                 >
//                   Price: Low to High
//                 </div>
//                 <div
//                   className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
//                   onClick={() => {
//                     setSortOption("price-desc");
//                     setShowFilters(false);
//                   }}
//                 >
//                   Price: High to Low
//                 </div>
//                 <div
//                   className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
//                   onClick={() => {
//                     setSortOption("newest");
//                     setShowFilters(false);
//                   }}
//                 >
//                   Newest First
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <button
//             className="relative"
//             onClick={() => navigate("/cart")}
//           >
//             <ShoppingCart size={26} className="text-[#2D7D9A] hover:text-[#3BA8C8]" />
//           </button>
//         </div>

//         {/* Hamburger menu */}
//         <div className="md:hidden ml-4 flex items-center space-x-3">
//           <button onClick={() => navigate("/cart")}>
//             <ShoppingCart size={26} className="text-[#2D7D9A]" />
//           </button>
//           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//             {mobileMenuOpen ? <X size={28} color="#2D7D9A" /> : <Menu size={28} color="#2D7D9A" />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-lg border-b z-20">
//           <div className="px-4 py-4 space-y-2">
//             {/* Mobile search */}
//             <div className="flex items-center bg-[#F8FAFC] rounded-full px-3 py-2 mb-2 border border-[#E2E8F0]">
//               <Search className="text-[#64748B] mr-2" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="bg-transparent outline-none w-full text-[#1E293B] text-sm"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Product Grid */}
//       <section className="flex-grow px-4 sm:px-8 py-10">
//         <h2 className="text-2xl font-bold text-[#2D7D9A] mb-6">
//           {selectedCategory || "All Products"}
//         </h2>

//         {loading ? (
//           <p className="text-[#64748B] text-lg animate-pulse">Loading products...</p>
//         ) : error ? (
//           <p className="text-[#EF4444] text-lg">{error}</p>
//         ) : products.length === 0 ? (
//           <p className="text-[#64748B] text-lg">No products found.</p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => {
//               const images = product.images || (product.image ? [product.image] : []);
//               const imgSrc = images[0] || `https://via.placeholder.com/400x240?text=${encodeURIComponent(product.name || "Product")}`;
//               return (
//                 <div
//                   key={product._id}
//                   className="bg-[#FFFFFF] rounded-2xl shadow-md hover:shadow-lg border border-[#E2E8F0] transition p-4 flex flex-col"
//                 >
//                   <img
//                     src={imgSrc}
//                     alt={product.name}
//                     className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer"
//                     onClick={() => navigate(`/product/${product._id}`)}
//                   />
//                   <h3 className="font-semibold text-[#1E293B] text-lg">{product.name}</h3>
//                   <p className="text-[#64748B] text-sm">{product.category}</p>
//                   {product.stock > 0 ? (
//                     <p className="text-[#22C55E] font-semibold mt-1">In Stock</p>
//                   ) : (
//                     <p className="text-[#EF4444] font-semibold mt-1">Out of Stock</p>
//                   )}
//                   <p className="text-[#2D7D9A] font-bold mt-2">${product.price}</p>

//                   <div className="mt-3 flex flex-col space-y-2">
//                     <button
//                       onClick={() => handleAddToCart(product._id)}
//                       className="w-full bg-[#F9A826] text-[#1E293B] py-2 rounded-lg hover:bg-[#3BA8C8] transition"
//                     >
//                       Add to Cart
//                     </button>
//                     <button
//                       onClick={() => navigate(`/product/${product._id}`)}
//                       className="w-full bg-[#3BA8C8] text-white py-2 rounded-lg hover:bg-[#2D7D9A] transition"
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6 mt-10">
//         <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
//         <p className="text-sm mt-1">Built with ❤️ by Your Team</p>
//       </footer>
//     </div>
//   );
// };

// export default ProductPage;





















// // src/pages/ProductPage.jsx
// import React, { useState, useEffect, useRef } from "react";
// import api from "../utils/api";
// import { Search, Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import ProductCard from "../components/ProductCard";

// api.defaults.withCredentials = true;

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showCategories, setShowCategories] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const { user } = useAuth ? useAuth() : { user: null };

//   // Added "Projects" and "Kits"
//   const categories = [
//     "Microcontrollers",
//     "Sensors",
//     "Modules & Shields",
//     "Actuators & Motors",
//     "Power & Batteries",
//     "Cables & Connectors",
//     "Prototyping & Accessories",
//     "Tools & Equipment",
//     "Projects",
//     "Kits",
//   ];

//   // Fetch products from backend (relative path)
//   const fetchProducts = async (category = "", sort = "", search = "") => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
//       if (category) params.append("category", category);
//       if (sort) params.append("sort", sort);
//       if (search) params.append("search", search);

//       const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`;
//       const res = await api.get(url, { headers: { "Cache-Control": "no-store" } });
//       const payload = res.data?.data ?? res.data;
//       setProducts(Array.isArray(payload) ? payload : []);
//       setError(null);
//     } catch (err) {
//       console.error("fetchProducts error:", err);
//       setError("Failed to fetch products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       fetchProducts(selectedCategory, sortOption, searchTerm);
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [selectedCategory, sortOption, searchTerm]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowCategories(false);
//         setShowFilters(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleAddToCart = async (productId) => {
//     try {
//       const res = await api.post("/api/cart/add", { productId, quantity: 1 });
//       alert("Added to cart!");
//     } catch (err) {
//       console.error("handleAddToCart error:", err);
//       const status = err?.response?.status;
//       if (status === 401 || status === 403) {
//         navigate("/auth");
//         return;
//       }
//       const msg = err?.response?.data?.error || "Failed to add product to cart.";
//       alert(msg);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
//       {/* Glass Navbar */}
//       <nav className="flex items-center justify-between px-6 py-4 bg-white/20 backdrop-blur-md border-b border-white/10 relative z-30">
//         {/* Logo */}
//         <div
//           className="font-bold text-xl text-[#2D7D9A] cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           CircuitHub
//         </div>

//         {/* Search bar */}
//         <div className="flex-1 mx-4 hidden sm:flex items-center bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-[#E2E8F0]/60">
//           <Search className="text-[#64748B] mr-2" size={18} />
//           <input
//             type="text"
//             placeholder="Search components..."
//             className="bg-transparent outline-none w-full text-[#1E293B]"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
//           {/* Categories */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 setShowCategories(!showCategories);
//                 setShowFilters(false);
//               }}
//               className="flex items-center font-medium text-[#1E293B] hover:text-[#3BA8C8]"
//             >
//               Categories <ChevronDown size={18} className="ml-1" />
//             </button>
//             {showCategories && (
//               <div className="absolute right-0 mt-2 w-56 bg-white/90 border border-[#E2E8F0] rounded-lg shadow-md z-10">
//                 <div
//                   onClick={() => {
//                     setSelectedCategory("");
//                     setShowCategories(false);
//                   }}
//                   className={`px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer ${
//                     selectedCategory === "" ? "bg-[#F9A826]/30 font-semibold" : ""
//                   } text-[#1E293B]`}
//                 >
//                   All Products
//                 </div>
//                 {categories.map((cat, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => {
//                       setSelectedCategory(cat);
//                       setShowCategories(false);
//                     }}
//                     className={`px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer ${
//                       selectedCategory === cat ? "bg-[#F9A826]/30 font-semibold" : ""
//                     } text-[#1E293B]`}
//                   >
//                     {cat}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Filters */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 setShowFilters(!showFilters);
//                 setShowCategories(false);
//               }}
//               className="flex items-center font-medium text-[#1E293B] hover:text-[#3BA8C8]"
//             >
//               Filters <ChevronDown size={18} className="ml-1" />
//             </button>
//             {showFilters && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-md z-10">
//                 <div
//                   className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
//                   onClick={() => {
//                     setSortOption("price-asc");
//                     setShowFilters(false);
//                   }}
//                 >
//                   Price: Low to High
//                 </div>
//                 <div
//                   className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
//                   onClick={() => {
//                     setSortOption("price-desc");
//                     setShowFilters(false);
//                   }}
//                 >
//                   Price: High to Low
//                 </div>
//                 <div
//                   className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
//                   onClick={() => {
//                     setSortOption("newest");
//                     setShowFilters(false);
//                   }}
//                 >
//                   Newest First
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Cart Icon */}
//           <button
//             className="relative"
//             onClick={() => navigate("/cart")}
//             aria-label="Go to cart"
//           >
//             <ShoppingCart size={26} className="text-[#2D7D9A] hover:text-[#3BA8C8]" />
//           </button>
//         </div>

//         {/* Hamburger menu */}
//         <div className="md:hidden ml-4 flex items-center space-x-3">
//           <button onClick={() => navigate("/cart")}>
//             <ShoppingCart size={26} className="text-[#2D7D9A]" />
//           </button>
//           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//             {mobileMenuOpen ? <X size={28} color="#2D7D9A" /> : <Menu size={28} color="#2D7D9A" />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white/95 shadow-lg border-b z-20">
//           <div className="px-4 py-4 space-y-3">
//             {/* Mobile search */}
//             <div className="flex items-center bg-[#F8FAFC] rounded-full px-3 py-2 border border-[#E2E8F0]">
//               <Search className="text-[#64748B] mr-2" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="bg-transparent outline-none w-full text-[#1E293B] text-sm"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             <div className="pt-1">
//               <div className="text-sm font-medium text-[#1E293B] mb-2">Categories</div>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => {
//                     setSelectedCategory("");
//                     setMobileMenuOpen(false);
//                   }}
//                   className={`px-3 py-1 rounded-md text-sm border ${selectedCategory === "" ? "bg-[#F9A826] text-[#1E293B]" : "bg-white"}`}
//                 >
//                   All
//                 </button>
//                 {categories.map((cat) => (
//                   <button
//                     key={cat}
//                     onClick={() => {
//                       setSelectedCategory(cat);
//                       setMobileMenuOpen(false);
//                     }}
//                     className={`px-3 py-1 rounded-md text-sm border ${selectedCategory === cat ? "bg-[#F9A826] text-[#1E293B]" : "bg-white"}`}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Product Grid */}
//       <section className="flex-grow px-4 sm:px-8 py-10">
//         <h2 className="text-2xl font-bold text-[#2D7D9A] mb-6">
//           {selectedCategory || "All Products"}
//         </h2>

//         {loading ? (
//           <p className="text-[#64748B] text-lg animate-pulse">Loading products...</p>
//         ) : error ? (
//           <p className="text-[#EF4444] text-lg">{error}</p>
//         ) : products.length === 0 ? (
//           <p className="text-[#64748B] text-lg">No products found.</p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//                 onAdd={() => handleAddToCart(product._id)}
//                 onView={() => navigate(`/product/${product._id}`)}
//               />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6 mt-10">
//         <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
//         <p className="text-sm mt-1">Built with ❤️ by Your Team</p>
//       </footer>
//     </div>
//   );
// };

// export default ProductPage;














// src/pages/ProductPage.jsx
import React, { useState, useEffect, useRef } from "react";
import api from "../utils/api";
import { Search, Menu, X, ChevronDown, ShoppingCart, User, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

api.defaults.withCredentials = true;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCategories, setShowCategories] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth ? useAuth() : { user: null };

  const categories = [
    "Microcontrollers",
    "Sensors",
    "Modules & Shields",
    "Actuators & Motors",
    "Power & Batteries",
    "Cables & Connectors",
    "Prototyping & Accessories",
    "Tools & Equipment",
    "Projects",
    "Kits",
  ];

  const fetchProducts = async (category = "", sort = "", search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (sort) params.append("sort", sort);
      if (search) params.append("search", search);

      const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await api.get(url, { headers: { "Cache-Control": "no-store" } });
      const payload = res.data?.data ?? res.data;
      setProducts(Array.isArray(payload) ? payload : []);
      setError(null);
    } catch (err) {
      console.error("fetchProducts error:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts(selectedCategory, sortOption, searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [selectedCategory, sortOption, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const res = await api.post("/api/cart/add", { productId, quantity: 1 });
      alert("Added to cart!");
    } catch (err) {
      console.error("handleAddToCart error:", err);
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        navigate("/auth");
        return;
      }
      const msg = err?.response?.data?.error || "Failed to add product to cart.";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Glassmorphic Navbar - matching home.jsx */}
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
                ElectroHub
              </span>
            </div>

            {/* Search bar - Desktop */}
            <div className="flex-1 mx-4 hidden md:flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200">
              <Search className="text-slate-500 mr-2" size={18} />
              <input
                type="text"
                placeholder="Search components..."
                className="bg-transparent outline-none w-full text-slate-900 placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCategories(!showCategories);
                    setShowFilters(false);
                  }}
                  className="flex items-center font-medium text-slate-700 hover:text-slate-900 transition"
                >
                  Categories <ChevronDown size={18} className="ml-1" />
                </button>
                {showCategories && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    <div
                      onClick={() => {
                        setSelectedCategory("");
                        setShowCategories(false);
                      }}
                      className={`px-4 py-3 hover:bg-slate-100 cursor-pointer transition ${
                        selectedCategory === "" ? "bg-slate-100 font-semibold" : ""
                      } text-slate-900`}
                    >
                      All Products
                    </div>
                    {categories.map((cat, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowCategories(false);
                        }}
                        className={`px-4 py-3 hover:bg-slate-100 cursor-pointer transition ${
                          selectedCategory === cat ? "bg-slate-100 font-semibold" : ""
                        } text-slate-900`}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filters Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowFilters(!showFilters);
                    setShowCategories(false);
                  }}
                  className="flex items-center font-medium text-slate-700 hover:text-slate-900 transition"
                >
                  Sort <ChevronDown size={18} className="ml-1" />
                </button>
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    <div
                      className="px-4 py-3 hover:bg-slate-100 cursor-pointer transition text-slate-900"
                      onClick={() => {
                        setSortOption("price-asc");
                        setShowFilters(false);
                      }}
                    >
                      Price: Low to High
                    </div>
                    <div
                      className="px-4 py-3 hover:bg-slate-100 cursor-pointer transition text-slate-900"
                      onClick={() => {
                        setSortOption("price-desc");
                        setShowFilters(false);
                      }}
                    >
                      Price: High to Low
                    </div>
                    <div
                      className="px-4 py-3 hover:bg-slate-100 cursor-pointer transition text-slate-900"
                      onClick={() => {
                        setSortOption("newest");
                        setShowFilters(false);
                      }}
                    >
                      Newest First
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3">
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

              {/* Cart Icon */}
              <button
                className="relative p-2 hover:bg-white/50 rounded-lg transition"
                onClick={() => navigate("/cart")}
                aria-label="Go to cart"
              >
                <ShoppingCart size={24} className="text-slate-900" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden ml-4 flex items-center gap-3">
              <button 
                onClick={() => navigate("/cart")}
                className="relative"
              >
                <ShoppingCart size={24} className="text-slate-900" />
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <div className="space-y-4">
                {/* Mobile Search */}
                <div className="flex items-center bg-white/60 rounded-lg px-3 py-2 border border-slate-200">
                  <Search className="text-slate-500 mr-2" size={16} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-slate-900 text-sm placeholder:text-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Mobile Categories */}
                <div>
                  <div className="text-sm font-medium text-slate-900 mb-2">Categories</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSelectedCategory("");
                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm border transition ${
                        selectedCategory === "" 
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-transparent" 
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setMobileMenuOpen(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm border transition ${
                          selectedCategory === cat 
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-transparent" 
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile User Menu */}
                <div className="pt-2 border-t border-white/20">
                  {!user ? (
                    <div className="flex flex-col gap-2">
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
                    </div>
                  ) : (
                    <button className="flex items-center gap-2 text-slate-700">
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

      {/* Product Grid */}
      <section className="flex-grow px-4 sm:px-8 py-10 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              {selectedCategory || "All Products"}
            </h1>
            <p className="text-slate-600">
              {loading ? "Loading..." : `${products.length} products found`}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 text-lg">Loading products...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">No products found.</p>
              <button 
                onClick={() => {
                  setSelectedCategory("");
                  setSearchTerm("");
                }}
                className="mt-4 px-6 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAdd={() => handleAddToCart(product._id)}
                  onView={() => navigate(`/product/${product._id}`)}
                />
              ))}
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
                <span className="font-bold text-xl">ElectroHub</span>
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
                  <a href="/" className="text-white/70 hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.slice(0, 5).map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-white/70 hover:text-white transition text-left"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/70">
            <p>&copy; {new Date().getFullYear()} ElectroHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;

