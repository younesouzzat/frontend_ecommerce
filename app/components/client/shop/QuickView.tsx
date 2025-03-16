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
import { ArrowRightLeft, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickViewSliderProduct from "../product/QuickViewSliderProduct";

export default function QuickView() {
  const dispatch = useDispatch();
  const { wishlist, compareList, quickViewProduct } = useSelector(
    (state: RootState) => state.global
  );

  if (!quickViewProduct) return null;

  const dimensions = JSON.parse(quickViewProduct?.dimensions);
  const inCompare  = compareList.some((item) => item.id === quickViewProduct.id);
  const inWishlist = wishlist.some((item) => item.id === quickViewProduct.id);

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
          <div className="w-full">
            <QuickViewSliderProduct product={quickViewProduct} />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-medium">{quickViewProduct.title}</h2>
            <div className="flex items-center text-sm space-x-1">
              <span className="text-yellow-500">★</span>
              {quickViewProduct.reviews_avg_note
                ? Number(quickViewProduct.reviews_avg_note).toFixed(1)
                : 0}
              ({quickViewProduct.reviews_count})
            </div>
            <div className="flex items-center gap-3 my-2">
              {quickViewProduct?.is_promotion ? (
                <>
                  <span className="text-2xl font-bold text-secondarybackground">
                    ${quickViewProduct?.price_special}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${quickViewProduct.price}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-secondarybackground">
                  ${quickViewProduct?.price}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 my-2">
              <p className="text-sm text-gray-600">
                SKU:{" "}
                <span className="font-medium">{quickViewProduct?.ref}</span>
              </p>
              <p className="text-sm text-gray-600">
                Weight:{" "}
                <span className="font-medium">{quickViewProduct?.size} kg</span>
              </p>
              {dimensions.length > 0 && (
                <p className="text-sm text-gray-600">
                  Dimensions:{" "}
                  <span className="font-medium">
                    {dimensions.length} × {dimensions.width} ×{" "}
                    {dimensions.height} cm
                  </span>
                </p>
              )}
              {quickViewProduct?.category && (
                <p className="text-sm text-gray-600">
                  Category:{" "}
                  <span className="font-medium">
                    {quickViewProduct?.category}
                  </span>
                </p>
              )}
            </div>
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: quickViewProduct?.description,
              }}
            />
            <div className="flex space-x-2 pt-4">
              <Button
                className="flex-1"
                onClick={() => dispatch(addToCart({ quickViewProduct }))}
              >
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch(toggleWishlist(quickViewProduct))}
              >
                <Heart size={16} fill={inWishlist ? "bg-red-500" : "none"} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={inCompare ? "text-blue-500" : ""}
                onClick={() => dispatch(toggleCompare(quickViewProduct))}
              >
                <ArrowRightLeft size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
