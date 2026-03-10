// api/products.js
import products from "../backend/data/product.js";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(products);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}