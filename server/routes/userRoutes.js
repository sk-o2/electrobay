import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/update", protect, updateUserProfile);
router.delete("/delete", protect, deleteUserAccount);

export default router;

