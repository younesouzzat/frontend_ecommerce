"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CardProd from "./CardProd";

export function SingleProductCarousel({ items, setApi }: any) {
  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem className="relative" key={index}>
            <div className="p-1">
              <CardProd item={item} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
