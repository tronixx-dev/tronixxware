// models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, default: "General", trim: true },
    image: { type: String, required: true, default: "https://via.placeholder.com/400" },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", category: 1 });

export default mongoose.model("Product", productSchema);