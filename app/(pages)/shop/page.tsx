// app/shop/page.jsx
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Heart, BarChart2, ShoppingCart } from "lucide-react";

import Image from "next/image";
import { prod1, prod2, prod3, prod4, prod5, prod6 } from "@/utils/assets";
import ShopProdCard from "./ShopProdCard";
import toast from "react-hot-toast";

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

  // State
  const [products, setProducts] = useState(initialProducts);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

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
    let filteredProducts = initialProducts;

    // Filter by category
    if (categoryFilter && categoryFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.label.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedTags.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedTags.some((tag) => product.tags.includes(tag))
      );
    }

    if (sortBy === "priceAsc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    setProducts(filteredProducts);
  }, [categoryFilter, priceRange, searchQuery, selectedTags, sortBy]);

  const handleTagChange = (tag) => {
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

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCompare = (productId) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 4) {
          toast.error("You can compare up to 4 products at a time.");
          return prev;
        }
        return [...prev, productId];
      }
    });
  };

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const savedCompareList = JSON.parse(localStorage.getItem("compareList")) || [];
    setWishlist(savedWishlist);
    setCompareList(savedCompareList);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-meduim mb-8">Shop Our Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
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

              {/* Category Filter */}
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

              {/* Price Range */}
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

              {/* Tags */}
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

              {/* Reset Filters Button */}
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

        {/* Product Grid */}
        <div className="md:col-span-3">
          {/* Sort Options */}
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

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ShopProdCard
                  product={product}
                  wishlist={wishlist}
                  compareList={compareList}
                  setQuickViewProduct={setQuickViewProduct}
                  toggleWishlist={toggleWishlist}
                  toggleCompare={toggleCompare}
                />
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

      {/* Quick View Dialog */}
      {quickViewProduct && (
        <Dialog
          open={quickViewProduct !== null}
          onOpenChange={(open) => !open && setQuickViewProduct(null)}
        >
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Quick View</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Image
                  src={quickViewProduct.src}
                  alt={quickViewProduct.label}
                  className="w-full object-cover rounded-md"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-meduim">
                  {quickViewProduct.label}
                </h2>
                <div className="flex items-center text-sm space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span>{quickViewProduct.rating}</span>
                </div>
                <p className="text-xl font-meduim">
                  ${quickViewProduct.price.toFixed(2)}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {quickViewProduct.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-600">{quickViewProduct.description}</p>
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1">
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={
                      wishlist.includes(quickViewProduct.id)
                        ? "text-red-500"
                        : ""
                    }
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                  >
                    <Heart
                      size={16}
                      fill={
                        wishlist.includes(quickViewProduct.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={
                      compareList.includes(quickViewProduct.id)
                        ? "text-blue-500"
                        : ""
                    }
                    onClick={() => toggleCompare(quickViewProduct.id)}
                  >
                    <BarChart2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Compare Modal (to be implemented) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-meduim">
                Compare Products ({compareList.length}/4):
              </span>
              <div className="flex gap-2">
                {compareList.map((id) => {
                  const product = initialProducts.find((p) => p.id === id);
                  return (
                    <div key={id} className="relative">
                      <Image
                        src={product.src}
                        alt={product.label}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-200"
                        onClick={() => toggleCompare(id)}
                      >
                        <span>×</span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCompareList([])}>
                Clear
              </Button>
              <Button>Compare Now</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
