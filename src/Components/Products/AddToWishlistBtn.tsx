"use client";

import { toast } from "sonner";
import { Heart } from "lucide-react";
import { addToWishlist } from "@/Services/Wishlist.Service";
import { useWishlist } from "@/Context/WishlistContext";
import { Badge } from "@/Components/ui/badge";

export default function AddToWishlistBtn({
  productId,
  ...props
}: { productId: string } & { [key: string]: string }) {
  const { fetchWishlist } = useWishlist();

  async function addProductToWishlist(productId: string) {
    const res = await addToWishlist(productId);

    if (res.status == "success") {
      toast.success("Product Added to your Wishlist Successfully", {
        position: "top-center",
        style: {
          background: "#0fcd60",
          color: "#fff",
        },
      });
      fetchWishlist();
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
      <Badge
        className="size-10 rounded-full flex items-center justify-center absolute top-0 end-0 cursor-pointer"
        onClick={() => addProductToWishlist(productId)}
        {...props}
      >
        <Heart />
      </Badge>
    </>
  );
}
