// //home.jsx
// import { AnimatePresence, motion } from "framer-motion";
// import { useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ShoppingCart,
//   User,
//   Menu,
//   ChevronLeft,
//   ChevronRight,
//   LogIn,
//   UserPlus,
//   Star,
//   Facebook,
//   Twitter,
//   Instagram,
//   Mail,
//   Send,
//   Sparkles,
//   TrendingUp,
//   Award,
//   X,
// } from "lucide-react";
// import { Toaster, toast } from "sonner";
// import emailjs from "@emailjs/browser";
// import { useAuth } from "../context/AuthContext";

// // Vite env vars
// const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
// const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
// const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// // initialize EmailJS (safe to call in client)
// if (EMAILJS_PUBLIC_KEY) {
//   try {
//     emailjs.init(EMAILJS_PUBLIC_KEY);
//   } catch (e) {
//     // ignore init errors (send will still work when passing key)
//     // console.warn("EmailJS init failed", e);
//   }
// }

// // ============= UI COMPONENTS (Standalone) =============

// function Button({ children, variant = "default", size = "default", className = "", onClick, type = "button", disabled = false }) {
//   const baseStyles = "inline-flex items-center justify-center rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-medium";
//   const variants = {
//     default: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105",
//     outline: "border-2 border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-slate-300 hover:shadow-md",
//     ghost: "hover:bg-white/10 backdrop-blur-sm",
//   };
//   const sizes = {
//     default: "h-11 px-6 py-2.5",
//     sm: "h-9 px-4 text-sm",
//     icon: "h-11 w-11",
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

// function Card({ children, className = "" }) {
//   return (
//     <div className={`rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 ${className}`}>
//       {children}
//     </div>
//   );
// }

// function Input({ id, type = "text", placeholder, value, onChange, required, className = "" }) {
//   return (
//     <input
//       id={id}
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       required={required}
//       className={`flex h-12 w-full rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//     />
//   );
// }

// function Textarea({ id, placeholder, value, onChange, rows = 3, required, className = "" }) {
//   return (
//     <textarea
//       id={id}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       rows={rows}
//       required={required}
//       className={`flex w-full rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${className}`}
//     />
//   );
// }

// function Avatar({ children, className = "" }) {
//   return (
//     <div className={`relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-lg ${className}`}>
//       {children}
//     </div>
//   );
// }

// function AvatarFallback({ children, className = "" }) {
//   return (
//     <div className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 ${className}`}>
//       {children}
//     </div>
//   );
// }

// // ============= PAGE COMPONENTS =============

// // Navbar Component
// function Navbar({
//   onCategoriesClick = () => {},
//   onProjectsClick = () => {},
//   onLearnClick = () => {},
//   onAuthRedirect = () => {},

// }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();

//   const handleNavAndClose = (handler) => {
//     handler();
//     setMobileMenuOpen(false);
//   };
//   const categoriesRef = useRef(null);
//   const scrollToCategories = () => {
//     categoriesRef.current.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border-b border-white/20 shadow-lg">
//       <Toaster richColors />
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-20">
//           <div className="flex items-center gap-3 group cursor-pointer">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
//               <ShoppingCart className="w-6 h-6 text-white" />
//             </div>
//             <img src={electro} alt="ElectroBay Logo" className="h-8 w-auto" />
//           </div>

//           <div className="hidden md:flex items-center gap-2">
//             {/* <button
//               className="text-white/90 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
//               // onClick={()=> navigate("/category")
//               // onClick={onCategoriesClick}
//               onClick={() => {
//     document
//       .getElementById("categories")
//       .scrollIntoView({ behavior: "smooth" });
//   }}
//             >
//               Categories
//             </button> */}
//             <button
//             className="text-black hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
//   onClick={() => {

//     document
//       .getElementById("categories")
//       .scrollIntoView({ behavior: "smooth" });
//   }}
// >
//   Categories
// </button>

//             <button
//               className="text-black hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
//               onClick={onLearnClick}
//             >
//               Learn
//             </button>
//             <button
//               className="text-black hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
//               onClick={onProjectsClick}
//             >
//               Projects
//             </button>
//             <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
//               {/* <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-white/90 hover:text-white"
//                 onClick={() => onAuthRedirect()}
//               >
//                 Sign Up
//               </Button>
//               <Button
//                 size="sm"
//                 className="shadow-lg shadow-blue-500/30"
//                 onClick={() => onAuthRedirect()}
//               >
//                 <User className="w-4 h-4 mr-2" />
//                 Login
//               </Button> */}
//               {!user ? (
//                               <>
//                                 <button
//                                   onClick={() => navigate("/auth")}
//                                   className="flex items-center gap-2 text-black hover:text-white transition"
//                                 >
//                                   <LogIn className="w-4 h-4" />
//                                   <span>Login</span>
//                                 </button>
//                                 <button
//                                   onClick={() => navigate("/auth")}
//                                   className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-black rounded-lg hover:shadow-lg transition"
//                                 >
//                                   <UserPlus className="w-4 h-4" />
//                                   <span>Sign Up</span>
//                                 </button>
//                               </>
//                             ) : (
//                               <button onClick={() => navigate("/profile")} className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition">
//                                 <User className="w-4 h-4" />
//                                 <span>{user.name}</span>
//                               </button>
//                             )}
//             </div>
//           </div>
//         {/* Mobile toggle button */}
//           {/* <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <Menu className="w-6 h-6" />
//           </Button> */}
//           <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//                           {mobileMenuOpen ? (
//                             <X size={28} className="text-slate-900" />
//                           ) : (
//                             <Menu size={28} className="text-slate-900" />
//                           )}
//                         </button>
//         </div>

//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="md:hidden py-6 border-t border-white/20"
//           >
//             <div className="flex flex-col space-y-2">
//               {/* <button
//                 className="text-white/90 hover:text-white transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/10"
//                 onClick={() => handleNavAndClose(onCategoriesClick)}
//               >
//                 Categories
//               </button> */}
//               <button
//               className="text-white/90 hover:text-white transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/10"
//   onClick={() => {
//     setMobileMenuOpen(false);
//     document
//       .getElementById("categories")
//       .scrollIntoView({ behavior: "smooth" });
//   }}
// >
//   Categories
// </button>

