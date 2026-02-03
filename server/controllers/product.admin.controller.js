// import Product from "../models/Product.js";

// /* =========================
//    ADMIN: GET ALL PRODUCTS
// ========================= */
// export const getAdminProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products); // 🔥 ARRAY ONLY
//   } catch (error) {
//     console.error("Admin get products error:", error);
//     res.status(500).json({ message: "Failed to fetch products" });
//   }
// };

// /* =========================
//    ADMIN: GET SINGLE PRODUCT
// ========================= */
// export const getAdminProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product); // 🔥 OBJECT ONLY
//   } catch (error) {
//     console.error("Admin get product error:", error);
//     res.status(500).json({ message: "Failed to fetch product" });
//   }
// };



// server/controllers/admin.product.controller.js
import Product from "../models/Product.js";

export const getAdminProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products); // ⚠️ ARRAY ONLY
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};


// export const updateProduct = async (req, res) => {
//   const product = await Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(product);
// };
// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const { stock } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (stock !== undefined) {
    product.stock = stock;
  }

  await product.save();

  res.json(product);
};


export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
