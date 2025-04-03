// components/SearchParamsWrapper.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export const SearchParamsWrapper = ({ 
  children,
  fallback = <div>Loading...</div>
}: { 
  children: (searchParams: URLSearchParams) => React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  return (
    <Suspense fallback={fallback}>
      <Wrapper children={children} />
    </Suspense>
  );
};

const Wrapper = ({ children }: { children: (searchParams: URLSearchParams) => React.ReactNode }) => {
  const searchParams = useSearchParams();
  return children(searchParams);
};