//               <button
//                 className="text-white/90 hover:text-white transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/10"
//                 onClick={() => handleNavAndClose(onLearnClick)}
//               >
//                 Learn
//               </button>
//               <button
//                 className="text-white/90 hover:text-white transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/10"
//                 onClick={() => handleNavAndClose(onProjectsClick)}
//               >
//                 Projects
//               </button>
//               <div className="flex flex-col gap-3 pt-4 border-t border-white/20 mt-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-white/90 hover:text-white justify-start"
//                   onClick={() => handleNavAndClose(onAuthRedirect)}
//                 >
//                   Sign Up
//                 </Button>
//                 <Button
//                   size="sm"
//                   className="justify-start shadow-lg shadow-blue-500/30"
//                   onClick={() => handleNavAndClose(onAuthRedirect)}
//                 >
//                   <User className="w-4 h-4 mr-2" />
//                   Login
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </nav>
//   );
// }

// // Hero Banner Component
// function HeroBanner() {
//   return (
//     // <div className="relative h-[550px] md:h-[700px] overflow-hidden">
//     <div className="relative h-[550px] md:h-[700px] overflow-hidden overflow-x-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url('https://images.unsplash.com/photo-1761078739233-629de9252840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2lyY3VpdCUyMGRhcmt8ZW58MXx8fHwxNzY1MDIzNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/90 to-slate-900/95" />
//         <div className="absolute inset-0">
//           <div className="absolute top-10 md:top-20 left-10 md:left-20 w-40 md:w-64 h-40 md:h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
//           <div className="absolute bottom-20 md:bottom-32 right-20 md:right-32 w-64 md:w-96 h-64 md:h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//           <div className="absolute top-1/2 left-1/3 w-48 md:w-72 h-48 md:h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
//         </div>
//       </div>

//       <div className="relative container mx-auto px-4 h-full flex items-center">
//         <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="z-10"
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-6 md:mb-8 shadow-xl"
//             >
//               <Sparkles className="w-3.5 md:w-4 h-3.5 md:h-4 text-yellow-300 animate-pulse" />
//               <span className="text-white text-xs md:text-sm">New Products Added Weekly</span>
//             </motion.div>

//             <h1 className="mb-4 md:mb-6 text-white text-3xl md:text-5xl lg:text-6xl leading-tight">
//               Build Your Next
//               <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
//                 Innovation
//               </span>
//             </h1>

//             <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-xl">
//               Discover cutting-edge electronics components, development kits, and tools to bring your creative projects to life with professional quality.
//             </p>

//             <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
//               <Button size="default" className="shadow-2xl shadow-blue-500/50 text-base md:text-lg px-6 md:px-8 h-12 md:h-14">
//                 <ShoppingCart className="w-4 md:w-5 h-4 md:h-5 mr-2" />
//                 Explore Products
//               </Button>
//               {/* <Button variant="outline" size="default" className="text-white border-2 border-white/40 hover:bg-white/20 backdrop-blur-md text-base md:text-lg px-6 md:px-8 h-12 md:h-14">
//                 <TrendingUp className="w-4 md:w-5 h-4 md:h-5 mr-2" />
//                 View Projects
//               </Button> */}
//             </div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1 }}
//               className="flex items-center gap-4 md:gap-8 mt-8 md:mt-12"
//             >
//               <div className="text-center">
//                 <div className="text-white text-xl md:text-3xl mb-1">100+</div>
//                 <div className="text-white/70 text-xs md:text-sm">Products</div>
//               </div>
//               <div className="w-px h-8 md:h-12 bg-white/20" />
//               <div className="text-center">
//                 <div className="text-white text-xl md:text-3xl mb-1">1k+</div>
//                 <div className="text-white/70 text-xs md:text-sm">Customers</div>
//               </div>
//               <div className="w-px h-8 md:h-12 bg-white/20" />
//               <div className="text-center">
//                 <div className="text-white text-xl md:text-3xl mb-1">4.4★</div>
//                 <div className="text-white/70 text-xs md:text-sm">Rating</div>
//               </div>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="hidden md:block relative"
//           >
//             <div className="relative w-full h-[350px] lg:h-[400px]">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl transform rotate-6" />
//               <div className="absolute inset-0 bg-gradient-to-tl from-purple-400/20 to-cyan-400/20 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl transform -rotate-3" />
//               <div className="absolute inset-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl flex items-center justify-center overflow-hidden">
//                 <img
//                   src="https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
//                   alt="Electronics"
//                   className="w-full h-full object-cover opacity-80"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Categories Section Component
// function CategoriesSection() {
//   const categories = [
//     { id: 1, name: "Microcontrollers", image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", color: "from-blue-500 to-cyan-500", icon: "🔧" },
//     { id: 2, name: "Single Board Computers", image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", color: "from-purple-500 to-pink-500", icon: "💻" },
//     { id: 3, name: "Sensors", image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", color: "from-blue-500 to-indigo-500", icon: "📡" },
//     { id: 4, name: "Motors & Actuators", image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", color: "from-purple-500 to-blue-500", icon: "⚙️" },
//     { id: 5, name: "LED & Displays", image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", color: "from-cyan-500 to-blue-500", icon: "💡" },
//     { id: 6, name: "Components", image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", color: "from-indigo-500 to-purple-500", icon: "🔌" },
//     { id: 7, name: "IoT Devices", image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", color: "from-blue-500 to-purple-500", icon: "🌐" },
//     { id: 8, name: "Circuit Boards", image: "https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", color: "from-purple-500 to-indigo-500", icon: "🎛️" },
//   ];

//   // const goToProducts = () => {
//   //   window.location.href = "/products";
//   // };
//   const goToProducts = (categoryName) => {
//   const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
//   window.location.href = `/products?category=${slug}`;
// };

//   return (
//     // <section id="categories-section" className="py-16 md:py-24 container mx-auto px-4 relative">
//     <section id="categories" className="py-16 md:py-24 container mx-auto px-4 relative">

