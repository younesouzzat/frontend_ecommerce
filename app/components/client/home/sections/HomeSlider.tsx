"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { slider1, slider2, slider3 } from "@/utils/assets";
import { routes } from "@/utils/routes";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Discover Amazing Products",
    description: "Exclusive deals on our newest collection",
    bgColor: "bg-blue-500",
    textColor: "text-white",
    image1: slider1,
    image2: slider2,
  },
  {
    id: 2,
    title: "White Friday Sale",
    description: "Get up to 45% off on selected items",
    bgColor: "bg-purple-600",
    textColor: "text-white",
    image1: slider2,
    image2: slider3,
  },
  {
    id: 3,
    title: "New Arrivals",
    description: "Check out our latest additions",
    bgColor: "bg-orange-500",
    textColor: "text-white",
    image1: slider3,
    image2: slider1,
  },
];

const HomeSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      clearInterval(interval);
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="w-full h-max-[60rem]">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className={`h-full w-full relative ${slide.bgColor}`}>
                <div className="absolute inset-0 bg-black/40 opacity-70" />

                <div
                  className={`relative z-10 h-full py-20 flex flex-col md:flex-row items-center justify-between px-8 md:px-28 ${slide.textColor}`}
                >
                  <div className="flex items-center justify-center">
                    <Image
                      src={slide.image1}
                      alt={slide.title}
                      width={320}
                      height={320}
                      className="w-64 h-64 md:w-80 md:h-80 object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-center text-center max-w-lg min-h-[20rem] md:min-h-[25rem] justify-center">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm my-4 backdrop-blur-sm">
                      Featured
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold my-4 drop-shadow-md">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                      {slide.description}
                    </p>
                    <Link href={routes.shop}>
                      <Button className="bg-white text-black hover:bg-gray-100 shadow-lg">
                        Shop Now
                      </Button>
                    </Link>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <Image
                      src={slide.image2}
                      alt={slide.title}
                      width={320}
                      height={320}
                      className="w-64 h-64 md:w-80 md:h-80 object-contain"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                current === index ? "bg-white scale-125" : "bg-white/40"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HomeSlider;
