// import express from "express";
// import { protect } from "../middlewares/auth.middleware.js";
// import {
//   getCart,
//   addToCart,
//   updateQuantity,
//   removeItem,
// } from "../controllers/cart.controller.js";
// import { requireAuth } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// router.get("/", requireAuth, getCart);
// router.post("/add", requireAuth, addToCart);
// router.put("/update", requireAuth, updateQuantity);
// router.delete("/remove/:productId", requireAuth, removeItem);

// export default router;






import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateQuantity);
router.delete("/remove/:productId", protect, removeItem);

export default router;
