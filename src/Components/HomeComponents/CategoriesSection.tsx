import { ICategory } from "@/Interfaces/category.interface";
import { getCategories } from "@/Services/Categories.Service";
import React from "react";
import CategoriesSlider from "./CategoriesSlider";
import SectionTitle from "../Shared/SectionTitle";
import { Separator } from "@/Components/ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function Categories() {
  const { data: categories }: { data: ICategory[] } = await getCategories();

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between">
          <SectionTitle title="Categories" subtitle="Browse By Category" />
          <Button variant="outline" asChild>
            <Link href={"/categories"}>See All</Link>
          </Button>
        </div>
        <CategoriesSlider categories={categories} />
        <Separator />
      </div>
    </section>
  );
}
