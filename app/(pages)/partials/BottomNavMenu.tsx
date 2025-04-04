'use client';

import { routes } from "@/utils/routes";
import { Home, ShoppingBag, Info, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavItems = {
  title: "Home" | "Shop" | "About" | "Contact";
  href: string;
  icon: React.ElementType;
};

const items: NavItems[] = [
  { title: "Home", href: routes.home, icon: Home },
  { title: "Shop", href: routes.shop, icon: ShoppingBag },
  { title: "About", href: routes.about, icon: Info },
  { title: "Contact", href: routes.contact, icon: Mail },
];

export default function BottomNavMenu() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full dark:bg-slate-950 dark:text-white bg-gray-50 text-gray-900 border-t shadow-md md:hidden z-50">
      <ul className="flex justify-around items-center py-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.title}>
              <Link
                href={item.href}
                className={clsx(
                  "flex flex-col items-center text-xs",
                  isActive ? "text-black dark:text-white font-medium" : "text-gray-600 hover:text-black"
                )}
              >
                <Icon size={24} />
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
