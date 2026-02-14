import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <div className="px-6 md:px-12 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full rounded-2xl"
        />

        <div>
          <h1 className="text-3xl font-bold text-white">
            {product.name}
          </h1>

          <p className="text-yellow-400 text-2xl mt-4">
            ₦{product.price}
          </p>

          <p className="text-gray-300 mt-6">
            {product.description}
          </p>

          <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
