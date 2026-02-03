// import express from "express";
// import { getProfile } from "../controllers/user.controller.js";
// import { protect } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// router.get("/profile", protect, getProfile);

// export default router;





import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/update", protect, updateProfile);
router.delete("/delete", protect, deleteAccount);

export default router;
