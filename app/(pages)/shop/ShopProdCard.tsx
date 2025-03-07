"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWishlist,
  toggleCompare,
  setQuickView,
  addToCart,
} from "@/redux/services/shop/globalSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Heart, BarChart2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { useCartSheet } from "@/app/context/CartSheetContext";

export default function ShopProdCard({ product }) {
  const dispatch = useDispatch();
  const { openSheet } = useCartSheet();
  const { wishlist, compareList, cartItems } = useSelector(
    (state) => state.global
  );

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const storedCompareList = JSON.parse(
      localStorage.getItem("compareList") || "[]"
    );
    const storedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    storedWishlist.forEach((id) => dispatch(toggleWishlist(id)));
    storedCompareList.forEach((id) => dispatch(toggleCompare(id)));
    storedCartItems.forEach((item) => dispatch(addToCart(item)));
  }, [dispatch]);

  const handleQuickView = (product) => {
    dispatch(setQuickView(product));
  };

  const handleWishlist = (productId) => {
    dispatch(toggleWishlist(productId));
    localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Persist wishlist
  };

  const handleCompare = (product) => {
    dispatch(toggleCompare(product));
    localStorage.setItem("compareList", JSON.stringify(compareList)); // Persist compare list
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Persist cart items
    toast.success("Product added to cart!");
    openSheet("cart");
  };

  return (
    <div>
      <Card key={product.id} className="overflow-hidden group relative">
        {/* Quick action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white bg-opacity-80 hover:bg-opacity-100"
                  onClick={() => handleQuickView(product)}
                >
                  <Eye size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className={`rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 ${
                    wishlist.includes(product.id) ? "text-red-500" : ""
                  }`}
                  onClick={() => handleWishlist(product.id)}
                >
                  <Heart
                    size={16}
                    fill={
                      wishlist.includes(product.id) ? "currentColor" : "none"
                    }
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {wishlist.includes(product.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className={`rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 ${
                    compareList.includes(product.id) ? "text-blue-500" : ""
                  }`}
                  onClick={() => handleCompare(product)}
                >
                  <BarChart2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {compareList.includes(product.id)
                    ? "Remove from Compare"
                    : "Add to Compare"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={product.src}
            alt={product.label}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{product.label}</CardTitle>
          <div className="flex items-center text-sm space-x-1">
            <span className="text-yellow-500">★</span>
            <span>{product.rating} (0)</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1 mb-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-center">
          <div className="flex gap-1">
            <span className="font-semibold text-secondarybackground">
              ${product.price.toFixed(2)}
            </span>
            {product.has_promo && product.old_price > 0 && (
              <span className="text-gray-400 line-through">
                ${product.old_price.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            onClick={() => handleAddToCart(product)}
            variant={"secondary_btn"}
            size={"lg"}
          >
            <ShoppingCart size={16} className="mr-1" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
