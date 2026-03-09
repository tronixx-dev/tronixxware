// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useCartDrawer } from "../context/CartDrawerContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar({ cartIconRef }) {
  const { setOpen } = useCartDrawer();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 px-6 flex items-center justify-between bg-blue-900 text-white z-50 shadow-md">
      <Link to="/" className="text-xl font-bold hover:opacity-80 transition">Tronixxware</Link>
      <div className="flex items-center gap-6">
        <NavLink to="/" className={({ isActive }) => (isActive ? "underline" : "")}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? "underline" : "")}>Products</NavLink>
        {user && <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "underline" : "")}>Dashboard</NavLink>}

        {/* Cart Icon */}
        <div className="relative">
          <button
            ref={cartIconRef}
            onClick={() => setOpen(true)}
            className="text-2xl"
          >
            🛒
          </button>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center bg-yellow-400 text-black rounded-full font-bold">
              {totalItems}
            </span>
          )}
        </div>

        {/* Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-semibold">{user.name}</span>
            <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700">Login</Link>
        )}
      </div>
    </nav>
  );
}