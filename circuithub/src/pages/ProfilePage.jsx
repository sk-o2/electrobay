import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, ShoppingCart, User, Edit, LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/user/update", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== `delete_${user.name}`) return alert("Text does not match!");
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/user/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Navbar */}
      <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#F1F5F9] shadow-md">
        <div
          className="font-bold text-xl text-[#2D7D9A] cursor-pointer"
          onClick={() => navigate("/")}
        >
          CircuitHub
        </div>
        <div className="flex-1 mx-4 hidden md:flex items-center bg-white rounded-full px-4 py-2 border border-[#E2E8F0]">
          <Search className="text-[#64748B] mr-2" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none w-full text-[#1E293B]"
          />
        </div>
        <div className="flex items-center space-x-4">
          <ShoppingCart
            size={26}
            className="text-[#2D7D9A] cursor-pointer"
            onClick={() => navigate("/cart")}
          />
          <User
            size={26}
            className="text-[#2D7D9A] cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        </div>
      </nav>

      {/* Profile Layout */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/4 bg-white p-6 border-r border-[#E2E8F0]">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-14 h-14 rounded-full bg-[#3BA8C8] text-white flex items-center justify-center text-xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1E293B]">{user.name}</h2>
              <p className="text-sm text-[#64748B]">{user.email}</p>
            </div>
          </div>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer font-medium ${
                activeTab === "account" ? "text-[#2D7D9A]" : "text-[#475569]"
              }`}
              onClick={() => setActiveTab("account")}
            >
              Account Settings
            </li>
            <li
              className={`cursor-pointer font-medium ${
                activeTab === "orders" ? "text-[#2D7D9A]" : "text-[#475569]"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              My Orders
            </li>
          </ul>
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-6 bg-[#F8FAFC]">
          {activeTab === "account" ? (
            <div className="max-w-lg">
              <h2 className="text-2xl font-semibold mb-6 text-[#2D7D9A]">
                Account Information
              </h2>

              {["name", "phone", "email", "address"].map((field) => (
                <div className="mb-4" key={field}>
                  <label className="block text-[#475569] font-medium capitalize mb-1">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={user[field] || ""}
                    disabled={!isEditing}
                    onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      isEditing ? "bg-white" : "bg-gray-100"
                    }`}
                  />
                </div>
              ))}

              <div className="flex items-center space-x-3 mt-6">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-5 py-2 bg-[#2D7D9A] text-white rounded-lg"
                  >
                    <Edit size={18} className="mr-2" /> Edit
                  </button>
                ) : (
                  <button
                    onClick={handleUpdate}
                    className="flex items-center px-5 py-2 bg-[#22C55E] text-white rounded-lg"
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={() => setLogoutConfirm(true)}
                  className="flex items-center px-5 py-2 bg-[#F9A826] text-white rounded-lg"
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="flex items-center px-5 py-2 bg-[#EF4444] text-white rounded-lg"
                >
                  <Trash2 size={18} className="mr-2" /> Delete Account
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-[#2D7D9A]">
                My Orders
              </h2>
              {orders.length === 0 ? (
                <p className="text-[#475569]">No orders found.</p>
              ) : (
                <div className="grid gap-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white p-4 rounded-lg shadow border"
                    >
                      <p className="text-[#1E293B] font-semibold">
                        Order #{order._id}
                      </p>
                      <p className="text-[#475569] text-sm">
                        Status:{" "}
                        <span
                          className={`${
                            order.status === "Delivered"
                              ? "text-[#22C55E]"
                              : "text-[#F9A826]"
                          } font-medium`}
                        >
                          {order.status}
                        </span>
                      </p>
                      <p className="text-[#64748B] text-sm">
                        Items: {order.items?.length || 0}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Logout Modal */}
      {logoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">Confirm Logout</h3>
            <p className="text-sm mb-5 text-[#475569]">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={() => setLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#F9A826] text-white rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Delete Account</h3>
            <p className="text-sm text-[#475569] mb-3">
              Type <span className="font-bold text-[#EF4444]">delete_{user.name}</span> to confirm.
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4"
              placeholder="Type here..."
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={() => setDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#EF4444] text-white rounded-lg"
                onClick={handleDeleteAccount}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1E293B] text-[#F8FAFC] text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} CircuitHub. All rights reserved.</p>
        <p className="text-sm mt-1">Built with ❤️ by Your Team</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
