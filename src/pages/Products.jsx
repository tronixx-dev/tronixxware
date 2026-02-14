import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { getAllProducts } from "../api/productApi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
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

  return (
    <div className="px-6 md:px-12 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">
        Products
      </h1>

      <ProductGrid products={products} />
    </div>
  );
}
