"use client";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Footer from "./partials/Footer";
import Header from "./partials/Header";
import SearchArea from "./partials/SearchArea";
import Topbar from "./partials/Topbar";
import CompareList from "../components/client/shop/CompareList";
import QuickView from "../components/client/shop/QuickView";
import { useGetCategoriesQuery } from "@/redux/services/client/categories";

interface SocialItem {
  icon: React.ElementType;
  href: string;
  title: string;
}

const socialItems: SocialItem[] = [
  { title: "Facebook", icon: Facebook, href: "https://www.facebook.com" },
  { title: "Twitter", icon: Twitter, href: "https://www.x.com" },
  { title: "Instagram", icon: Instagram, href: "https://www.instagram.com" },
  { title: "Youtube", icon: Youtube, href: "https://www.youtube.com" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  return (
    <>
      <Topbar socialItems={socialItems} />
      <Header />
      <SearchArea categories={categories} isLoading={isLoading} />
      {children}
      <QuickView />
      <CompareList />
      <Footer socialItems={socialItems} />
    </>
  );
}