//       <div className="absolute top-10 right-10 + w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-10 left-10 + w-64 h-64 md:w-96 md:h-96 bg-purple-500/5 rounded-full blur-3xl" />
//       {/* w-96 h-96 */}
//       <div className="text-center mb-12 md:mb-16 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 mb-4 md:mb-6 shadow-lg backdrop-blur-sm">
//             <Sparkles className="w-4 h-4 text-blue-600" />
//             <span className="text-slate-700 text-xs md:text-sm">Browse Our Collection</span>
//           </div>
//           <h2 className="mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent px-4">Shop by Category</h2>
//           <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto px-4">
//             Explore our comprehensive range of electronics components and find exactly what you need
//           </p>
//         </motion.div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 relative z-10">
//         {categories.map((category, index) => (
//           <motion.div
//             key={category.id}
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.4, delay: index * 0.05 }}
//             viewport={{ once: true }}
//           >
//             <div
//               className="relative overflow-hidden cursor-pointer group h-full"
//               // onClick={goToProducts}
//               onClick={() => goToProducts(category.name)}

//             >
//               <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white via-slate-50 to-white border-2 border-slate-200/50 group-hover:border-slate-300/70 transition-all duration-500 shadow-lg group-hover:shadow-2xl" />

//               <div className="relative p-3 md:p-6 h-full flex flex-col">
//                 <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4 relative shadow-md group-hover:shadow-xl transition-shadow duration-500">
//                   <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-10`} />
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-md rounded-lg md:rounded-xl flex items-center justify-center shadow-lg z-20 text-base md:text-xl">
//                     {category.icon}
//                   </div>
//                 </div>

//                 <div className="flex-1 flex flex-col justify-center text-center">
//                   <h3 className="text-slate-900 group-hover:text-blue-600 transition-colors duration-300 text-sm md:text-base lg:text-lg mb-1 md:mb-2 leading-snug">{category.name}</h3>
//                   <div className={`w-8 md:w-12 h-0.5 md:h-1 rounded-full bg-gradient-to-r ${category.color} mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// // Projects Section Component
// function ProjectsSection() {
//   const scrollContainerRef = useRef(null);

//   const projects = [
//     { id: 1, name: "Arduino Starter Kit", price: "$49.99", image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "Best Seller", color: "from-blue-500 to-cyan-500", stock: "In Stock" },
//     { id: 2, name: "Raspberry Pi 4 Kit", price: "$89.99", image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "Popular", color: "from-purple-500 to-pink-500", stock: "In Stock" },
//     { id: 3, name: "Sensor Bundle Pack", price: "$34.99", image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "New", color: "from-green-500 to-emerald-500", stock: "In Stock" },
//     { id: 4, name: "Robotics Starter Kit", price: "$129.99", image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "Premium", color: "from-orange-500 to-amber-500", stock: "In Stock" },
//     { id: 5, name: "LED Matrix Display", price: "$24.99", image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "Hot", color: "from-red-500 to-rose-500", stock: "In Stock" },
//     { id: 6, name: "IoT Development Kit", price: "$79.99", image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", badge: "Trending", color: "from-indigo-500 to-purple-500", stock: "In Stock" },
//   ];

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 340;
//       scrollContainerRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const goToProducts = () => {
//     window.location.href = "/products";
//   };

//   return (
//     <section id="projects-section" className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
//       <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
//           <div className="flex-1">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200/50 mb-4 shadow-lg backdrop-blur-sm">
//               <TrendingUp className="w-4 h-4 text-purple-600" />
//               <span className="text-slate-700 text-sm">Curated Collections</span>
//             </div>
//             <h2 className="mb-3 text-4xl md:text-5xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Featured Projects & Kits</h2>
//             <p className="text-slate-600 text-lg max-w-2xl">Complete kits with everything you need to jumpstart your next innovation</p>
//           </div>
//           <div className="flex gap-3">
//             <Button variant="outline" size="icon" onClick={() => scroll("left")} className="hover:scale-110 shadow-md">
//               <ChevronLeft className="w-5 h-5" />
//             </Button>
//             <Button variant="outline" size="icon" onClick={() => scroll("right")} className="hover:scale-110 shadow-md">
//               <ChevronRight className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>

//         <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto overscroll-x-contain scrollbar-hide scroll-smooth pb-6" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.08 }}
//               viewport={{ once: true }}
//               // className="min-w-[320px]"
//               className="min-w-[280px] sm:min-w-[320px]"

//             >
//               <div
//                 className="relative overflow-hidden cursor-pointer group h-full rounded-3xl bg-white border-2 border-slate-200/50 hover:border-slate-300/70 transition-all duration-500 shadow-lg hover:shadow-2xl"
//                 onClick={goToProducts}
//               >
//                 <div className="aspect-square overflow-hidden relative rounded-t-3xl">
//                   <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 z-10`} />

//                   <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
//                     <span className={`px-4 py-1.5 bg-gradient-to-r ${project.color} text-white text-xs rounded-full shadow-xl backdrop-blur-sm`}>
//                       {project.badge}
//                     </span>
//                     <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg">
//                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                       <span className="text-xs text-slate-700">{project.stock}</span>
//                     </div>
//                   </div>

//                   <img
//                     src={project.image}
//                     alt={project.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />

