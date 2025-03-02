import React from "react";
import CountdownTimer from "./CountdownTimer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/prod-progress";

export default function CardProd({ item }) {
  return (
    <div>
      <Card className="shadow-none border-none">
        <CardContent className="relative flex flex-col aspect-square items-center justify-center p-6 overflow-visible">
          <Image
            src={item.src}
            alt="product"
            width={200}
            height={200}
            className="w-full object-cover"
          />

          <span className="font-medium">{item.label}</span>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-semibold text-secondarybackground">
              ${item.price.toFixed(2)}
            </span>
            {item.has_promo && item.old_price > 0 && (
              <span className="text-2xl text-gray-400 line-through">
                ${item.old_price.toFixed(2)}
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
          <Progress value={item.sells} />
          <Separator className="my-4" />
          <div className="flex flex-col justify-center items-center space-y-4">
            <h3>
              <span className="text-xl font-medium text-primarybackground">
                Hurry up!
              </span>
            </h3>
            <CountdownTimer targetDate={item.targetDate} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
