"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import Image from "next/image";
import React, { useState } from "react";
import { Thumbs, FreeMode } from "swiper/modules";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="flex gap-4">
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[Thumbs, FreeMode]}
        className="h-[37.5rem] flex flex-col gap-2"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img}
              alt={img}
              loading="lazy"
              width={100}
              height={600}
              className="object-contain rounded cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        loop
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        className="flex-1"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img}
              alt={img}
              loading="lazy"
              width={500}
              height={600}
              className="w-full h-[37.5rem] object-contain mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
