

// import { useState, useRef } from "react";
// import { motion } from "motion/react";
// import { ShoppingCart, User, Menu, ChevronLeft, ChevronRight, Star, Facebook, Twitter, Instagram, Mail } from "lucide-react";
// import { Toaster, toast } from "sonner";

// // ============= UI COMPONENTS (Standalone) =============

// // Button Component
// function Button({ children, variant = "default", size = "default", className = "", onClick, type = "button" }) {
//   const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
//   const variants = {
//     default: "bg-slate-900 text-white hover:bg-slate-800",
//     outline: "border border-slate-300 bg-transparent hover:bg-slate-100",
//     ghost: "hover:bg-slate-100",
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
//       className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// // Card Component
// function Card({ children, className = "" }) {
//   return (
//     <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
//       {children}
//     </div>
//   );
// }

// // Input Component
// function Input({ id, type = "text", placeholder, value, onChange, required, className = "" }) {
//   return (
//     <input
//       id={id}
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       required={required}
//       className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//     />
//   );
// }

// // Textarea Component
// function Textarea({ id, placeholder, value, onChange, rows = 3, required, className = "" }) {
//   return (
//     <textarea
//       id={id}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       rows={rows}
//       required={required}
//       className={`flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//     />
//   );
// }

// // Avatar Components
// function Avatar({ children, className = "" }) {
//   return (
//     <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
//       {children}
//     </div>
//   );
// }

// function AvatarFallback({ children, className = "" }) {
//   return (
//     <div className={`flex h-full w-full items-center justify-center rounded-full bg-slate-100 ${className}`}>
//       {children}
//     </div>
//   );
// }

// // ============= PAGE COMPONENTS =============

// // Navbar Component
// function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <ShoppingCart className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-white">ElectroBay</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             <button className="text-white/90 hover:text-white transition">
//               Categories
//             </button>
//             <button className="text-white/90 hover:text-white transition">
//               Learn
//             </button>
//             <button className="text-white/90 hover:text-white transition">
//               Projects
//             </button>
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-white/90 hover:text-white hover:bg-white/10"
//               >
//                 Sign Up
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-white/90 hover:text-white hover:bg-white/10"
//               >
//                 <User className="w-4 h-4 mr-2" />
//                 Login
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-white/20">
//             <div className="flex flex-col space-y-4">
//               <button className="text-white/90 hover:text-white transition text-left">
//                 Categories
//               </button>
//               <button className="text-white/90 hover:text-white transition text-left">
//                 Learn
//               </button>
//               <button className="text-white/90 hover:text-white transition text-left">
//                 Projects
//               </button>
//               <div className="flex flex-col gap-3 pt-2 border-t border-white/20">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
//                 >
//                   Sign Up
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
//                 >
//                   <User className="w-4 h-4 mr-2" />
//                   Login
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// // Hero Banner Component
// function HeroBanner() {
//   return (
//     <div className="relative h-[400px] md:h-[500px] overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url('https://images.unsplash.com/photo-1565191148828-52aeb39af6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYmFubmVyJTIwZGFya3xlbnwxfHx8fDE3NjMwNDc2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-slate-900/80" />
//       </div>
//       <div className="relative container mx-auto px-4 h-full flex items-center">
//         <div className="max-w-2xl text-white">
//           <h1 className="mb-4">
//             Build Your Next Innovation
//           </h1>
//           <p className="text-white/90 mb-6">
//             Discover the latest electronics components, development kits, and
//             tools for your projects. From Arduino to Raspberry Pi, we have
//             everything you need.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Categories Section Component
// function CategoriesSection() {
//   const categories = [
//     {
//       id: 1,
//       name: "Microcontrollers",
//       image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwbWljcm9jb250cm9sbGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 2,
//       name: "Single Board Computers",
//       image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXNwYmVycnklMjBwaSUyMGNvbXB1dGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 3,
//       name: "Sensors",
//       image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwc2Vuc29yc3xlbnwxfHx8fDE3NjMwNDc2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 4,
//       name: "Motors & Actuators",
//       image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMG1vdG9yc3xlbnwxfHx8fDE3NjMwNDc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 5,
//       name: "LED & Displays",
//       image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodHMlMjBkaXNwbGF5fGVufDF8fHx8MTc2MzA0NzY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 6,
//       name: "Components",
//       image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwY29tcG9uZW50c3xlbnwxfHx8fDE3NjMwNDc2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 7,
//       name: "IoT Devices",
//       image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBkZXZpY2VzJTIwc21hcnR8ZW58MXx8fHwxNzYzMDQ3NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 8,
//       name: "Circuit Boards",
//       image: "https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGNpcmN1aXQlMjBib2FyZHxlbnwxfHx8fDE3NjI5NjM2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//   ];

//   return (
//     <section className="py-16 container mx-auto px-4">
//       <h2 className="mb-8">Categories</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {categories.map((category) => (
//           <Card
//             key={category.id}
//             className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
//           >
//             <div className="aspect-square overflow-hidden">
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-4 text-center">
//               <h3 className="text-slate-900">{category.name}</h3>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }

// // Projects Section Component
// function ProjectsSection() {
//   const scrollContainerRef = useRef(null);

