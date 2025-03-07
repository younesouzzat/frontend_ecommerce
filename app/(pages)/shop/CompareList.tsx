"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RootState } from "@/redux/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompare, clearCompareList } from "@/redux/services/shop/globalSlice";

export default function CompareList() {
  const dispatch = useDispatch();
  const { compareList } = useSelector((state: RootState) => state.global);

  const initialProducts = JSON.parse(localStorage.getItem('initialProducts') || '[]');
  
  return (
    <div>
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                Compare Products ({compareList.length}/4):
              </span>
              <div className="flex gap-2">
                {compareList.map((id) => {
                  const product = initialProducts.find((p: any) => p.id === id);
                  return product ? (
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
                        onClick={() => dispatch(toggleCompare(product))}
                      >
                        <span>×</span>
                      </Button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => dispatch(clearCompareList())} // Dispatch the action to clear the compare list
              >
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
