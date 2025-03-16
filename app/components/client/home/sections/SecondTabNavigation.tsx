"use client";

import ImageProdSkeleton from "@/app/components/skeletons/ImageProdSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";
import { Product, TabNavigationProps } from "@/types";
import { routes } from "@/utils/routes";
import Link from "next/link";

const tabs = [
  { id: "onsale", label: "On Sale" },
  { id: "hotsale", label: "Hot Sale" },
  { id: "trend", label: "Trend" },
  { id: "bestsale", label: "Best Sale" },
];

// Function to get random items
const getRandomItems = (products: Product[], num: number) =>
  [...products].sort(() => Math.random() - 0.5).slice(0, num);

const SecondTabNavigation: React.FC<TabNavigationProps> = ({
  products,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  
  const [randomizedItems, setRandomizedItems] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      setRandomizedItems(getRandomItems(products, 6));
    }
  }, [products]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setRandomizedItems(getRandomItems(products, 6));
  };

  return (
    <div className="w-full flex flex-col justify-between gap-3">
      <div className="flex flex-col border-b-black border-b-1 md:flex-row items-center justify-between gap-2 md:h-[10%]">
        <div className="text-xl font-medium">Featured Product</div>
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
          {isLoading
            ? Array.from({ length: 9 }).map((_, index) => (
                <ImageProdSkeleton index={index} key={index} />
              ))
            : randomizedItems.map((item, index) => (
              <Link href={routes.product(item.id)}>
                <Card
                  key={index}
                  className="w-full shadow-none cursor-pointer border-none hover:shadow-lg transition-shadow"
                >
                  <CardContent className="relative flex flex-col items-center text-center group">
                    <div
                      className="absolute top-2 w-full flex justify-between items-center 
                    opacity-0 translate-y-[-10px] transition-all duration-300 
                    group-hover:opacity-100 group-hover:translate-y-0 px-3"
                    >
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            size={16}
                            className="fill-current"
                          />
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
                      src={item.image}
                      alt={item.title}
                      width={192}
                      height={192}
                      className="w-48 h-48 object-cover p-5 transition-opacity group-hover:opacity-50"
                    />

                    <strong className="font-medium mt-2">{item.title}</strong>

                    <div className="flex items-center space-x-2">
                      {item.is_promotion && item.price_special ? (
                        <>
                          <span className="font-semibold text-secondarybackground">
                            ${item.price_special.toFixed(2)}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            ${item.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-secondarybackground">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SecondTabNavigation;
