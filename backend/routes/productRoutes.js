// routes/productRoutes.js
import express from "express";
import Product from "../models/productModel.js";
import { upload } from "../middleware/uploadMiddleware.js"; // Multer middleware

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
// POST new product with optional image
// ---------------------------
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      name,
      price,
      category,
      inStock: inStock !== "false", // Convert string "false" to boolean false
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
