import { Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";

import Navbar from "./components/Navbar.jsx";
import CategoryBar from "./components/CategoryBar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import FlyingImage from "./components/FlyingImage.jsx";

// Auth
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Checkout from "./pages/Checkout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
          {/* Public Routes */}
          <Route
            path="/"
            element={<Home selectedCategory={selectedCategory} onFly={handleFly} />}
          />
          <Route path="/products" element={<Products onFly={handleFly} />} />
          <Route path="/product/:id" element={<ProductDetails onFly={handleFly} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
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