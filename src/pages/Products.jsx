import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function Products({ onFly }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(); // Fetch from backend
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No products available.
      </p>
    );
  }

  return (
    <div className="px-6 md:px-12 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Products</h1>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
            onFly={onFly} // optional flying animation
          />
        ))}
      </div>
    </div>
  );
}