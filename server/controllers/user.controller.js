// // server/controllers/user.controller.js

// export const getProfile = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user: {
//         _id: req.user._id,
//         name: req.user.name,
//         email: req.user.email,
//         role: req.user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Profile error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch profile",
//     });
//   }
// };






// // server/controllers/user.controller.js

// export const getProfile = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user: {
//         _id: req.user._id,
//         name: req.user.name,
//         email: req.user.email,
//         phone: req.user.phone || "",
//         address: req.user.address || "",
//         role: req.user.role,
//         createdAt: req.user.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error("Profile error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch profile",
//     });
//   }
// };




import User from "../models/User.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

/* =========================
   GET PROFILE
========================= */
export const getProfile = async (req, res) => {
  try {
    res.json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        address: req.user.address,
        role: req.user.role,
      },
    });
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    if (name !== undefined) req.user.name = name;
    if (phone !== undefined) req.user.phone = phone;
    if (address !== undefined) req.user.address = address;

    await req.user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

/* =========================
   DELETE ACCOUNT
========================= */
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete related data
    await Order.deleteMany({ user: userId });
    await Cart.deleteMany({ user: userId });

    await User.findByIdAndDelete(userId);

    // Clear auth cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("deleteAccount error:", err);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
