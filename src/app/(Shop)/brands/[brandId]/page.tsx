import { IBrand } from "@/Interfaces/brand.interface";
import { getBrand } from "@/Services/BrandDetails.Service";
import Image from "next/image";
import React from "react";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  const { data: brand }: { data: IBrand } = await getBrand(brandId);

  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-xl mx-auto p-4 shadow-md rounded-md">
          <picture className="relative group overflow-hidden">
            <Image
              src={brand.image}
              alt={brand.name}
              loading="lazy"
              width={200}
              height={250}
              className="w-full h-[15rem] object-contain"
            />
          </picture>
          <h3 className="mt-4 font-semibold text-2xl">{brand.name}</h3>
        </div>
      </div>
    </section>
  );
}
