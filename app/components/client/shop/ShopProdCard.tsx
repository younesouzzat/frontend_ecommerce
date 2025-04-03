"use client";

import React from "react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Heart, ArrowRightLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCartSheet } from "@/app/context/CartSheetContext";
import Link from "next/link";
import { routes } from "@/utils/routes";
import { CartItem, ShopProdCardProps } from "@/types";
import { RootState } from "@/redux/stores/store";

export default function ShopProdCard({ product }: ShopProdCardProps) {
  const dispatch = useDispatch();
  const { openSheet } = useCartSheet();
  const { wishlist, compareList } = useSelector(
    (state: RootState) => state.global
  );

  const handleQuickView = (product: CartItem) => {
    dispatch(setQuickView(product));
  };

  const handleWishlist = (product: CartItem) => {
    dispatch(toggleWishlist(product));
    const isAdding = !wishlist.some((item: any) => item.id === product.id);
    toast.success(
      isAdding ? "Added to your wishlist" : "Removed from your wishlist"
    );
  };

  const handleCompare = (product: CartItem) => {
    dispatch(toggleCompare(product));
    const isAdding = !compareList.some((item: any) => item.id === product.id);
    toast.success(
      isAdding ? "Added to comparison list" : "Removed from comparison list"
    );
  };

  const handleAddToCart = (product: CartItem) => {
    dispatch(addToCart({ product }));
    toast.success("Product added to cart!");
    openSheet("cart");
  };

  const isInCompare = compareList.some((item: any) => item.id === product.id);
  const isInWishlist = wishlist.some((item: any) => item.id === product.id);

  return (
    <div>
      <Card key={product.id} className="overflow-hidden group relative">
        {/* Quick action buttons */}
        <div className="absolute top-2 right-2 z-30 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    isInWishlist ? "text-red-500" : ""
                  }`}
                  onClick={() => handleWishlist(product)}
                >
                  <Heart
                    size={16}
                    fill={isInWishlist ? "currentColor" : "none"}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
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
                    isInCompare ? "text-blue-500" : ""
                  }`}
                  onClick={() => handleCompare(product)}
                >
                  <ArrowRightLeft size={16} />
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
          <Link href={routes.product(product.id)}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
        <CardHeader>
          <CardTitle className="text-lg">
            <Link href={routes.product(product.id)}>{product.title}</Link>
          </CardTitle>

          <div className="flex items-center text-sm space-x-2">
            <span className="text-yellow-500">★</span>
            <span>
              {product.reviews_avg_note
                ? Number(product.reviews_avg_note).toFixed(1)
                : 0}
              ({product.reviews_count})
            </span>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col gap-2 items-center">
          <div className="flex gap-1">
            {product.is_promotion ? (
              <>
                <span className="font-semibold text-secondarybackground">
                  ${product.price_special.toFixed(2)}
                </span>
                <span className="text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-secondarybackground">
                ${product.price.toFixed(2)}
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
