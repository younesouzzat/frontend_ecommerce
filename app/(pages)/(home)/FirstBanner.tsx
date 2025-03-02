"use client";

import React from "react";
import {
  CarFront,
  CircleDollarSign,
  Headset,
  ThumbsUp,
  Undo2,
} from "lucide-react";
import TabNavigation from "./TabNavigation";

const features = [
  {
    icon: CarFront,
    title: "Free Delivery",
    description: "from $78",
  },
  {
    icon: ThumbsUp,
    title: "99% Customer",
    description: "feedbacks",
  },
  {
    icon: Undo2,
    title: "10 Days",
    description: "for free return",
  },
  {
    icon: CircleDollarSign,
    title: "Payment",
    description: "secure system",
  },
  {
    icon: Headset,
    title: "24/7",
    description: "online supports",
  },
];

const FirstBanner = () => {
  return (
    <div className="secondary-container flex flex-col md:flex-row gap-y-2 md:space-x-2">
      <div className="flex w-full md:w-1/6">
        <div className="flex flex-col w-full p-2 border-2 items-center space-y-5">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row w-full py-2 md:py-1 px-2 items-center md:items-start space-x-3 ${
                index !== features.length - 1 ? "border-b-2" : ""
              }`}
            >
              <Icon className="size-10 text-primarybackground" />
              <div className="flex flex-col text-center md:text-left justify-start space-y-1">
                <strong className="text-md font-medium">{title}</strong>
                <span className="text-sm font-normal text-gray-600">
                  {description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full md:w-5/6">
        <TabNavigation />
      </div>
    </div>
  );
};

export default FirstBanner;
