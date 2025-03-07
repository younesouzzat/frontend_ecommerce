"use client";
import { prod7, prod8 } from "@/utils/assets";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SecondTabNavigation from "./SecondTabNavigation";
import { SingleProductCarousel } from "./SingleProductCarousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  image: string;
  title: string;
  price: number;
  is_promotion?: boolean;
  price_special?: number;
}

interface FeaturedProductProps {
  products: Product[];
  isLoading: boolean;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  products,
  isLoading,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="secondary-container flex flex-col justify-start md:flex-row gap-3">
      <div className="flex w-full md:w-2/6">
        <Card className="w-full rounded-sm border-2 border-primarybackground">
          <CardTitle className="flex justify-between items-center bg-primarybackground p-3">
            <div className="text-xl text-white dark:text-black">
              Deals of the week
            </div>
            <div className="flex justify-end space-x-1">
              <Button
                variant={"arrows_btn"}
                size={"arrowsbtn"}
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft strokeWidth={2} className="!size-12" />
              </Button>
              <Button
                variant={"arrows_btn"}
                size={"arrowsbtn"}
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight strokeWidth={2} className="!size-12" />
              </Button>
            </div>
          </CardTitle>
          <CardContent className="flex justify-center">
            <SingleProductCarousel
              items={products}
              isLoading={isLoading}
              setApi={setApi}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full md:w-4/6">
        <SecondTabNavigation products={products} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default FeaturedProduct;
