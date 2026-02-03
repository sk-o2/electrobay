import express from "express";
import * as auth from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { getProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/logout", protect, auth.logout);
router.get("/me", protect, auth.me);
router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/verify-email", auth.verifyEmail);
router.post("/forgot-password", auth.forgotPassword);
router.post("/reset-password/:token", auth.resetPassword);
router.get("/profile", protect, getProfile);
// router.get("/profile", protect, (req, res) => {
//   res.json({ user: req.user });
// });

export default router;


