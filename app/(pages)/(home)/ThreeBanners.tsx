"use client";
import { headphone1, laptop1, phone1 } from "@/utils/assets";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { routes } from "@/utils/routes";
import Link from "next/link";

const Items = [
  {
    title: "Electronics Minimal",
    subtitle: "Get Holiday Deals",
    image: headphone1,
    link: routes.shop,
    buttonText: "View Collections",
  },
  {
    title: "Get 50% Off",
    subtitle: "Every Handset Retina Item",
    image: phone1,
    link: routes.shop,
    buttonText: "Go Shop",
  },
  {
    title: "Minimalism Design",
    subtitle: "Music Makes Feel Better",
    image: laptop1,
  },
];

export default function RecentProduct() {
  return (
    <div className="secondary-container overflow-visible flex items-stretch flex-col md:flex-row gap-5">
      {Items.map((item, index) => (
        <div
          key={index}
          className="w-full md:w-1/3 max-h-60 min-h-60 p-2 flex bg-slate-200 dark:bg-black duration-500 hover:scale-105 hover:shadow-md rounded-md cursor-pointer"
        >
          <div className="w-3/5 flex flex-col justify-center p-10 space-y-4 flex-1">
            <p className="text-lg font-medium text-blue-800">{item.title}</p>
            <span className="text-2xl font-medium">{item.subtitle}</span>
            {item.buttonText && (
              <Link href={item.link}>
                <Button variant={"secondary_btn"} size={"primarybtn"}>
                  {item.buttonText}
                </Button>
              </Link>
            )}
          </div>
          <div className="w-2/5 relative flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.title}
              className="object-cover p-2 w-40 rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