//   const projects = [
//     {
//       id: 1,
//       name: "Arduino Starter Kit",
//       price: "$49.99",
//       image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwbWljcm9jb250cm9sbGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 2,
//       name: "Raspberry Pi 4 Kit",
//       price: "$89.99",
//       image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXNwYmVycnklMjBwaSUyMGNvbXB1dGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 3,
//       name: "Sensor Bundle Pack",
//       price: "$34.99",
//       image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwc2Vuc29yc3xlbnwxfHx8fDE3NjMwNDc2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 4,
//       name: "Robotics Starter Kit",
//       price: "$129.99",
//       image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMG1vdG9yc3xlbnwxfHx8fDE3NjMwNDc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 5,
//       name: "LED Matrix Display",
//       price: "$24.99",
//       image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodHMlMjBkaXNwbGF5fGVufDF8fHx8MTc2MzA0NzY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 6,
//       name: "IoT Development Kit",
//       price: "$79.99",
//       image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBkZXZpY2VzJTIwc21hcnR8ZW58MXx8fHwxNzYzMDQ3NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//   ];

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 300;
//       scrollContainerRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between mb-8">
//           <h2>Projects & Kits</h2>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//         <div
//           ref={scrollContainerRef}
//           className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {projects.map((project) => (
//             <Card
//               key={project.id}
//               className="min-w-[280px] overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="aspect-square overflow-hidden">
//                 <img
//                   src={project.image}
//                   alt={project.name}
//                   className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="mb-2 text-slate-900">{project.name}</h3>
//                 <p className="text-slate-600 mb-4">{project.price}</p>
//                 <Button variant="outline" className="w-full">
//                   View More
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // Reviews Section Component
// function ReviewsSection() {
//   const reviews = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       avatar: "SJ",
//       rating: 5,
//       comment:
//         "Amazing quality products! The Arduino kit helped me complete my university project.",
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       avatar: "MC",
//       rating: 5,
//       comment:
//         "Fast shipping and excellent customer service. Highly recommended!",
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       avatar: "ER",
//       rating: 4,
//       comment:
//         "Great selection of components. Found everything I needed for my IoT project.",
//     },
//     {
//       id: 4,
//       name: "David Thompson",
//       avatar: "DT",
//       rating: 5,
//       comment:
//         "Best electronics store online! The tutorials and documentation are super helpful.",
//     },
//     {
//       id: 5,
//       name: "Lisa Wang",
//       avatar: "LW",
//       rating: 5,
//       comment:
//         "Quality products at competitive prices. My go-to store for all electronics needs.",
//     },
//     {
//       id: 6,
//       name: "James Miller",
//       avatar: "JM",
//       rating: 4,
//       comment:
//         "Impressive range of products and very reliable. Will definitely order again.",
//     },
//   ];

//   return (
//     <section className="py-16 bg-slate-50 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <h2 className="text-center mb-12">Reviews</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {reviews.map((review, index) => (
//             <motion.div
//               key={review.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Card className="p-6 hover:shadow-lg transition-shadow">
//                 <div className="flex items-start gap-4 mb-4">
//                   <Avatar>
//                     <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
//                       {review.avatar}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <h4 className="text-slate-900">{review.name}</h4>
//                     <div className="flex gap-1 mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < review.rating
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-slate-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-slate-600">{review.comment}</p>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // Contact Section Component
// function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success("Message sent successfully! We'll get back to you soon.");
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-center mb-12">Contact Us</h2>
//         <Card className="max-w-2xl mx-auto p-6 md:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block mb-2 text-slate-900">
//                 Name
//               </label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Your name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block mb-2 text-slate-900">
//                 Email
//               </label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your.email@example.com"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="message" className="block mb-2 text-slate-900">
//                 Message
//               </label>
//               <Textarea
//                 id="message"
//                 placeholder="Tell us how we can help you..."
//                 value={formData.message}
//                 onChange={(e) =>
//                   setFormData({ ...formData, message: e.target.value })
//                 }
//                 rows={5}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Submit
//             </Button>
//           </form>
//         </Card>
//       </div>
//     </section>
//   );
// }

// // Footer Component
// function Footer() {
//   return (
//     <footer className="bg-slate-900 text-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand */}
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

//           {/* Quick Links */}
//           <div>
//             <h4 className="mb-4 text-white">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Shop
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Support
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h4 className="mb-4 text-white">Categories</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Microcontrollers
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Sensors
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Development Kits
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Components
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="mb-4 text-white">Connect With Us</h4>
//             <div className="flex gap-4 mb-4">
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
//               >
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
//               >
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
//               >
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
//               >
//                 <Mail className="w-5 h-5" />
//               </a>
//             </div>
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

// // ============= MAIN HOME COMPONENT =============
// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <HeroBanner />
//       <Navbar />
//       <main>
//         <CategoriesSection />
//         <ProjectsSection />
//         <ReviewsSection />
//         <ContactSection />
//       </main>
//       <Footer />
//     </div>
//   );
// }
















// import { useState, useRef } from "react";
// import { motion } from "motion/react";
// import {
//   ShoppingCart,
//   User,
//   Menu,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   Facebook,
//   Twitter,
//   Instagram,
//   Mail,
// } from "lucide-react";
// import { Toaster, toast } from "sonner";

// // ============= UI COMPONENTS (Standalone) =============

// // Button Component
// function Button({ children, variant = "default", size = "default", className = "", onClick, type = "button" }) {
//   const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
//   const variants = {
//     default: "bg-slate-900 text-white hover:bg-slate-800",
//     outline: "border border-slate-300 bg-transparent hover:bg-slate-100",
//     ghost: "hover:bg-slate-100",
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
//       className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// // Card Component
// function Card({ children, className = "" }) {
//   return (
//     <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
//       {children}
//     </div>
//   );
// }

// // Input Component
// function Input({ id, type = "text", placeholder, value, onChange, required, className = "" }) {
//   return (
//     <input
//       id={id}
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       required={required}
//       className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//     />
//   );
// }

// // Textarea Component
// function Textarea({ id, placeholder, value, onChange, rows = 3, required, className = "" }) {
//   return (
//     <textarea
//       id={id}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       rows={rows}
//       required={required}
//       className={`flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//     />
//   );
// }

// // Avatar Components
// function Avatar({ children, className = "" }) {
//   return (
//     <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
//       {children}
//     </div>
//   );
// }

// function AvatarFallback({ children, className = "" }) {
//   return (
//     <div className={`flex h-full w-full items-center justify-center rounded-full bg-slate-100 ${className}`}>
//       {children}
//     </div>
//   );
// }

// // ============= PAGE COMPONENTS =============

