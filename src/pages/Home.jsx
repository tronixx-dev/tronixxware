import { useEffect, useState, useRef } from "react";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext.jsx";

export default function Home({ selectedCategory = "All", onFly }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productSectionRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading)
    return <div className="text-center mt-20 text-gray-400">Loading products...</div>;

  const filteredProducts = products.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] flex items-center justify-center mb-12 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-black/80 backdrop-blur-md"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-400 drop-shadow-xl mb-6">
            Welcome to Tronixxware
          </h1>
          <button
            onClick={scrollToProducts}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div
        ref={productSectionRef}
        className="px-6 py-8 grid gap-6 md:grid-cols-3 lg:grid-cols-4"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              onFly={onFly}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}