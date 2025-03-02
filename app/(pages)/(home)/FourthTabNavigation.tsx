"use client";
import { prod1, prod2, prod3, prod4, prod5, prod6 } from "@/utils/assets";
import { useState } from "react";
import React from "react";
import CardProd from "./CardProd";

const tabs = [
  { id: "16-Off", label: "16% Off" },
  { id: "25-Off", label: "25% Off" },
  { id: "33-Off", label: "33% Off" },
];

const items = [
  {
    src: prod1,
    label: "Bevigac Gamepad",
    price: 220.0,
    old_price: 250.0,
    has_promo: true,
    sells: 30,
    targetDate: "2025-03-15T00:00:00",
  },
  {
    src: prod2,
    label: "Headset for Phones",
    price: 39.0,
    old_price: 0,
    has_promo: false,
    sells: 35,
    targetDate: "2025-03-14T00:00:00",
  },
  {
    src: prod3,
    label: "Kotion Headset",
    price: 29.0,
    old_price: 49.0,
    has_promo: true,
    sells: 85,
    targetDate: "2025-03-15T00:00:00",
  },
  {
    src: prod4,
    label: "Fuers Outdoor",
    price: 499.0,
    old_price: 520.0,
    has_promo: true,
    sells: 90,
    targetDate: "2025-04-2T00:00:00",
  },
  {
    src: prod5,
    label: "Metal Body Mobile",
    price: 220.0,
    old_price: 0,
    has_promo: false,
    sells: 10,
    targetDate: "2025-03-15T00:00:00",
  },
  {
    src: prod6,
    label: "Stereo Headset",
    price: 220.0,
    old_price: 250.0,
    has_promo: true,
    sells: 75,
    targetDate: "2025-04-2T00:00:00",
  },
];

// Function to get random items
const getRandomItems = (num: number) =>
  [...items].sort(() => Math.random() - 0.5).slice(0, num);

const FourthTabNavigation = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [randomizedItems, setRandomizedItems] = useState(getRandomItems(6));

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setRandomizedItems(getRandomItems(6));
  };

  return (
    <div className="w-full flex flex-col justify-between gap-3">
      <div className="flex flex-col border-b-black border-b-1 md:flex-row items-center justify-between gap-2 md:h-[10%]">
        <div className="text-xl font-medium">Hot Sale</div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {randomizedItems.slice(0, 3).map((item, index) => (
            <CardProd key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FourthTabNavigation;
