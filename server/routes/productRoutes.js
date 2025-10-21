import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// Get all products or filtered by category
router.get("/", getProducts);

// Get single product by ID
router.get("/:id", getProductById);

export default router;
