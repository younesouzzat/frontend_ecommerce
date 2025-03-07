"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

import { prod1, prod2, prod3, prod4, prod5, prod6 } from "@/utils/assets";
import ShopProdCard from "./ShopProdCard";
import { useSearchParams } from "next/navigation";

interface Product {
  id: number;
  src: string;
  label: string;
  price: number;
  old_price: number;
  has_promo: boolean;
  sells: number;
  targetDate: string;
  rating: number;
  category: string;
  tags: string[];
  description: string;
}

export default function ShopPage() {
  const initialProducts = [
    {
      id: 1,
      src: prod1,
      label: "Bevigac Gamepad",
      price: 220.0,
      old_price: 250.0,
      has_promo: true,
      sells: 30,
      targetDate: "2025-03-15T00:00:00",
      rating: 4.6,
      category: "electronics",
      tags: ["wireless", "audio"],
      description:
        "Premium wireless headphones with active noise cancellation and up to 30 hours of battery life. Delivers rich, immersive sound quality.",
    },
    {
      id: 2,
      src: prod2,
      label: "Headset for Phones",
      price: 39.0,
      old_price: 0,
      has_promo: false,
      sells: 35,
      targetDate: "2025-03-14T00:00:00",
      rating: 4.0,
      category: "electronics",
      tags: ["wireless", "audio"],
      description:
        "Premium wireless headphones with active noise cancellation and up to 30 hours of battery life. Delivers rich, immersive sound quality.",
    },
    {
      id: 3,
      src: prod3,
      label: "Kotion Headset",
      price: 29.0,
      old_price: 49.0,
      has_promo: true,
      sells: 85,
      targetDate: "2025-03-15T00:00:00",
      rating: 4.5,
      category: "electronics",
      tags: ["wireless", "audio"],
      description:
        "Premium wireless headphones with active noise cancellation and up to 30 hours of battery life. Delivers rich, immersive sound quality.",
    },
    {
      id: 4,
      src: prod4,
      label: "Fuers Outdoor",
      price: 499.0,
      old_price: 520.0,
      has_promo: true,
      sells: 90,
      targetDate: "2025-04-2T00:00:00",
      rating: 3.5,
      category: "electronics",
      tags: ["wireless", "audio"],
      description:
        "Premium wireless headphones with active noise cancellation and up to 30 hours of battery life. Delivers rich, immersive sound quality.",
    },
    {
      id: 5,
      src: prod5,
      label: "Metal Body Mobile",
      price: 220.0,
      old_price: 0,
      has_promo: false,
      sells: 10,
      targetDate: "2025-03-15T00:00:00",
      rating: 5.0,
      category: "electronics",
      tags: ["wireless", "audio"],
      description:
        "Premium wireless headphones with active noise cancellation and up to 30 hours of battery life. Delivers rich, immersive sound quality.",
    },
    {
      id: 6,
      src: prod6,
      label: "Stereo Headset",
      price: 220.0,
      old_price: 250.0,
      has_promo: true,
      sells: 75,
      targetDate: "2025-04-2T00:00:00",
      rating: 4.9,
      category: "electronics",
      tags: ["wireless", "audio"],
      description:
        "Premium wireless headphones with active noise cancellation and up to 30 hours of battery life. Delivers rich, immersive sound quality.",
    },
  ];

  const searchParams = useSearchParams();
  const qParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';

  // State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categoryFilter, setCategoryFilter] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [searchQuery, setSearchQuery] = useState(qParam);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const allTags = [
    "vintage",
    "casual",
    "leather",
    "premium",
    "canvas",
    "durable",
    "sports",
    "comfortable",
    "wireless",
    "audio",
    "denim",
  ];

  const categories = [
    "clothing",
    "accessories",
    "bags",
    "footwear",
    "electronics",
  ];

  useEffect(() => {
    let result = [...initialProducts];

    result  = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.label.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((product) =>
        selectedTags.some((tag) => product.tags.includes(tag))
      );
    }

    if (sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setProducts(result);
  }, [categoryFilter, priceRange, searchQuery, selectedTags, sortBy]);

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setCategoryFilter("all");
    setPriceRange([0, 500]);
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("featured");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-medium mb-8">Shop Our Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="search" className="mb-2 block">
                  Search
                </Label>
                <Input
                  id="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="category" className="mb-2 block">
                  Category
                </Label>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Price Range</Label>
                <div className="pt-4 pb-2">
                  <Slider
                    defaultValue={[0, 500]}
                    min={0}
                    max={500}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Tags</Label>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => handleTagChange(tag)}
                      />
                      <Label htmlFor={`tag-${tag}`} className="cursor-pointer">
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} product
              {products.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center space-x-2">
              <Label htmlFor="sort-by" className="whitespace-nowrap">
                Sort by:
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-40">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid px-2 md:px-0 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ShopProdCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products found matching your filters.
              </p>
              <Button variant="link" onClick={resetFilters} className="mt-2">
                Reset all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}