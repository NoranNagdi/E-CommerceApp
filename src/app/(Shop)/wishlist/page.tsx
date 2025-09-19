"use client";

import ProductItem from "@/Components/Products/ProductItem";
import SectionTitle from "@/Components/Shared/SectionTitle";
import { useWishlist } from "@/Context/WishlistContext";
import Link from "next/link";
import React from "react";

export default function Wishlist() {
  const { wishlistDetails } = useWishlist();

  return (
    <section className="py-12">
      <div className="container">
        <SectionTitle title="Wishlist" subtitle="" />
        {wishlistDetails && wishlistDetails.count > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">
            {wishlistDetails?.data.map((wishlistItem) => (
              <ProductItem
                key={wishlistItem._id}
                product={wishlistItem}
                isWishlist={true}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold my-6">
                Your Wishlist is Empty
              </h1>
              <Link href="/products" className="btn">
                Return to Shop
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
