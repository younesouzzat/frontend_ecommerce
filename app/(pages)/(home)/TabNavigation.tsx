"use client";

import { prod1, prod2, prod3, prod4, prod5, prod6 } from "@/utils/assets";
import Image from "next/image";
import { useState } from "react";
import React from "react";

const tabs = [
  { id: "watch", label: "Watch", items: 6 },
  { id: "speaker", label: "Speaker", items: 12 },
  { id: "headphone", label: "Headphone", items: 12 },
  { id: "gamepad", label: "Gamepad", items: 14 },
  { id: "drone", label: "Drone", items: 13 },
  { id: "camera", label: "Camera", items: 12 },
];

const items = [
  { src: prod1, label: "Bevigac Gamepad", price: 220.0, old_price: 250.0, has_promo: true },
  { src: prod2, label: "Headset for Phones", price: 39.0, old_price: 0, has_promo: false },
  { src: prod3, label: "Kotion Headset", price: 29.0, old_price: 49.0, has_promo: true },
  { src: prod4, label: "Fuers Outdoor", price: 499.0, old_price: 520.0, has_promo: true },
  { src: prod5, label: "Metal Body Mobile", price: 220.0, old_price: 0, has_promo: false },
  { src: prod6, label: "Stereo Headset", price: 220.0, old_price: 250.0, has_promo: true },
];

// Function to get random items
const getRandomItems = (num: number) =>
  [...items].sort(() => Math.random() - 0.5).slice(0, num);

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [randomizedItems, setRandomizedItems] = useState(getRandomItems(6));

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setRandomizedItems(getRandomItems(6)); // Refresh items when tab changes
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Tabs Navigation */}
      <div className="flex md:h-1/3 flex-wrap md:flex-nowrap gap-2 md:gap-4 border-2 p-0 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`tab-button px-4 py-8 whitespace-nowrap flex flex-col w-full transition-colors duration-200 relative ${
              activeTab === tab.id
                ? "bg-primarybackground text-white font-medium active dark:text-gray-900"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-50 dark:hover:text-gray-900"
            }`}
          >
            {tab.label}{" "}
            <span
              className={`text-xs ${
                activeTab === tab.id ? "text-white dark:text-gray-900" : "text-gray-500"
              }`}
            >
              ({tab.items} Items)
            </span>
            {activeTab === tab.id && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45 h-4 w-4 bg-primarybackground transition-all duration-400"></div>
            )}
          </button>
        ))}
      </div>

      {/* Items Display */}
      <div className="md:h-2/3 md:p-4 flex flex-col justify-end">
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2">
          {randomizedItems.map((item, index) => (
            <div key={index} className="w-full md:w-1/6 flex flex-col justify-center items-center space-y-2">
              <Image
                src={item.src}
                alt={`product ${index}`}
                width={125}
                height={125}
                className="w-32 h-32 object-cover"
              />
              <strong className="font-medium">{item.label}</strong>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-secondarybackground">${item.price.toFixed(2)}</span>
                {item.has_promo && item.old_price > 0 && (
                  <span className="text-gray-400 line-through text-sm">${item.old_price.toFixed(2)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
