import express from "express";
import products from "../data/product.js"; // this will be your static array

const router = express.Router();

// GET /api/products
router.get("/", (req, res) => {
  res.json(products);
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
});

export default router;