//                   <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div>
//                     <h3 className="text-slate-900 group-hover:text-blue-600 transition-colors duration-300 mb-2 text-lg">{project.name}</h3>
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
//                         ))}
//                       </div>
//                       <span className="text-sm text-slate-500">(4.8)</span>
//                       <span className="text-xs text-slate-400 ml-auto">256 reviews</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between pt-2 border-t border-slate-100">
//                     <div>
//                       <div className="text-xs text-slate-500 mb-1">Starting at</div>
//                       <div className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{project.price}</div>
//                     </div>
//                     <Button
//                       size="sm"
//                       className="shadow-lg group-hover:shadow-xl transition-all duration-300"
//                       onClick={goToProducts}
//                     >
//                       <ShoppingCart className="w-4 h-4 mr-2" />
//                       Add to Cart
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // Reviews Section Component
// function ReviewsSection() {
//   const reviews = [
//     { id: 1, name: "Sarah Johnson", avatar: "SJ", rating: 5, comment: "Amazing quality products! The Arduino kit helped me complete my university project with excellent documentation.", role: "Engineering Student" },
//     { id: 2, name: "Michael Chen", avatar: "MC", rating: 5, comment: "Fast shipping and excellent customer service. The team really knows their products. Highly recommended!", role: "Hobbyist" },
//     { id: 3, name: "Emily Rodriguez", avatar: "ER", rating: 4, comment: "Great selection of components. Found everything I needed for my IoT project in one place.", role: "IoT Developer" },
//     { id: 4, name: "David Thompson", avatar: "DT", rating: 5, comment: "Best electronics store online! The tutorials and documentation are super helpful for beginners.", role: "Maker" },
//     { id: 5, name: "Lisa Wang", avatar: "LW", rating: 5, comment: "Quality products at competitive prices. My go-to store for all electronics needs. Never disappointed!", role: "Robotics Engineer" },
//     { id: 6, name: "James Miller", avatar: "JM", rating: 4, comment: "Impressive range of products and very reliable shipping. Will definitely order again for my next project.", role: "Tech Enthusiast" },
//   ];
//   const [activeReview, setActiveReview] = useState(0);
//   return (
//     <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden relative">
//       <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
//       <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 mb-4 shadow-lg">
//               <Award className="w-4 h-4 text-blue-600" />
//               <span className="text-slate-700 text-sm">Trusted by thousands</span>
//             </div>
//             <h2 className="mb-4">What Our Customers Say</h2>
//             <p className="text-slate-600 max-w-2xl mx-auto">
//               Join thousands of satisfied makers, engineers, and hobbyists who trust ElectroBay
//             </p>
//           </motion.div>
//         </div>
//         {/* Mobile Floating Bubbles */}
// <div className=" md:hidden relative h-[360px]">
//   {reviews.map((review, index) => (
//     <motion.div
//       key={review.id}
//       className="absolute"
//       initial={{
//         x: Math.random() * 260,
//         y: Math.random() * 260,
//       }}
//       animate={{
//         x: Math.random() * 260,
//         y: Math.random() * 260,
//       }}
//       transition={{
//         duration: 8 + Math.random() * 6,
//         repeat: Infinity,
//         repeatType: "mirror",
//         ease: "easeInOut",
//       }}
//       onClick={() => setActiveReview(review)}
//     >
//       <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-xl active:scale-95">
//         {review.avatar}
//       </div>
//     </motion.div>
//   ))}
// </div>

//         <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {reviews.map((review, index) => (
//             <motion.div
//               key={review.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Card className="p-6 h-full hover:scale-105 transition-all duration-300 group">
//                 <div className="flex items-start gap-4 mb-4">
//                   <Avatar>
//                     <AvatarFallback className="text-white">{review.avatar}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <h4 className="text-slate-900">{review.name}</h4>
//                     <p className="text-sm text-slate-500">{review.role}</p>
//                     <div className="flex gap-1 mt-2">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`} />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-slate-600 leading-relaxed">{review.comment}</p>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <AnimatePresence>
//   {activeReview && (
//     <motion.div
//       className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={() => setActiveReview(null)}
//     >
//       <motion.div
//         className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
//         initial={{ scale: 0.8, y: 40 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.8, y: 40 }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center gap-4 mb-4">
//           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold">
//             {activeReview.avatar}
//           </div>
//           <div>
//             <h4 className="text-slate-900">{activeReview.name}</h4>
//             <p className="text-sm text-slate-500">{activeReview.role}</p>
//           </div>
//         </div>

//         <div className="flex gap-1 mb-3">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               className={`w-4 h-4 ${
//                 i < activeReview.rating
//                   ? "fill-yellow-400 text-yellow-400"
//                   : "text-slate-300"
//               }`}
//             />
//           ))}
//         </div>

//         <p className="text-slate-600 leading-relaxed">
//           {activeReview.comment}
//         </p>
//       </motion.div>
//     </motion.div>
//   )}
// </AnimatePresence>

//     </section>
//   );
// }

// // Contact Section Component (EmailJS)
// function ContactSection() {
//   const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
//   const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
//   const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

//   const OWNER_EMAIL = "electrobay.here@gmail.com"; // fallback used in mailto

//   const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "", address: "", project: "" });
//   const [submitting, setSubmitting] = useState(false);

//   const validate = () => {
//     if (!formData.name.trim()) { toast.error("Please enter your name."); return false; }
//     if (!formData.email.trim()) { toast.error("Please enter your email."); return false; }
//     if (!formData.whatsapp.trim()) { toast.error("Please enter your WhatsApp number."); return false; }
//     if (!formData.project.trim()) { toast.error("Please describe what you want to make."); return false; }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSubmitting(true);

//     const payload = {
//       name: formData.name,
//       email: formData.email,
//       whatsapp: formData.whatsapp,
//       address: formData.address || "",
//       project: formData.project,
//       submittedAt: new Date().toISOString(),
//     };

//     try {
//       const templateParams = {
//         name: payload.name,
//         email: payload.email,
//         whatsapp: payload.whatsapp,
//         address: payload.address,
//         project: payload.project,
//         submittedAt: payload.submittedAt,
//       };

//       // send via EmailJS (public key already initialized above)
//       await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

//       toast.success("Request sent — we'll contact you soon!");
//       setFormData({ name: "", email: "", whatsapp: "", address: "", project: "" });
//     } catch (err) {
//       console.error("EmailJS send error:", err);
//       // fallback to mailto
//       try {
//         const subject = encodeURIComponent("New project inquiry from ElectroBay website");
//         const body = encodeURIComponent(
//           `Name: ${payload.name}\nEmail: ${payload.email}\nWhatsApp: ${payload.whatsapp}\nAddress: ${payload.address}\nProject details:\n${payload.project}\n\nSubmitted at: ${payload.submittedAt}`
//         );
//         window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
//         toast.success("Opened your email client to send the message (fallback).");
//         setFormData({ name: "", email: "", whatsapp: "", address: "", project: "" });
//       } catch (mailErr) {
//         toast.error("Couldn't send message. Please try again later.");
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="py-20 bg-white relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50" />
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="mb-4">Can't Find Your Project?</h2>
//             <p className="text-slate-600 max-w-2xl mx-auto">
//               Tell us what you're building and we'll help you source the perfect components
//             </p>
//           </motion.div>
//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <Card className="max-w-3xl mx-auto p-8 md:p-10">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block mb-2 text-slate-900">Full Name</label>
//                   <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block mb-2 text-slate-900">Email Address</label>
//                   <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="whatsapp" className="block mb-2 text-slate-900">WhatsApp Number</label>
//                   <Input id="whatsapp" type="text" placeholder="+91 98765 43210" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} required />
//                 </div>

