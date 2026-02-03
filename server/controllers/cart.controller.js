import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/* GET CART */
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  res.json({
    cart: cart || { items: [] },
  });
};

/* ADD TO CART */
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  res.json({ success: true });
};

/* UPDATE QUANTITY */
export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ error: "Item not in cart" });
  }

  item.quantity = quantity;
  await cart.save();

  res.json({ success: true });
};

/* REMOVE ITEM */
export const removeItem = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  cart.items = cart.items.filter(
    (i) => i.product.toString() !== productId
  );

  await cart.save();

  res.json({ success: true });
};
