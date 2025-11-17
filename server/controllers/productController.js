// import Product from "../models/Product.js";

// // GET all products or filter by category
// export const getProducts = async (req, res) => {
//   try {
//     const category = req.query.category; // e.g., /api/products?category=Sensors
//     let products;
//     if (category) {
//       products = await Product.find({ category }); // filter by category
//     } else {
//       products = await Product.find(); // all products
//     }
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET single product by ID
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };









// import Product from "../models/Product.js";

// // GET all products with optional category and sorting
// export const getProducts = async (req, res) => {
//   try {
//     const { category, sort } = req.query;

//     let filter = {};
//     if (category) filter.category = category;

//     let sortOptions = {};
//     if (sort === "price-asc") sortOptions.price = 1;
//     if (sort === "price-desc") sortOptions.price = -1;
//     if (sort === "newest") sortOptions.createdAt = -1;

//     const products = await Product.find(filter).sort(sortOptions);
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET single product by ID
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };










//THIS IS THE CODE ONLY FOR ALL PRODUCT FETCHING WITHOUT REVIEWS AND SIMILAR PRODUCTS
// import Product from "../models/Product.js";

// // GET all products with optional category, sorting, and search
// export const getProducts = async (req, res) => {
//   try {
//     const { category, sort, search } = req.query;

//     let filter = {};
//     if (category) filter.category = category;
//     if (search) filter.name = { $regex: search, $options: "i" }; // case-insensitive search

//     let sortOptions = {};
//     if (sort === "price-asc") sortOptions.price = 1;
//     if (sort === "price-desc") sortOptions.price = -1;
//     if (sort === "newest") sortOptions.createdAt = -1;

//     const products = await Product.find(filter).sort(sortOptions);
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET single product by ID
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



//THIS IS THE CODE WITH REVIEWS AND SIMILAR PRODUCTS
// import Product from "../models/Product.js";

// // ✅ Get all products (with optional filters)
// export const getProducts = async (req, res) => {
//   try {
//     const { category, sort, search } = req.query;
//     let query = {};

//     if (category) query.category = category;
//     if (search) query.name = { $regex: search, $options: "i" };

//     let products = Product.find(query);

//     // Sort
//     if (sort === "price-asc") products = products.sort({ price: 1 });
//     else if (sort === "price-desc") products = products.sort({ price: -1 });
//     else if (sort === "newest") products = products.sort({ createdAt: -1 });

//     const result = await products;
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Get single product by ID + similar products
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     // Fetch similar products (same category, excluding this one)
//     const similarProducts = await Product.find({
//       category: product.category,
//       _id: { $ne: product._id },
//     }).limit(8);

//     res.json({ product, similarProducts });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateProduct = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// export const addProduct = async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };





























// server/controllers/productController.js
import Product from "../models/Product.js";


/**
 * GET /api/products
 * Returns list of products (supports: category, sort, search, page, limit)
 * Response: { data: [...], meta: { total, page, limit } }
 */
export const getProducts = async (req, res) => {
  try {
    const { category, sort, search, page = 1, limit = 24 } = req.query;
    const q = {};
    if (category) q.category = category;
    if (search) q.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];

    let query = Product.find(q);

    if (sort === "price-asc") query = query.sort({ price: 1 });
    else if (sort === "price-desc") query = query.sort({ price: -1 });
    else if (sort === "newest") query = query.sort({ createdAt: -1 });

    const pageNum = Math.max(1, parseInt(page, 10));
    const lim = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * lim;

    const [items, total] = await Promise.all([
      query.skip(skip).limit(lim).lean().exec(),
      Product.countDocuments(q)
    ]);

    return res.json({
      data: items,
      meta: { total, page: pageNum, limit: lim }
    });
  } catch (err) {
    console.error("getProducts error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

/**
 * GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });

    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(8).lean();

    return res.json({ product, similarProducts });
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

/**
 * Admin: create product
 */
export const addProduct = async (req, res) => {
  try {
    // ensure images always an array
    const payload = { ...req.body };
    if (payload.image && !payload.images) {
      payload.images = Array.isArray(payload.image) ? payload.image : [payload.image];
      delete payload.image;
    }
    if (!payload.images) payload.images = [];

    const newProduct = new Product(payload);
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (err) {
    console.error("addProduct error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

/**
 * Admin: update product
 */
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    return res.json(updated);
  } catch (err) {
    console.error("updateProduct error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

/**
 * Admin: delete product
 */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};


// Add review to product
export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const user = req.user; // extracted from authenticate middleware

    if (!comment) {
      return res.status(400).json({ message: "Review comment is required" });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.reviews.push({
      user: user.email || user.id || "Anonymous",
      comment,
      date: new Date(),
    });

    await product.save();

    res.status(201).json({ reviews: product.reviews });
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({ message: "Server error while adding review" });
  }
};
