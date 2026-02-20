// src/components/Navbar.jsx
import { useCartDrawer } from "../context/CartDrawerContext";
import { useCart } from "../context/CartContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ cartIconRef }) {
  const { setOpen } = useCartDrawer();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full h-16 px-6 flex items-center justify-between
                 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700
                 text-white z-50 shadow-md"
    >
      {/* Logo */}
      <Link to="/" className="text-xl font-bold hover:opacity-80 transition">
        Tronixxware
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Products
        </NavLink>

        {/* Dashboard Link (Protected) */}
        {user && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Dashboard
          </NavLink>
        )}

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
            <span
              className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center
                         bg-yellow-400 text-black rounded-full font-bold"
            >
              {totalItems}
            </span>
          )}
        </div>

        {/* Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-semibold">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}