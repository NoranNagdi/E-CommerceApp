"use client";

import { addToCart } from "@/Services/Cart.Service";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useCart } from "@/Context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function AddToCartBtn({
  productId,
  ...props
}: { productId: string } & { [key: string]: string }) {
  const { fetchCart } = useCart();
  async function addProductToCart(productId: string) {
    const res = await addToCart(productId);

    if (res.status == "success") {
      toast.success("Product Added to your Cart Successfully", {
        position: "top-center",
        style: {
          background: "#0fcd60",
          color: "#fff",
        },
      });
      fetchCart();
    } else {
      toast.error(res.message || "Something went wrong", {
        position: "top-center",
        style: {
          background: "#db4444",
          color: "#fff",
        },
      });
    }
  }
  return (
    <>
      <Button onClick={() => addProductToCart(productId)} {...props}>
        <ShoppingCart />
        Add to Cart
      </Button>
    </>
  );
}
