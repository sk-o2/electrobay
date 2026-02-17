// import express from "express";
// import { protect, adminOnly } from "../middlewares/auth.middleware.js";
// import {
//   getAdminProducts,
//   getAdminProductById,
// } from "../controllers/product.admin.controller.js";

// const router = express.Router();

// router.get("/products", protect, adminOnly, getAdminProducts);
// router.get("/products/:id", protect, adminOnly, getAdminProductById);

// export default router;



// server/routes/admin.product.routes.js
import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.admin.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAdminProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.put("/api/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

router.delete("/:id", deleteProduct);

export default router;
