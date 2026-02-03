// import express from "express";
// import { requireAuth } from "../middlewares/auth.middleware.js";
// import { requireAdmin } from "../middlewares/admin.middleware.js";

// const router = express.Router();

// router.get("/check", requireAuth, requireAdmin, (req, res) => {
//   res.json({ success: true });
// });

// export default router;



import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin access check
router.get("/check", protect, adminOnly, (req, res) => {
  res.json({ success: true, message: "Admin verified" });
});

export default router;
