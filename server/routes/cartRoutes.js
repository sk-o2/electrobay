// // server/routes/cartRoutes.js
// import express from "express";
// import {
//   getCart,
//   addToCart,
//   updateQuantity,
//   removeFromCart,
// } from "../controllers/cartController.js";
// import { protect, authorize } from "../middleware/auth.js";

// const router = express.Router();

// // Get current user's cart
// router.get("/", protect, getCart);

// // Admin: get any user's cart
// router.get("/:userId", protect, authorize(["admin"]), getCart);

// // Cart actions (inferred user from req.user)
// router.post("/add", protect, addToCart);
// router.put("/update", protect, updateQuantity);

// // Remove item from the authenticated user's cart
// router.delete("/remove/:productId", protect, removeFromCart);

// // If you still want admin to remove from any user's cart:
// // router.delete("/remove/:userId/:productId", protect, authorize(['admin']), removeFromCart);

// export default router;









import express from "express";
import { getCart, addToCart, updateQuantity, removeFromCart } from "../controllers/cartController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getCart);
router.post("/add", authenticate, addToCart);
router.put("/update", authenticate, updateQuantity);
router.delete("/remove/:productId", authenticate, removeFromCart);

export default router;
