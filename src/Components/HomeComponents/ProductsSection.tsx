import { IProduct } from "@/Interfaces/product.interface";
import { getProducts } from "@/Services/Products.Service";
import React from "react";
import SectionTitle from "../Shared/SectionTitle";
import Link from "next/link";
import ProductItem from "../Products/ProductItem";

export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts(8);

  return (
    <section className="py-12">
      <div className="container">
        <SectionTitle title="Our Products" subtitle="Explore Our Products" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">
          {products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>

        <div className="flex justify-center mt-15">
          <Link href="/products" className="btn">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
