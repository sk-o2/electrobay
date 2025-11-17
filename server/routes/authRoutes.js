// import { getMe } from "../controllers/authController.js";
// import { verifyToken } from "../middleware/authMiddleware.js"; // middleware to verify JWT
// import express from "express";
// const router=express.Router();
// import {
//   signup,
//   login,
//   verifyEmail,
//     googleAuth,
//   forgotPassword,
//   resetPassword,
// } from "../controllers/authController.js";

// // router.post("/signup", signup);

// router.post("/signup", (req, res, next) => {
//   console.log("✅ Signup route triggered with body:", req.body);
//   next();
// }, signup);
// router.post("/login", login);
// router.post("/google", googleAuth);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
// router.get("/verify-email/:token", verifyEmail);
// router.get("/me", verifyToken, getMe);

// export default router;








// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   deleteAccount,
// } from "../controllers/authController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", authMiddleware, getUserProfile);
// router.delete("/delete", authMiddleware, deleteAccount);

// export default router;




// // routes/authRoutes.js
// import express from "express";
// import {
//   signup,
//   verifyEmail,
//   login,
//   forgotPassword,
//   resetPassword,
//   logout,
//   getProfile,
//   getMe,
// } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { getOrders } from "../controllers/orderController.js";
// // import { checkout } from "../controllers/paymentController.js";

// const router = express.Router();


// router.get("/me", protect, getMe);
// router.post("/signup", signup);
// router.get("/verify/:token", verifyEmail);
// router.post("/login", login);
// router.post("/forgot-password", protect, forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/logout", logout);
// router.get("/profile", protect, getProfile);
// router.get("/orders", protect, getOrders);
// // router.post("/checkout", protect, checkout);

// export default router;
