"use client";

import { Card, CardContent } from "@/components/ui/card";
import { prod1, prod2, prod3, prod4, prod5, prod6 } from "@/utils/assets";
import { HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import React from "react";

const tabs = [
  { id: "onsale", label: "On Sale" },
  { id: "hotsale", label: "Hot Sale" },
  { id: "trend", label: "Trend" },
  { id: "bestsale", label: "Best Sale" },
];

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
];

// Function to get random items
const getRandomItems = (num: number) =>
  [...items].sort(() => Math.random() - 0.5).slice(0, num);

const ThirdTabNavigation = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [randomizedItems, setRandomizedItems] = useState(getRandomItems(6));

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setRandomizedItems(getRandomItems(6));
  };

  return (
    <div className="w-full flex flex-col justify-between gap-3">
      <div className="flex flex-col border-b-black border-b-1 md:flex-row items-center justify-between gap-2 md:h-[10%]">
        <div className="text-xl font-medium">Best Deals</div>
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 p-0 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`second-tab-button px-4 py-1 whitespace-nowrap flex flex-col w-full transition-colors duration-200 relative ${
                activeTab === tab.id
                  ? "border-b-4 border-primarybackground font-medium active"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-50 dark:hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div>
                  <div
                    className="w-0 h-0 absolute -bottom-2 left-1/2 transform -translate-x-1/2 border-l-[8px] border-l-transparent
                    border-t-[8px] border-t-primarybackground border-r-[8px] border-r-transparent"
                  ></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="md:h-[90%] flex flex-col justify-start">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {randomizedItems.map((item, index) => (
            <Card
              key={index}
              className="w-full shadow-none cursor-pointer border-none hover:shadow-lg transition-shadow"
            >
              <CardContent className="relative flex flex-col items-center text-center group">
                <div className="absolute top-2 w-full flex justify-between items-center 
                opacity-0 translate-y-[-10px] transition-all duration-300 
                group-hover:opacity-100 group-hover:translate-y-0 px-3"
                >
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={16} className="fill-current" />
                    ))}
                  </div>

                  <button
                    className="p-1 rounded-full transition-colors hover:bg-gray-100"
                    aria-label="Add to Wishlist"
                  >
                    <HeartIcon
                      size={18}
                      className="text-gray-500 hover:text-red-500"
                    />
                  </button>
                </div>

                <Image
                  src={item.src}
                  alt={item.label}
                  width={192}
                  height={192}
                  className="w-48 h-48 object-cover p-5 transition-opacity group-hover:opacity-50"
                />

                <strong className="font-medium mt-2">{item.label}</strong>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-secondarybackground">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.has_promo && item.old_price > 0 && (
                    <span className="text-gray-400 line-through text-sm">
                      ${item.old_price.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThirdTabNavigation;
