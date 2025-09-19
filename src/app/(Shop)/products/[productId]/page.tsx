import React from "react";
import { getProduct } from "@/Services/ProductDetails.Service";
import { IProduct } from "@/Interfaces/product.interface";
import Rating from "@/Components/Shared/Rating";
import ProductSlider from "@/Components/Products/ProductSlider";
import AddToCartBtn from "@/Components/Products/AddToCartBtn";
import AddToWishlistBtn from "@/Components/Products/AddToWishlistBtn";
import { RefreshCcw, Truck } from "lucide-react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { data: product }: { data: IProduct } = await getProduct(productId);

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-18">
          <div className="lg:col-span-2">
            <ProductSlider images={product.images} />
          </div>
          <div className="lg:col-span-1">
            <h1 className="font-semibold text-2xl mb-4">{product.title}</h1>
            <div className="flex gap-x-4 flex-wrap">
              <Rating rating={product.ratingsAverage} />
              <span className="text-sm font-light">
                {product.ratingsQuantity} reviews
              </span>
              <span className="text-sm font-light">|</span>
              <span
                className={`text-sm font-[400] ${
                  product.quantity > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <span className="text-2xl font-[400] block mb-6">
              ${product.price}
            </span>
            <p className="text-sm border-b pb-6 border-b-gray-400">
              {product.description}
            </p>
            <div className="flex items-center gap-2 mt-4">
              Colors:{" "}
              <div className="bg-blue-300 size-4 rounded-full border border-black"></div>
              <div className="bg-red-300 size-4 rounded-full"></div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              Sizes:{" "}
              <div className="size-6 rounded border border-black text-center text-sm font-medium">
                XS
              </div>
              <div className="size-6 rounded border border-black text-center text-sm font-medium">
                S
              </div>
              <div className="size-6 rounded border border-black text-center text-sm font-medium bg-main-color text-white">
                M
              </div>
              <div className="size-6 rounded border border-black text-center text-sm font-medium">
                L
              </div>
              <div className="size-6 rounded border border-black text-center text-sm font-medium">
                XL
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <AddToCartBtn className="btn" productId={product._id} />
              <AddToWishlistBtn
                className="size-10 cursor-pointer"
                productId={product._id}
              />
            </div>

            <div className="divide-y divide-gray-900 border border-gray-900 mt-10 rounded">
              <div className="p-6 flex items-center gap-4">
                <Truck />
                <div>
                  <h3 className="font-medium mb-2">Free Delivery</h3>
                  <p className="text-xs">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div className="p-6 flex items-center gap-4">
                <RefreshCcw />
                <div>
                  <h3 className="font-medium mb-2">Return Delivery</h3>
                  <p className="text-xs">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
