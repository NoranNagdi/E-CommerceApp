"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { ICategory } from "@/Interfaces/category.interface";

const swiperOptions = {
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-4 !bg-gray-400 !border-2",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-main-color !border-white",
  },
  modules: [Pagination, Autoplay],
};
export default function CategoriesSlider({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <Swiper {...swiperOptions} className="mb-15">
      {categories &&
        categories.map((cat) => (
          <SwiperSlide key={cat._id} className="mb-16">
            <Image
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              width={260}
              height={250}
              className="w-full h-[15rem] object-cover"
            />
            <h3 className="mt-2">{cat.name}</h3>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
