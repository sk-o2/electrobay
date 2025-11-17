// import Cart from "../models/cartModel.js";
// import Product from "../models/Product.js";

// // 🧾 Get user cart
// export const getCart = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const cart = await Cart.findOne({ userId }).populate("items.productId");
//     if (!cart) return res.json({ items: [] });
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch cart", error: err.message });
//   }
// };

// // ➕ Add to cart
// export const addToCart = async (req, res) => {
//   try {
//     const { userId, productId } = req.body;
//     let cart = await Cart.findOne({ userId });

//     if (!cart) cart = new Cart({ userId, items: [] });

//     const itemIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += 1;
//     } else {
//       cart.items.push({ productId, quantity: 1 });
//     }

//     await cart.save();
//     const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
//     res.json(updatedCart);
//   } catch (err) {
//     res.status(500).json({ message: "Error adding to cart", error: err.message });
//   }
// };

// // 🔁 Update quantity
// export const updateQuantity = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const item = cart.items.find((i) => i.productId.toString() === productId);
//     if (item) item.quantity = quantity;

//     await cart.save();
//     const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
//     res.json(updatedCart);
//   } catch (err) {
//     res.status(500).json({ message: "Error updating quantity", error: err.message });
//   }
// };

// // ❌ Remove product
// export const removeFromCart = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;

//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
//     await cart.save();

//     const updatedCart = await Cart.findOne({ userId }).populate("items.productId");
//     res.json(updatedCart);
//   } catch (err) {
//     res.status(500).json({ message: "Error removing product", error: err.message });
//   }
// };
















// server/controllers/cartController.js
import mongoose from "mongoose";
import Cart from "../models/cartModel.js";       // matches your schema file
import Product from "../models/Product.js";

/**
 * Helper to get user id from req.user (works with different JWT shapes)
 */
const getUserIdFromReq = (req) => {
  if (!req.user) return null;
  return req.user._id || req.user.id || req.user.sub || null;
};

/**
 * GET /api/cart
 * Returns the authenticated user's cart (populated)
 */
export const getCart = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const cart = await Cart.findOne({ user: userId }).populate("items.product").lean();
    if (!cart) return res.json({ cart: { user: userId, items: [] }, count: 0 });

    const count = cart.items.reduce((acc, it) => acc + (it.quantity || 0), 0);
    return res.json({ cart, count });
  } catch (err) {
    console.error("getCart error:", err);
    return res.status(500).json({ error: "Server error fetching cart", details: String(err.message || err) });
  }
};

/**
 * POST /api/cart/add
 * Body: { productId, quantity = 1 }
 * Adds product to authenticated user's cart (increments quantity if exists)
 */
export const addToCart = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: "productId is required" });
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ error: "Invalid productId" });

    // check product exists and optionally stock
    const product = await Product.findById(productId).lean();
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (typeof product.stock === "number" && product.stock <= 0) {
      return res.status(400).json({ error: "Product is out of stock" });
    }

    // find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const idx = cart.items.findIndex(it => it.product.toString() === productId.toString());
    if (idx >= 0) {
      cart.items[idx].quantity = Math.max(1, cart.items[idx].quantity + parseInt(quantity, 10));
    } else {
      cart.items.push({ product: productId, quantity: Math.max(1, parseInt(quantity, 10)) });
    }

    await cart.save();

    const populated = await Cart.findById(cart._id).populate("items.product").lean();
    const count = populated.items.reduce((acc, it) => acc + (it.quantity || 0), 0);
    return res.json({ success: true, cart: populated, count });
  } catch (err) {
    console.error("addToCart error:", err);
    return res.status(500).json({ error: "Server error adding to cart", details: String(err.message || err) });
  }
};

/**
 * PUT /api/cart/update
 * Body: { productId, quantity }
 * Set the exact quantity for a product in cart. Remove if quantity <= 0
 */
export const updateQuantity = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const { productId, quantity } = req.body;
    if (!productId || typeof quantity === "undefined") return res.status(400).json({ error: "productId and quantity required" });
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ error: "Invalid productId" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const idx = cart.items.findIndex(it => it.product.toString() === productId.toString());
    if (idx === -1) return res.status(404).json({ error: "Product not in cart" });

    if (parseInt(quantity, 10) <= 0) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].quantity = parseInt(quantity, 10);
    }

    await cart.save();

    const populated = await Cart.findById(cart._id).populate("items.product").lean();
    const count = populated.items.reduce((acc, it) => acc + (it.quantity || 0), 0);
    return res.json({ success: true, cart: populated, count });
  } catch (err) {
    console.error("updateQuantity error:", err);
    return res.status(500).json({ error: "Server error updating cart", details: String(err.message || err) });
  }
};

/**
 * DELETE /api/cart/remove/:productId
 * Removes a product from the authenticated user's cart
 */
export const removeFromCart = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const { productId } = req.params;
    if (!productId) return res.status(400).json({ error: "productId required" });
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ error: "Invalid productId" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const before = cart.items.length;
    cart.items = cart.items.filter(it => it.product.toString() !== productId.toString());
    if (cart.items.length === before) return res.status(404).json({ error: "Product not in cart" });

    await cart.save();

    const populated = await Cart.findById(cart._id).populate("items.product").lean();
    const count = populated.items.reduce((acc, it) => acc + (it.quantity || 0), 0);
    return res.json({ success: true, cart: populated, count });
  } catch (err) {
    console.error("removeFromCart error:", err);
    return res.status(500).json({ error: "Server error removing from cart", details: String(err.message || err) });
  }
};
