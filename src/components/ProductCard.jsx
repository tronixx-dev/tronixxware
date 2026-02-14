import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function ProductCard({ product, onFly }) {
  const { addToCart } = useCart();
  const imgRef = useRef(null);

  const handleAddToCart = () => {
    addToCart(product);
    onFly?.(imgRef);
  };

  return (
    <motion.div
      className="bg-white rounded shadow p-3 flex flex-col cursor-pointer"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`}>
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="h-40 object-cover mb-2 rounded"
        />
      </Link>
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
