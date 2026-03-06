import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getProductById } from "../api/productApi";
import { useCart } from "../context/CartContext";

export default function ProductDetails({ onFly }) {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  const imgRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    if (onFly) onFly(imgRef);
  };

  if (!product) return <div className="p-10">Loading product...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      
      <img
        ref={imgRef}
        src={product.image || product.images?.[0]}
        alt={product.name}
        className="w-full rounded-lg shadow"
      />

      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <p className="text-2xl font-bold text-blue-600 mb-6">
          ₦{product.price?.toLocaleString()}
        </p>

        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}