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














import Product from "../models/Product.js";

// GET all products with optional category, sorting, and search
export const getProducts = async (req, res) => {
  try {
    const { category, sort, search } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" }; // case-insensitive search

    let sortOptions = {};
    if (sort === "price-asc") sortOptions.price = 1;
    if (sort === "price-desc") sortOptions.price = -1;
    if (sort === "newest") sortOptions.createdAt = -1;

    const products = await Product.find(filter).sort(sortOptions);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// GET single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};