//                 <div>
//                   <label htmlFor="address" className="block mb-2 text-slate-900">Location (Optional)</label>
//                   <Input id="address" type="text" placeholder="City, Country" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="project" className="block mb-2 text-slate-900">Project Description</label>
//                 <Textarea id="project" placeholder="Tell us about your project requirements, timeline, and any specific components you're looking for..." value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} rows={6} required />
//               </div>

//               <Button type="submit" className="w-full h-12 shadow-xl shadow-blue-500/30" disabled={submitting}>
//                 {submitting ? (
//                   "Sending..."
//                 ) : (
//                   <>
//                     <Send className="w-5 h-5 mr-2" />
//                     Submit Request
//                   </>
//                 )}
//               </Button>
//             </form>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // Footer Component
// function Footer() {
//   return (
//     <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
//           <div>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <ShoppingCart className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xl">ElectroBay</span>
//             </div>
//             <p className="text-white/70 leading-relaxed">Your trusted partner for all electronics and development needs. Building the future, one component at a time.</p>
//           </div>

//           <div>
//             <h4 className="mb-6 text-white">Quick Links</h4>
//             <ul className="space-y-3">
//               <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
//                 <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all duration-300" />
//                 About Us
//               </a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
//                 <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all duration-300" />
//                 Shop
//               </a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
//                 <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all duration-300" />
//                 Blog
//               </a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
//                 <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all duration-300" />
//                 Support
//               </a></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="mb-6 text-white">Top Categories</h4>
//             <ul className="space-y-3">
//               <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
//                 <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all duration-300" />
//                 Microcontrollers
//               </a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
//                 <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all duration-300" />
//                 Sensors
//               </a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
//                 <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all duration-300" />
//                 Development Kits
//               </a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
//                 <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all duration-300" />
//                 Components
//               </a></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="mb-6 text-white">Stay Connected</h4>
//             <div className="flex gap-3 mb-6">
//               <a href="#" className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a href="#" className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a href="#" className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
//                 <Mail className="w-5 h-5" />
//               </a>
//             </div>
//             <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
//               <p className="text-white/70 text-sm mb-1">Email Support</p>
//               <p className="text-white">electrobay.here@gmail.com</p>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-white/10 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-white/70 text-sm">&copy; 2025 ElectroBay. All rights reserved.</p>
//             <div className="flex gap-6 text-sm">
//               <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Privacy Policy</a>
//               <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Terms of Service</a>
//               <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Cookie Policy</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ============= MAIN HOME COMPONENT =============
// export default function Home() {
//   const categoriesRef = useRef(null);
//   const projectsRef = useRef(null);

//   // now redirect to /products for categories/projects
//   const goToProducts = () => {
//     window.location.href = "/products";
//   };
//   const scrollToCategories = () => {
//     categoriesRef.current.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   const showLearnUnderDev = () => {
//     toast("Under development — coming soon!", { description: "We're building new tutorials and guides." });
//   };

//   const redirectToAuth = () => {
//     window.location.href = "/auth";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
//       <HeroBanner />
//       <Navbar
//         // onCategoriesClick={scrollToCategories}
//         onProjectsClick={goToProducts}
//         onLearnClick={showLearnUnderDev}
//         onAuthRedirect={redirectToAuth}
//       />
//       <main>
//         <CategoriesSection ref={categoriesRef} />
//         <ProjectsSection ref={projectsRef} />
//         <ReviewsSection />
//         <ContactSection />
//       </main>
//       <Footer />
//     </div>
//   );
// }

//home.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogIn,
  UserPlus,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Send,
  Sparkles,
  TrendingUp,
  Award,
  X,
} from "lucide-react";
import electro from "../assets/electro.png";
import { Toaster, toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useAuth } from "../context/AuthContext";
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const hoverFloat = {
  whileHover: {
    y: -6,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 },
  },
};

// Vite env vars
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// initialize EmailJS (safe to call in client)
if (EMAILJS_PUBLIC_KEY) {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } catch (e) {
    // ignore init errors (send will still work when passing key)
    // console.warn("EmailJS init failed", e);
  }
}

