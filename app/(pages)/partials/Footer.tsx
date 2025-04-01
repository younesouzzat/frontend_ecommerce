import { logo } from "@/utils/assets";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SocialItemProps {
  icon: React.ElementType;
  href: string;
  title: string;
}

interface FooterProps {
  socialItems: SocialItemProps[];
}

const quickLinks = [
  "Support Center",
  "Term & Conditions",
  "Shipping",
  "Privacy Policy",
  "Help",
  "Products Return",
  "FAQs",
];

const storeLocations = [
  "New York",
  "London SF",
  "Cockfosters BP",
  "Los Angeles",
  "Chicago",
  "Las Vegas",
  "Albarto",
];

export default function Footer({ socialItems }: FooterProps) {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900">
      <div className="container py-6 px-4 md:px-0 flex flex-col items-center gap-6">
        <div className="w-full flex flex-col md:flex-row gap-6">
          {/* Brand Info */}
          <div className="w-full md:w-2/5 flex flex-col">
            <Image src={logo} alt="Big Store" className="size-20 mb-4" />
            <p className="text-sm font-normal leading-relaxed text-gray-700 dark:text-gray-300 w-4/5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              voluptate inventore sequi? Doloremque quas explicabo ullam vitae
              harum dicta odit quod numquam aperiam laudantium ratione maiores
              placeat quisquam, repudiandae nam.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/5">
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={"/"} className="hover:text-primary">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Locations */}
          <div className="w-full md:w-1/5">
            <h3 className="text-lg font-bold mb-3">Our Stores</h3>
            <ul className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
              {storeLocations.map((location, index) => (
                <li key={index}>
                  <Link href={"/"} className="hover:text-primary">
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/5">
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <div className="flex flex-col space-y-3 text-gray-700 dark:text-gray-300">
              <div className="flex gap-3 items-center">
                <MapPin className="size-6 md:size-12" />
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <PhoneCall className="size-6" />
                <p className="text-sm">+212 6 22 55 99 88</p>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="size-6" />
                <p className="text-sm">support@contact.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-primary dark:bg-transparent py-4">
        <div className="container flex flex-col md:flex-row justify-between items-center text-white text-sm">
          <p className="order-2 md:order-1 text-center md:text-left">
            © {new Date().getFullYear()} Big Store. All Rights Reserved.
          </p>
          <ul className="order-1 md:order-2 flex items-center gap-4">
            {socialItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-300 transition"
                >
                  <item.icon className="size-5" />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
