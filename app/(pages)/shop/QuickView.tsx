"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/stores/store";
import {
  toggleWishlist,
  toggleCompare,
  setQuickView,
  addToCart,
} from "@/redux/services/shop/globalSlice";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge, BarChart2, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuickView() {
  const dispatch = useDispatch();
  const { wishlist, compareList, quickViewProduct } = 
  useSelector((state: RootState) => state.global);

  if (!quickViewProduct) return null;

  return (
    <Dialog
      open={quickViewProduct !== null}
      onOpenChange={(open) => !open && dispatch(setQuickView(null))}
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
            <h2 className="text-2xl font-medium">{quickViewProduct.label}</h2>
            <div className="flex items-center text-sm space-x-1">
              <span className="text-yellow-500">★</span>
              <span>{quickViewProduct.rating}</span>
            </div>
            <p className="text-xl font-medium">
              ${quickViewProduct.price.toFixed(2)}
            </p>
            <p className="text-gray-600">{quickViewProduct.description}</p>
            <div className="flex space-x-2 pt-4">
              <Button className="flex-1" onClick={() => dispatch(addToCart(quickViewProduct))}>
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={wishlist.includes(quickViewProduct.id) ? "text-red-500" : ""}
                onClick={() => dispatch(toggleWishlist(quickViewProduct.id))}
              >
                <Heart
                  size={16}
                  fill={wishlist.includes(quickViewProduct.id) ? "currentColor" : "none"}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={compareList.includes(quickViewProduct.id) ? "text-blue-500" : ""}
                onClick={() => dispatch(toggleCompare(quickViewProduct.id))}
              >
                <BarChart2 size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
