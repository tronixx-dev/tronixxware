// src/pages/Checkout.jsx
import { useCart } from "../context/CartContext.jsx";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  // Compute total price safely
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-400">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-8 text-center drop-shadow-lg">
        Checkout
      </h1>

      {/* Cart Items */}
      <ul className="space-y-6 mb-8">
        {cart.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center bg-gray-800 text-white rounded-lg p-4 shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name || "Product"}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-gray-300">Qty: {item.quantity || 1}</p>
              </div>
            </div>
            <p className="font-bold text-lg">
              ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="flex justify-between items-center mb-6 p-4 bg-gray-900 text-white rounded-lg shadow-md">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-xl font-bold">₦{totalPrice.toLocaleString()}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => alert("Proceeding to payment...")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-lg transition transform hover:scale-105"
        >
          Pay Now
        </button>

        <button
          onClick={clearCart}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow-lg transition transform hover:scale-105"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}