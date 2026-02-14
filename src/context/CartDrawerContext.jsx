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

export const useCartDrawer = () => useContext(CartDrawerContext);
