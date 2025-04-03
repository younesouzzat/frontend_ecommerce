"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CardProd from "./CardProd";
import { Skeleton } from "@/components/ui/skeleton";
import { SingleProductProps } from "@/types";

const SingleProductCarousel: React.FC<SingleProductProps> = ({
  items,
  setApi,
  isLoading,
}) => {
  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full max-w-xs">
      <CarouselContent>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem className="relative" key={index}>
                <div className="p-1">
                  <Skeleton className="h-52 w-full rounded-lg" />
                  <Skeleton className="h-6 w-full rounded-lg" />
                  <Skeleton className="h-6 w-full rounded-lg" />
                  <Skeleton className="h-6 w-full rounded-lg" />
                </div>
              </CarouselItem>
            ))
          : items.map((item: any) => (
              <CarouselItem className="relative" key={item.id}>
                <div className="p-1">
                  <CardProd item={item} isLoading={isLoading} />
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SingleProductCarousel;