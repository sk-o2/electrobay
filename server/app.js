




// server/app.js

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// Routes
import adminOrderRoutes from "./routes/admin.order.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import adminProductRoutes from "./routes/admin.product.routes.js";

const app = express();


/* -------------------- MIDDLEWARES -------------------- */

// Parse JSON body
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// CORS (VERY IMPORTANT for axios withCredentials)
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL
    credentials: true,
  })
);

/* -------------------- ROUTES -------------------- */

// Auth routes
app.use("/api/auth", authRoutes);

// User routes (profile)
app.use("/api", userRoutes);
app.use("/api/user", userRoutes);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* -------------------- ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* -------------------- PRODUCTS ROUTES -------------------- */
app.use("/api/products", productRoutes);

/* -------------------- CART ROUTES -------------------- */
app.use("/api/cart", cartRoutes);

/* -------------------- ORDER ROUTES -------------------- */
app.use("/api/orders", orderRoutes);

/* -------------------- ADMIN ROUTES -------------------- */
app.use("/api/admin", adminProductRoutes);

app.use("/api/products", adminProductRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/orders", adminOrderRoutes);

export default app;
