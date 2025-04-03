"use client";

import { Suspense, useEffect, useState, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import { Product, Category } from "@/types";

import { BrandCarousel } from "../../components/client/home/brands";
import FeaturedProduct from "../../components/client/home/sections/FeaturedProduct";
import FirstBanner from "../../components/client/home/sections/FirstBanner";
import HomeSlider from "../../components/client/home/sections/HomeSlider";
import HotSells from "../../components/client/home/sections/HotSells";
import RecentProduct from "../../components/client/home/sections/RecentProduct";
import ThreeBanners from "../../components/client/home/sections/ThreeBanners";
import { useGetProductsWithCategoryQuery } from "@/redux/services/client/products";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="text-center py-10 mx-auto max-w-md">
    <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
    <p className="text-gray-600 mb-4">{error.message || "Failed to load content"}</p>
    <button 
      onClick={resetErrorBoundary} 
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      Try again
    </button>
  </div>
);

const SectionSkeleton: React.FC = () => (
  <div className="container mx-auto py-8">
    <Skeleton className="h-8 w-48 mb-6" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden">
          <Skeleton className="h-40 w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface SectionWrapperProps {
  children: ReactNode;
  name: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, name }) => (
  <ErrorBoundary 
    FallbackComponent={ErrorFallback} 
    onReset={() => window.location.reload()}
    key={name}
  >
    <Suspense fallback={<SectionSkeleton />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

export default function Home() {
  const {
    data: responseData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetProductsWithCategoryQuery();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (responseData) {
      setProducts(responseData.products || []);
      setCategories(responseData.categories || []);
    }
  }, [responseData]);

  if (isError) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to load page content</h2>
        <p className="text-gray-600 mb-6">{(error as Error)?.message || "There was an error loading the page content"}</p>
        <button 
          onClick={() => refetch()} 
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <SectionWrapper name="homeSlider">
        <HomeSlider />
      </SectionWrapper>

      <SectionWrapper name="firstBanner">
        <FirstBanner 
          categories={categories} 
          products={products} 
          isLoading={isLoading} 
        />
      </SectionWrapper>

      <SectionWrapper name="recentProduct">
        <RecentProduct 
          products={products} 
          isLoading={isLoading} 
        />
      </SectionWrapper>

      <SectionWrapper name="featuredProduct">
        <FeaturedProduct 
          products={products.filter((p) => p.is_promotion) || []} 
          isLoading={isLoading} 
        />
      </SectionWrapper>

      <SectionWrapper name="threeBanners">
        <ThreeBanners />
      </SectionWrapper>

      <SectionWrapper name="hotSells">
        <HotSells 
          products={products.filter((p) => p.is_promotion) || []}
          isLoading={isLoading}
        />
      </SectionWrapper>

      <SectionWrapper name="brandCarousel">
        <BrandCarousel />
      </SectionWrapper>
    </div>
  );
}