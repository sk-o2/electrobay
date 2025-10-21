import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, Menu, X, ChevronDown } from "lucide-react";

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

  const categories = [
    "Microcontrollers",
    "Sensors",
    "Modules & Shields",
    "Actuators & Motors",
    "Power & Batteries",
    "Cables & Connectors",
    "Prototyping & Accessories",
    "Tools & Equipment",
  ];

  // Fetch products from backend
  const fetchProducts = async (category = "", sort = "", search = "") => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/products";
      const params = [];
      if (category) params.push(`category=${encodeURIComponent(category)}`);
      if (sort) params.push(`sort=${encodeURIComponent(sort)}`);
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (params.length) url += `?${params.join("&")}`;

      const res = await axios.get(url);
      setProducts(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever category, sort, or search changes (with debounce)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts(selectedCategory, sortOption, searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [selectedCategory, sortOption, searchTerm]);

  // Close dropdowns when clicking outside
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#F1F5F9] shadow-md relative">
        {/* Logo */}
        <div className="font-bold text-xl text-[#2D7D9A] cursor-pointer">CircuitHub</div>

        {/* Search bar */}
        <div className="flex-1 mx-4 hidden sm:flex items-center bg-white rounded-full px-4 py-2 border border-[#E2E8F0]">
          <Search className="text-[#64748B] mr-2" size={18} />
          <input
            type="text"
            placeholder="Search components..."
            className="bg-transparent outline-none w-full text-[#1E293B]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6" ref={dropdownRef}>
          {/* Categories */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCategories(!showCategories);
                setShowFilters(false);
              }}
              className="flex items-center font-medium text-[#1E293B] hover:text-[#3BA8C8]"
            >
              Categories <ChevronDown size={18} className="ml-1" />
            </button>
            {showCategories && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E8F0] rounded-lg shadow-md z-10">
                <div
                  onClick={() => {
                    setSelectedCategory("");
                    setShowCategories(false);
                  }}
                  className={`px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer ${
                    selectedCategory === "" ? "bg-[#F9A826]/30 font-semibold" : ""
                  } text-[#1E293B]`}
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
                    className={`px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer ${
                      selectedCategory === cat ? "bg-[#F9A826]/30 font-semibold" : ""
                    } text-[#1E293B]`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFilters(!showFilters);
                setShowCategories(false);
              }}
              className="flex items-center font-medium text-[#1E293B] hover:text-[#3BA8C8]"
            >
              Filters <ChevronDown size={18} className="ml-1" />
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-md z-10">
                <div
                  className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
                  onClick={() => {
                    setSortOption("price-asc");
                    setShowFilters(false);
                  }}
                >
                  Price: Low to High
                </div>
                <div
                  className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
                  onClick={() => {
                    setSortOption("price-desc");
                    setShowFilters(false);
                  }}
                >
                  Price: High to Low
                </div>
                <div
                  className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
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
        </div>

        {/* Hamburger menu */}
        <div className="md:hidden ml-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} color="#2D7D9A"/> : <Menu size={28} color="#2D7D9A"/>}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-b z-20">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile search */}
            <div className="flex items-center bg-[#F8FAFC] rounded-full px-3 py-2 mb-2 border border-[#E2E8F0]">
              <Search className="text-[#64748B] mr-2" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-[#1E293B] text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex justify-between w-full font-medium text-[#1E293B] hover:text-[#3BA8C8]"
              >
                Categories <ChevronDown size={18} />
              </button>
              {showCategories && (
                <div className="mt-2 space-y-1">
                  <div
                    onClick={() => {
                      setSelectedCategory("");
                      setShowCategories(false);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer ${
                      selectedCategory === "" ? "bg-[#F9A826]/30 font-semibold" : ""
                    } text-[#1E293B]`}
                  >
                    All Products
                  </div>
                  {categories.map((cat, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowCategories(false);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer ${
                        selectedCategory === cat ? "bg-[#F9A826]/30 font-semibold" : ""
                      } text-[#1E293B]`}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Filters */}
            <div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex justify-between w-full font-medium text-[#1E293B] hover:text-[#3BA8C8]"
              >
                Filters <ChevronDown size={18} />
              </button>
              {showFilters && (
                <div className="mt-2 space-y-1">
                  <div
                    className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
                    onClick={() => {
                      setSortOption("price-asc");
                      setShowFilters(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Price: Low to High
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
                    onClick={() => {
                      setSortOption("price-desc");
                      setShowFilters(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Price: High to Low
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-[#F9A826]/20 cursor-pointer text-[#1E293B]"
                    onClick={() => {
                      setSortOption("newest");
                      setShowFilters(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Newest First
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <section className="flex-grow px-4 sm:px-8 py-10">
        <h2 className="text-2xl font-bold text-[#2D7D9A] mb-6">
          {selectedCategory || "All Products"}
        </h2>

        {loading ? (
          <p className="text-[#64748B] text-lg animate-pulse">Loading products...</p>
        ) : error ? (
          <p className="text-[#EF4444] text-lg">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-[#64748B] text-lg">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#FFFFFF] rounded-2xl shadow-md hover:shadow-lg border border-[#E2E8F0] transition p-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-[#1E293B] text-lg">{product.name}</h3>
                <p className="text-[#64748B] text-sm">{product.category}</p>
                {product.stock > 0 ? (
                  <p className="text-[#22C55E] font-semibold mt-1">In Stock</p>
                ) : (
                  <p className="text-[#EF4444] font-semibold mt-1">Out of Stock</p>
                )}
                <p className="text-[#2D7D9A] font-bold mt-2">${product.price}</p>
                <button className="mt-3 w-full bg-[#F9A826] text-[#1E293B] py-2 rounded-lg hover:bg-[#3BA8C8] transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
        <p className="text-sm mt-1">Built with ❤️ by Your Team</p>
      </footer>
    </div>
  );
};

export default ProductPage;
