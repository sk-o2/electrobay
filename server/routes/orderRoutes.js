



// import express from "express";
// import {
//   getOrders,
//   updateOrderStatus,
//   createOrder,
// } from "../controllers/orderController.js";
// import Order from "../models/Order.js";
// import { protect } from "../middleware/auth.js";

// const router = express.Router();

// /**
//  * ==============================
//  * 🔹 Get All Orders for Logged-in User
//  * ==============================
//  */
// router.get("/", protect, async (req, res) => {
//   try {
//     // Find orders belonging to logged-in user and populate product details
//     const orders = await Order.find({ userId: req.user._id }).populate(
//       "items.productId"
//     );

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("❌ Failed to fetch orders:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * ==============================
//  * 🔹 Admin: Update Order Status
//  * ==============================
//  */
// router.put("/:id/status", updateOrderStatus);

// /**
//  * ==============================
//  * 🔹 Create New Order (User Checkout)
//  * ==============================
//  */
// router.post("/", protect, async (req, res) => {
//   try {
//     const { items, address } = req.body;

//     // ✅ 1. Validate input
//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }
//     if (!address || address.trim() === "") {
//       return res.status(400).json({ message: "Delivery address is required" });
//     }

//     // ✅ 2. Calculate total price based on product price × quantity
//     const totalAmount = items.reduce((acc, item) => {
//       const price = item.productId?.price || 0; // item.productId is populated from frontend
//       const qty = item.quantity || 1;
//       return acc + price * qty;
//     }, 0);

//     // ✅ 3. Create new order
//     const newOrder = new Order({
//       userId: req.user._id,
//       items,
//       address,
//       totalAmount,
//       status: "Processing",
//       createdAt: new Date(),
//     });

//     await newOrder.save();

//     // ✅ 4. Return success
//     res
//       .status(201)
//       .json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     console.error("❌ Order creation failed:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;




// routes/orderRoutes.js
import express from "express";
import {
  getOrders,
  updateOrderStatus,
  createOrder,
} from "../controllers/orderController.js";
import Order from "../models/Order.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

/**
 * Helper to safely extract user id from JWT payload
 * Supports common shapes: { _id }, { id }, { sub }
 */
const getUserIdFromReq = (req) => req.user?._id || req.user?.id || req.user?.sub;

/**
 * ==============================
 * 🔹 Get All Orders for Logged-in User
 * ==============================
 */
router.get("/", protect, async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    // Find orders belonging to logged-in user and populate product details
    const orders = await Order.find({ userId }).populate("items.productId");

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Failed to fetch orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ==============================
 * 🔹 Admin: Update Order Status
 * ==============================
 *
 * Protected so only admins can update order status
 */
router.put("/:id/status", protect, authorize(["admin"]), updateOrderStatus);

/**
 * ==============================
 * 🔹 Create New Order (User Checkout)
 * ==============================
 */
router.post("/", protect, async (req, res) => {
  try {
    const { items, address } = req.body;

    // ✅ 1. Validate input
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    if (!address || (typeof address === "string" ? address.trim() === "" : false)) {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    // Resolve user id
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    // ✅ 2. Calculate total price based on product price × quantity
    // NOTE: currently this trusts item.productId.price coming from the client.
    // For production, fetch product prices on the server to avoid price tampering.
    const totalAmount = items.reduce((acc, item) => {
      const price = item.productId?.price || 0; // item.productId is expected to include price
      const qty = item.quantity || 1;
      return acc + price * qty;
    }, 0);

    // ✅ 3. Create new order
    const newOrder = new Order({
      userId,
      items,
      address,
      totalAmount,
      status: "Processing",
      createdAt: new Date(),
    });

    await newOrder.save();

    // ✅ 4. Return success
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Order creation failed:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
