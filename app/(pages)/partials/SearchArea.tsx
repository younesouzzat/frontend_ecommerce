import React from "react";
import { DropdownMenuDemo } from "./SearchParts/DropdownMenuDemo";
import SearchForm from "./SearchParts/SearchForm";
import { Button } from "@/components/ui/button";
import { routes } from "@/utils/routes";

interface NavItems {
  title: string;
  href: string;
}

const items: NavItems[] = [
  { title: "Home", href: "/" },
  { title: "Shop", href: routes.shop },
  { title: "About", href: "/about-us" },
  { title: "Contact", href: "/contact-us" },
];

export default function SearchArea() {
  return (
    <div className="container hidden py-4 md:flex flex-col md:flex-row items-center">
      <div className="block-1 flex justify-start w-full md:w-1/5">
        <DropdownMenuDemo />
      </div>
      <div className="block-2 w-full md:w-3/5 md:px-8">
        <SearchForm />
      </div>
      <div className="block-3 w-full md:w-1/5">
        <Button
          size="btnbf"
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
