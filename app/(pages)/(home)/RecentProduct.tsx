"use client";
import { prod1, prod2, prod3, prod4, prod5, prod6 } from "@/utils/assets";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const items = [
  {
    src: prod1,
    label: "Bevigac Gamepad",
    price: 220.0,
    old_price: 250.0,
    has_promo: true,
  },
  {
    src: prod2,
    label: "Headset for Phones",
    price: 39.0,
    old_price: 0,
    has_promo: false,
  },
  {
    src: prod3,
    label: "Kotion Headset",
    price: 29.0,
    old_price: 49.0,
    has_promo: true,
  },
  {
    src: prod4,
    label: "Fuers Outdoor",
    price: 499.0,
    old_price: 520.0,
    has_promo: true,
  },
  {
    src: prod5,
    label: "Metal Body Mobile",
    price: 220.0,
    old_price: 0,
    has_promo: false,
  },
  {
    src: prod6,
    label: "Stereo Headset",
    price: 220.0,
    old_price: 250.0,
    has_promo: true,
  },
  {
    src: prod5,
    label: "Metal Body Mobile",
    price: 220.0,
    old_price: 0,
    has_promo: false,
  },
];

export default function RecentProduct() {
  return (
    <div className="secondary-container flex">
      <div className="bg-slate-200 flex flex-col space-y-5 w-full p-12">
        <h2 className="text-2xl font-medium text-center md:text-left dark:text-black">Your Recently Viewed Products</h2>
        <div className="bg-white w-full">
          <div className="flex flex-col space-y-1 md:flex-row md:space-x-1">
            <Carousel
              opts={{
                align: "start",
                loop: true
              }}
              className="w-full"
            >
              <CarouselContent>
                {items.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/6 lg:basis-1/6 cursor-pointer"
                  >
                    <div className="p-1">
                      <Card className="border-0 shadow-none">
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                            <Image
                              src={item.src}
                              alt={`product ${index}`}
                              width={185}
                              height={185}
                              className="w-40 h-40 object-cover"
                            />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
