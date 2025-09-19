import { IProduct } from "@/Interfaces/product.interface";
import { getProducts } from "@/Services/Products.Service";
import React from "react";
import SectionTitle from "@/Components/Shared/SectionTitle";
import ProductItem from "@/Components/Products/ProductItem";

export default async function Products() {
  const { data: products }: { data: IProduct[] } = await getProducts();

  return (
    <section className="py-12">
      <div className="container">
        <SectionTitle
          title="Our Products"
          subtitle="Enjoy Exploring Our Products"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">
          {products &&
            products.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                isWishlist={false}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
