"use client";

import Rating from "../Shared/Rating";
import { IProduct } from "@/Interfaces/product.interface";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import { Badge } from "@/Components/ui/badge";
import { Trash2 } from "lucide-react";
import { removeFromWishlist } from "@/Services/Wishlist.Service";
import { toast } from "sonner";
import { useWishlist } from "@/Context/WishlistContext";
import AddToWishlistBtn from "./AddToWishlistBtn";

export default function ProductItem({
  product,
  isWishlist = false,
}: {
  product: IProduct;
  isWishlist?: boolean;
}) {
  const { fetchWishlist } = useWishlist();

  async function removeProductFromWishlist(productId: string) {
    const res = await removeFromWishlist(productId);
    if (res.status === "success") {
      toast.success("Item Removed From Wishlist Successfully", {
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
    <div className="p-4 shadow-md rounded-md">
      <picture className="relative group overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            loading="lazy"
            width={260}
            height={250}
            className="w-full h-[15rem] object-contain hover:scale-110 transition duration-500"
          />
        </Link>
        {isWishlist ? (
          <Badge
            className="size-10 rounded-full flex items-center justify-center absolute top-0 end-0 cursor-pointer"
            onClick={() => removeProductFromWishlist(product._id)}
          >
            <Trash2 />
          </Badge>
        ) : (
          <AddToWishlistBtn
            className="size-10 rounded-full flex items-center justify-center absolute top-0 end-0 cursor-pointer"
            productId={product._id}
          />
        )}
        <AddToCartBtn
          className="cursor-pointer w-full absolute bottom-0 translate-y-full invisible group-hover:translate-y-0 group-hover:visible duration-500"
          productId={product._id}
        />
      </picture>
      <Link href={`/products/${product._id}`}>
        <h3 className="mt-4 line-clamp-1 font-medium">{product.title}</h3>
      </Link>
      <div className="flex items-center gap-x-2 mt-2">
        <span className="text-main-color">${product.price}</span>
        <Rating rating={product.ratingsAverage} />
      </div>
    </div>
  );
}
