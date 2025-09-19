import { ICartResponse } from "@/Interfaces/cart.interface";
import { getCart } from "@/Services/Cart.Service";
import { createContext, useContext, useEffect, useState } from "react";

interface ICartContext {
  cartDetails: ICartResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>;
  fetchCart: () => Promise<void>;
}

const cartContext = createContext<ICartContext | null>(null);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);

  async function fetchCart() {
    const cart = await getCart();
    setCartDetails(cart);
  }
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <cartContext.Provider value={{ cartDetails, setCartDetails, fetchCart }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(cartContext);
  if (!cart) throw new Error("useCart must be used within a CartProvider");
  return cart;
}
