import Footer from "./partials/Footer";
import Header from "./partials/Header";
import Topbar from "./partials/Topbar";
import CompareList from "../components/client/shop/CompareList";
import QuickView from "../components/client/shop/QuickView";
import SearchArea from "./partials/SearchArea";
import BottomNavMenu from "./partials/BottomNavMenu";

type IconName = "Facebook" | "Twitter" | "Instagram" | "Youtube";

interface SocialItem {
  icon: IconName;
  href: string;
  title: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socialItems: SocialItem[] = [
    { title: "Facebook", icon: "Facebook", href: "https://www.facebook.com" },
    { title: "Twitter", icon: "Twitter", href: "https://www.x.com" },
    { title: "Instagram", icon: "Instagram", href: "https://www.instagram.com" },
    { title: "Youtube", icon: "Youtube", href: "https://www.youtube.com" },
  ];

  return (
    <>
      <Topbar socialItems={socialItems} />
      <Header />
      <SearchArea />
      {children}
      <QuickView />
      <CompareList />
      <Footer socialItems={socialItems} />
      <BottomNavMenu />
    </>
  );
}
