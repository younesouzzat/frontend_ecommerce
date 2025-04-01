"use client";

import { 
  TruckIcon, 
  Globe, 
  PhoneCallIcon,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { useAuth } from "@/hooks/usAuth";
import { useAuthContext } from "@/redux/stores/AuthProvider";

const iconMap = {
  TruckIcon,
  Globe,
  PhoneCallIcon,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} as const;

type IconName = keyof typeof iconMap;

interface Item {
  title: string;
  icon: IconName;
}

interface SocialItemProps {
  href: string;
  icon: IconName;
  title: string;
}

const items: Item[] = [
  { title: "Free Delivery", icon: "TruckIcon" },
  { title: "Returns Policy", icon: "Globe" },
];

export default function Topbar({ socialItems }: { socialItems: SocialItemProps[] }) {
  const { user } = useAuthContext();
  const { logout } = useAuth();

  return (
    <div className="px-0 py-3 bg-topbarbackground">
      <div className="container flex flex-col md:flex-row items-center">
        <div className="hidden md:flex w-full md:w-1/2 gap-10">
          <div className="flex items-center gap-x-6">
            {items.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              return (
                <div key={index} className="flex items-center gap-2 relative">
                  <IconComponent className="size-6" strokeWidth={1.5} />
                  <span className="text-xs font-medium">{item.title}</span>
                  {index !== items.length - 1 && (
                    <span className="text-xs font-medium text-gray-400 before:content-['|'] before:mr-2" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="left flex items-center gap-6">
            <span className="text-xs font-medium">Follow us</span>
            <ul className="flex items-center gap-3">
              {socialItems.map((item, index) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <li key={index}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium"
                    >
                      <IconComponent className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 md:justify-end">
          {user && <UserDropdown user={user} onLogout={logout} />}
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