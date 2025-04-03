import React, { useState } from "react";
import { List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/utils/routes";
import { CategoryItems } from "@/types";

interface DropdownMenuDemoProps {
  categories: CategoryItems[];
  isLoading: boolean;
}

const DropdownMenuDemo: React.FC<DropdownMenuDemoProps> = ({ categories, isLoading }) => {
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  const toggleSubMenu = (name: string) => {
    setExpandedSubMenu(expandedSubMenu === name ? null : name);
  };

  const handleCategorySearch = (name: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("category", name.toLowerCase());
    const searchUrl = `${routes.shop}?${searchParams.toString()}`;
    window.location.href = searchUrl;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex px-4 justify-between text-lg bg-blue-700 dark:bg-gray-800 text-white hover:bg-blue-600 dark:hover:bg-gray-700"
          size="large"
          onClick={() => toggleSubMenu("allCategory")}
        >
          <List className="size-10" />
          All Categories
          <ChevronDown
            className={`size-10 ml-auto transition-transform ${
              expandedSubMenu === "allCategory" ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-white dark:bg-gray-900 text-black dark:text-white border dark:border-gray-700">
        {isLoading ? (
          <DropdownMenuGroup>
            <DropdownMenuSub></DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Loading...</span>
            </DropdownMenuSubTrigger>
          </DropdownMenuGroup>
        ) : categories && categories.length === 0 ? (
          <DropdownMenuGroup>
            <DropdownMenuSub></DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>No categories available</span>
            </DropdownMenuSubTrigger>
          </DropdownMenuGroup>
        ) : (
          categories && categories.map((category: any) => (
            <DropdownMenuGroup key={`dm${category.id}`}>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  onMouseEnter={() => setExpandedSubMenu(category.id.toString())}
                  onMouseLeave={() => setExpandedSubMenu(null)}
                  onClick={() => handleCategorySearch(category.name)}
                  className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <span>{category.name}</span>
                </DropdownMenuSubTrigger>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuDemo;