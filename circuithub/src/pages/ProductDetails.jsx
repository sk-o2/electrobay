// src/pages/ProductDetails.jsx 
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart,User, LogIn, UserPlus, Heart, Star, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import electro from "../assets/electro.png";
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [mainIndex, setMainIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [similar, setSimilar] = useState([]);
  const [related, setRelated] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {

        const res = await axios.get(`${API}/api/products/${id}`);
        const prod = res.data?.product ?? res.data;
        // const prod = res.data?.data ?? res.data;

        setProduct(prod);
        setReviews(prod?.reviews ?? []);

        if (user) {
          try {
            const cartRes = await axios.get("http://localhost:5000/api/cart", { withCredentials: true });
            setCartCount(cartRes.data.items?.length || 0);
          } catch (err) {
            console.debug("Cart fetch failed:", err?.message ?? err);
          }
        }

        const getId = (p) => p?._id ?? p?.id ?? p?.productId;

        const fetchSimilar = async () => {
          try {
            const s = await axios.get(`http://localhost:5000/api/products/${id}/similar`);
            const list = Array.isArray(s.data) ? s.data : s.data?.products ?? [];
            if (list.length) {
              setSimilar(list.slice(0, 12));
              return;
            }
          } catch (err) {
            console.debug("/similar endpoint missing or failed:", err?.message ?? err);
          }

          try {
            if (prod?.brand) {
              const byBrand = await axios.get(
                `http://localhost:5000/api/products?brand=${encodeURIComponent(prod.brand)}&limit=12`
              );
              const list = byBrand.data?.products ?? byBrand.data ?? [];
              const filtered = (Array.isArray(list) ? list : []).filter((p) => getId(p) !== getId(prod));
              if (filtered.length) {
                setSimilar(filtered.slice(0, 12));
                return;
              }
            }
          } catch (err) {
            console.debug("brand query failed:", err?.message ?? err);
          }

          setSimilar([]);
        };

        const fetchRelated = async () => {
          try {
            const r = await axios.get(`http://localhost:5000/api/products/${id}/related`);
            const list = Array.isArray(r.data) ? r.data : r.data?.products ?? [];
            if (list.length) {
              setRelated(list.slice(0, 12));
              return;
            }
          } catch (err) {
            console.debug("/related endpoint missing or failed:", err?.message ?? err);
          }

          try {
            if (prod?.category) {
              const byCat = await axios.get(
                `http://localhost:5000/api/products?category=${encodeURIComponent(prod.category)}&limit=12`
              );
              const list = byCat.data?.products ?? byCat.data ?? [];
              const filtered = (Array.isArray(list) ? list : []).filter((p) => getId(p) !== getId(prod));
              if (filtered.length) {
                setRelated(filtered.slice(0, 12));
                return;
              }
            }
          } catch (err) {
            console.debug("category query failed:", err?.message ?? err);
          }

          try {
            const allRes = await axios.get("http://localhost:5000/api/products?limit=50");
            const list = allRes.data?.products ?? allRes.data ?? [];
            if (Array.isArray(list) && list.length) {
              const myPrice = Number(prod?.price || 0);
              const scored = list
                .filter((p) => getId(p) !== getId(prod))
                .map((p) => {
                  let score = 0;
                  if (prod?.category && p.category === prod.category) score += 10;
                  if (prod?.brand && p.brand === prod.brand) score += 8;
                  const pPrice = Number(p.price || 0);
                  if (pPrice && myPrice) {
                    const diff = Math.abs(pPrice - myPrice) / Math.max(1, myPrice);
                    if (diff < 0.1) score += 6;
                    else if (diff < 0.25) score += 3;
                  }
                  return { p, score };
                })
                .sort((a, b) => b.score - a.score)
                .filter((s) => s.score > 0)
                .map((s) => s.p);

              if (scored.length) {
                setRelated(scored.slice(0, 12));
                return;
              }
            }
          } catch (err) {
            console.debug("broad fetch failed:", err?.message ?? err);
          }

          setRelated([]);
        };

        await Promise.all([fetchSimilar(), fetchRelated()]);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id, user]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: id, quantity: qty },
        { withCredentials: true }
      );
      setCartCount((c) => c + 1);
      alert("Product added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add to cart.");
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/checkout");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to submit a review.");
      navigate("/auth");
      return;
    }
    if (!newReview.trim()) {
      alert("Review cannot be empty.");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        { comment: newReview },
        { withCredentials: true }
      );
      setReviews((r) => [...r, { user: user.name || "You", comment: newReview, date: new Date().toLocaleDateString() }]);
      setNewReview("");
    } catch (err) {
      console.error("Submit review failed:", err);
      alert("Failed to submit review.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">Product not found</p>
          <button onClick={() => navigate("/")} className="mt-4 px-6 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const specsArray =
    Array.isArray(product.specifications) 
      ? product.specifications 
      : typeof product.specifications === "string" 
        ? product.specifications.split("\n").filter(Boolean) 
        : [];

  const images =
    (product.imagesFallback && product.imagesFallback.length) || (product.images && product.images.length)
      ? product.imagesFallback && product.imagesFallback.length
        ? product.imagesFallback
        : product.images
      : [product.image || "https://via.placeholder.com/400"];

  const changeQty = (delta) => setQty((q) => Math.max(1, q + delta));
  const getId = (p) => p?._id ?? p?.id ?? p?.productId;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Glassmorphic Navbar - matching home.jsx */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => navigate("/")}>
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span className="text-slate-900 font-bold cursor-pointer" onClick={() => navigate("/")}><img src={electro} alt="ElectroBay Logo" className="h-8 w-auto" /></span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate("/")} className="text-slate-700 hover:text-slate-900 transition">
                Home
              </button>
              <button className="text-slate-700 hover:text-slate-900 transition">
                Categories
              </button>
              <button className="text-slate-700 hover:text-slate-900 transition">
                Components
              </button>
              <div className="flex items-center gap-3">
                {!user ? (
                  <>
                    <button onClick={() => navigate("/auth")} className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition">
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </button>
                    <button onClick={() => navigate("/register")} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition">
                      <UserPlus className="w-4 h-4" />
                      <span>Sign Up</span>
                    </button>
                  </>
                ) : (
                  // <button className="text-slate-700 hover:text-slate-900 transition">
                  //   {user.name}
                  // </button>
                  <button onClick={()=> navigate("/profile")} className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition">
                                      <User className="w-4 h-4" />
                                      <span>{user.name}</span>
                                    </button>
                )}
              </div>
            </div>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer" onClick={() => navigate("/cart")}> 
                <ShoppingCart className="text-slate-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-slate-900"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              <div className="flex flex-col space-y-4">
                <button onClick={() => navigate("/")} className="text-slate-700 hover:text-slate-900 transition text-left">
                  Home
                </button>
                <button className="text-slate-700 hover:text-slate-900 transition text-left">
                  Categories
                </button>
                <button className="text-slate-700 hover:text-slate-900 transition text-left">
                  Components
                </button>
                <div className="flex flex-col gap-3 pt-2 border-t border-white/20">
                  {!user ? (
                    <>
                      <button onClick={() => navigate("/auth")} className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition">
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </button>
                      <button onClick={() => navigate("/register")} className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition">
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </button>
                    </>
                  ) : (
                    // <button className="text-slate-700 text-left">
                    //   {user.name}
                    // </button>
                    <button onClick={()=> navigate("/profile")} className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition">
                                        <User className="w-4 h-4" />
                                        <span>{user.name}</span>
                                      </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mt-16">
        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Image Gallery */}
          <div className="col-span-1">
            <div
              className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-6 shadow-sm hover:shadow-xl transition-all group"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className={`w-full h-64 lg:h-96 flex items-center justify-center transition-transform duration-300 ${hovered ? "transform scale-105" : ""}`}>
                <img src={images[mainIndex]} alt={product.name} className="max-h-full object-contain rounded-lg" />
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => { setMainIndex(i); setHovered(false); }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg p-1 border-2 transition-all ${
                      i === mainIndex 
                        ? "border-blue-500 shadow-md" 
                        : "border-slate-200 hover:border-slate-300"
                    } bg-white`}
                  >
                    <img src={src} alt={`${product.name}-${i}`} className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Quick Actions */}
            <div className="mt-4 lg:hidden bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-2xl font-bold text-slate-900">₹{product.price}</div>
                  {product.mrp && (
                    <div className="text-sm line-through text-slate-500">₹{product.mrp}</div>
                  )}
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-slate-900">{product.rating ?? "4.5"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <button onClick={() => changeQty(-1)} className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">-</button>
                <div className="px-4 py-2 border border-slate-300 rounded-lg font-medium">{qty}</div>
                <button onClick={() => changeQty(1)} className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">+</button>
                <button 
                  onClick={() => { 
                    if (!user) navigate('/auth'); 
                    else alert('Added to wishlist!'); 
                  }} 
                  className="ml-auto p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={handleAddToCart} className="py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="py-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-2">
              {product.brand && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                  {product.brand}
                </span>
              )}
              {product.category && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {product.category}
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating ?? 4)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-600">({reviews.length} reviews)</span>
              </div>
              <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                product.stock > 0 
                  ? "bg-green-50 text-green-700" 
                  : "bg-red-50 text-red-700"
              }`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {product.shortDescription || product.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.sku && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">SKU</div>
                  <div className="font-medium text-slate-900">{product.sku}</div>
                </div>
              )}
              {product.weight && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">Weight</div>
                  <div className="font-medium text-slate-900">{product.weight}</div>
                </div>
              )}
              {product.dimensions && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 col-span-2">
                  <div className="text-xs text-slate-500 mb-1">Dimensions</div>
                  <div className="font-medium text-slate-900">{product.dimensions}</div>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-3">Specifications</h3>
              <ul className="text-slate-600 space-y-2">
                {specsArray.length ? (
                  specsArray.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{s}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">No specifications provided.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Buy Card (Desktop Sticky) */}
          <div className="col-span-1">
            <div className="hidden lg:block sticky top-24">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Price</div>
                    <div className="text-3xl font-bold text-slate-900">₹{product.price}</div>
                    {product.mrp && (
                      <div className="text-sm line-through text-slate-400">₹{product.mrp}</div>
                    )}
                  </div>
                  {product.mrp && (
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                      Save ₹{(product.mrp - product.price).toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => changeQty(-1)} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                    -
                  </button>
                  <div className="px-4 py-2 border border-slate-300 rounded-lg min-w-[60px] text-center font-medium">
                    {qty}
                  </div>
                  <button onClick={() => changeQty(1)} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                    +
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <button 
                    onClick={handleAddToCart} 
                    className="w-full py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleBuyNow} 
                    className="w-full py-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition"
                  >
                    Buy Now
                  </button>
                </div>

                <button
                  onClick={() => { 
                    if (!user) navigate("/auth"); 
                    else alert("Added to wishlist!"); 
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                >
                  <Heart className="w-5 h-5" />
                  <span>Add to Wishlist</span>
                </button>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-sm text-slate-600">
                    <div className="flex justify-between mb-2">
                      <span>Delivery:</span>
                      <span className="font-medium">{product.delivery || "3-5 days"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 shadow-lg">
              <div className="max-w-7xl mx-auto flex items-center gap-3">
                <button 
                  onClick={() => { 
                    if (!user) navigate("/auth"); 
                    else alert("Wishlist!"); 
                  }} 
                  className="p-3 rounded-lg border border-slate-300 hover:bg-slate-50 transition"
                >
                  <Heart className="w-5 h-5" />
                </button>

                <div className="flex-1">
                  <div className="text-lg font-bold text-slate-900">₹{product.price}</div>
                  <div className="text-xs text-slate-500">{product.delivery || "3-5 days"} delivery</div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={handleAddToCart} 
                    className="px-5 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition"
                  >
                    Add
                  </button>
                  <button 
                    onClick={handleBuyNow} 
                    className="px-5 py-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {/* <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Similar Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similar.length === 0 ? (
              <div className="col-span-full text-center text-slate-500 py-8">
                No similar products found.
              </div>
            ) : (
              similar.map((s) => {
                const sId = getId(s);
                return (
                  <div 
                    key={sId || s.name} 
                    className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => navigate(`/product/${sId}`)}
                  >
                    <div className="h-32 flex items-center justify-center mb-3 overflow-hidden rounded-lg">
                      <img 
                        src={s.images?.[0] || s.image || "https://via.placeholder.com/150"} 
                        alt={s.name} 
                        className="object-contain h-full group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                    <div className="text-sm font-medium text-slate-900 line-clamp-2 mb-2">{s.name}</div>
                    <div className="text-lg font-bold text-slate-900 mb-3">${s.price}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!user) navigate("/auth");
                        else {
                          axios.post("http://localhost:5000/api/cart/add", { productId: sId, quantity: 1 }, { withCredentials: true })
                            .then(() => setCartCount((c) => c + 1))
                            .catch((err) => console.debug("Similar add failed:", err?.message ?? err));
                        }
                      }}
                      className="w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div> */}

        {/* Related Products */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {related.length === 0 ? (
              <div className="col-span-full text-center text-slate-500 py-8">
                No related products found.
              </div>
            ) : (
              related.map((r) => {
                const rId = getId(r);
                return (
                  <div 
                    key={rId || r.name} 
                    className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => navigate(`/product/${rId}`)}
                  >
                    <div className="h-32 flex items-center justify-center mb-3 overflow-hidden rounded-lg">
                      <img 
                        src={r.images?.[0] || r.image || "https://via.placeholder.com/150"} 
                        alt={r.name} 
                        className="object-contain h-full group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                    <div className="text-sm font-medium text-slate-900 line-clamp-2 mb-2">{r.name}</div>
                    <div className="text-lg font-bold text-slate-900 mb-3">₹{r.price}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!user) navigate("/auth");
                        else {
                          axios.post("http://localhost:5000/api/cart/add", { productId: rId, quantity: 1 }, { withCredentials: true })
                            .then(() => setCartCount((c) => c + 1))
                            .catch((err) => console.debug("Related add failed:", err?.message ?? err));
                        }
                      }}
                      className="w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Reviews</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="max-h-96 overflow-y-auto space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    No reviews yet. Be the first to review!
                  </div>
                ) : (
                  reviews.map((review, idx) => (
                    <div key={idx} className="border-b border-slate-200 pb-4 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {review.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{review.name}</p>
                          <p className="text-sm text-slate-500">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-slate-700">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <form onSubmit={handleSubmitReview} className="flex flex-col gap-3">
                <label className="font-medium text-slate-900">Write a Review</label>

                {/* Desktop textarea */}
                <textarea
                  rows={6}
                  className="hidden lg:block border border-slate-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your experience with this product..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  required
                />

                {/* Mobile trigger */}
                <textarea
                  rows={3}
                  className="lg:hidden border border-slate-300 rounded-lg px-4 py-3 resize-none"
                  placeholder="Tap to write a review..."
                  value={newReview}
                  readOnly
                  onClick={() => setReviewModalOpen(true)}
                />

                <button 
                  type="submit" 
                  className="hidden lg:block bg-gradient-to-br from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Review Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 backdrop-blur-md bg-black/40"
              onClick={() => setReviewModalOpen(false)}
            />

            <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">Write a Review</h3>
                <button 
                  onClick={() => setReviewModalOpen(false)} 
                  className="text-slate-400 hover:text-slate-600 transition"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  await handleSubmitReview(e);
                  setReviewModalOpen(false);
                }}
                className="flex flex-col gap-4"
              >
                <textarea
                  rows={6}
                  className="border border-slate-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your experience with this product..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  autoFocus
                  required
                />

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setReviewModalOpen(false)} 
                    className="flex-1 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}







