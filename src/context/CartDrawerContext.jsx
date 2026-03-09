// src/context/CartDrawerContext.jsx
import { createContext, useContext, useState } from "react";

const CartDrawerContext = createContext();

export function CartDrawerProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <CartDrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const context = useContext(CartDrawerContext);
  if (!context) throw new Error("useCartDrawer must be used within CartDrawerProvider");
  return context;
}