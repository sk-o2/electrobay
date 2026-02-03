

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: String, // store email or name snapshot
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString(),
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    shortDescription: {
      type: String,
      default: "",
    },

    /* PRICING */
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
    },

    /* MEDIA */
    image: {
      type: String,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    imagesFallback: [
      {
        type: String,
      },
    ],

    /* CLASSIFICATION */
    category: {
      type: String,
      required: true,
      index: true,
    },
    brand: {
      type: String,
      index: true,
    },

    /* INVENTORY */
    stock: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
    },

    /* EXTRA DETAILS */
    weight: {
      type: String,
    },
    dimensions: {
      type: String,
    },
    specifications: {
      type: mongoose.Schema.Types.Mixed, // string or array
    },
    delivery: {
      type: String,
      default: "3-5 days",
    },

    /* REVIEWS */
    reviews: [reviewSchema],

    /* META */
    rating: {
      type: Number,
      default: 4.5,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);





// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema(
//   {
//     user: {
//       type: String,
//       required: true,
//     },
//     comment: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     date: {
//       type: String,
//       default: () => new Date().toLocaleDateString(),
//     },
//   },
//   { _id: false }
// );

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     description: { type: String, default: "" },
//     shortDescription: { type: String, default: "" },

//     price: { type: Number, required: true },
//     mrp: { type: Number },

//     image: { type: String },
//     images: [{ type: String }],
//     imagesFallback: [{ type: String }],

//     category: { type: String, required: true, index: true },
//     brand: { type: String, index: true },

//     stock: { type: Number, default: 0 },
//     sku: { type: String },

//     weight: { type: String },
//     dimensions: { type: String },
//     specifications: { type: mongoose.Schema.Types.Mixed },
//     delivery: { type: String, default: "3-5 days" },

//     reviews: [reviewSchema],

//     rating: { type: Number, default: 4.5 },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);
