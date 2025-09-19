import SectionTitle from "@/Components/Shared/SectionTitle";
import { IBrand } from "@/Interfaces/brand.interface";
import { getBrands } from "@/Services/Brands.Service";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Brands() {
  const { data: brands }: { data: IBrand[] } = await getBrands();

  return (
    <section className="py-12">
      <div className="container">
        <SectionTitle title="Brands" subtitle="Enjoy Exploring Brands" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">
          {brands &&
            brands.map((brand) => (
              <div
                className="p-4 shadow-md rounded-md hover:scale-110 transition duration-500"
                key={brand._id}
              >
                <picture className="relative group overflow-hidden">
                  <Link href={`/brands/${brand._id}`}>
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      loading="lazy"
                      width={260}
                      height={250}
                      className="w-full h-[15rem] object-contain"
                    />
                  </Link>
                </picture>
                <Link href={`/brands/${brand._id}`}>
                  <h3 className="mt-4 line-clamp-1 font-medium">
                    {brand.name}
                  </h3>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
