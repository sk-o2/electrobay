// // server/controllers/admin.order.controller.js
// import Order from "../models/Order.js";

// export const getAllOrders = async (req, res) => {
//   const orders = await Order.find()
//     .populate("user", "name email")
//     .sort({ createdAt: -1 });

//   res.json(orders); // ⚠️ ARRAY ONLY
// };

// export const updateOrderStatus = async (req, res) => {
//   const order = await Order.findByIdAndUpdate(
//     req.params.id,
//     { status: req.body.status },
//     { new: true }
//   );

//   res.json(order);
// };



// server/controllers/admin.order.controller.js
import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


// admin.order.controller.js
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json({ success: true, order });
};
