"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes";
import { CategoryProps } from "@/types";

const categories = [
  "Clothing",
  "Accessories",
  "Bags",
  "Footwear",
  "Electronics",
];
const SearchForm: React.FC<CategoryProps> = ({ categories, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();

    if (searchTerm) {
      searchParams.set("q", searchTerm.toLowerCase());
    }

    if (selectedCategory) {
      searchParams.set("category", selectedCategory.toLowerCase());
    }

    // Construct the full URL with search parameters
    const searchUrl = searchParams.toString()
      ? `${routes.shop}?${searchParams.toString()}`
      : routes.shop;

    // router.push(searchUrl);
    window.location.href = searchUrl;
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex border items-center space-x-0"
    >
      <Input
        placeholder="Find Your Product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow border-none rounded-none h-14 w-3/5 hover:border-none"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded-none h-14 cursor-pointer"
      >
        <option value="">All categories</option>
        {isLoading ? (
          <option>No data</option>
        ) : (
          categories && categories?.map((category: any) => (
            <option key={`sf${category.id}`} value={category.name}>
              {category.name}
            </option>
          ))
        )}
      </select>
      <Button
        size="btnsearch"
        variant="default"
        type="submit"
        className="bg-blue-600 text-white hover:text-black"
      >
        <Search />
      </Button>
    </form>
  );
};

export default SearchForm;
