// import express from "express";
// import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

// const router = express.Router();

// // Get all products or filtered by category
// router.get("/", getProducts);

// // Get single product by ID
// router.get("/:id", getProductById);
// router.post("/", addProduct);             // Add product
// router.put("/:id", updateProduct);        // Update product
// router.delete("/:id", deleteProduct);     // Delete product

// export default router;









// // server/routes/productRoutes.js
// import express from "express";
// import {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/productController.js";

// import { authenticate, authorize } from "../middleware/auth.js"; // uses names from your middleware

// const router = express.Router();

// // Public read routes
// router.get("/", getProducts);
// router.get("/:id", getProductById);

// // Admin-only modifications
// router.post("/", authenticate, authorize(["admin"]), addProduct);      // Add product
// router.put("/:id", authenticate, authorize(["admin"]), updateProduct); // Update product
// router.delete("/:id", authenticate, authorize(["admin"]), deleteProduct); // Delete product

// export default router;







import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,  // add this
} from "../controllers/productController.js";

import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public read routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", authenticate, addReview);  // add review route

// Admin-only modifications
router.post("/", authenticate, authorize(["admin"]), addProduct);
router.put("/:id", authenticate, authorize(["admin"]), updateProduct);
router.delete("/:id", authenticate, authorize(["admin"]), deleteProduct);

export default router;
