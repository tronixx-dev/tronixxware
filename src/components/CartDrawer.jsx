import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQty } = useCart();
  const { open, setOpen } = useCartDrawer();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-[115]" // overlay above page & navbar
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-zinc-950 text-white z-[130]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Cart Items */}
        <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {cart.length === 0 && (
            <p className="text-white/60">Your cart is empty</p>
          )}

          {cart.map(item => (
            <div key={item.id} className="flex gap-3 border-b border-white/10 pb-3">
              <img src={item.image} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-xs text-white/60">₦{item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                    className="px-2 bg-white/10 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="px-2 bg-white/10 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-red-400 text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10">
          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
