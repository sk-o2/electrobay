// import Order from "../models/Order.js";
// import Cart from "../models/cartModel.js";
// export const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("products.product");
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     order.status = req.body.status; // e.g., "Pending", "Fulfilled"
//     await order.save();
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";

// export const createOrder = async (req, res) => {
//   try {
//     const { items, address } = req.body;
//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const totalAmount = items.reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     );

//     const newOrder = await Order.create({
//       user: req.user._id,
//       items: items.map((i) => ({
//         product: i.product._id,
//         quantity: i.quantity,
//       })),
//       address,
//       totalAmount,
//       paymentMethod: "COD",
//     });

//     // Clear the user's cart after successful order
//     await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

//     res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to place order" });
//   }
// };

// export const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id }).populate("items.product");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// };







import Order from "../models/Order.js";
import Cart from "../models/cartModel.js";

export const createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    // Create new order
    const newOrder = await Order.create({
      userId: req.user._id,
      items: items.map((i) => ({
        productId: i.productId._id,
        quantity: i.quantity,
      })),
      address,
      totalAmount,
      paymentMethod: "COD",
    });

    // Clear user's cart after successful order
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate(
      "items.productId"
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
 
//update order status......................................................

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status; // e.g., "Pending", "Fulfilled"
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};