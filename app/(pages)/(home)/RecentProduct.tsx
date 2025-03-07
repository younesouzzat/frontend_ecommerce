"use client";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ImageProdSkeleton from "@/app/components/skeletons/ImageProdSkeleton";

interface Product {
  image: string;
  title: string;
  price: number;
  is_promotion?: boolean;
  price_special?: number;
}

interface RecentProductProps {
  products: Product[];
  isLoading: boolean;
}

const RecentProduct: React.FC<RecentProductProps> = ({
  products,
  isLoading,
}) => {
  return (
    <div className="secondary-container flex">
      <div className="bg-slate-200 flex flex-col space-y-5 w-full p-12">
        <h2 className="text-2xl font-medium text-center md:text-left dark:text-black">
          Your Recently Viewed Products
        </h2>
        <div className="bg-white w-full">
          <div className="flex flex-col space-y-1 md:flex-row md:space-x-1">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <ImageProdSkeleton index={index} key={index} />
                  ))
                ) : products.length > 0 ? (
                  <>
                    {products.slice(0, 10).map((item, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/6 lg:basis-1/6 cursor-pointer"
                      >
                        <div className="p-1">
                          <Card className="border-0 shadow-none">
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <Image
                                src={item.image}
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
                  </>
                ) : (
                  <p className="text-gray-500">
                    No products available in this category.
                  </p>
                )}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentProduct;
