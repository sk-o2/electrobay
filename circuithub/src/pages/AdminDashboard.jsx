// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "",
//     price: 0,
//     stock: 0,
//     images: [],
//     specifications: "",
//   });

//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/api/products");
//     setProducts(res.data);
//   };

//   const fetchOrders = async () => {
//     const res = await axios.get("http://localhost:5000/api/orders");
//     setOrders(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchOrders();
//   }, []);

//   const addProduct = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/products", newProduct);
//       fetchProducts();
//       setNewProduct({
//         name: "",
//         category: "",
//         price: 0,
//         stock: 0,
//         images: [],
//         specifications: "",
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteProduct = async (id) => {
//     await axios.delete(`http://localhost:5000/api/products/${id}`);
//     fetchProducts();
//   };

//   const updateProductStock = async (id, stock) => {
//     await axios.put(`http://localhost:5000/api/products/${id}`, { stock });
//     fetchProducts();
//   };

//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status });
//       fetchOrders();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Order Stats
//   const totalOrders = orders.length;
//   const pendingOrders = orders.filter((o) => o.status === "Pending").length;
//   const fulfilledOrders = orders.filter((o) => o.status === "Fulfilled").length;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-6">
//       {/* Navbar */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#2D7D9A]">Admin Dashboard</h1>
//         <button className="bg-[#F9A826] px-4 py-2 rounded-lg">Logout</button>
//       </div>

//       {/* Stats */}
//       <div className="flex flex-col md:flex-row gap-6 mb-6">
//         <div className="bg-white p-4 rounded-lg shadow flex-1 text-center">
//           <h2 className="font-bold text-[#1E293B]">Total Orders</h2>
//           <p className="text-[#2D7D9A] text-xl">{totalOrders}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow flex-1 text-center">
//           <h2 className="font-bold text-[#1E293B]">Pending Orders</h2>
//           <p className="text-[#F9A826] text-xl">{pendingOrders}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow flex-1 text-center">
//           <h2 className="font-bold text-[#1E293B]">Fulfilled Orders</h2>
//           <p className="text-[#22C55E] text-xl">{fulfilledOrders}</p>
//         </div>
//       </div>

//       {/* Add Product Form */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6">
//         <h2 className="text-xl font-bold text-[#1E293B] mb-4">Add New Product</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input
//             placeholder="Name"
//             value={newProduct.name}
//             onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             placeholder="Category"
//             value={newProduct.category}
//             onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             placeholder="Price"
//             type="number"
//             value={newProduct.price}
//             onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
//             className="border p-2 rounded"
//           />
//           <input
//             placeholder="Stock"
//             type="number"
//             value={newProduct.stock}
//             onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
//             className="border p-2 rounded"
//           />
//           <input
//             placeholder="Images (comma separated URLs)"
//             value={newProduct.images}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, images: e.target.value.split(",") })
//             }
//             className="border p-2 rounded"
//           />
//           <input
//             placeholder="Specifications"
//             value={newProduct.specifications}
//             onChange={(e) => setNewProduct({ ...newProduct, specifications: e.target.value })}
//             className="border p-2 rounded"
//           />
//         </div>
//         <button
//           onClick={addProduct}
//           className="mt-4 bg-[#2D7D9A] text-white px-4 py-2 rounded-lg hover:bg-[#3BA8C8] transition"
//         >
//           Add Product
//         </button>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
//         <h2 className="text-xl font-bold text-[#1E293B] mb-4">Products</h2>
//         <table className="w-full text-left border-collapse min-w-[600px]">
//           <thead>
//             <tr>
//               <th className="border-b p-2">Name</th>
//               <th className="border-b p-2">Category</th>
//               <th className="border-b p-2">Price</th>
//               <th className="border-b p-2">Stock</th>
//               <th className="border-b p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p._id}>
//                 <td className="border-b p-2">{p.name}</td>
//                 <td className="border-b p-2">{p.category}</td>
//                 <td className="border-b p-2">${p.price}</td>
//                 <td className="border-b p-2">{p.stock}</td>
//                 <td className="border-b p-2 flex gap-2">
//                   <button
//                     onClick={() => updateProductStock(p._id, p.stock + 1)}
//                     className="bg-[#F9A826] px-2 py-1 rounded hover:bg-[#3BA8C8]"
//                   >
//                     +1
//                   </button>
//                   <button
//                     onClick={() => deleteProduct(p._id)}
//                     className="bg-[#EF4444] px-2 py-1 rounded hover:bg-[#F87171]"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
//         <h2 className="text-xl font-bold text-[#1E293B] mb-4">Orders</h2>
//         <table className="w-full text-left border-collapse min-w-[800px]">
//           <thead>
//             <tr>
//               <th className="border-b p-2">Order ID</th>
//               <th className="border-b p-2">Customer</th>
//               <th className="border-b p-2">Products</th>
//               <th className="border-b p-2">Total ($)</th>
//               <th className="border-b p-2">Status</th>
//               <th className="border-b p-2">Update</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td className="border-b p-2">{order._id}</td>
//                 <td className="border-b p-2">{order.customerName || "N/A"}</td>
//                 <td className="border-b p-2">
//                   {order.products.map((p, idx) => (
//                     <div key={idx}>
//                       {p.product.name} x {p.quantity}
//                     </div>
//                   ))}
//                 </td>
//                 <td className="border-b p-2">
//                   {order.products.reduce((sum, p) => sum + p.product.price * p.quantity, 0).toFixed(2)}
//                 </td>
//                 <td className={`border-b p-2 ${order.status === "Pending" ? "text-[#F9A826]" : "text-[#22C55E]"}`}>
//                   {order.status}
//                 </td>
//                 <td className="border-b p-2">
//                   {order.status === "Pending" && (
//                     <button
//                       onClick={() => updateOrderStatus(order._id, "Fulfilled")}
//                       className="bg-[#2D7D9A] text-white px-2 py-1 rounded hover:bg-[#3BA8C8]"
//                     >
//                       Mark Fulfilled
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;















import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    images: [], // array
    specifications: [], // array
    description: "",
    sku: "",
    tags: [],
  });

  const parseProductsResponse = (res) => {
    // backend may return either: [] OR { data: [...], meta: {...} }
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  };

  const parseOrdersResponse = (res) => {
    // backend might return array or { data: [...] }
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const parsed = parseProductsResponse(res.data ?? res);
      setProducts(parsed);
    } catch (err) {
      console.error("fetchProducts error:", err);
      setProducts([]);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      const parsed = parseOrdersResponse(res.data ?? res);
      setOrders(parsed);
    } catch (err) {
      console.error("fetchOrders error:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const addProduct = async () => {
    try {
      // normalize payload to match new product schema (arrays expected)
      const payload = {
        ...newProduct,
        price: Number(newProduct.price) || 0,
        stock: Number(newProduct.stock) || 0,
        images: Array.isArray(newProduct.images)
          ? newProduct.images
          : (newProduct.images || "").toString().split(",").map(s => s.trim()).filter(Boolean),
        specifications: Array.isArray(newProduct.specifications)
          ? newProduct.specifications
          : (newProduct.specifications || "").toString().split(",").map(s => s.trim()).filter(Boolean),
        tags: Array.isArray(newProduct.tags)
          ? newProduct.tags
          : (newProduct.tags || "").toString().split(",").map(s => s.trim()).filter(Boolean),
      };

      await axios.post("http://localhost:5000/api/products", payload);
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
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      await fetchProducts();
    } catch (err) {
      console.error("deleteProduct error:", err);
    }
  };

  const updateProductStock = async (id, stock) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, { stock });
      await fetchProducts();
    } catch (err) {
      console.error("updateProductStock error:", err);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      // backend update expects PUT /api/orders/:id with { status }
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status });
      await fetchOrders();
    } catch (err) {
      console.error("updateOrderStatus error:", err);
    }
  };

  // Order Stats (safe guards if orders isn't an array)
  const totalOrders = Array.isArray(orders) ? orders.length : 0;
  const pendingOrders = Array.isArray(orders) ? orders.filter((o) => o.status === "Pending").length : 0;
  const fulfilledOrders = Array.isArray(orders) ? orders.filter((o) => o.status === "Fulfilled").length : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2D7D9A]">Admin Dashboard</h1>
        <button className="bg-[#F9A826] px-4 py-2 rounded-lg">Logout</button>
      </div>

      {/* Stats */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex-1 text-center">
          <h2 className="font-bold text-[#1E293B]">Total Orders</h2>
          <p className="text-[#2D7D9A] text-xl">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex-1 text-center">
          <h2 className="font-bold text-[#1E293B]">Pending Orders</h2>
          <p className="text-[#F9A826] text-xl">{pendingOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex-1 text-center">
          <h2 className="font-bold text-[#1E293B]">Fulfilled Orders</h2>
          <p className="text-[#22C55E] text-xl">{fulfilledOrders}</p>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold text-[#1E293B] mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Stock"
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Images (comma separated URLs)"
            value={Array.isArray(newProduct.images) ? newProduct.images.join(",") : newProduct.images}
            onChange={(e) =>
              setNewProduct({ ...newProduct, images: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            placeholder="Specifications (comma separated)"
            value={Array.isArray(newProduct.specifications) ? newProduct.specifications.join(",") : newProduct.specifications}
            onChange={(e) => setNewProduct({ ...newProduct, specifications: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Tags (comma separated)"
            value={Array.isArray(newProduct.tags) ? newProduct.tags.join(",") : newProduct.tags}
            onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="SKU"
            value={newProduct.sku}
            onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Short description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={addProduct}
          className="mt-4 bg-[#2D7D9A] text-white px-4 py-2 rounded-lg hover:bg-[#3BA8C8] transition"
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-[#1E293B] mb-4">Products</h2>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="border-b p-2">Name</th>
              <th className="border-b p-2">Category</th>
              <th className="border-b p-2">Price</th>
              <th className="border-b p-2">Stock</th>
              <th className="border-b p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.map((p) => (
              <tr key={p._id}>
                <td className="border-b p-2">{p.name}</td>
                <td className="border-b p-2">{p.category}</td>
                <td className="border-b p-2">${p.price}</td>
                <td className="border-b p-2">{p.stock}</td>
                <td className="border-b p-2 flex gap-2">
                  <button
                    onClick={() => updateProductStock(p._id, (p.stock || 0) + 1)}
                    className="bg-[#F9A826] px-2 py-1 rounded hover:bg-[#3BA8C8]"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-[#EF4444] px-2 py-1 rounded hover:bg-[#F87171]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {(!Array.isArray(products) || products.length === 0) && (
              <tr><td colSpan={5} className="p-4 text-center text-sm text-gray-500">No products found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-[#1E293B] mb-4">Orders</h2>
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="border-b p-2">Order ID</th>
              <th className="border-b p-2">Customer</th>
              <th className="border-b p-2">Products</th>
              <th className="border-b p-2">Total ($)</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.map((order) => (
              <tr key={order._id}>
                <td className="border-b p-2">{order._id}</td>
                <td className="border-b p-2">{order.customerName || order.userId || "N/A"}</td>
                <td className="border-b p-2">
                  {Array.isArray(order.items) && order.items.map((p, idx) => (
                    <div key={idx}>
                      {p.productId?.name || p.productId?.title || "Unknown"} x {p.quantity}
                    </div>
                  ))}
                </td>
                <td className="border-b p-2">
                  {Array.isArray(order.items)
                    ? order.items.reduce((sum, p) => {
                        const price = p.productId?.price ?? p.productId?.cost ?? 0;
                        return sum + (price * (p.quantity || 0));
                      }, 0).toFixed(2)
                    : "0.00"}
                </td>
                <td className={`border-b p-2 ${order.status === "Pending" ? "text-[#F9A826]" : "text-[#22C55E]"}`}>
                  {order.status}
                </td>
                <td className="border-b p-2">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "Fulfilled")}
                      className="bg-[#2D7D9A] text-white px-2 py-1 rounded hover:bg-[#3BA8C8]"
                    >
                      Mark Fulfilled
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {(!Array.isArray(orders) || orders.length === 0) && (
              <tr><td colSpan={6} className="p-4 text-center text-sm text-gray-500">No orders found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