// ============= UI COMPONENTS (Standalone) =============

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
    "inline-flex items-center justify-center rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-medium";
  const variants = {
    default:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105",
    outline:
      "border-2 border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-slate-300 hover:shadow-md",
    ghost: "hover:bg-white/10 backdrop-blur-sm",
  };
  const sizes = {
    default: "h-11 px-6 py-2.5",
    sm: "h-9 px-4 text-sm",
    icon: "h-11 w-11",
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

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  className = "",
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`flex h-12 w-full rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

function Textarea({
  id,
  placeholder,
  value,
  onChange,
  rows = 3,
  required,
  className = "",
}) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
      className={`flex w-full rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${className}`}
    />
  );
}

function Avatar({ children, className = "" }) {
  return (
    <div
      className={`relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

function AvatarFallback({ children, className = "" }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 ${className}`}
    >
      {children}
    </div>
  );
}

// ============= PAGE COMPONENTS =============

// Navbar Component
function Navbar({
  onCategoriesClick = () => {},
  onProjectsClick = () => {},
  onLearnClick = () => {},
  onAuthRedirect = () => {},
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleNavAndClose = (handler) => {
    handler();
    setMobileMenuOpen(false);
  };
  const categoriesRef = useRef(null);
  const scrollToCategories = () => {
    categoriesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border-b border-white/20 shadow-lg">
      <Toaster richColors />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <img src={electro} alt="ElectroBay Logo" className="h-8 w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {/* <button
              className="text-white/90 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
              // onClick={()=> navigate("/category")
              // onClick={onCategoriesClick}
              onClick={() => {
    document
      .getElementById("categories")
      .scrollIntoView({ behavior: "smooth" });
  }}
            >
              Categories
            </button> */}
            <button
              className="text-black hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
              onClick={() => {
                document
                  .getElementById("categories")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Categories
            </button>

            <button
              className="text-black hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
              onClick={onLearnClick}
            >
              Learn
            </button>
            <button
              className="text-black hover:text-white transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
              onClick={() => navigate("/products")}
            >
              Components
            </button>
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
              {/* <Button
                variant="ghost"
                size="sm"
                className="text-white/90 hover:text-white"
                onClick={() => onAuthRedirect()}
              >
                Sign Up
              </Button>
              <Button
                size="sm"
                className="shadow-lg shadow-blue-500/30"
                onClick={() => onAuthRedirect()}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button> */}
              {!user ? (
                <>
                  <button
                    onClick={() => navigate("/auth")}
                    className="flex items-center gap-2 text-black hover:text-white transition"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => navigate("/auth")}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-black rounded-lg hover:shadow-lg transition"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </button>
              )}
            </div>
          </div>
          {/* Mobile toggle button */}
          {/* <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button> */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={28} className="text-slate-900" />
            ) : (
              <Menu size={28} className="text-slate-900" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-6 border-t border-white/20"
          >
            <div className="flex flex-col space-y-2">
              {/* <button
                className="text-white/90 hover:text-white transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/10"
                onClick={() => handleNavAndClose(onCategoriesClick)}
              >
                Categories
              </button> */}
              <button
                className="text-white/90 hover:text-white transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/10"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document
                    .getElementById("categories")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                Categories
              </button>

              <button
                className="text-white/90 hover:text-white transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/10"
                onClick={() => handleNavAndClose(onLearnClick)}
              >
                Learn
              </button>
              <button
                className="text-white/90 hover:text-white transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/10"
                onClick={() => handleNavAndClose(onProjectsClick)}
              >
                Components
              </button>
              {/* <div className="flex flex-col gap-3 pt-4 border-t border-white/20 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/90 hover:text-white justify-start"
                  onClick={() => handleNavAndClose(onAuthRedirect)}
                >
                  Sign Up
                </Button>
                <Button
                  size="sm"
                  className="justify-start shadow-lg shadow-blue-500/30"
                  onClick={() => handleNavAndClose(onAuthRedirect)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div> */}
              {!user ? (
                <>
                  <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/90 hover:text-white justify-start"
                  onClick={() => handleNavAndClose(onAuthRedirect)}
                >
                  Sign Up
                </Button>
                <Button
                  size="sm"
                  className="justify-start shadow-lg shadow-blue-500/30"
                  onClick={() => handleNavAndClose(onAuthRedirect)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/profile")}
                  className="text-white/90 hover:text-white transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/10"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

// Hero Banner Component
function HeroBanner() {
  return (
    // <div className="relative h-[550px] md:h-[700px] overflow-hidden">
    <div className="relative h-[550px] md:h-[700px] overflow-hidden overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1761078739233-629de9252840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2lyY3VpdCUyMGRhcmt8ZW58MXx8fHwxNzY1MDIzNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-purple-600/90 to-slate-900/95" />
        <div className="absolute inset-0">
          <div className="absolute top-10 md:top-20 left-10 md:left-20 w-40 md:w-64 h-40 md:h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 md:bottom-32 right-20 md:right-32 w-64 md:w-96 h-64 md:h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-48 md:w-72 h-48 md:h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-6 md:mb-8 shadow-xl"
            >
              <Sparkles className="w-3.5 md:w-4 h-3.5 md:h-4 text-yellow-300 animate-pulse" />
              <span className="text-white text-xs md:text-sm">
                New Products Added Weekly
              </span>
            </motion.div>

            {/* <h1 className="mb-4 md:mb-6 text-white text-3xl md:text-5xl lg:text-6xl leading-tight">
              Build Your Next
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1> */}
            <motion.h1
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="mb-4 md:mb-6 text-white text-3xl md:text-5xl lg:text-6xl leading-tight"
            >
              <motion.span variants={fadeUp} className="block">
                Build Your Next
              </motion.span>
              <motion.span
                variants={fadeUp}
                className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
              >
                Innovation
              </motion.span>
            </motion.h1>

            <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-xl">
              Discover cutting-edge electronics components, development kits,
              and tools to bring your creative projects to life with
              professional quality.
            </p>

            {/* <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
              <Button size="default" className="shadow-2xl shadow-blue-500/50 text-base md:text-lg px-6 md:px-8 h-12 md:h-14">
                <ShoppingCart className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Explore Products
              </Button>
              <Button variant="outline" size="default" className="text-white border-2 border-white/40 hover:bg-white/20 backdrop-blur-md text-base md:text-lg px-6 md:px-8 h-12 md:h-14">
                <TrendingUp className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                View Projects
              </Button>
            </div> */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div variants={fadeUp} {...hoverFloat}>
                <Button>Explore Products</Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4 md:gap-8 mt-8 md:mt-12"
            >
              <div className="text-center">
                <div className="text-white text-xl md:text-3xl mb-1">100+</div>
                <div className="text-white/70 text-xs md:text-sm">Products</div>
              </div>
              <div className="w-px h-8 md:h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-white text-xl md:text-3xl mb-1">1k+</div>
                <div className="text-white/70 text-xs md:text-sm">
                  Customers
                </div>
              </div>
              <div className="w-px h-8 md:h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-white text-xl md:text-3xl mb-1">4.4★</div>
                <div className="text-white/70 text-xs md:text-sm">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block relative"
          >
            <div className="relative w-full h-[350px] lg:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-400/20 to-cyan-400/20 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl transform -rotate-3" />
              <div className="absolute inset-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                  alt="Electronics"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Categories Section Component
function CategoriesSection() {
  const categories = [
    {
      id: 1,
      name: "Microcontrollers",
      image:
        "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "from-blue-500 to-cyan-500",
      icon: "🔧",
    },
    {
      id: 2,
      name: "Single Board Computers",
      image:
        "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "from-purple-500 to-pink-500",
      icon: "💻",
    },
    {
      id: 3,
      name: "Sensors",
      image:
        "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "from-blue-500 to-indigo-500",
      icon: "📡",
    },
    {
      id: 4,
      name: "Motors & Actuators",
      image:
        "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "from-purple-500 to-blue-500",
      icon: "⚙️",
    },
    {
      id: 5,
      name: "LED & Displays",
      image:
        "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "from-cyan-500 to-blue-500",
      icon: "💡",
    },
    {
      id: 6,
      name: "Components",
      image:
        "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "from-indigo-500 to-purple-500",
      icon: "🔌",
    },
    {
      id: 7,
      name: "IoT Devices",
      image:
        "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "from-blue-500 to-purple-500",
      icon: "🌐",
    },
    {
      id: 8,
      name: "Circuit Boards",
      image:
        "https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "from-purple-500 to-indigo-500",
      icon: "🎛️",
    },
  ];

  // const goToProducts = () => {
  //   window.location.href = "/products";
  // };
  const goToProducts = (categoryName) => {
    const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
    window.location.href = `/products?category=${slug}`;
  };

  return (
    // <section id="categories-section" className="py-16 md:py-24 container mx-auto px-4 relative">
    <section
      id="categories"
      className="py-16 md:py-24 container mx-auto px-4 relative"
    >
      <div className="absolute top-10 right-10 + w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 + w-64 h-64 md:w-96 md:h-96 bg-purple-500/5 rounded-full blur-3xl" />
      {/* w-96 h-96 */}
      <div className="text-center mb-12 md:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 mb-4 md:mb-6 shadow-lg backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-slate-700 text-xs md:text-sm">
              Browse Our Collection
            </span>
          </div>
          <h2 className="mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent px-4">
            Shop by Category
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto px-4">
            Explore our comprehensive range of electronics components and find
            exactly what you need
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 relative z-10">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            // initial={{ opacity: 0, scale: 0.9 }}
            // whileInView={{ opacity: 1, scale: 1 }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div
              className="relative overflow-hidden cursor-pointer group h-full"
              // onClick={goToProducts}
              onClick={() => goToProducts(category.name)}
            >
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white via-slate-50 to-white border-2 border-slate-200/50 group-hover:border-slate-300/70 transition-all duration-500 shadow-lg group-hover:shadow-2xl" />

              <div className="relative p-3 md:p-6 h-full flex flex-col">
                <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4 relative shadow-md group-hover:shadow-xl transition-shadow duration-500">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-10`}
                  />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-md rounded-lg md:rounded-xl flex items-center justify-center shadow-lg z-20 text-base md:text-xl">
                    {category.icon}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center text-center">
                  <h3 className="text-slate-900 group-hover:text-blue-600 transition-colors duration-300 text-sm md:text-base lg:text-lg mb-1 md:mb-2 leading-snug">
                    {category.name}
                  </h3>
                  <div
                    className={`w-8 md:w-12 h-0.5 md:h-1 rounded-full bg-gradient-to-r ${category.color} mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection() {
  const scrollContainerRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: "Arduino Starter Kit",
      price: "₹499",
      image:
        "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      badge: "Best Seller",
      color: "from-blue-500 to-cyan-500",
      stock: "In Stock",
    },
    {
      id: 2,
      name: "Raspberry Pi ",
      price: "₹4499",
      image:
        "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      badge: "Popular",
      color: "from-purple-500 to-pink-500",
      stock: "In Stock",
    },
    {
      id: 3,
      name: "Sensor Bundle Pack",
      price: "₹499",
      image:
        "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      badge: "New",
      color: "from-green-500 to-emerald-500",
      stock: "In Stock",
    },
    {
      id: 4,
      name: "Robotics Starter Kit",
      price: "₹1999",
      image:
        "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      badge: "Premium",
      color: "from-orange-500 to-amber-500",
      stock: "In Stock",
    },
    {
      id: 5,
      name: "LED Matrix Display",
      price: "₹399",
      image:
        "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      badge: "Hot",
      color: "from-red-500 to-rose-500",
      stock: "In Stock",
    },
    {
      id: 6,
      name: "IoT Development Kit",
      price: "₹799",
      image:
        "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      badge: "Trending",
      color: "from-indigo-500 to-purple-500",
      stock: "In Stock",
    },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const goToProducts = () => {
    window.location.href = "/products";
  };

  return (
    <section
      id="projects-section"
      className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden"
    >
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200/50 mb-4 shadow-lg backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-slate-700 text-sm">
                Curated Collections
              </span>
            </div>
            <h2 className="mb-3 text-4xl md:text-5xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Featured Projects & Kits
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl">
              Complete kits with everything you need to jumpstart your next
              innovation
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="hover:scale-110 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="hover:scale-110 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto overscroll-x-contain scrollbar-hide scroll-smooth pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              // className="min-w-[320px]"
              className="min-w-[280px] sm:min-w-[320px]"
            >
              <div
                className="relative overflow-hidden cursor-pointer group h-full rounded-3xl bg-white border-2 border-slate-200/50 hover:border-slate-300/70 transition-all duration-500 shadow-lg hover:shadow-2xl"
                onClick={goToProducts}
              >
                <div className="aspect-square overflow-hidden relative rounded-t-3xl">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 z-10`}
                  />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <span
                      className={`px-4 py-1.5 bg-gradient-to-r ${project.color} text-white text-xs rounded-full shadow-xl backdrop-blur-sm`}
                    >
                      {project.badge}
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-slate-700">
                        {project.stock}
                      </span>
                    </div>
                  </div>

                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-slate-900 group-hover:text-blue-600 transition-colors duration-300 mb-2 text-lg">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-500">(4.8)</span>
                      <span className="text-xs text-slate-400 ml-auto">
                        256 reviews
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">
                        Starting at
                      </div>
                      <div className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {project.price}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="shadow-lg group-hover:shadow-xl transition-all duration-300"
                      onClick={goToProducts}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Reviews Section Component
function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "Naina Sharma",
      avatar: "NS",
      rating: 5,
      comment:
        "Amazing quality products! The Arduino kit helped me complete my university project with excellent documentation.",
      role: "Engineering Student",
    },
    {
      id: 2,
      name: "Gajraj Singh",
      avatar: "GS",
      rating: 5,
      comment:
        "Fast shipping and excellent customer service. The team really knows their products. Highly recommended!",
      role: "Hobbyist",
    },
    {
      id: 3,
      name: "Prabhash ",
      avatar: "PR",
      rating: 4,
      comment:
        "Great selection of components. Found everything I needed for my IoT project in one place.",
      role: "IoT Developer",
    },
    {
      id: 4,
      name: "Devendra Mishra",
      avatar: "DM",
      rating: 5,
      comment:
        "Best electronics store online! The tutorials and documentation are super helpful for beginners.",
      role: "Maker",
    },
    {
      id: 5,
      name: "Devansh Sahu",
      avatar: "DS",
      rating: 5,
      comment:
        "Quality products at competitive prices. My go-to store for all electronics needs. Never disappointed!",
      role: "Bulk Seller",
    },
    {
      id: 6,
      name: "Shivani Pathak",
      avatar: "SP",
      rating: 4,
      comment:
        "Impressive range of products and very reliable shipping. Will definitely order again for my next project.",
      role: "Tech Enthusiast",
    },
  ];
  const [activeReview, setActiveReview] = useState(0);
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-hidden relative">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 mb-4 shadow-lg">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700 text-sm">
                Trusted by thousands
              </span>
            </div>
            <h2 className="mb-4">What Our Customers Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Join hundreds of satisfied students, engineers, and hobbyists who
              trust ElectroBay
            </p>
          </motion.div>
        </div>
        {/* Mobile Floating Bubbles */}
        <div className=" md:hidden relative h-[360px]">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="absolute"
              initial={{
                x: Math.random() * 260,
                y: Math.random() * 260,
              }}
              // animate={{
              //   x: Math.random() * 260,
              //   y: Math.random() * 260,
              // }}
              // transition={{
              //   duration: 8 + Math.random() * 6,
              //   repeat: Infinity,
              //   repeatType: "mirror",
              //   ease: "easeInOut",
              // }}
              animate={{
                x: [120, Math.random() * 350, 0],
                y: [200, Math.random() * 350, 0],
              }}
              // transition={{
              //   duration: 10 + Math.random() * 6,
              //   repeat: Infinity,
              //   ease: "easeInOut",
              // }}
              transition={{
                duration: 10 + Math.random() * 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              onClick={() => setActiveReview(review)}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-xl active:scale-95">
                {review.avatar}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:scale-105 transition-all duration-300 group">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback className="text-white">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-slate-900">{review.name}</h4>
                    <p className="text-sm text-slate-500">{review.role}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {review.comment}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {activeReview && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReview(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold">
                  {activeReview.avatar}
                </div>
                <div>
                  <h4 className="text-slate-900">{activeReview.name}</h4>
                  <p className="text-sm text-slate-500">{activeReview.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < activeReview.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                {activeReview.comment}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Contact Section Component (EmailJS)
function ContactSection() {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const OWNER_EMAIL = "electrobay.here@gmail.com"; // fallback used in mailto

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    address: "",
    project: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return false;
    }
    if (!formData.whatsapp.trim()) {
      toast.error("Please enter your WhatsApp number.");
      return false;
    }
    if (!formData.project.trim()) {
      toast.error("Please describe what you want to make.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      address: formData.address || "",
      project: formData.project,
      submittedAt: new Date().toISOString(),
    };

    try {
      const templateParams = {
        name: payload.name,
        email: payload.email,
        whatsapp: payload.whatsapp,
        address: payload.address,
        project: payload.project,
        submittedAt: payload.submittedAt,
      };

      // send via EmailJS (public key already initialized above)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      toast.success("Request sent — we'll contact you soon!");
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        address: "",
        project: "",
      });
    } catch (err) {
      console.error("EmailJS send error:", err);
      // fallback to mailto
      try {
        const subject = encodeURIComponent(
          "New project inquiry from ElectroBay website",
        );
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nWhatsApp: ${payload.whatsapp}\nAddress: ${payload.address}\nProject details:\n${payload.project}\n\nSubmitted at: ${payload.submittedAt}`,
        );
        window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
        toast.success(
          "Opened your email client to send the message (fallback).",
        );
        setFormData({
          name: "",
          email: "",
          whatsapp: "",
          address: "",
          project: "",
        });
      } catch (mailErr) {
        toast.error("Couldn't send message. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Can't Find Your Project?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Tell us what you're building and we'll help you source the perfect
              components
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-3xl mx-auto p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-slate-900">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="electrobay"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-slate-900">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="electrobay@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block mb-2 text-slate-900"
                  >
                    WhatsApp Number
                  </label>
                  <Input
                    id="whatsapp"
                    type="text"
                    placeholder="+91 ***** *****"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-slate-900"
                  >
                    Location (Optional)
                  </label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="City, Country"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project" className="block mb-2 text-slate-900">
                  Project Description
                </label>
                <Textarea
                  id="project"
                  placeholder="Tell us about your project requirements, timeline, and any specific components you're looking for..."
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                  rows={6}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 shadow-xl shadow-blue-500/30"
                disabled={submitting}
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              {/* <span className="text-xl">ElectroBay</span> */}
              <img src={electro} alt="ElectroBay Logo" className="h-8 w-auto" />
            </div>
            <p className="text-white/70 leading-relaxed">
              Your trusted partner for all electronics and development needs.
              Building the future, one component at a time.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all duration-300" />
                  About Us
                </a>
              </li>
              <li onClick={() => navigate("/products")}>
                <a className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all duration-300" />
                  Shop
                </a>
              </li>
              {/* <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all duration-300" />
                Blog
              </a></li> */}
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=electrobay.here@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all duration-300" />
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-white">Top Categories</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all duration-300" />
                  Microcontrollers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all duration-300" />
                  Sensors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all duration-300" />
                  Development Kits
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all duration-300" />
                  Components
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-white">Stay Connected</h4>
            <div className="flex gap-3 mb-6">
              {/* <a href="#" className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg">
                <Twitter className="w-5 h-5" />
              </a> */}
              <a
                href="https://www.instagram.com/accounts/login/?next=%2Felectrobay.tech&source=omni_redirect"
                className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=electrobay.here@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-white/70 text-sm mb-1">Email Support</p>
              <p className="text-white">electrobay.here@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              &copy; 2025 ElectroBay. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============= MAIN HOME COMPONENT =============
export default function Home() {
  const categoriesRef = useRef(null);
  const projectsRef = useRef(null);

  // now redirect to /products for categories/projects
  const goToProducts = () => {
    window.location.href = "/products";
  };
  const scrollToCategories = () => {
    categoriesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const showLearnUnderDev = () => {
    toast("Under development — coming soon!", {
      description: "We're building new tutorials and guides.",
    });
  };

  const redirectToAuth = () => {
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <HeroBanner />
      <Navbar
        // onCategoriesClick={scrollToCategories}
        onProjectsClick={goToProducts}
        onLearnClick={showLearnUnderDev}
        onAuthRedirect={redirectToAuth}
      />
      <main>
        <CategoriesSection ref={categoriesRef} />
        <ProjectsSection ref={projectsRef} />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
