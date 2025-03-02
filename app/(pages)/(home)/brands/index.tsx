import * as React from "react";
import Brand from "./Brand";
import { Brand1Logo, Brand2Logo, Brand3Logo, Brand4Logo, Brand5Logo, Brand6Logo } from "@/utils/assets";
import { Marquee } from "@/components/ui/Marquee";

type BrandItem = {
  logo: React.ComponentType;
};

export function BrandCarousel() {
  const logos: BrandItem[] = [
    { logo: Brand1Logo },
    { logo: Brand2Logo },
    { logo: Brand3Logo },
    { logo: Brand4Logo },
    { logo: Brand5Logo },
    { logo: Brand6Logo },
  ];

  return (
    <div className="relative py-16 bg-white dark:bg-transparent flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {logos.map((brand, idx) => (
          <Brand key={idx} logo={brand.logo} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-slate-950 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-slate-950 dark:from-background"></div>
    </div>
  );
}
