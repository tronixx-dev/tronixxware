// routes/productRoutes.js
import express from "express";
import Product from "../models/productModel.js"; // your model
import { protect } from "../middleware/authMiddleware.js"; // protects routes for logged-in users

const router = express.Router();

// ---------------------------
// GET all products
// ---------------------------
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------------------
// GET single product by ID
// ---------------------------
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------------------
// POST new product (admin only)
// ---------------------------
router.post("/", protect, async (req, res) => {
  try {
    // Only allow admin to add products
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { name, price, category, image, inStock, description } = req.body;

    const newProduct = new Product({
      name,
      price,
      category: category || "General",
      image: image || "https://via.placeholder.com/400",
      inStock: inStock !== false, // default true
      description: description || "",
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;