// // Navbar Component
// // NOTE: now accepts handlers as props to scroll/redirect without touching other pages.
// function Navbar({
//   onCategoriesClick = () => {},
//   onProjectsClick = () => {},
//   onLearnClick = () => {},
//   onAuthRedirect = () => {},
// }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleNavAndClose = (handler) => {
//     handler();
//     setMobileMenuOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
//       <Toaster richColors />
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <ShoppingCart className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-white">ElectroBay</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             <button
//               className="text-white/90 hover:text-white transition"
//               onClick={onCategoriesClick}
//             >
//               Categories
//             </button>
//             <button
//               className="text-white/90 hover:text-white transition"
//               onClick={onLearnClick}
//             >
//               Learn
//             </button>
//             <button
//               className="text-white/90 hover:text-white transition"
//               onClick={onProjectsClick}
//             >
//               Projects
//             </button>
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-white/90 hover:text-white hover:bg-white/10"
//                 onClick={() => onAuthRedirect()}
//               >
//                 Sign Up
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-white/90 hover:text-white hover:bg-white/10"
//                 onClick={() => onAuthRedirect()}
//               >
//                 <User className="w-4 h-4 mr-2" />
//                 Login
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-white/20">
//             <div className="flex flex-col space-y-4">
//               <button
//                 className="text-white/90 hover:text-white transition text-left"
//                 onClick={() => handleNavAndClose(onCategoriesClick)}
//               >
//                 Categories
//               </button>
//               <button
//                 className="text-white/90 hover:text-white transition text-left"
//                 onClick={() => handleNavAndClose(onLearnClick)}
//               >
//                 Learn
//               </button>
//               <button
//                 className="text-white/90 hover:text-white transition text-left"
//                 onClick={() => handleNavAndClose(onProjectsClick)}
//               >
//                 Projects
//               </button>
//               <div className="flex flex-col gap-3 pt-2 border-t border-white/20">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
//                   onClick={() => handleNavAndClose(onAuthRedirect)}
//                 >
//                   Sign Up
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
//                   onClick={() => handleNavAndClose(onAuthRedirect)}
//                 >
//                   <User className="w-4 h-4 mr-2" />
//                   Login
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// // Hero Banner Component
// function HeroBanner() {
//   return (
//     <div className="relative h-[400px] md:h-[500px] overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url('https://images.unsplash.com/photo-1565191148828-52aeb39af6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYmFubmVyJTIwZGFya3xlbnwxfHx8fDE3NjMwNDc2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-slate-900/80" />
//       </div>
//       <div className="relative container mx-auto px-4 h-full flex items-center">
//         <div className="max-w-2xl text-white">
//           <h1 className="mb-4">
//             Build Your Next Innovation
//           </h1>
//           <p className="text-white/90 mb-6">
//             Discover the latest electronics components, development kits, and
//             tools for your projects. From Arduino to Raspberry Pi, we have
//             everything you need.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Categories Section Component
// function CategoriesSection() {
//   const categories = [
//     {
//       id: 1,
//       name: "Microcontrollers",
//       image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwbWljcm9jb250cm9sbGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 2,
//       name: "Single Board Computers",
//       image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXNwYmVycnklMjBwaSUyMGNvbXB1dGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 3,
//       name: "Sensors",
//       image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwc2Vuc29yc3xlbnwxfHx8fDE3NjMwNDc2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 4,
//       name: "Motors & Actuators",
//       image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMG1vdG9yc3xlbnwxfHx8fDE3NjMwNDc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 5,
//       name: "LED & Displays",
//       image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodHMlMjBkaXNwbGF5fGVufDF8fHx8MTc2MzA0NzY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 6,
//       name: "Components",
//       image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwY29tcG9uZW50c3xlbnwxfHx8fDE3NjMwNDc2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 7,
//       name: "IoT Devices",
//       image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBkZXZpY2VzJTIwc21hcnR8ZW58MXx8fHwxNzYzMDQ3NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 8,
//       name: "Circuit Boards",
//       image: "https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGNpcmN1aXQlMjBib2FyZHxlbnwxfHx8fDE3NjI5NjM2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//   ];

//   return (
//     <section id="categories-section" className="py-16 container mx-auto px-4">
//       <h2 className="mb-8">Categories</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {categories.map((category) => (
//           <Card
//             key={category.id}
//             className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
//           >
//             <div className="aspect-square overflow-hidden">
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-4 text-center">
//               <h3 className="text-slate-900">{category.name}</h3>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }

// // Projects Section Component
// function ProjectsSection() {
//   const scrollContainerRef = useRef(null);

//   const projects = [
//     {
//       id: 1,
//       name: "Arduino Starter Kit",
//       price: "$49.99",
//       image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwbWljcm9jb250cm9sbGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 2,
//       name: "Raspberry Pi 4 Kit",
//       price: "$89.99",
//       image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXNwYmVycnklMjBwaSUyMGNvbXB1dGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 3,
//       name: "Sensor Bundle Pack",
//       price: "$34.99",
//       image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwc2Vuc29yc3xlbnwxfHx8fDE3NjMwNDc2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 4,
//       name: "Robotics Starter Kit",
//       price: "$129.99",
//       image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMG1vdG9yc3xlbnwxfHx8fDE3NjMwNDc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 5,
//       name: "LED Matrix Display",
//       price: "$24.99",
//       image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodHMlMjBkaXNwbGF5fGVufDF8fHx8MTc2MzA0NzY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 6,
//       name: "IoT Development Kit",
//       price: "$79.99",
//       image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBkZXZpY2VzJTIwc21hcnR8ZW58MXx8fHwxNzYzMDQ3NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//   ];

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 300;
//       scrollContainerRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section id="projects-section" className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between mb-8">
//           <h2>Projects & Kits</h2>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//         <div
//           ref={scrollContainerRef}
//           className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {projects.map((project) => (
//             <Card
//               key={project.id}
//               className="min-w-[280px] overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="aspect-square overflow-hidden">
//                 <img
//                   src={project.image}
//                   alt={project.name}
//                   className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="mb-2 text-slate-900">{project.name}</h3>
//                 <p className="text-slate-600 mb-4">{project.price}</p>
//                 <Button variant="outline" className="w-full">
//                   View More
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // Reviews Section Component
// function ReviewsSection() {
//   const reviews = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       avatar: "SJ",
//       rating: 5,
//       comment:
//         "Amazing quality products! The Arduino kit helped me complete my university project.",
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       avatar: "MC",
//       rating: 5,
//       comment:
//         "Fast shipping and excellent customer service. Highly recommended!",
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       avatar: "ER",
//       rating: 4,
//       comment:
//         "Great selection of components. Found everything I needed for my IoT project.",
//     },
//     {
//       id: 4,
//       name: "David Thompson",
//       avatar: "DT",
//       rating: 5,
//       comment:
//         "Best electronics store online! The tutorials and documentation are super helpful.",
//     },
//     {
//       id: 5,
//       name: "Lisa Wang",
//       avatar: "LW",
//       rating: 5,
//       comment:
//         "Quality products at competitive prices. My go-to store for all electronics needs.",
//     },
//     {
//       id: 6,
//       name: "James Miller",
//       avatar: "JM",
//       rating: 4,
//       comment:
//         "Impressive range of products and very reliable. Will definitely order again.",
//     },
//   ];

