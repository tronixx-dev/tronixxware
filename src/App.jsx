// src/App.jsx

import { Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";

import Navbar from "./components/Navbar.jsx";
import CategoryBar from "./components/CategoryBar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

import FlyingImage from "./components/FlyingImage.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

// Auth
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [flyingImages, setFlyingImages] = useState([]);
  const cartIconRef = useRef(null);

  // Handle flying image animation when adding to cart
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
      {/* Navbar with cart icon ref */}
      <Navbar cartIconRef={cartIconRef} />

      {/* Category selector */}
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

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Flying Images Animation */}
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