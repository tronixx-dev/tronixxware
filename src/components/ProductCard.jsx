import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onFly }) {
  const { addToCart } = useCart();
  const imgRef = useRef(null);

  const handleAddToCart = () => {
    // Ensure quantity is always at least 1
    addToCart({ ...product, quantity: 1 });
    if (onFly) onFly(imgRef);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-xl transition-shadow cursor-pointer"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product._id}`}>
        <img
          ref={imgRef}
          src={product.image || "/placeholder.png"} // fallback if image missing
          alt={product.name || "Product"}
          className="h-40 object-cover mb-3 rounded"
        />
      </Link>
      <h3 className="font-semibold">{product.name || "Unnamed Product"}</h3>
      <p className="text-gray-600 mb-2">
        ₦{product.price != null ? product.price.toLocaleString() : "N/A"}
      </p>
      <button
        onClick={handleAddToCart}
        className="mt-auto py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