//   return (
//     <section className="py-16 bg-slate-50 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <h2 className="text-center mb-12">Reviews</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {reviews.map((review, index) => (
//             <motion.div
//               key={review.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Card className="p-6 hover:shadow-lg transition-shadow">
//                 <div className="flex items-start gap-4 mb-4">
//                   <Avatar>
//                     <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
//                       {review.avatar}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <h4 className="text-slate-900">{review.name}</h4>
//                     <div className="flex gap-1 mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < review.rating
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-slate-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-slate-600">{review.comment}</p>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // Contact Section Component (updated per request)
// function ContactSection() {
//   const OWNER_EMAIL = "support@ElectroBay.com"; // change if you want submissions to go elsewhere

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     whatsapp: "",
//     address: "",
//     project: "",
//   });

//   const [submitting, setSubmitting] = useState(false);

//   const validate = () => {
//     if (!formData.name.trim()) {
//       toast.error("Please enter your name.");
//       return false;
//     }
//     if (!formData.email.trim()) {
//       toast.error("Please enter your email.");
//       return false;
//     }
//     if (!formData.whatsapp.trim()) {
//       toast.error("Please enter your WhatsApp number.");
//       return false;
//     }
//     if (!formData.project.trim()) {
//       toast.error("Please describe what you want to make.");
//       return false;
//     }
//     return true;
//   };

//   // Improved submit handler with robust error handling and fallback
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSubmitting(true);

//     const payload = {
//       name: formData.name,
//       email: formData.email,
//       whatsapp: formData.whatsapp,
//       address: formData.address,
//       project: formData.project,
//       submittedAt: new Date().toISOString(),
//     };

//     try {
//       // If backend is on different host during dev, change this URL to the full origin
//       const url = "/api/send-contact";

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       let json = null;
//       try {
//         json = await res.json();
//       } catch (_) {
//         // ignore parse errors
//       }

//       if (res.ok) {
//         toast.success((json && json.message) || "Request sent — we'll contact you soon!");
//         setFormData({ name: "", email: "", whatsapp: "", address: "", project: "" });
//         setSubmitting(false);
//         return;
//       }

//       // If server returned 5xx or network issues, use mailto fallback
//       const serverMsg = (json && json.message) || `Server error (${res.status})`;
//       if (res.status >= 500) {
//         const subject = encodeURIComponent("New project inquiry from ElectroBay website");
//         const body = encodeURIComponent(
//           `Name: ${payload.name}\nEmail: ${payload.email}\nWhatsApp: ${payload.whatsapp}\nAddress: ${payload.address}\nProject details:\n${payload.project}\n\nSubmitted at: ${payload.submittedAt}`
//         );
//         window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
//         toast.success("Opened your email client to send the message (fallback).");
//         setFormData({ name: "", email: "", whatsapp: "", address: "", project: "" });
//       } else {
//         toast.error(serverMsg);
//       }
//     } catch (err) {
//       // likely network error — fallback to mailto
//       console.error("Contact submit error:", err);
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
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-center mb-12">Haven't found your project? Write here</h2>
//         <Card className="max-w-2xl mx-auto p-6 md:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block mb-2 text-slate-900">
//                 Name
//               </label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Your name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block mb-2 text-slate-900">
//                 Email
//               </label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your.email@example.com"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="whatsapp" className="block mb-2 text-slate-900">
//                 WhatsApp number
//               </label>
//               <Input
//                 id="whatsapp"
//                 type="text"
//                 placeholder="+91 12345 67890"
//                 value={formData.whatsapp}
//                 onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="address" className="block mb-2 text-slate-900">
//                 Address
//               </label>
//               <Input
//                 id="address"
//                 type="text"
//                 placeholder="Your city, state, country"
//                 value={formData.address}
//                 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//               />
//             </div>

//             <div>
//               <label htmlFor="project" className="block mb-2 text-slate-900">
//                 What do you want to make?
//               </label>
//               <Textarea
//                 id="project"
//                 placeholder="Describe the project you'd like built (features, goals, timeline)..."
//                 value={formData.project}
//                 onChange={(e) => setFormData({ ...formData, project: e.target.value })}
//                 rows={5}
//                 required
//               />
//             </div>

//             <Button type="submit" className="w-full" disabled={submitting}>
//               {submitting ? "Sending..." : "Submit"}
//             </Button>
//           </form>
//         </Card>
//       </div>
//     </section>
//   );
// }

// // Footer Component
// function Footer() {
//   return (
//     <footer className="bg-slate-900 text-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand */}
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

//           {/* Quick Links */}
//           <div>
//             <h4 className="mb-4 text-white">Quick Links</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Shop
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Support
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h4 className="mb-4 text-white">Categories</h4>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Microcontrollers
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Sensors
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Development Kits
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-white/70 hover:text-white transition">
//                   Components
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="mb-4 text-white">Connect With Us</h4>
//             <div className="flex gap-4 mb-4">
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
//               >
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
//               >
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
//               >
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
//               >
//                 <Mail className="w-5 h-5" />
//               </a>
//             </div>
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

// // ============= MAIN HOME COMPONENT =============
// export default function Home() {
//   // refs for scroll targets
//   const categoriesRef = useRef(null);
//   const projectsRef = useRef(null);

//   // handlers for Navbar
//   const scrollToCategories = () => {
//     const el = document.getElementById("categories-section");
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       // small offset if navbar covers top (adjust if needed)
//       window.scrollBy(0, -80);
//     } else {
//       toast.error("Categories section not found on the page.");
//     }
//   };

