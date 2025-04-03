"use client";
import React from "react";
import FourthTabNavigation from "./FourthTabNavigation";
import { bglaptop, bgwatch } from "@/utils/assets";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { routes } from "@/utils/routes";
import Link from "next/link";

const Items = [
  {
    title: "Basic Gift Idea",
    subtitle: "Self Balancing Scooter",
    minisubtitle: "Mini Two Wheel",
    image: bgwatch,
    link: routes.shop,
    buttonText: "Go Shop",
  },
  {
    title: "Get 50% Off",
    subtitle: "in Accessories at Best Prices.",
    minisubtitle: "New Arrivals",
    image: bglaptop,
    link: routes.shop,
    buttonText: "Go Shop",
  },
];
const HotSells = ({ products, isLoading }: any) => {
  const { theme } = useTheme();

  return (
    <div className="secondary-container flex flex-col md:flex-row justify-start gap-3">
      <div className="flex flex-col w-full gap-2 md:w-2/6">
        {Items.map((item, index) => (
          <div
            key={index}
            className="w-full relative max-h-80 min-h-60 p-2 flex duration-500 hover:shadow-lg rounded-md cursor-pointer"
            style={{
              backgroundImage: `url(${item.image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center right",
            }}
          >
            {theme === "light" ? null : (
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300"></div>
            )}

            <div className="w-3/5 z-10 flex flex-col justify-center p-10 gap-2">
              <p className="text-sm font-medium text-blue-800 dark:text-white">{item.title}</p>
              <span className="text-lg font-light dark:text-white">
                {item.minisubtitle}
              </span>
              <span className="text-xl font-medium dark:text-white">
                {item.subtitle}
              </span>
              {item.buttonText && (
                <Link href={item.link} >
                  <Button variant={"secondary_btn"} size={"custom_sm"}>
                    {item.buttonText}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full md:w-4/6">
        <FourthTabNavigation products={products} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default HotSells;
