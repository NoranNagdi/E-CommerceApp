"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import slide2 from "@/Assets/Images/slider-image-1.jpeg";
import slide3 from "@/Assets/Images/slider-image-2.jpeg";
import slide4 from "@/Assets/Images/slider-image-3.jpeg";
import Image from "next/image";

const swiperOptions = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-4 !bg-gray-400 !border-2",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-main-color !border-white",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  modules: [Pagination, Autoplay],
};
const sliderImages = [
  // { path: slide1.src, label: "slide 1" },
  { path: slide4.src, label: "slide 4" },
  { path: slide2.src, label: "slide 2" },
  { path: slide3.src, label: "slide 3" },
];
export default function MainSlider() {
  return (
    <>
      <section className="py-12">
        <div className="container mx-auto">
          <Swiper {...swiperOptions}>
            {sliderImages &&
              sliderImages.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    src={slide.path}
                    alt={slide.label}
                    loading="lazy"
                    width={1920}
                    height={344}
                    className="w-full h-[25rem] object-cover overflow-hidden"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
