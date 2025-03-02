"use client";
// components/SearchForm.tsx
import { FC, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "Technology",
  "Health",
  "Business",
  "Science",
  "Sports",
  "Entertainment",
];

const SearchForm: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Searching for "${searchTerm}" in "${
        selectedCategory || "All categories"
      }"`
    );
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
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <Button
        size={"btnsearch"}
        variant={"default"}
        type="submit"
        className="bg-blue-600 text-white hover:text-black"
      >
        <Search />
      </Button>
    </form>
  );
};

export default SearchForm;
