

// server/controllers/order.controller.js

import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// 
// server/controllers/order.controller.js

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
      totalAmount += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = await Order.create({
      user: userId,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod: "COD",
      paymentStatus: "PENDING",
      status: "Pending",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
};



/* =========================
   GET ALL ORDERS (ADMIN)
========================= */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders); // ✅ array only
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* =========================
   UPDATE ORDER STATUS (ADMIN)
========================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
};




//get all orders 
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price");

    res.json(orders);
  } catch (err) {
    console.error("getAllOrders error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};



//GET ORDERS FOR THE ORDER PROFILE 
// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id })
//       .populate("items.product", "name price image")
//       .sort({ createdAt: -1 });

//     res.json(orders); // 👈 return ARRAY, not object
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// };
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price images")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

