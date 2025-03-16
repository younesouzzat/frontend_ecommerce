"use client";
import FirstSkeleton from "@/app/components/skeletons/FirstSkeleton";
import { TabNavigationProps } from "@/types";
import { routes } from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";

const TabNavigation: React.FC<TabNavigationProps> = ({
  categories,
  products,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveTab(categories[0].id);
    }
  }, [categories]);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  const filteredProducts = products.filter(
    (product) => product.category_id === activeTab
  );

  return (
    <div className="w-full overflow-x-auto">
      {/* Tab Buttons */}
      <div className="flex md:h-1/3 flex-wrap md:flex-nowrap gap-2 md:gap-4 border-2 p-0 relative">
        {categories?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`tab-button px-4 py-8 whitespace-nowrap flex flex-col w-full transition-colors duration-200 relative ${
              activeTab === tab.id
                ? "bg-primarybackground text-white font-medium active dark:text-gray-900"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-50 dark:hover:text-gray-900"
            }`}
          >
            {tab.name}{" "}
            <span
              className={`text-xs ${
                activeTab === tab.id
                  ? "text-white dark:text-gray-900"
                  : "text-gray-500"
              }`}
            >
              ({tab.products_count} Items)
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
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <FirstSkeleton index={index} key={index} />
            ))
          ) : filteredProducts.length > 0 ? (
            <>
              {filteredProducts.slice(0, 6).map((item, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/6 flex flex-col justify-center items-center space-y-2"
                >
                  <Link href={routes.product(item.id)}>
                    <Image
                      src={item.image}
                      alt={`product ${index}`}
                      width={125}
                      height={125}
                      className="w-32 h-32 object-cover"
                    />
                    <strong className="font-medium">{item.title}</strong>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-secondarybackground">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.is_promotion &&
                        item.price_special !== undefined &&
                        item.price_special > 0 && (
                          <span className="text-gray-400 line-through text-sm">
                            ${item.price_special.toFixed(2)}
                          </span>
                        )}
                    </div>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-500">
              No products available in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
