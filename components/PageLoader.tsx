"use client";
import { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchParamsWrapper } from "./SearchParamsWrapper";

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    const handleRouteChange = () => {
      handleStart();
      setTimeout(() => {
        handleComplete();
      }, 500);
    };

    handleRouteChange();

    return () => {
      setLoading(false);
    };
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/70 backdrop-blur-sm transition-opacity">
      <SearchParamsWrapper>
        {(searchParams) => (
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-primary mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-sm font-medium text-center">Loading...</p>
          </div>
        )}
      </SearchParamsWrapper>
    </div>
  );
};

export default PageLoader;
