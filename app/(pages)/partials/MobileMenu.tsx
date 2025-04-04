"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryItems } from "@/types";

interface MobileMenuProps {
  items: any;
  categories: CategoryItems[];
  isLoading: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  items,
  categories,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();

    if (searchTerm) {
      searchParams.set("q", searchTerm.toLowerCase());
    }

    if (selectedCategory) {
      searchParams.set("category", selectedCategory.toLowerCase());
    }

    const searchUrl = searchParams.toString()
      ? `${routes.shop}?${searchParams.toString()}`
      : routes.shop;

    router.push(searchUrl);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[80%] max-w-sm dark:bg-zinc-900 dark:text-white">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {items.map((item: any) => (
            <Link
              key={item.title}
              href={item.href}
              className="block text-base font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              {item.title}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
            <p className="text-sm text-muted-foreground mb-2 dark:text-gray-400">Quick Search</p>

            <form onSubmit={handleSearch} className="space-y-4">
              <Input
                placeholder="Find Your Product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 border-none rounded-md bg-white dark:bg-zinc-800 dark:text-white"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-14 border p-2 rounded-md cursor-pointer bg-white dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
              >
                <option value="">All categories</option>
                {isLoading ? (
                  <option>Loading...</option>
                ) : (
                  categories &&
                  categories.map((category: any) => (
                    <option key={`sf${category.id}`} value={category.name}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
              <Button
                size="btnsearch"
                variant="default"
                type="submit"
                className="w-full bg-blue-600 text-white hover:text-black dark:hover:text-white"
              >
                <Search />
              </Button>
            </form>

            <button
              onClick={() => router.push(routes.shop)}
              className="w-full text-left px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 mt-4 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white"
            >
              Go to Shop
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
