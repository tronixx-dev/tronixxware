// routes/productRoutes.js
import express from "express";
import Product from "../models/productModel.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new product (admin only)
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Forbidden" });

    const { name, price, category, inStock } = req.body;
    if (!name || !price) return res.status(400).json({ message: "Name and price are required" });

    const image = req.file ? `/uploads/${req.file.filename}` : "https://via.placeholder.com/400";

    const newProduct = new Product({
      name,
      price,
      category,
      inStock: inStock !== "false",
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;