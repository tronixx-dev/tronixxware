import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to place an order!");
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderItems = cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems,
          totalPrice: totalAmount,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      console.log("Order created:", data);
      setOrderSuccess(true);
      clearCart(); // clear cart after successful order
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-green-700">
          🎉 Order Placed Successfully!
        </h1>
        <p className="mb-6">Thank you for shopping with Tronixxware.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-20">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map(item => (
              <li key={item.product._id} className="flex justify-between border-b py-2">
                <span>{item.product.name} x {item.quantity}</span>
                <span>₦{(item.product.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-bold mb-6">
            <span>Total:</span>
            <span>₦{totalAmount.toLocaleString()}</span>
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;