// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingCart,
  Menu,
  Package,
  TrendingUp,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  Edit,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ============= UI COMPONENTS =============

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
    gradient:
      "bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-lg",
    outline:
      "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-700",
    ghost: "hover:bg-slate-100 text-slate-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    xs: "h-8 px-2 text-xs",
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

function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

// ============= NAVBAR COMPONENT =============

function Navbar({ onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900">ElectroBay Admin</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="text-slate-700 hover:text-slate-900 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-slate-700 hover:text-slate-900 transition"
            >
              Products
            </button>
            <Button variant="warning" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate("/")}
                className="text-slate-700 hover:text-slate-900 transition text-left"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/products")}
                className="text-slate-700 hover:text-slate-900 transition text-left"
              >
                Products
              </button>
              <Button
                variant="warning"
                size="sm"
                onClick={onLogout}
                className="justify-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ============= FOOTER COMPONENT =============

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
            <p className="text-white/70">
              Your trusted partner for all electronics and development needs.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-white/70 hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-white/70 hover:text-white transition"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white">Contact</h4>
            <p className="text-white/70">electrobay.here@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/70">
          <p>&copy; 2025 ElectroBay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ============= STAT CARD COMPONENT =============

function StatCard({ title, value, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-500 to-purple-600",
    yellow: "from-yellow-400 to-orange-500",
    green: "from-green-400 to-emerald-600",
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm mb-1">{title}</p>
          <p className="text-slate-900 text-3xl">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
}

// ============= MAIN COMPONENT =============

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

axios.defaults.baseURL = API_BASE;
axios.defaults.withCredentials = true; // critical for cookie-based auth
axios.defaults.headers.common["Content-Type"] = "application/json";
const [editingProductId, setEditingProductId] = useState(null);
const [editData, setEditData] = useState({});
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    images: [],
    specifications: [],
    description: "",
    sku: "",
    tags: [],
  });

  // const parseProductsResponse = (res) => {
  //   if (!res) return [];
  //   if (Array.isArray(res)) return res;
  //   if (Array.isArray(res.data)) return res.data;
  //   if (Array.isArray(res.data?.data)) return res.data.data;
  //   return [];
  // };
  const parseProductsResponse = (res) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.products)) return res.products;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.products)) return res.data.products;
    return [];
  };

  const parseOrdersResponse = (res) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      // const { data } = await axios.get("/api/products");
      const parsed = parseProductsResponse(res.data ?? res);
      setProducts(parsed);
    } catch (err) {
      console.error("fetchProducts error:", err);
      setProducts([]);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      const parsed = parseOrdersResponse(res.data ?? res);
      setOrders(parsed);
    } catch (err) {
      console.error("fetchOrders error:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await axios.get("/api/admin/check");
        fetchProducts();
        fetchOrders();
      } catch (err) {
        console.error("Admin check failed", err);
        navigate("/auth");
      }
    };

    checkAdmin();
  }, []);

  const addProduct = async () => {
    try {
      const payload = {
        ...newProduct,
        price: Number(newProduct.price) || 0,
        stock: Number(newProduct.stock) || 0,
        images: Array.isArray(newProduct.images)
          ? newProduct.images
          : (newProduct.images || "")
              .toString()
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
        specifications: Array.isArray(newProduct.specifications)
          ? newProduct.specifications
          : (newProduct.specifications || "")
              .toString()
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
        tags: Array.isArray(newProduct.tags)
          ? newProduct.tags
          : (newProduct.tags || "")
              .toString()
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
      };

      await axios.post("/api/products", payload);
      await fetchProducts();
      setNewProduct({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        images: [],
        specifications: [],
        description: "",
        sku: "",
        tags: [],
      });
    } catch (err) {
      console.error("addProduct error:", err);
      alert("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      await fetchProducts();
    } catch (err) {
      console.error("deleteProduct error:", err);
      alert("Failed to delete product");
    }
  };

  const updateProductStock = async (id, stock) => {
    try {
      await axios.put(`/api/products/${id}`, { stock });
      await fetchProducts();
    } catch (err) {
      console.error("updateProductStock error:", err);
      alert("Failed to update stock");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status });
      await fetchOrders();
    } catch (err) {
      console.error("updateOrderStatus error:", err);
      alert("Failed to update order status");
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout"); // clears cookies on server
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      navigate("/"); // redirect no matter what
    }
  };
  const categories = [
    "Microcontroller",
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
  const updateProduct = async (id) => {
  try {
    await axios.put(`/api/products/${id}`, editData);
    setEditingProductId(null);
    setEditData({});
    fetchProducts();
  } catch (err) {
    console.error("updateProduct error:", err);
    alert("Failed to update product");
  }
};


  // Order Stats
  const totalOrders = Array.isArray(orders) ? orders.length : 0;
  const pendingOrders = Array.isArray(orders)
    ? orders.filter((o) => o.status === "Pending").length
    : 0;
  const fulfilledOrders = Array.isArray(orders)
    ? orders.filter((o) => o.status === "Fulfilled").length
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-grow mt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">
              Manage products, orders, and inventory
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Orders"
              value={totalOrders}
              icon={Package}
              color="blue"
            />
            <StatCard
              title="Pending Orders"
              value={pendingOrders}
              icon={Clock}
              color="yellow"
            />
            <StatCard
              title="Fulfilled Orders"
              value={fulfilledOrders}
              icon={CheckCircle}
              color="green"
            />
          </div>

          {/* Add Product Form */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-slate-900">Add New Product</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />

              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <Input
                placeholder="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />
              <Input
                placeholder="SKU"
                value={newProduct.sku}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, sku: e.target.value })
                }
              />
              <Input
                placeholder="Images (comma separated URLs)"
                value={
                  Array.isArray(newProduct.images)
                    ? newProduct.images.join(",")
                    : newProduct.images
                }
                onChange={(e) =>
                  setNewProduct({ ...newProduct, images: e.target.value })
                }
              />
              <Input
                placeholder="Specifications (comma separated)"
                value={
                  Array.isArray(newProduct.specifications)
                    ? newProduct.specifications.join(",")
                    : newProduct.specifications
                }
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    specifications: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Tags (comma separated)"
                value={
                  Array.isArray(newProduct.tags)
                    ? newProduct.tags.join(",")
                    : newProduct.tags
                }
                onChange={(e) =>
                  setNewProduct({ ...newProduct, tags: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </div>

            <Button onClick={addProduct} variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Card>

          {/* Products Table */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-slate-900">Products</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 text-slate-900">Name</th>
                    <th className="text-left p-3 text-slate-900">Category</th>
                    <th className="text-left p-3 text-slate-900">Price</th>
                    <th className="text-left p-3 text-slate-900">Stock</th>
                    <th className="text-left p-3 text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {Array.isArray(products) && products.map((p) => (
  <tr key={p._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
    
    {/* NAME */}
    <td className="p-3">
      {editingProductId === p._id ? (
        <input
          value={editData.name}
          onChange={(e) =>
            setEditData({ ...editData, name: e.target.value })
          }
          className="border px-2 py-1 rounded w-full"
        />
      ) : (
        p.name
      )}
    </td>

    {/* CATEGORY */}
    <td className="p-3">
      {editingProductId === p._id ? (
        <select
          value={editData.category}
          onChange={(e) =>
            setEditData({ ...editData, category: e.target.value })
          }
          className="border px-2 py-1 rounded w-full"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      ) : (
        p.category
      )}
    </td>

    {/* PRICE */}
    <td className="p-3">
      {editingProductId === p._id ? (
        <input
          type="number"
          value={editData.price}
          onChange={(e) =>
            setEditData({ ...editData, price: e.target.value })
          }
          className="border px-2 py-1 rounded w-full"
        />
      ) : (
        `₹${p.price}`
      )}
    </td>

    {/* STOCK */}
    <td className="p-3">
      {editingProductId === p._id ? (
        <input
          type="number"
          value={editData.stock}
          onChange={(e) =>
            setEditData({ ...editData, stock: e.target.value })
          }
          className="border px-2 py-1 rounded w-full"
        />
      ) : (
        p.stock
      )}
    </td>

    {/* ACTIONS */}
    <td className="p-3">
      <div className="flex gap-2">
        {editingProductId === p._id ? (
          <>
            <Button
              size="xs"
              variant="success"
              onClick={() => updateProduct(p._id)}
            >
              Save
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() => setEditingProductId(null)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setEditingProductId(p._id);
                setEditData(p);
              }}
            >
              <Edit className="w-3 h-3" />
            </Button>

            <Button
              onClick={() => deleteProduct(p._id)}
              variant="danger"
              size="xs"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </>
        )}
      </div>
    </td>
  </tr>
))}

                </tbody>
              </table>
            </div>
          </Card>

          {/* Orders Table */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-slate-900">Orders</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 text-slate-900">Order ID</th>
                    <th className="text-left p-3 text-slate-900">Customer</th>
                    <th className="text-left p-3 text-slate-900">Products</th>
                    <th className="text-left p-3 text-slate-900">Total</th>
                    <th className="text-left p-3 text-slate-900">Status</th>
                    <th className="text-left p-3 text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {Array.isArray(orders) && orders.map((order) => (
                    <tr key={order._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="p-3 text-slate-700 font-mono text-xs">
                        {order._id.substring(0, 8)}...
                      </td>
                      <td className="p-3 text-slate-700">
                        {order.customerName || order.userId || order.user?.name || "N/A"}
                      </td>
                      <td className="p-3 text-slate-600 text-sm">
                        {Array.isArray(order.items) && order.items.map((p, idx) => (
                          <div key={idx}>
                            {p.product?.name || p.product?.title ||  "Unknown"} x {p.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="p-3 text-slate-900">
                        $
                        {Array.isArray(order.items)
                          ? order.items.reduce((sum, p) => {
                              const price = p.productId?.price ?? p.productId?.cost ?? 0;
                              return sum + (price * (p.quantity || order.totalAmount || 0));
                            }, 0).toFixed(2)
                          : "0.00"}
                      </td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          order.status === "Pending" 
                            ? "bg-yellow-100 text-yellow-700" 
                            : order.status === "Fulfilled"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {order.status === "Pending" && (
                          <Button
                            onClick={() => updateOrderStatus(order._id, "Fulfilled")}
                            variant="success"
                            size="xs"
                          >
                            Mark Fulfilled
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))} */}
                  {Array.isArray(orders) &&
                    orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >
                        <td className="p-3 text-slate-700 font-mono text-xs">
                          {order._id.substring(0, 8)}...
                        </td>

                        <td className="p-3 text-slate-700">
                          {order.user?.name || order.customerName || "N/A"}
                        </td>

                        <td className="p-3 text-slate-600 text-sm">
                          {order.items?.map((p, idx) => (
                            <div key={idx}>
                              {p.product?.name || "Unknown"} x {p.quantity}
                            </div>
                          ))}
                        </td>

                        <td className="p-3 text-slate-900">
                          ₹{order.totalAmount?.toFixed(2) || "0.00"}
                        </td>

                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="p-3">
                          {order.status === "Pending" && (
                            <Button
                              onClick={() =>
                                updateOrderStatus(order._id, "Fulfilled")
                              }
                              variant="success"
                              size="xs"
                            >
                              Mark Fulfilled
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}

                  {(!Array.isArray(orders) || orders.length === 0) && (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-slate-500"
                      >
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
