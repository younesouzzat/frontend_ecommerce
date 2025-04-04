"use client";
import { logo } from "@/utils/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeartIconWithBadge from "./smallIcons/HeartIconWithBadge";
import { ThemeToggle } from "@/components/ThemeToggle";
import ShopCartSheet from "@/app/components/client/shop/ShopCartSheet";
import { routes } from "@/utils/routes";
import MobileMenu from "./MobileMenu";
import { useGetCategoriesQuery } from "@/redux/services/client/categories";

interface NavItems {
  title: string;
  href: string;
}

const items: NavItems[] = [
  { title: "Home", href: routes.home },
  { title: "Shop", href: routes.shop },
  { title: "About", href: routes.about },
  { title: "Contact", href: routes.contact },
];

export default function Header() {

  const { data: categories, isLoading } = useGetCategoriesQuery(undefined);

  return (
    <div className="container py-4 px-2 md:px-0 flex flex-row items-center justify-between">
      <div className="flex md:hidden w-1/3 md:w-1/4">
        <MobileMenu items={items} categories={categories as any} isLoading={isLoading} />
      </div>

      <div className="w-1/3 flex justify-center md:justify-start md:w-1/4">
        <Link href={"/"}>
          <Image src={logo} alt="logo" className="size-20"></Image>
        </Link>
      </div>

      <div className="hidden md:block w-1/3 md:w-2/4">
        <div className="flex items-center justify-center gap-x-8">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Link href={item.href} className="text-md font-medium">
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/3 md:w-1/4">
        <div className="flex items-center justify-end gap-4">
          <Link href={routes.wishlist}>
            <HeartIconWithBadge />
          </Link>

          <ShopCartSheet />

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