//   const scrollToProjects = () => {
//     const el = document.getElementById("projects-section");
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       window.scrollBy(0, -80);
//     } else {
//       toast.error("Projects section not found on the page.");
//     }
//   };

//   const showLearnUnderDev = () => {
//     toast("Under development — coming soon!", { description: "We're building new tutorials and guides." });
//   };

//   const redirectToAuth = () => {
//     // redirect to auth page (change path if your auth route differs)
//     window.location.href = "/auth";
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <HeroBanner />
//       <Navbar
//         onCategoriesClick={scrollToCategories}
//         onProjectsClick={scrollToProjects}
//         onLearnClick={showLearnUnderDev}
//         onAuthRedirect={redirectToAuth}
//       />
//       <main>
//         {/* Ensure id attributes exist for scrollIntoView to work */}
//         <CategoriesSection ref={categoriesRef} />
//         <ProjectsSection ref={projectsRef} />
//         <ReviewsSection />
//         <ContactSection />
//       </main>
//       <Footer />
//     </div>
//   );
// }
























// import { useState, useRef } from "react";
// import { motion } from "motion/react";
// import {
//   ShoppingCart,
//   User,
//   Menu,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   Facebook,
//   Twitter,
//   Instagram,
//   Mail,
// } from "lucide-react";
// import { Toaster, toast } from "sonner";
// import emailjs from "@emailjs/browser"; // <-- EmailJS client

// // Initialize EmailJS optionally (you may also pass publicKey in send)
// const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // e.g. "service_xxx"
// const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. "template_xxx"
// const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // e.g. "user_xxx"
// // Optionally initialize once:
// emailjs.init(EMAILJS_PUBLIC_KEY);

// // ============= UI COMPONENTS (Standalone) =============

// // Button Component
// function Button({ children, variant = "default", size = "default", className = "", onClick, type = "button" }) {
//   const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
//   const variants = {
//     default: "bg-slate-900 text-white hover:bg-slate-800",
//     outline: "border border-slate-300 bg-transparent hover:bg-slate-100",
//     ghost: "hover:bg-slate-100",
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
//       className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// // Card Component
// function Card({ children, className = "" }) {
//   return (
//     <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
//       {children}
//     </div>
//   );
// }

// // Input Component
// function Input({ id, type = "text", placeholder, value, onChange, required, className = "" }) {
//   return (
//     <input
//       id={id}
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       required={required}
//       className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//     />
//   );
// }

// // Textarea Component
// function Textarea({ id, placeholder, value, onChange, rows = 3, required, className = "" }) {
//   return (
//     <textarea
//       id={id}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       rows={rows}
//       required={required}
//       className={`flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
//     />
//   );
// }

// // Avatar Components
// function Avatar({ children, className = "" }) {
//   return (
//     <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
//       {children}
//     </div>
//   );
// }

// function AvatarFallback({ children, className = "" }) {
//   return (
//     <div className={`flex h-full w-full items-center justify-center rounded-full bg-slate-100 ${className}`}>
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

//   const handleNavAndClose = (handler) => {
//     handler();
//     setMobileMenuOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
//       <Toaster richColors />
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//               <ShoppingCart className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-white">ElectroBay</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             <button
//               className="text-white/90 hover:text-white transition"
//               onClick={onCategoriesClick}
//             >
//               Categories
//             </button>
//             <button
//               className="text-white/90 hover:text-white transition"
//               onClick={onLearnClick}
//             >
//               Learn
//             </button>
//             <button
//               className="text-white/90 hover:text-white transition"
//               onClick={onProjectsClick}
//             >
//               Projects
//             </button>
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-white/90 hover:text-white hover:bg-white/10"
//                 onClick={() => onAuthRedirect()}
//               >
//                 Sign Up
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-white/90 hover:text-white hover:bg-white/10"
//                 onClick={() => onAuthRedirect()}
//               >
//                 <User className="w-4 h-4 mr-2" />
//                 Login
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-white/20">
//             <div className="flex flex-col space-y-4">
//               <button
//                 className="text-white/90 hover:text-white transition text-left"
//                 onClick={() => handleNavAndClose(onCategoriesClick)}
//               >
//                 Categories
//               </button>
//               <button
//                 className="text-white/90 hover:text-white transition text-left"
//                 onClick={() => handleNavAndClose(onLearnClick)}
//               >
//                 Learn
//               </button>
//               <button
//                 className="text-white/90 hover:text-white transition text-left"
//                 onClick={() => handleNavAndClose(onProjectsClick)}
//               >
//                 Projects
//               </button>
//               <div className="flex flex-col gap-3 pt-2 border-t border-white/20">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
//                   onClick={() => handleNavAndClose(onAuthRedirect)}
//                 >
//                   Sign Up
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
//                   onClick={() => handleNavAndClose(onAuthRedirect)}
//                 >
//                   <User className="w-4 h-4 mr-2" />
//                   Login
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// // Hero Banner Component
// function HeroBanner() {
//   return (
//     <div className="relative h-[400px] md:h-[500px] overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url('https://images.unsplash.com/photo-1565191148828-52aeb39af6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYmFubmVyJTIwZGFya3xlbnwxfHx8fDE3NjMwNDc2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-slate-900/80" />
//       </div>
//       <div className="relative container mx-auto px-4 h-full flex items-center">
//         <div className="max-w-2xl text-white">
//           <h1 className="mb-4">
//             Build Your Next Innovation
//           </h1>
//           <p className="text-white/90 mb-6">
//             Discover the latest electronics components, development kits, and
//             tools for your projects. From Arduino to Raspberry Pi, we have
//             everything you need.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Categories Section Component
// function CategoriesSection() {
//   const categories = [
//     {
//       id: 1,
//       name: "Microcontrollers",
//       image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwbWljcm9jb250cm9sbGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 2,
//       name: "Single Board Computers",
//       image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXNwYmVycnklMjBwaSUyMGNvbXB1dGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 3,
//       name: "Sensors",
//       image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwc2Vuc29yc3xlbnwxfHx8fDE3NjMwNDc2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 4,
//       name: "Motors & Actuators",
//       image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMG1vdG9yc3xlbnwxfHx8fDE3NjMwNDc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 5,
//       name: "LED & Displays",
//       image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodHMlMjBkaXNwbGF5fGVufDF8fHx8MTc2MzA0NzY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 6,
//       name: "Components",
//       image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwY29tcG9uZW50c3xlbnwxfHx8fDE3NjMwNDc2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 7,
//       name: "IoT Devices",
//       image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBkZXZpY2VzJTIwc21hcnR8ZW58MXx8fHwxNzYzMDQ3NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 8,
//       name: "Circuit Boards",
//       image: "https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGNpcmN1aXQlMjBib2FyZHxlbnwxfHx8fDE3NjI5NjM2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//   ];

