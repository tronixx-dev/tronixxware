import { Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";

import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import FlyingImage from "./components/FlyingImage";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [flyingImages, setFlyingImages] = useState([]);
  const cartIconRef = useRef(null);

  const handleFly = (imgRef) => {
    if (!imgRef.current || !cartIconRef.current) return;

    const startRect = imgRef.current.getBoundingClientRect();
    const endRect = cartIconRef.current.getBoundingClientRect();

    const newFly = {
      id: Date.now(),
      src: imgRef.current.src,
      start: { x: startRect.left, y: startRect.top },
      end: { x: endRect.left, y: endRect.top },
    };

    setFlyingImages((prev) => [...prev, newFly]);
  };

  const removeFly = (id) => {
    setFlyingImages((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <>
      <Navbar cartIconRef={cartIconRef} />
      <CategoryBar onSelectCategory={setSelectedCategory} />

      <main className="bg-gray-100 min-h-screen pt-20">
        <Routes>
          <Route
            path="/"
            element={<Home selectedCategory={selectedCategory} onFly={handleFly} />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails onFly={handleFly} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <CartDrawer />

      {flyingImages.map((f) => (
        <FlyingImage
          key={f.id}
          src={f.src}
          start={f.start}
          end={f.end}
          onComplete={() => removeFly(f.id)}
        />
      ))}
    </>
  );
}
