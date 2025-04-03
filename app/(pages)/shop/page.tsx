"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useSearchParams } from "next/navigation";
import ShopProdCard from "@/app/components/client/shop/ShopProdCard";
import { useGetProductsQuery } from "@/redux/services/client/products";
import { useGetCategoriesQuery } from "@/redux/services/client/categories";
import { PaginationDemo } from "@/app/components/client/shop/PaginationDemo";
import { Skeleton } from "@/components/ui/skeleton";
import { Frown } from "lucide-react";
import { SearchParamsWrapper } from "@/components/SearchParamsWrapper";

const ShopPage = () => {
  const { data: categories, isLoading: isLoadingCat } = useGetCategoriesQuery();
  const searchParams = useSearchParams();
  const [category_id, setCategoryID] = useState<string | number | undefined>(0);
  const qParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";

  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    if (!isLoadingCat && categories && categories.length > 0) {
      const findCat = categories.filter((elem: any) => {
        return elem.name.toLowerCase() === categoryParam.toLowerCase();
      });
      setCategoryID(findCat.length !== 0 ? findCat[0].id : categoryParam);
    }
  }, [categoryParam, categories, isLoadingCat]);

  const [formState, setFormState] = useState({
    categoryFilter: category_id ? category_id.toString() : categoryParam,
    priceRange: [0, 500] as [number, number],
    searchQuery: qParam,
    sortBy: "featured",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    categoryFilter: category_id ? category_id.toString() : categoryParam,
    priceRange: [0, 500] as [number, number],
    searchQuery: qParam,
    sortBy: "featured",
  });

  const [executeQuery, setExecuteQuery] = useState(false);

  const updateFormState = (field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatPriceRange = (range: [number, number]): string => {
    return `${range[0]},${range[1]}`;
  };

  const { data, isLoading } = useGetProductsQuery(
    {
      page,
      perPage,
      searchQuery: appliedFilters.searchQuery,
      categoryFilter:
        category_id !== undefined && category_id !== 0
          ? category_id.toString()
          : appliedFilters.categoryFilter || "all",
      priceRange: formatPriceRange(appliedFilters.priceRange) || "0,500",
    },
    {
      skip: !executeQuery,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    setExecuteQuery(true);
  }, []);

  const products = data?.products || [];
  const totalPages = data?.last_page || 1;
  const currentPage = data?.current_page || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setExecuteQuery(true);
  };

  const applyFilters = () => {
    setAppliedFilters({ ...formState });
    setPage(1);
    setExecuteQuery(true);
  };

  const resetFilters = () => {
    const defaultFilters = {
      categoryFilter: "all",
      priceRange: [0, 500] as [number, number],
      searchQuery: "",
      sortBy: "featured",
    };

    setFormState(defaultFilters);
    setAppliedFilters(defaultFilters);
    setPage(1);
    setExecuteQuery(true);
  };

  const filteredProducts = products
    .filter((product) => {
      const { searchQuery } = appliedFilters;
      return searchQuery
        ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.category?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            )
        : true;
    })
    .sort((a, b) => {
      switch (appliedFilters.sortBy) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-medium mb-8">Shop Our Products</h1>
      <SearchParamsWrapper>
        {(searchParams) => (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <Input
                      id="search"
                      placeholder="Search products..."
                      value={formState.searchQuery}
                      onChange={(e) =>
                        updateFormState("searchQuery", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Select
                      value={formState.categoryFilter}
                      onValueChange={(value) =>
                        updateFormState("categoryFilter", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name!.charAt(0).toUpperCase() +
                              category.name!.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Price Range</Label>
                    <Slider
                      min={0}
                      max={500}
                      step={1}
                      value={formState.priceRange}
                      onValueChange={(value) =>
                        updateFormState("priceRange", value as [number, number])
                      }
                    />
                    <div className="flex justify-between text-sm">
                      <span>${formState.priceRange[0]}</span>
                      <span>${formState.priceRange[1]}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Sort By</Label>
                    <Select
                      value={formState.sortBy}
                      onValueChange={(value) =>
                        updateFormState("sortBy", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Featured" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="priceAsc">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="priceDesc">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={applyFilters}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Apply Filters
                    </Button>

                    <Button variant="outline" onClick={resetFilters}>
                      Reset All Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="relative">
                        <Skeleton className="w-full h-52 rounded-md" />
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">
                      Showing {filteredProducts.length} product
                      {filteredProducts.length !== 1 && "s"}
                    </p>

                    <div className="text-sm flex flex-wrap gap-2">
                      {appliedFilters.categoryFilter !== "all" && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          Category:{" "}
                          {categories?.find(
                            (c) => c.id === appliedFilters.categoryFilter
                          )?.name || appliedFilters.categoryFilter}
                        </span>
                      )}
                      {appliedFilters.searchQuery && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          Search: {`"${appliedFilters.searchQuery}"`}
                        </span>
                      )}
                      {(appliedFilters.priceRange[0] > 0 ||
                        appliedFilters.priceRange[1] < 500) && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          Price: ${appliedFilters.priceRange[0]} - $
                          {appliedFilters.priceRange[1]}
                        </span>
                      )}
                    </div>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product: any) => (
                          <ShopProdCard key={product.id} product={product} />
                        ))}
                      </div>

                      <div className="mt-6">
                        <PaginationDemo
                          page={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-60">
                      <Frown className="w-12 h-12 text-gray-500" />
                      <p className="mt-2 text-lg font-semibold text-gray-600">
                        No products found.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </SearchParamsWrapper>
    </div>
  );
};

export default ShopPage;
