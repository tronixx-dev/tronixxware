import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function Products({ onFly }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center mt-20 text-gray-400">Loading products...</div>;

  return (
    <div className="px-6 md:px-12 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Products</h1>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              onFly={onFly}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}