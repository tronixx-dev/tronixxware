// backend/models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
