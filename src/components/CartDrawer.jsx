// src/components/CartDrawer.jsx
import { useCart } from "../context/CartContext.jsx";
import { useCartDrawer } from "../context/CartDrawerContext.jsx";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { open, setOpen } = useCartDrawer();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Compute total price safely
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Navigate to checkout page
  const handleCheckout = () => {
    setOpen(false); // close the drawer
    navigate("/checkout"); // go to checkout page
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-bold text-lg">Your Cart</h2>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
      </div>

      {/* Cart items */}
      <div className="p-4 flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item._id || item.id}
                className="flex justify-between items-center gap-3"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name || "Product"}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <p className="font-semibold">{item.name || "Unnamed"}</p>
                  <p className="text-gray-600">
                    ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                    >
                      −
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer with total, checkout, and clear cart */}
      {cart.length > 0 && (
        <div className="p-4 border-t flex flex-col gap-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₦{totalPrice.toLocaleString()}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-bold text-center transition"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}