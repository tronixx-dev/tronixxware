import { useCartDrawer } from "../context/CartDrawerContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { open, setOpen } = useCartDrawer();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-lg p-6 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 mt-6">Your cart is empty.</p>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center mb-4">
                    <img
                      src={item.image || item.images?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">₦{item.price}</p>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, parseInt(e.target.value))
                        }
                        className="w-16 border rounded p-1 mt-1"
                      />
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600 font-bold ml-2"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <>
                <div className="mt-4 font-bold text-lg">Total: ₦{total.toLocaleString()}</div>
                <button
                  onClick={() => {
                    clearCart();
                    setOpen(false);
                  }}
                  className="mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Clear Cart
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}