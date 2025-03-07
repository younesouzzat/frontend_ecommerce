import { logo } from "@/utils/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeartIconWithBadge from "./smallIcons/HeartIconWithBadge";
import BasketIconWithBadge from "./smallIcons/BasketIconWithBadge";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShopCartSheet from "../shop/ShopCartSheet";
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

export default function Header() {
  return (
    <div className="container py-4 px-2 md:px-0 flex flex-row items-center justify-between">
      <div className="flex md:hidden w-1/3 md:w-1/4">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
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
          <Link href="#">
            <HeartIconWithBadge />
          </Link>

          <ShopCartSheet />

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
