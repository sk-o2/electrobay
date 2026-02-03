// import mongoose from "mongoose";

// const orderItemSchema = new mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     name: String,
//     price: Number,
//     quantity: Number,
//     image: String,
//   },
//   { _id: false }
// );

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     items: [orderItemSchema],

//     address: {
//       type: Object, // flexible (matches your JSON address)
//       required: true,
//     },

//     paymentMethod: {
//       type: String,
//       default: "COD",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["PENDING", "PAID"],
//       default: "PENDING",
//     },

//     orderStatus: {
//       type: String,
//       enum: ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
//       default: "PLACED",
//     },

//     totalAmount: Number,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);




// server/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // snapshot price
      },
    ],

    address: Object,

    totalAmount: Number,

    paymentMethod: String,
    paymentStatus: String,

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
