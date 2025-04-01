"use client";
import React from "react";
import SearchForm from "./SearchParts/SearchForm";
import { Button } from "@/components/ui/button";
import { routes } from "@/utils/routes";
import { CategoryProps, NavItems } from "@/types";
import DropdownMenuDemo from "./SearchParts/DropdownMenuDemo";
import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/redux/services/client/categories";

const items: NavItems[] = [
  { title: "Home", href: "/" },
  { title: "Shop", href: routes.shop },
  { title: "About", href: "/about-us" },
  { title: "Contact", href: "/contact-us" },
];

const SearchArea = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const router = useRouter();

  const handleShop = () => {
    router.push(routes.shop);
  };

  
  return (
    <div className="container hidden py-4 md:flex flex-col md:flex-row items-center">
      <div className="block-1 flex justify-start w-full md:w-1/5">
        <DropdownMenuDemo categories={categories}  isLoading={isLoading} />
      </div>
      <div className="block-2 w-full md:w-3/5 md:px-8">
        <SearchForm categories={categories}  isLoading={isLoading} />
      </div>
      <div className="block-3 w-full md:w-1/5">
        <Button
          size="btnbf"
          onClick={handleShop}
          variant="custom_btnbf"
          className="flex flex-col gap-y-0.5 items-center justify-center text-center"
        >
          <strong className="text-md font-bold">
            WHITE FRIDAY
          </strong>
          <span className="text-xs">Get 45% Off!</span>
        </Button>
      </div>
    </div>
  );
}
export default SearchArea;