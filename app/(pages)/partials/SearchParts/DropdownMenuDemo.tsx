"use client";
import React, { useState } from "react";
import {
  List,
  ChevronDown,
  Laptop,
  Smartphone,
  Headphones,
  Camera,
  Watch,
  Tv,
  Gamepad,
  Cpu,
  HardDrive,
  Printer,
  Wifi,
  Mouse,
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

export function DropdownMenuDemo() {
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (name: string) => {
    setExpandedSubMenu(expandedSubMenu === name ? null : name);
  };

  const categories = [
    {
      id: "computers",
      name: "Computers & Laptops",
      icon: <Laptop className="size-5" />,
      subcategories: [
        { title: "Gaming Laptops" },
        { title: "Ultrabooks" },
        { title: "Desktop PCs" },
      ],
    },
    {
      id: "smartphones",
      name: "Smartphones & Tablets",
      icon: <Smartphone className="size-5" />,
      subcategories: [{ title: "iPhones" }, { title: "Android Phones" }],
    },
    {
      id: "audio",
      name: "Audio & Headphones",
      icon: <Headphones className="size-5" />,
      subcategories: [{ title: "Over-ear" }, { title: "True Wireless" }],
    },
    {
      id: "cameras",
      name: "Cameras & Photography",
      icon: <Camera className="size-5" />,
      subcategories: [{ title: "DSLR" }, { title: "Mirrorless" }],
    },
    {
      id: "tvs",
      name: "TVs & Home Entertainment",
      icon: <Tv className="size-5" />,
      subcategories: [{ title: "4K TVs" }, { title: "Smart TVs" }],
    },
    {
      id: "wearables",
      name: "Wearable Technology",
      icon: <Watch className="size-5" />,
      subcategories: [{ title: "Smartwatches" }, { title: "Fitness Trackers" }],
    },
    {
      id: "gaming",
      name: "Gaming & Consoles",
      icon: <Gamepad className="size-5" />,
      subcategories: [{ title: "PlayStation" }, { title: "Xbox" }],
    },
    { id: "components", name: "Computer Components", icon: <Cpu className="size-5" />, subcategories: [] },
    { id: "storage", name: "Storage Solutions", icon: <HardDrive className="size-5" />, subcategories: [] },
    { id: "printers", name: "Printers & Scanners", icon: <Printer className="size-5" />, subcategories: [] },
    { id: "networking", name: "Networking", icon: <Wifi className="size-5" />, subcategories: [] },
    { id: "accessories", name: "Peripherals & Accessories", icon: <Mouse className="size-5" />, subcategories: [] },
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
                className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {category.icon}
                <span>{category.name}</span>
              </DropdownMenuSubTrigger>

              {category.subcategories.length > 0 && (
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
              )}
            </DropdownMenuSub>
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
