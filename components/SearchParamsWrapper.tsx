// components/SearchParamsWrapper.tsx
"use client";

import { Suspense, ReactNode } from "react";
import { useSearchParams } from "next/navigation";

type WrapperProps = {
  children: (searchParams: URLSearchParams) => ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const searchParams = useSearchParams();
  return children(searchParams);
};

type SearchParamsWrapperProps = {
  children: (searchParams: URLSearchParams) => ReactNode;
  fallback?: ReactNode;
};

export const SearchParamsWrapper = ({ 
  children,
  fallback = <div>Loading...</div>
}: SearchParamsWrapperProps) => {
  return (
    <Suspense fallback={fallback}>
      <Wrapper>{children}</Wrapper>
    </Suspense>
  );
};