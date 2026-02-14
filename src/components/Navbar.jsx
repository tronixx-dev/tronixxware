import { useCartDrawer } from "../context/CartDrawerContext";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router-dom";

export default function Navbar({ cartIconRef }) {
  const { setOpen } = useCartDrawer();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className="fixed top-0 left-0 w-full h-16 px-6 flex items-center justify-between
                 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700
                 text-white z-50 shadow-md"
    >
      <NavLink
        to="/"
        className="text-xl font-bold hover:opacity-80 transition"
      >
        Tronixxware
      </NavLink>

      <div className="relative">
        <button
          ref={cartIconRef}
          onClick={() => setOpen(true)}
          className="text-2xl"
        >
          🛒
        </button>

        {totalItems > 0 && (
          <span
            className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center
                       bg-yellow-400 text-black rounded-full font-bold"
          >
            {totalItems}
          </span>
        )}
      </div>
    </nav>
  );
}
