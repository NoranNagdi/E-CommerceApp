import { ICategory } from "@/Interfaces/category.interface";
import { ISubcategory } from "@/Interfaces/subcategory.interface";
import { getCategory } from "@/Services/CategoryDetails.Service";
import { getSubCategoriesOnCategory } from "@/Services/SubCategories.Service";
import Image from "next/image";
import React from "react";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const { data: category }: { data: ICategory } = await getCategory(categoryId);
  const { data: subCategories }: { data: ISubcategory[] } =
    await getSubCategoriesOnCategory(categoryId);

  return (
    <section className="py-12">
      <div className="container">
        <div className="p-4 shadow-md rounded-md">
          <picture className="relative group overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              loading="lazy"
              width={200}
              height={250}
              className="w-full h-[15rem] object-contain"
            />
          </picture>
          <h3 className="mt-4 font-semibold text-2xl">{category.name}</h3>
        </div>

        <div className="flex flex-wrap gap-8 mt-4">
          {subCategories &&
            subCategories.map((subCategory) => (
              <div
                className="max-w-md p-4 shadow-md rounded-md hover:scale-110 transition duration-500"
                key={subCategory._id}
              >
                <p>{subCategory.name}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
