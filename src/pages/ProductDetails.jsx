import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { useCart } from "../context/CartContext";
import ProductCarousel from "../components/ProductCarousel";

export default function ProductDetails() {
  const { id } = useParams(); // Backend product _id
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id); // Fetch product by _id
        setProduct(data);
      } catch (err) {
        console.error(`Failed to fetch product ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-400">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20 text-gray-400">Product not found</p>;
  }

  return (
    <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Images */}
        {product.images && product.images.length > 0 ? (
          <ProductCarousel images={product.images} />
        ) : (
          <img
            src="/placeholder.png"
            alt={product.name}
            className="w-full h-80 object-cover rounded-2xl"
          />
        )}

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-white">{product.name}</h1>

          <p className="text-yellow-400 text-2xl mt-4">
            ₦{product.price?.toLocaleString() || "N/A"}
          </p>

          <p className="text-gray-300 mt-6">{product.description}</p>

          <button
            onClick={() => addToCart({ ...product, quantity: 1 })}
            className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}