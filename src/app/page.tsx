import Categories from "@/Components/HomeComponents/CategoriesSection";
import MainSlider from "@/Components/HomeComponents/MainSlider";
import ProductsSection from "@/Components/HomeComponents/ProductsSection";
import Features from "@/Components/Shared/Features";

export default function Home() {
  return (
    <>
      <MainSlider />
      <Categories />
      <ProductsSection />
      <Features />
    </>
  );
}
