import React, { useRef } from "react";
import { useCart } from "../context/CartContext";

// Real product images from Unsplash
const products = [
  {
    id: 1,
    title: "Smartphone",
    price: 120000,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Headphones",
    price: 35000,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Sneakers",
    price: 50000,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1600185364641-b20fcbdc9717?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "T-shirt",
    price: 8000,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1618354698446-c2a2c8490f73?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "Toy Car",
    price: 5000,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1590080877320-9678b6f57b6f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    title: "Sofa",
    price: 150000,
    category: "Home",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
];

export default function Home({ selectedCategory, onFly }) {
  const { addToCart } = useCart();
  const productSectionRef = useRef(null);

  const scrollToProducts = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] flex items-center justify-center mb-12 overflow-hidden z-0">
        {/* Gradient + Blur */}
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
        {products
          .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onFly={onFly}
              addToCart={addToCart}
            />
          ))}
      </div>
    </div>
  );
}

function ProductCard({ product, onFly, addToCart }) {
  const imgRef = useRef(null);

  const handleAdd = () => {
    onFly(imgRef);
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-xl transition-shadow">
      <img
        ref={imgRef}
        src={product.image}
        alt={product.title}
        className="h-40 object-cover rounded mb-3"
      />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-gray-600 mb-2">₦{product.price.toLocaleString()}</p>
      <button
        onClick={handleAdd}
        className="mt-auto py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
