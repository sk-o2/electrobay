

// import express from "express";
// import { protect } from "../middlewares/auth.middleware.js";
// import { placeOrder } from "../controllers/order.controller.js";

// const router = express.Router();

// // Place order (logged-in users only)
// router.post("/", protect, placeOrder);

// export default router;


import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import {
  placeOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getMyOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

/* USER */
router.post("/", protect, placeOrder);

/* ADMIN */
// router.get("/", protect, adminOnly, getOrders);

router.get("/", protect, getAllOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);
router.get("/my-orders", protect, getMyOrders);

export default router;