//   return (
//     <section id="categories-section" className="py-16 container mx-auto px-4">
//       <h2 className="mb-8">Categories</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {categories.map((category) => (
//           <Card
//             key={category.id}
//             className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
//           >
//             <div className="aspect-square overflow-hidden">
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-4 text-center">
//               <h3 className="text-slate-900">{category.name}</h3>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }

// // Projects Section Component
// function ProjectsSection() {
//   const scrollContainerRef = useRef(null);

//   const projects = [
//     {
//       id: 1,
//       name: "Arduino Starter Kit",
//       price: "$49.99",
//       image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmR1aW5vJTIwbWljcm9jb250cm9sbGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 2,
//       name: "Raspberry Pi 4 Kit",
//       price: "$89.99",
//       image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXNwYmVycnklMjBwaSUyMGNvbXB1dGVyfGVufDF8fHx8MTc2MzA0NzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 3,
//       name: "Sensor Bundle Pack",
//       price: "$34.99",
//       image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwc2Vuc29yc3xlbnwxfHx8fDE3NjMwNDc2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 4,
//       name: "Robotics Starter Kit",
//       price: "$129.99",
//       image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMG1vdG9yc3xlbnwxfHx8fDE3NjMwNDc2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 5,
//       name: "LED Matrix Display",
//       price: "$24.99",
//       image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWQlMjBsaWdodHMlMjBkaXNwbGF5fGVufDF8fHx8MTc2MzA0NzY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//     {
//       id: 6,
//       name: "IoT Development Kit",
//       price: "$79.99",
//       image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBkZXZpY2VzJTIwc21hcnR8ZW58MXx8fHwxNzYzMDQ3NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     },
//   ];

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 300;
//       scrollContainerRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section id="projects-section" className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between mb-8">
//           <h2>Projects & Kits</h2>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => scroll("left")}
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//         <div
//           ref={scrollContainerRef}
//           className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {projects.map((project) => (
//             <Card
//               key={project.id}
//               className="min-w-[280px] overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="aspect-square overflow-hidden">
//                 <img
//                   src={project.image}
//                   alt={project.name}
//                   className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                 />
//               </div>
//               <div className="p-4">
//                 <h3 className="mb-2 text-slate-900">{project.name}</h3>
//                 <p className="text-slate-600 mb-4">{project.price}</p>
//                 <Button variant="outline" className="w-full">View More</Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // Reviews Section Component
// function ReviewsSection() {
//   const reviews = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       avatar: "SJ",
//       rating: 5,
//       comment:
//         "Amazing quality products! The Arduino kit helped me complete my university project.",
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       avatar: "MC",
//       rating: 5,
//       comment:
//         "Fast shipping and excellent customer service. Highly recommended!",
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       avatar: "ER",
//       rating: 4,
//       comment:
//         "Great selection of components. Found everything I needed for my IoT project.",
//     },
//     {
//       id: 4,
//       name: "David Thompson",
//       avatar: "DT",
//       rating: 5,
//       comment:
//         "Best electronics store online! The tutorials and documentation are super helpful.",
//     },
//     {
//       id: 5,
//       name: "Lisa Wang",
//       avatar: "LW",
//       rating: 5,
//       comment:
//         "Quality products at competitive prices. My go-to store for all electronics needs.",
//     },
//     {
//       id: 6,
//       name: "James Miller",
//       avatar: "JM",
//       rating: 4,
//       comment:
//         "Impressive range of products and very reliable. Will definitely order again.",
//     },
//   ];

//   return (
//     <section className="py-16 bg-slate-50 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <h2 className="text-center mb-12">Reviews</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {reviews.map((review, index) => (
//             <motion.div
//               key={review.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <Card className="p-6 hover:shadow-lg transition-shadow">
//                 <div className="flex items-start gap-4 mb-4">
//                   <Avatar>
//                     <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
//                       {review.avatar}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <h4 className="text-slate-900">{review.name}</h4>
//                     <div className="flex gap-1 mt-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < review.rating
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-slate-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-slate-600">{review.comment}</p>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // Contact Section Component (EmailJS)
// function ContactSection() {
//   const OWNER_EMAIL = "support@ElectroBay.com"; // fallback used in mailto

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     whatsapp: "",
//     address: "",
//     project: "",
//   });

//   const [submitting, setSubmitting] = useState(false);

//   const validate = () => {
//     if (!formData.name.trim()) { toast.error("Please enter your name."); return false; }
//     if (!formData.email.trim()) { toast.error("Please enter your email."); return false; }
//     if (!formData.whatsapp.trim()) { toast.error("Please enter your WhatsApp number."); return false; }
//     if (!formData.project.trim()) { toast.error("Please describe what you want to make."); return false; }
//     return true;
//   };

//   // EmailJS send using template params
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
//       // Use emailjs.send(serviceID, templateID, templateParams, publicKey)
//       const templateParams = {
//         name: payload.name,
//         email: payload.email,
//         whatsapp: payload.whatsapp,
//         address: payload.address,
//         project: payload.project,
//         submittedAt: payload.submittedAt,
//       };

//       const res = await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         templateParams,
//         EMAILJS_PUBLIC_KEY
//       );

//       // EmailJS returns status 200-ish in 'res'
//       console.log("EmailJS result:", res);
//       toast.success("Request sent — we'll contact you soon!");
//       setFormData({ name: "", email: "", whatsapp: "", address: "", project: "" });
//     } catch (err) {
//       console.error("EmailJS send error:", err);
//       // fallback to mailto for user to manually send
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
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-center mb-12">Haven't found your project? Write here</h2>
//         <Card className="max-w-2xl mx-auto p-6 md:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block mb-2 text-slate-900">Name</label>
//               <Input id="name" type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
//             </div>

