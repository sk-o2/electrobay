// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: true },
//   description: { type: String },
// });

// export default mongoose.model("Product", productSchema);














// // server/models/Product.js
// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   category: { type: String, required: true, trim: true },
//   price: { type: Number, required: true, min: 0 },
//   // legacy single image (kept for backwards compatibility)
//   image: { type: String, default: "" },

//   // preferred: array of image URLs
//   images: { type: [String], default: [] },

//   description: { type: String, default: "" },

//   // stock quantity
//   stock: { type: Number, default: 0, min: 0 },

//   // optional specs / JSON string / plain text
//   specifications: { type: String, default: "" },

//   // optional metadata
//   sku: { type: String, default: "" },
//   tags: { type: [String], default: [] },

// }, { timestamps: true });

// // virtual to always return images array (fall back to `image` if images empty)
// productSchema.virtual("imagesFallback").get(function () {
//   if (Array.isArray(this.images) && this.images.length) return this.images;
//   if (this.image) return [this.image];
//   return [];
// });

// // ensure virtuals included when toJSON / toObject
// productSchema.set("toJSON", { virtuals: true });
// productSchema.set("toObject", { virtuals: true });

// export default mongoose.model("Product", productSchema);











import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },

  // legacy single image (kept for backwards compatibility)
  image: { type: String, default: "" },

  // preferred: array of image URLs
  images: { type: [String], default: [] },

  description: { type: String, default: "" },

  stock: { type: Number, default: 0, min: 0 },

  // Change specifications to array of strings for listing
  specifications: { type: [String], default: [] },

  sku: { type: String, default: "" },
  tags: { type: [String], default: [] },

  // New reviews array with subdocuments
  reviews: { type: [reviewSchema], default: [] },
}, { timestamps: true });

// virtual to always return images array (fall back to `image` if images empty)
productSchema.virtual("imagesFallback").get(function () {
  if (Array.isArray(this.images) && this.images.length) return this.images;
  if (this.image) return [this.image];
  return [];
});

// Ensure virtuals included when toJSON/toObject
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default mongoose.model("Product", productSchema);
