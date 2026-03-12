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
// /api/auth/refresh
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { userId: payload.userId },
      process.env.ACCESS_SECRET,
      { expiresIn: "1m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 1 * 60 * 1000,
    });

    res.json({ success: true });
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});


export default router;


