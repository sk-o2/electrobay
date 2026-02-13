
import Product from "../models/Product.js";

/* =========================
   GET ALL PRODUCTS
========================= */
export const getProducts = async (req, res) => {
  try {
    const { category, sort, search, brand } = req.query;

    const query = {};

    if (category) query.category = category;
    if (brand) query.brand = brand;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
      ];
    }

    let mongoQuery = Product.find(query);

    if (sort === "price-asc") mongoQuery.sort({ price: 1 });
    else if (sort === "price-desc") mongoQuery.sort({ price: -1 });
    else if (sort === "newest") mongoQuery.sort({ createdAt: -1 });

    const products = await mongoQuery.exec();

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

/* =========================
   GET SINGLE PRODUCT (NEW)
========================= */
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to fetch product" });
//   }
// };
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Normalize images for frontend safety
    const obj = product.toObject();
    if ((!obj.images || obj.images.length === 0) && obj.image) {
      obj.images = [obj.image];
    }

    res.json(obj); // ✅ IMPORTANT
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};


/* =========================
   SIMILAR PRODUCTS (NEW)
========================= */
// export const getSimilarProducts = async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (!product)
//     return res.status(404).json({ success: false, message: "Product not found" });

//   const similar = await Product.find({
//     brand: product.brand,
//     _id: { $ne: product._id },
//   }).limit(6);

//   res.json({ success: true, data: similar });
// };

export const getSimilarProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.json([]);

  if (!product.brand) return res.json([]);

  const products = await Product.find({
    brand: product.brand,
    _id: { $ne: product._id },
  }).limit(12);

  res.json(products); // ✅ ARRAY
};


/* =========================
   RELATED PRODUCTS (NEW)
========================= */
// export const getRelatedProducts = async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (!product)
//     return res.status(404).json({ success: false, message: "Product not found" });

//   const related = await Product.find({
//     category: product.category,
//     _id: { $ne: product._id },
//   }).limit(6);

//   res.json({ success: true, data: related });
// };

export const getRelatedProducts = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.json([]);

  if (!product.category) return res.json([]);

  const products = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  }).limit(6);

  res.json(products); // ✅ ARRAY
};


/* =========================
   ADD REVIEW (NEW)
========================= */
export const addReview = async (req, res) => {
  const { comment } = req.body;

  if (!comment)
    return res.status(400).json({ success: false, message: "Comment required" });

  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({ success: false, message: "Product not found" });

  product.reviews.push({
    user: req.user.name || "User",
    comment,
  });

  await product.save();

  res.json({ success: true, message: "Review added", data: product.reviews });
};

/* =========================
   ADMIN CRUD (UNCHANGED)
========================= */
// export const createProduct = async (req, res) => {
//   const product = await Product.create({
//     ...req.body,
//     createdBy: req.user._id,
//   });
//   res.status(201).json({ success: true, data: product });
// };
export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      category: req.body.category?.toLowerCase().trim(),
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};


export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updated)
    return res.status(404).json({ success: false, message: "Product not found" });

  res.json({ success: true, data: updated });
};

export const deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);

  if (!deleted)
    return res.status(404).json({ success: false, message: "Product not found" });

  res.json({ success: true, message: "Product deleted successfully" });
};



