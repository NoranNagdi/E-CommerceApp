import SectionTitle from "@/Components/Shared/SectionTitle";
import { ICategory } from "@/Interfaces/category.interface";
import { getCategories } from "@/Services/Categories.Service";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Categories() {
  const { data: categories }: { data: ICategory[] } = await getCategories();

  return (
    <section className="py-12">
      <div className="container">
        <SectionTitle
          title="Categories"
          subtitle="Enjoy Exploring Categories"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">
          {categories &&
            categories.map((category) => (
              <div
                className="p-4 shadow-md rounded-md hover:scale-110 transition duration-500"
                key={category._id}
              >
                <picture className="relative group overflow-hidden">
                  <Link href={`/categories/${category._id}`}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      width={260}
                      height={250}
                      className="w-full h-[15rem] object-contain"
                    />
                  </Link>
                </picture>
                <Link href={`/categories/${category._id}`}>
                  <h3 className="mt-4 font-medium">{category.name}</h3>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
