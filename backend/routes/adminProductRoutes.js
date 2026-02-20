// routes/adminProductRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import Product from "../models/productModel.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// GET all products (admin)
router.get("/", protect, admin, async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// POST create new product
router.post("/", protect, admin, upload.array("images", 5), async (req, res) => {
  const { name, price, category, description } = req.body;
  const images = req.files.map((file) => `/uploads/${file.filename}`);

  const product = new Product({ name, price, category, description, images });
  const created = await product.save();
  res.status(201).json(created);
});

// PUT update product
router.put("/:id", protect, admin, upload.array("images", 5), async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, price, category, description } = req.body;
  product.name = name || product.name;
  product.price = price || product.price;
  product.category = category || product.category;
  product.description = description || product.description;

  if (req.files.length > 0) {
    product.images = req.files.map((file) => `/uploads/${file.filename}`);
  }

  const updated = await product.save();
  res.json(updated);
});

// DELETE product
router.delete("/:id", protect, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  await product.remove();
  res.json({ message: "Product deleted" });
});

export default router;