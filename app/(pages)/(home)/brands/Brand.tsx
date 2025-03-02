import React from "react";
import { cn } from "@/lib/utils";

type BrandProps = {
  logo: React.ElementType;
};

const Brand: React.FC<BrandProps> = ({ logo: Logo }) => {
  return (
    <figure className={cn("relative w-44 cursor-pointer")}>
      <Logo className="size-40" />
    </figure>
  );
};

export default Brand;
