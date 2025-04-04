"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useGetProductsQuery } from "@/redux/services/client/products";
import { useGetCategoriesQuery } from "@/redux/services/client/categories";
import { PaginationDemo } from "@/app/components/client/shop/PaginationDemo";
import { Skeleton } from "@/components/ui/skeleton";
import { Frown } from "lucide-react";
import ShopProdCard from "@/app/components/client/shop/ShopProdCard";
import { SearchParamsWrapper } from "@/components/SearchParamsWrapper";

const ShopPage = () => {
  const { data: categories, isLoading: isLoadingCat } = useGetCategoriesQuery();
  const [categoryID, setCategoryID] = useState<string | number | undefined>(0);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [formState, setFormState] = useState({
    categoryFilter: "all",
    priceRange: [0, 500] as [number, number],
    searchQuery: "",
    sortBy: "featured",
  });

  const [appliedFilters, setAppliedFilters] = useState(formState);
  const [executeQuery, setExecuteQuery] = useState(false);

  const updateFormState = (field: string, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const formatPriceRange = (range: [number, number]): string => `${range[0]},${range[1]}`;

  const { data, isLoading } = useGetProductsQuery(
    {
      page,
      perPage,
      searchQuery: appliedFilters.searchQuery,
      categoryFilter: categoryID !== undefined && categoryID !== 0
        ? categoryID.toString()
        : appliedFilters.categoryFilter || "all",
      priceRange: formatPriceRange(appliedFilters.priceRange),
    },
    {
      skip: !executeQuery,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => setExecuteQuery(true), []);

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

  const filteredProducts = (data?.products || [])
    .filter((product) => {
      const query = appliedFilters.searchQuery.toLowerCase();
      return query
        ? product.title.toLowerCase().includes(query) ||
            (product.category?.toLowerCase() || "").includes(query)
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

  const currentPage = data?.current_page || 1;
  const totalPages = data?.last_page || 1;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-medium mb-8">Shop Our Products</h1>

      <SearchParamsWrapper>
        {(searchParams) => {
          const qParam = searchParams.get("q") || "";
          const categoryParam = searchParams.get("category") || "all";

          // useEffect(() => {
          //   if (!isLoadingCat && categories) {
          //     const match = categories.find((c) =>
          //       c.name.toLowerCase() === categoryParam.toLowerCase()
          //     );
          //     setCategoryID(match ? match.id : categoryParam);
          //   }
          // }, [categoryParam, categories, isLoadingCat]);

          useEffect(() => {
            if (!isLoadingCat && categories) {
              const match = categories.find((c) =>
                c.name.toLowerCase() === categoryParam.toLowerCase()
              );
              setCategoryID(match ? match.id : categoryParam);
            }
          }, [categoryParam]);

          useEffect(() => {
            setFormState((prev) => ({
              ...prev,
              searchQuery: qParam,
              categoryFilter: categoryParam,
            }));
            setAppliedFilters((prev) => ({
              ...prev,
              searchQuery: qParam,
              categoryFilter: categoryParam,
            }));
          }, [qParam, categoryParam]);

          return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Filters */}
              <div className="md:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Search */}
                    <div>
                      <Label htmlFor="search">Search</Label>
                      <Input
                        id="search"
                        placeholder="Search products..."
                        value={formState.searchQuery}
                        onChange={(e) => updateFormState("searchQuery", e.target.value)}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={formState.categoryFilter}
                        onValueChange={(value) => updateFormState("categoryFilter", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories?.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <Label className="mb-2 block">Price Range</Label>
                      <Slider
                        min={0}
                        max={500}
                        step={1}
                        value={formState.priceRange}
                        onValueChange={(val) => updateFormState("priceRange", val as [number, number])}
                      />
                      <div className="flex justify-between text-sm">
                        <span>${formState.priceRange[0]}</span>
                        <span>${formState.priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Sort */}
                    <div>
                      <Label>Sort By</Label>
                      <Select
                        value={formState.sortBy}
                        onValueChange={(val) => updateFormState("sortBy", val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Featured" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                          <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Apply Filters
                      </Button>
                      <Button variant="outline" onClick={resetFilters}>
                        Reset All Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Products */}
              <div className="md:col-span-3">
                {isLoading ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="w-full h-52 rounded-md" />
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
                            Category: {categories?.find((c) => c.id === appliedFilters.categoryFilter)?.name}
                          </span>
                        )}
                        {appliedFilters.searchQuery && (
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            Search: "{appliedFilters.searchQuery}"
                          </span>
                        )}
                        {(appliedFilters.priceRange[0] > 0 || appliedFilters.priceRange[1] < 500) && (
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            Price: ${appliedFilters.priceRange[0]} - ${appliedFilters.priceRange[1]}
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
          );
        }}
      </SearchParamsWrapper>
    </div>
  );
};

export default ShopPage;
