"use client";
import React, { useState } from "react";
import {
  List,
  ChevronDown,
  Laptop,
  Glasses,
  Shirt,
  Footprints,
  BriefcaseBusiness,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";

export function DropdownMenuDemo() {
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  const router = useRouter();

  const toggleSubMenu = (name: string) => {
    setExpandedSubMenu(expandedSubMenu === name ? null : name);
  };

  const handleCategorySearch = (name: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("category", name.toLowerCase());
    const searchUrl = `${routes.shop}?${searchParams.toString()}`;
    window.location.href = searchUrl;
    // router.push(`${routes.shop}?${searchParams.toString()}`);
  };

  const categories = [
    {
      id: "clothing",
      name: "Clothing",
      icon: <Shirt className="size-5" />,
    },
    {
      id: "accessories",
      name: "Accessories",
      icon: <Glasses className="size-5" />,
    },
    {
      id: "bags",
      name: "Bags",
      icon: <BriefcaseBusiness className="size-5" />,
    },
    {
      id: "footwear",
      name: "Footwear",
      icon: <Footprints className="size-5" />,
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: <Laptop className="size-5" />,
    },
    // {
    //   id: "smartphones",
    //   name: "Smartphones & Tablets",
    //   icon: <Smartphone className="size-5" />,
    //   subcategories: [{ title: "iPhones" }, { title: "Android Phones" }],
    //   IF Doesnt have a sub cat : subcategories: [],
    // },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex px-4 justify-between text-lg bg-blue-700 dark:bg-gray-800 text-white hover:bg-blue-600 dark:hover:bg-gray-700"
          size="large"
          onClick={() => toggleSubMenu("allCategory")}
        >
          <List className="size-10" />
          All Categories
          <ChevronDown
            className={`size-10 ml-auto transition-transform ${
              expandedSubMenu === "allCategory" ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-white dark:bg-gray-900 text-black dark:text-white border dark:border-gray-700">
        {categories.map((category) => (
          <DropdownMenuGroup key={category.id}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                onMouseEnter={() => setExpandedSubMenu(category.id)}
                onMouseLeave={() => setExpandedSubMenu(null)}
                onClick={() => handleCategorySearch(category.name)}
                className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {category.icon}
                <span>{category.name}</span>
              </DropdownMenuSubTrigger>

              {/* {category.subcategories.length > 0 && (
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-white dark:bg-gray-900 border dark:border-gray-700">
                    {category.subcategories.map((subcategory, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer"
                      >
                        {subcategory.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              )} */}
            </DropdownMenuSub>
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
