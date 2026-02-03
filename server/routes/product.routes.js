
// import express from "express";
// import {
//   getProducts,
//   getProductById,
//   getSimilarProducts,
//   getRelatedProducts,
//   addReview,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/product.controller.js";

// import { protect } from "../middlewares/auth.middleware.js";
// import { requireAdmin } from "../middlewares/admin.middleware.js";

// const router = express.Router();

// /* PUBLIC */
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.get("/:id/similar", getSimilarProducts);
// router.get("/:id/related", getRelatedProducts);

// /* USER */
// router.post("/:id/review", protect, addReview);

// /* ADMIN */
// router.post("/", protect, requireAdmin, createProduct);
// router.put("/:id", protect, requireAdmin, updateProduct);
// router.delete("/:id", protect, requireAdmin, deleteProduct);

// export default router;






import express from "express";
import {
  getProducts,
  getProductById,
  getSimilarProducts,
  getRelatedProducts,
  addReview,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/:id/similar", getSimilarProducts);
router.get("/:id/related", getRelatedProducts);

/* USER */
router.post("/:id/reviews", protect, addReview); // ✅ FIXED

/* ADMIN */
router.post("/", protect, requireAdmin, createProduct);
router.put("/:id", protect, requireAdmin, updateProduct);
router.delete("/:id", protect, requireAdmin, deleteProduct);

export default router;
