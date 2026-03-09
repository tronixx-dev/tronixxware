// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handlePaystackPayment = () => {
    if (!cart.length) return alert("Your cart is empty!");

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: "pk_test_38310620f439b55ed21d72d12ed16c8d0c5650f9", // your test key
      email: "customer@example.com", // you can replace this with a form input later
      amount: totalAmount * 100, // Paystack expects kobo
      currency: "NGN",
      ref: `${Math.floor(Math.random() * 1000000000 + 1)}`, // unique reference
      callback: function (response) {
        alert("Payment Successful! Reference: " + response.reference);
        clearCart();       // empty cart after payment
        navigate("/");     // redirect to home
      },
      onClose: function () {
        alert("Payment was cancelled.");
      },
    });

    handler.openIframe();
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-12">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <ul className="mb-4">
        {cart.map((item) => (
          <li key={item._id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₦{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total:</span>
        <span>₦{totalAmount.toLocaleString()}</span>
      </div>

      <button
        onClick={handlePaystackPayment}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with Paystack"}
      </button>
    </div>
  );
}