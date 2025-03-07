import React from "react";
import CountdownTimer from "./CountdownTimer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/prod-progress";
import PromotionSkeleton from "@/app/components/skeletons/PromotionSkeleton";

interface Item {
  image: string;
  title: string;
  price: number;
  is_promotion?: boolean;
  price_special?: number;
  created_at: string;
}

interface CardProdProps {
  item: Item;
  isLoading: boolean;
}

const CardProd: React.FC<CardProdProps> = ({ item, isLoading }) => {
  return (
    <div>
      <Card className="shadow-none border-none">
        <CardContent className="relative flex flex-col aspect-square items-center justify-center p-6 overflow-visible">
          {isLoading ? (
            <PromotionSkeleton />
          ) : (
            <>
              <Image
                src={item.image}
                alt="product"
                width={200}
                height={200}
                className="w-full object-cover"
              />

              <span className="font-medium">{item.title}</span>

              <div className="flex items-center space-x-2">
                {item.is_promotion && item.price_special !== undefined ? (
                  <>
                    <span className="text-2xl font-semibold text-secondarybackground">
                      ${item.price_special.toFixed(2)}
                    </span>
                    <span className="text-2xl text-gray-400 line-through">
                      ${item.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold text-secondarybackground">
                    ${item.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="h-12 flex w-full justify-between items-center">
                <span className="font-medium text-gray-500 text-xs">
                  Already Sold: 0
                </span>
                <span className="font-medium text-gray-500 text-xs">
                  Available: 10
                </span>
              </div>
              <Progress value={80} />
              <Separator className="my-4" />
              <div className="flex flex-col justify-center items-center space-y-4">
                <h3>
                  <span className="text-xl font-medium text-primarybackground">
                    Hurry up!
                  </span>
                </h3>
                <CountdownTimer targetDate={item.created_at} />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardProd;
