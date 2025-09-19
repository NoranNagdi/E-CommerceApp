import { IWishlistResponse } from "@/Interfaces/wishlist.interface";
import { getWishlist } from "@/Services/Wishlist.Service";
import { createContext, useContext, useEffect, useState } from "react";

interface IWishListContext {
  wishlistDetails: IWishlistResponse | null;
  setWishlistDetails: React.Dispatch<
    React.SetStateAction<IWishlistResponse | null>
  >;
  fetchWishlist: () => Promise<void>;
}

const wishlistContext = createContext<IWishListContext | null>(null);

export function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistDetails, setWishlistDetails] =
    useState<IWishlistResponse | null>(null);

  async function fetchWishlist() {
    const wishlist = await getWishlist();
    setWishlistDetails(wishlist);
  }
  useEffect(() => {
    fetchWishlist();
  }, []);
  return (
    <wishlistContext.Provider
      value={{ wishlistDetails, setWishlistDetails, fetchWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export function useWishlist() {
  const wishlist = useContext(wishlistContext);
  if (!wishlist)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return wishlist;
}