//             <div>
//               <label htmlFor="email" className="block mb-2 text-slate-900">Email</label>
//               <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
//             </div>

//             <div>
//               <label htmlFor="whatsapp" className="block mb-2 text-slate-900">WhatsApp number</label>
//               <Input id="whatsapp" type="text" placeholder="+91 12345 67890" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} required />
//             </div>

//             <div>
//               <label htmlFor="address" className="block mb-2 text-slate-900">Address</label>
//               <Input id="address" type="text" placeholder="Your city, state, country" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
//             </div>

//             <div>
//               <label htmlFor="project" className="block mb-2 text-slate-900">What do you want to make?</label>
//               <Textarea id="project" placeholder="Describe the project you'd like built (features, goals, timeline)..." value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} rows={5} required />
//             </div>

//             <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Sending..." : "Submit"}</Button>
//           </form>
//         </Card>
//       </div>
//     </section>
//   );
// }

// // Footer Component
// function Footer() {
//   return (
//     <footer className="bg-slate-900 text-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <ShoppingCart className="w-6 h-6 text-white" />
//               </div>
//               <span>ElectroBay</span>
//             </div>
//             <p className="text-white/70">Your trusted partner for all electronics and development needs.</p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="mb-4 text-white">Quick Links</h4>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-white/70 hover:text-white transition">About Us</a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition">Shop</a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition">Blog</a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition">Support</a></li>
//             </ul>
//           </div>

//           {/* Categories */}
//           <div>
//             <h4 className="mb-4 text-white">Categories</h4>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-white/70 hover:text-white transition">Microcontrollers</a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition">Sensors</a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition">Development Kits</a></li>
//               <li><a href="#" className="text-white/70 hover:text-white transition">Components</a></li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="mb-4 text-white">Connect With Us</h4>
//             <div className="flex gap-4 mb-4">
//               <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"><Facebook className="w-5 h-5" /></a>
//               <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"><Twitter className="w-5 h-5" /></a>
//               <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"><Instagram className="w-5 h-5" /></a>
//               <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"><Mail className="w-5 h-5" /></a>
//             </div>
//             <p className="text-white/70">support@ElectroBay.com</p>
//           </div>
//         </div>

//         <div className="border-t border-white/10 pt-8 text-center text-white/70"><p>&copy; 2025 ElectroBay. All rights reserved.</p></div>
//       </div>
//     </footer>
//   );
// }

// // ============= MAIN HOME COMPONENT =============
// export default function Home() {
//   // refs for scroll targets
//   const categoriesRef = useRef(null);
//   const projectsRef = useRef(null);

//   // handlers for Navbar
//   const scrollToCategories = () => {
//     const el = document.getElementById("categories-section");
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       window.scrollBy(0, -80);
//     } else {
//       toast.error("Categories section not found on the page.");
//     }
//   };

//   const scrollToProjects = () => {
//     const el = document.getElementById("projects-section");
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" });
//       window.scrollBy(0, -80);
//     } else {
//       toast.error("Projects section not found on the page.");
//     }
//   };

//   const showLearnUnderDev = () => {
//     toast("Under development — coming soon!", { description: "We're building new tutorials and guides." });
//   };

//   const redirectToAuth = () => {
//     window.location.href = "/auth";
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <HeroBanner />
//       <Navbar onCategoriesClick={scrollToCategories} onProjectsClick={scrollToProjects} onLearnClick={showLearnUnderDev} onAuthRedirect={redirectToAuth} />
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









import { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  ShoppingCart,
  User,
  Menu,
  ChevronLeft,
  ChevronRight,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import emailjs from "@emailjs/browser";

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

function Button({ children, variant = "default", size = "default", className = "", onClick, type = "button" }) {
  const baseStyles = "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-100",
    ghost: "hover:bg-slate-100",
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
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Input({ id, type = "text", placeholder, value, onChange, required, className = "" }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

function Textarea({ id, placeholder, value, onChange, rows = 3, required, className = "" }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
      className={`flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

function Avatar({ children, className = "" }) {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
      {children}
    </div>
  );
}

function AvatarFallback({ children, className = "" }) {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-slate-100 ${className}`}>
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

  const handleNavAndClose = (handler) => {
    handler();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <Toaster richColors />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-white">ElectroBay</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              className="text-white/90 hover:text-white transition"
              onClick={onCategoriesClick}
            >
              Categories
            </button>
            <button
              className="text-white/90 hover:text-white transition"
              onClick={onLearnClick}
            >
              Learn
            </button>
            <button
              className="text-white/90 hover:text-white transition"
              onClick={onProjectsClick}
            >
              Projects
            </button>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/90 hover:text-white hover:bg-white/10"
                onClick={() => onAuthRedirect()}
              >
                Sign Up
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/90 hover:text-white hover:bg-white/10"
                onClick={() => onAuthRedirect()}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <button
                className="text-white/90 hover:text-white transition text-left"
                onClick={() => handleNavAndClose(onCategoriesClick)}
              >
                Categories
              </button>
              <button
                className="text-white/90 hover:text-white transition text-left"
                onClick={() => handleNavAndClose(onLearnClick)}
              >
                Learn
              </button>
              <button
                className="text-white/90 hover:text-white transition text-left"
                onClick={() => handleNavAndClose(onProjectsClick)}
              >
                Projects
              </button>
              <div className="flex flex-col gap-3 pt-2 border-t border-white/20">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
                  onClick={() => handleNavAndClose(onAuthRedirect)}
                >
                  Sign Up
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/90 hover:text-white hover:bg-white/10 justify-start"
                  onClick={() => handleNavAndClose(onAuthRedirect)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Banner Component
function HeroBanner() {
  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1565191148828-52aeb39af6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYmFubmVyJTIwZGFya3xlbnwxfHx8fDE3NjMwNDc2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-slate-900/80" />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="mb-4">Build Your Next Innovation</h1>
          <p className="text-white/90 mb-6">
            Discover the latest electronics components, development kits, and tools for your projects.
          </p>
        </div>
      </div>
    </div>
  );
}

// Categories Section Component
function CategoriesSection() {
  const categories = [
    { id: 1, name: "Microcontrollers", image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 2, name: "Single Board Computers", image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 3, name: "Sensors", image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 4, name: "Motors & Actuators", image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 5, name: "LED & Displays", image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 6, name: "Components", image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 7, name: "IoT Devices", image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 8, name: "Circuit Boards", image: "https://images.unsplash.com/photo-1553408226-42ecf81a214c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  ];

  const goToProducts = () => {
    // redirect to products page — you can change path if your products route differs
    window.location.href = "/products";
  };

  return (
    <section id="categories-section" className="py-16 container mx-auto px-4">
      <h2 className="mb-8">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
            onClick={goToProducts}
          >
            <div className="aspect-square overflow-hidden" onClick={goToProducts}>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onClick={goToProducts}
              />
            </div>
            <div className="p-4 text-center" onClick={goToProducts}>
              <h3 className="text-slate-900">{category.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection() {
  const scrollContainerRef = useRef(null);

  const projects = [
    { id: 1, name: "Arduino Starter Kit", price: "$49.99", image: "https://images.unsplash.com/photo-1677480409111-88694019301c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 2, name: "Raspberry Pi 4 Kit", price: "$89.99", image: "https://images.unsplash.com/photo-1631553127988-36343ac5bb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 3, name: "Sensor Bundle Pack", price: "$34.99", image: "https://images.unsplash.com/photo-1609230430613-13cf4862a80f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 4, name: "Robotics Starter Kit", price: "$129.99", image: "https://images.unsplash.com/photo-1737228813532-9cd720824ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 5, name: "LED Matrix Display", price: "$24.99", image: "https://images.unsplash.com/photo-1638591752977-44dfbc05d6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { id: 6, name: "IoT Development Kit", price: "$79.99", image: "https://images.unsplash.com/photo-1712599609774-172848255a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
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
    <section id="projects-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2>Projects & Kits</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {projects.map((project) => (
            <Card key={project.id} className="min-w-[280px] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={goToProducts}>
              <div className="aspect-square overflow-hidden">
                <img src={project.image} alt={project.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-slate-900">{project.name}</h3>
                <p className="text-slate-600 mb-4">{project.price}</p>
                <Button variant="outline" className="w-full" onClick={goToProducts}>View More</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Reviews Section Component
function ReviewsSection() {
  const reviews = [
    { id: 1, name: "Sarah Johnson", avatar: "SJ", rating: 5, comment: "Amazing quality products! The Arduino kit helped me complete my university project." },
    { id: 2, name: "Michael Chen", avatar: "MC", rating: 5, comment: "Fast shipping and excellent customer service. Highly recommended!" },
    { id: 3, name: "Emily Rodriguez", avatar: "ER", rating: 4, comment: "Great selection of components. Found everything I needed for my IoT project." },
    { id: 4, name: "David Thompson", avatar: "DT", rating: 5, comment: "Best electronics store online! The tutorials and documentation are super helpful." },
    { id: 5, name: "Lisa Wang", avatar: "LW", rating: 5, comment: "Quality products at competitive prices. My go-to store for all electronics needs." },
    { id: 6, name: "James Miller", avatar: "JM", rating: 4, comment: "Impressive range of products and very reliable. Will definitely order again." },
  ];

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-12">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-slate-900">{review.name}</h4>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600">{review.comment}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component (EmailJS)
function ContactSection() {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const OWNER_EMAIL = "electrobay.here@gmail.com"; // fallback used in mailto

  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "", address: "", project: "" });
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!formData.name.trim()) { toast.error("Please enter your name."); return false; }
    if (!formData.email.trim()) { toast.error("Please enter your email."); return false; }
    if (!formData.whatsapp.trim()) { toast.error("Please enter your WhatsApp number."); return false; }
    if (!formData.project.trim()) { toast.error("Please describe what you want to make."); return false; }
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
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

      toast.success("Request sent — we'll contact you soon!");
      setFormData({ name: "", email: "", whatsapp: "", address: "", project: "" });
    } catch (err) {
      console.error("EmailJS send error:", err);
      // fallback to mailto
      try {
        const subject = encodeURIComponent("New project inquiry from ElectroBay website");
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nWhatsApp: ${payload.whatsapp}\nAddress: ${payload.address}\nProject details:\n${payload.project}\n\nSubmitted at: ${payload.submittedAt}`
        );
        window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
        toast.success("Opened your email client to send the message (fallback).");
        setFormData({ name: "", email: "", whatsapp: "", address: "", project: "" });
      } catch (mailErr) {
        toast.error("Couldn't send message. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-12">Haven't found your project? Write here</h2>
        <Card className="max-w-2xl mx-auto p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-slate-900">Name</label>
              <Input id="name" type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-slate-900">Email</label>
              <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block mb-2 text-slate-900">WhatsApp number</label>
              <Input id="whatsapp" type="text" placeholder="+91 12345 67890" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} required />
            </div>

            <div>
              <label htmlFor="address" className="block mb-2 text-slate-900">Address</label>
              <Input id="address" type="text" placeholder="Your city, state, country" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </div>

            <div>
              <label htmlFor="project" className="block mb-2 text-slate-900">What do you want to make?</label>
              <Textarea id="project" placeholder="Describe the project you'd like built (features, goals, timeline)..." value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} rows={5} required />
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Sending..." : "Submit"}</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
              <li><a href="#" className="text-white/70 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">Shop</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition">Microcontrollers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">Sensors</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">Development Kits</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition">Components</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"><Mail className="w-5 h-5" /></a>
            </div>
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

// ============= MAIN HOME COMPONENT =============
export default function Home() {
  const categoriesRef = useRef(null);
  const projectsRef = useRef(null);

  // now redirect to /products for categories/projects
  const goToProducts = () => {
    window.location.href = "/products";
  };

  const showLearnUnderDev = () => {
    toast("Under development — coming soon!", { description: "We're building new tutorials and guides." });
  };

  const redirectToAuth = () => {
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroBanner />
      <Navbar
        onCategoriesClick={goToProducts}
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
