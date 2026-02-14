import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <AnimatePresence>
        {cart.map((item) => (
          <motion.div
            key={item.id}
            className="flex items-center bg-white p-4 rounded shadow"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 mx-4">
              <h3 className="font-semibold">{item.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 font-bold"
            >
              Remove
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {cart.length > 0 && (
        <div className="flex justify-between items-center mt-6 bg-white p-4 rounded shadow">
          <span className="font-bold">Total: ₦{total.toLocaleString()}</span>
          <div className="flex gap-3">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert("Checkout simulated!")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
