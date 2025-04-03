"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function QuickViewSliderProduct({ product } : any) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full">
        <div className="relative w-full overflow-hidden rounded-lg">
          {product?.images && product?.images?.length > 0 ? (
            <Image
              src={product?.images[activeIndex]}
              alt={`${product?.title} - Image ${activeIndex + 1}`}
              width={800}
              height={800}
              priority
              className="rounded-lg object-cover transition-all duration-300"
            />
          ) : (
            <div className="h-[400px] w-full bg-gray-200 flex items-center justify-center rounded-lg">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>

        {/* Thumbnails Navigation - Only show if images exist */}
        {product?.images && product.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 justify-start">
            {product.images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`border-2 p-1 rounded-lg transition-all ${
                  activeIndex === index
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
  );
}
