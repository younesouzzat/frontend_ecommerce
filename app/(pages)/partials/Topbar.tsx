import React from "react";
import {
  TruckIcon,
  Globe,
  PhoneCallIcon,
} from "lucide-react";
import Link from "next/link";

interface Item {
  title: string;
  icon: React.ElementType;
}

interface SocialItemProps {
  icon: React.ElementType;
  href: string;
}

const items: Item[] = [
  { title: "Free Delivery", icon: TruckIcon },
  { title: "Returns Policy", icon: Globe },
];

interface TopbarProps {
  socialItems: SocialItemProps[];
}

export default function Topbar({ socialItems }: TopbarProps) {
  return (
    <div className="px-0 py-3 bg-topbarbackground">
      <div className="container flex flex-col md:flex-row items-center">
        <div className="hidden md:flex w-full md:w-1/2 gap-10">
          <div className="flex items-center gap-x-6">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2 relative">
                <item.icon className="size-6" strokeWidth={1.5} />
                <span className="text-xs font-medium">{item.title}</span>
                {index !== items.length && (
                  <span className="text-xs font-medium text-gray-400 before:content-['|'] before:mr-2" />
                )}
              </div>
            ))}
          </div>

          <div className="left flex flex items-center gap-6">
            <span className="text-xs font-medium">Follwo us</span>
            <ul className="flex items-center gap-3">
              {socialItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} target="_blank" className="text-xs font-medium">
                    <item.icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 md:justify-end">
          <Link href="/login" className="text-xs font-medium">
            Sign up / Sign in
          </Link>
        </div>

        <Link
          href="tel:+212666889977"
          className="flex items-center justify-center gap-2 md:hidden"
        >
          <PhoneCallIcon className="size-4" />
          <span className="font-normal">+2126 66 88 99 77</span>
        </Link>
      </div>
    </div>
  );
}
