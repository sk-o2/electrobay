// // server/routes/admin.order.routes.js
// import express from "express";
// import { protect, adminOnly } from "../middlewares/auth.middleware.js";
// import {
//   getAllOrders,
//   updateOrderStatus,
// } from "../controllers/admin.order.controller.js";

// const router = express.Router();

// router.use(protect, adminOnly);

// router.get("/", getAllOrders);
// router.put("/:id", updateOrderStatus);

// export default router;



// server/routes/admin.order.routes.js
import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { getAllOrders, updateOrderStatus } from "../controllers/admin.order.controller.js";

const router = express.Router();

router.get("/orders", protect, adminOnly, getAllOrders);
router.put("/orders/:id", protect, adminOnly, updateOrderStatus);

export default router;
